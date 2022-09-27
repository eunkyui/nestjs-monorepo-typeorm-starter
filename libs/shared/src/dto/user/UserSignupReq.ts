import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignupReq {
  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  constructor() {}

  static of(
    firstName: string,
    lastName: string,
  ): UserSignupReq {
    const dto = new UserSignupReq();
    dto.firstName = firstName;
    dto.lastName = lastName;

    return dto;
  }
}
