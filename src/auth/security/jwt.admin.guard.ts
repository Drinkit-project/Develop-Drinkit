import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthAdminGuard extends NestAuthGuard('jwt') {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.Authentication.replace('Bearer ', ''); // Remove 'Bearer ' from the token

    if (!token) {
      throw new UnauthorizedException('Token not found in the cookie.');
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
      request.payload = decodedToken; // Store the decoded payload in the request object

      const user = await this.usersRepository.findOne({
        where: { id: request.payload.userId },
      });

      return user.isAdmin;
    } catch (error) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
