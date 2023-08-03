import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from 'user/dto/returnUser.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { LoginPayloadDto } from './dto/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async loginService(login: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(login.email)
      .catch(() => undefined);

    const isMatch = await compare(login.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid!');
    }

    return {
      user: new ReturnUserDto(user),
      token: await this.jwtService.signAsync({ ...new LoginPayloadDto(user) }),
    };
  }
}
