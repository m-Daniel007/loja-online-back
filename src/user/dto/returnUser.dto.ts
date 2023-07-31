import { UserEntity } from 'user/entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
    this.createdAt = userEntity.createdAt;
    this.updatedAt = userEntity.updatedAt;
  }
}
