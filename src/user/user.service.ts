import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  async createUserService(createUserDto: CreateUserDto): Promise<UserEntity> {
    const passwordHashed = await hash(createUserDto.password, 10);

    const user: UserEntity = {
      ...createUserDto,
      id: this.users.length + 1,
      password: passwordHashed,
    };
    this.users.push(user);
    return user;
  }

  async getAllUserService(): Promise<UserEntity[]> {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
