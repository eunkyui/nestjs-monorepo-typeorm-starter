import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocalDateTime } from 'js-joda';
import { UserStatus } from './type/UserStatus';
import { UserStatusTransformer } from './type/UserStatusTransformer';

@Entity()
@Index('idx_user_1', ['group'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'varchar',
    length: 50,
    transformer: new UserStatusTransformer(),
    nullable: false,
  })
  status: UserStatus;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  static signup(
    firstName: string,
    lastName: string,
  ): User {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.status = UserStatus.READY;
    user.isActive = true;

    return user;
  }

  static of(
    firstName: string,
    lastName: string,
    status: UserStatus,
    isActive: boolean,
  ): User {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.status = status;
    user.isActive = isActive;

    return user;
  }

  static byName(firstName: string, lastName: string) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    return user;
  }
}
