import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findUser(email: string): Promise<User> | null {
    const user = await this.findOne({ where: { email } });
    return user;
  }

  async createUser(user: Partial<CreateUserDto>): Promise<User> {
    const newUser = this.create(user);
    return await this.save(newUser);
  }

  async updateUser(user: User, data: UpdateUserDto): Promise<object> {
    const result = await this.update({ id: user.id }, data);
    return result;
  }

  async deleteUser(id: number): Promise<object> {
    const result = await this.softDelete(id);
    return result;
  }
}
