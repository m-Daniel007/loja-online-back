import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUserService(createUser: CreateUserDto): Promise<UserEntity> {
    const passwordHashed = await hash(createUser.password, 10);

    const userCreated = await this.userRepository.save({
      ...createUser,
      typeUser: 1,
      password: passwordHashed,
    });
    return userCreated;
  }

  async getAllUserService(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User: ${email} not found`);
    }

    return user;
  }

  async findUserByIdByAddressService(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
    return user;
  }

  // update(id: number, updateUserDto: any) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
