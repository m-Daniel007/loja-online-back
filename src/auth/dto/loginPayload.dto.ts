import { UserEntity } from 'user/entities/user.entity';

export class LoginPayloadDto {
  id: number;
  typeUser: number;
  email: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.typeUser = user.typeUser;
    this.email = user.email;
  }
}
