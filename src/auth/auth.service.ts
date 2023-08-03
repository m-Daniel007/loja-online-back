import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async loginService(login: LoginDto): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(login.email)
      .catch(() => undefined);

    const isMatch = await compare(login.password, user?.password||'');

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid!');
    }

    return user;
  }
}
