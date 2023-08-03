import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dto/returnLogin.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() dadosUser: LoginDto): Promise<ReturnLoginDto> {
    return this.authService.loginService(dadosUser);
  }
}
