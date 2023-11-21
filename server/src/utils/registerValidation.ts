import UserInput from "./UserInput";
import * as EmailValidator from "email-validator";

export const registerValidation = (options: UserInput) => {
  if (options.username.length <= 2) {
    return {
      field: "username",
      message: "length must be greater than 2",
    };
  }

  if (!EmailValidator.validate(options.email)) {
    return {
      field: "email",
      message: "invalid email",
    };
  }

  const passwordValidation = PasswordValidator(options.password);

  if (passwordValidation) {
    return {
      field: "password",
      message: passwordValidation.message,
    };
  }

  return null;
};

export function PasswordValidator(password: string) {
  if (password.length <= 3) {
    return { message: "length must be greater than 3" };
  }
  return null;
}
