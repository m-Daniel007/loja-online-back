import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/userType.unum';
import { UpdateteUserDto } from './dto/updateUser.dto';
import { createPasswordHashed, validatePassword } from '../utils/functionPassword';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUserService(createUser: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: createUser.email },
    });

    if (user) {
      throw new BadRequestException('Email was register in system');
    }
    const passwordHashed = await createPasswordHashed(createUser.password);

    const userCreated = await this.userRepository.save({
      ...createUser,
      typeUser: UserType.User,
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

  async updateUserService(
    updateUser: UpdateteUserDto,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const passwordHashed = await createPasswordHashed(updateUser.newPassword);

    const isMatch = await validatePassword(
      updateUser.lastPassword,
      user.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Last password invalid');
    }

    return this.userRepository.save({
     ...user,
      password: passwordHashed,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
