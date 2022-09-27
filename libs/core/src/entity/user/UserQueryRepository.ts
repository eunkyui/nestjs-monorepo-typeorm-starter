import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UserName } from './UserName';
import { User } from './User.entity';

@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {
  async findUserName(userId: number): Promise<UserName> {
    const row = await this.findOneByUserId(userId);
    return plainToClass(UserName, row);
  }

  private async findOneByUserId(userId: number) {
    const queryBuilder = createQueryBuilder()
      .select(['user.firstName', 'user.lastName'])
      .from(User, 'user')
      .where(`user.id =:id`, { id: userId });

    return await queryBuilder.getRawOne();
  }
}
