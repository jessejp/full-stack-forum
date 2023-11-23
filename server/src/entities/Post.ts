import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  title!: string;

  @Column()
  creatorId: number;

  @ManyToOne(() => User, (user) => user.posts)
  creator!: User;

  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  @Field()
  @Column({ type: "date" })
  updatedAt?: Date = new Date();
}
