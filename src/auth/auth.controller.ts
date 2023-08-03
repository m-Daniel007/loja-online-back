import { Body, Controller, Post } from '@nestjs/common';
import { ReturnUserDto } from 'user/dto/returnUser.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() dadosUser: LoginDto): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.authService.loginService(dadosUser));
  }
}
