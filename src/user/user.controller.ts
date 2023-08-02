import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dto/returnUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUserService(createUser);
  }

  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUserService()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Get('/:userId')
  async findUserByIdByAddress(
    @Param('userId') userId: number,
  ): Promise<ReturnUserDto> {
    const user = new ReturnUserDto(
      await this.userService.findUserByIdByAddressService(userId),
    );
    return user;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: any) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
