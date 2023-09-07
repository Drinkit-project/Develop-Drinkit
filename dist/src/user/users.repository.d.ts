import { User } from '../entities/user.entity';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
export declare class UsersRepository extends Repository<User> {
    private datasource;
    constructor(datasource: DataSource);
    findUser(options: FindOneOptions<User>): Promise<any>;
    findUserForSignIn(options: FindOneOptions<User>): Promise<any>;
}
