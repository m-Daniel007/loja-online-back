import { ReturnAddressDto } from '../../address/dto/returnAddress.dto';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  addresses: ReturnAddressDto[];
  //createdAt: Date;
 // updatedAt: Date;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
   // this.createdAt = userEntity.createdAt;
   // this.updatedAt = userEntity.updatedAt;

    this.addresses = userEntity.addresses
      ? userEntity.addresses.map((addresses) => new ReturnAddressDto(addresses))
      : undefined;
  }
}
