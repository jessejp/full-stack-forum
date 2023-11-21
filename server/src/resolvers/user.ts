import { User } from "../entities/User";
import type { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constants";
import UserInput from "../utils/UserInput";
import * as EmailValidator from "email-validator";
import {
  PasswordValidator,
  registerValidation,
} from "../utils/registerValidation";
import { v4 as uuid } from "uuid";
import sendEmail from "../utils/sendEmail";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    const user = await em.findOne(User, { _id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const errors: FieldError[] = [];

    const validationError = registerValidation(options);

    if (validationError) {
      errors.push(validationError);
    }

    if (errors.length) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);

    const user = em.create(User, {
      username: options.username,
      email: options.email,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === "23505") {
        // duplicate username error
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }

    req.session.userId = user._id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (!usernameOrEmail) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "username or email is required",
          },
        ],
      };
    } else if (!password) {
      return {
        errors: [
          {
            field: "password",
            message: "password is required",
          },
        ],
      };
    }

    const isEmail = EmailValidator.validate(usernameOrEmail);

    const user = await em.findOne(
      User,
      isEmail ? { email: usernameOrEmail } : { username: usernameOrEmail }
    );

    const errors: FieldError[] = [];

    if (!user) {
      errors.push({
        field: "username",
        message: "that username doesn't exist",
      });
      return {
        errors,
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      errors.push({
        field: "password",
        message: "incorrect password",
      });
      return {
        errors,
      };
    }

    req.session.userId = user._id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Ctx() { em, redis }: MyContext,
    @Arg("email") email: string
  ) {
    const user = await em.findOne(User, { email });

    if (!user) {
      // email is not in the db
      return true;
    }

    const token = uuid();
    redis.set(
      `${FORGOT_PASSWORD_PREFIX}${token}`,
      user._id,
      "EX",
      1000 * 60 * 60 * 5
    ); // 5 hour expiration

    const msg = `
    <a href="http://localhost:3000/change-password/${token}">
      Reset your password by following this link.
    </a>
    `;

    await sendEmail(user.email, msg);

    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Ctx() { em, redis }: MyContext,
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string
  ): Promise<UserResponse> {
    const passwordValidation = PasswordValidator(newPassword);

    if (passwordValidation) {
      return {
        errors: [
          {
            field: "newPassword",
            message: passwordValidation.message,
          },
        ],
      };
    }

    const key = `${FORGOT_PASSWORD_PREFIX}${token}`;
    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      };
    }

    const user = await em.findOne(User, { _id: parseInt(userId) });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }
    
    // Delete the redis key to expire token after use
    await redis.del(key);

    user.password = await argon2.hash(newPassword);
    em.persistAndFlush(user);

    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
