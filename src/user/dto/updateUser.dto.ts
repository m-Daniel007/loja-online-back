import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserDto } from './createUser.dto';

export class UpdateteUserDto extends PartialType(CreateUserDto) {
  @IsString()
  lastPassword: string;

  @IsString()
  newPassword: string;
}
