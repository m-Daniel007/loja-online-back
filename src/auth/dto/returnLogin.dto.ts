import { ReturnUserDto } from 'user/dto/returnUser.dto';

export class ReturnLoginDto {
  user: ReturnUserDto;
  token: string;
}
