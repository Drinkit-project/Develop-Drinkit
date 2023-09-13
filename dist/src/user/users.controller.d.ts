import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { ProfilesService } from './profiles.service';
import { ProfileDto } from './dto/Profile.dto';
import createUserDto from './dto/createUser.dto';
import { User } from 'src/entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    private profilesService;
    constructor(usersService: UsersService, profilesService: ProfilesService);
    signUp(data: createUserDto, request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    sendSMS(body: Partial<ProfileDto>, response: Response): Promise<string | Response<any, Record<string, any>>>;
    authCode(response: Response, body: {
        phoneNumber: string;
        code: string;
    }): Promise<Response<any, Record<string, any>>>;
    sendEmail(body: Partial<UserDto>): Promise<void>;
    authEmail(emailToken: string, response: Response): Promise<void | Response<any, Record<string, any>>>;
    signIn(data: Partial<UserDto>, response: Response): Promise<Response<any, Record<string, any>>>;
    loginGoogle(request: Request, response: Response): Promise<void>;
    loginKakao(request: Request, response: Response): Promise<void>;
    loginNaver(request: Request, response: Response): Promise<void>;
    signout(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    getUser(userId: number, data: Partial<UserDto>): Promise<boolean>;
    updateUserPassword(userId: number, data: UpdateUserDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    deleteUser(userId: number): Promise<{
        statusCode: number;
        message: string;
    }>;
    getProfile(user: User, request: Request): Promise<{
        profile: any;
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
    }>;
    getAddress(user: User): Promise<{
        address: string;
        name: string;
    }[]>;
    updateProfile(user: User, data: Partial<ProfileDto>): Promise<import("typeorm").UpdateResult>;
    addAddress(user: User, data: Partial<ProfileDto>): Promise<import("typeorm").UpdateResult>;
    updateAddress(user: User, addressIdx: number, data: Partial<ProfileDto>): Promise<import("typeorm").UpdateResult>;
    delteAddress(user: User, addressIdx: number): Promise<import("typeorm").UpdateResult>;
}
