import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  @Field()
  @Column({ type: "date" })
  updatedAt?: Date = new Date();

  @Field()
  @Column()
  title!: string;
}
