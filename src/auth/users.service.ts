import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { FindOneOptions } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async findByFields(options: FindOneOptions<User>): Promise<User | undefined> {
    return await this.usersRepository.findOne(options);
  }

  async transformPassword(password: string): Promise<string> {
    const transformedPassword = await bcrypt.hash(password, 10);
    return transformedPassword;
  }

  async createUser(data: UserDto) {
    const { email, password, isAdmin, isPersonal } = data;

    const hashedPassword = await this.transformPassword(password);

    await this.usersRepository.insert({
      email,
      password: hashedPassword,
      isAdmin,
      isPersonal,
      point: 0,
    });
  }

  async updateUserPassword(id: number, newPassword: string) {
    const hashedPassword = await this.transformPassword(newPassword);

    return await this.usersRepository.update(
      { id },
      {
        password: hashedPassword,
      },
    );
  }

  async deleteUser(id: number) {
    return await this.usersRepository.softDelete(id);
  }
}
