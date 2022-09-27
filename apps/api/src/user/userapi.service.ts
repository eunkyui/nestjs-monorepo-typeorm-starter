import { Injectable } from '@nestjs/common';
import { User, UserName, UserQueryRepository } from '@nest-mono-sample/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async signup(signupUser: User): Promise<void> {
    await this.userRepository.save(signupUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserName(userId: number): Promise<UserName> {
    return await this.userQueryRepository.findUserName(userId);
  }
}
