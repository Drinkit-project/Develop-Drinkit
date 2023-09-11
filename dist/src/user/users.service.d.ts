import { UsersRepository } from './users.repository';
import { UserDto } from './dto/user.dto';
import { DataSource, FindOneOptions } from 'typeorm';
import { User } from 'src/entities/user.entity';
import UpdateUserDto from 'src/user/dto/updateUser.dto';
import { AuthService } from 'src/auth/auth.service';
import { Payload } from 'src/auth/security/payload.interface';
import { ProfilesService } from './profiles.service';
import createUserDto from './dto/createUser.dto';
export declare class UsersService {
    private dataSource;
    private profilesService;
    private authService;
    private readonly usersRepository;
    constructor(dataSource: DataSource, profilesService: ProfilesService, authService: AuthService, usersRepository: UsersRepository);
    findByFields(options: FindOneOptions<User>): Promise<any>;
    findByFieldsForSignIn(options: FindOneOptions<User>): Promise<any>;
    transformPassword(password: string): Promise<string>;
    sendEmail(email: string): Promise<void>;
    sendSMS(phoneNumber: string): Promise<string>;
    authEmail(emailToken: string): Promise<any>;
    authCode(body: {
        phoneNumber: string;
        code: string;
    }): Promise<boolean>;
    signIn(data: Partial<UserDto>): Promise<{
        accessToken: string;
        refreshToken: string;
    } | undefined>;
    oAuthSignIn({ request, response }: {
        request: any;
        response: any;
    }): Promise<false | {
        accessToken: string;
        refreshToken: string;
    }>;
    signUp(data: createUserDto, email: string): Promise<void>;
    authenticationByPassword(id: number, password: string): Promise<boolean>;
    updateUserPassword(id: number, data: UpdateUserDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    tokenValidateUser(payload: Payload): Promise<User | undefined>;
    deleteUser(id: number): Promise<{
        statusCode: number;
        message: string;
    }>;
}
