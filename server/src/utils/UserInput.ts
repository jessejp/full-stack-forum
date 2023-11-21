import { InputType, Field } from "type-graphql";

@InputType()
class UserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

export default UserInput;
