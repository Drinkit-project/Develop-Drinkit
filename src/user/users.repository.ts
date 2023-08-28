import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { Profile } from 'src/entities/profile.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  async findUser(options: FindOneOptions<User>) {
    const user = await this.createQueryBuilder('user')
      .innerJoin(Profile, 'profile', 'profile.userId = user.id')
      .select([
        'user.id AS "userId"',
        'profile.nickname AS "nickname"',
        'user.isAdmin AS "isAdmin"',
        'user.isPersonal AS "isPersonal"',
      ])
      .where(options.where)
      .getRawOne();
    return user;
  }

  async findUserForSignIn(options: FindOneOptions<User>) {
    const user = await this.createQueryBuilder('user')
      .select(['user.id', 'user.password'])
      .where(options.where)
      .getOne();

    return user;
  }
}
