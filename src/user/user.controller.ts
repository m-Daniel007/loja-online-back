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
import { ReturnUserDto } from './dto/returnUser.dto';
import { UserType } from './enum/userType.unum';
import { Roles } from '../decorators/roles.decorators';
import { UserId } from '../decorators/userId.decorator';
import { UserEntity } from './entities/user.entity';
import { UpdateteUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUserService(createUser);
  }

  @Roles(UserType.Admin)
  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUserService()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Roles(UserType.Admin)
  @Get('/:userId')
  async findUserByIdByAddress(
    @Param('userId') userId: number,
  ): Promise<ReturnUserDto> {
    const user = new ReturnUserDto(
      await this.userService.findUserByIdByAddressService(userId),
    );
    return user;
  }

  @Roles(UserType.Admin, UserType.User)
  @Patch()
  async updateUser(
    @Body() updateUser: UpdateteUserDto,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updateUserService(updateUser, userId);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
