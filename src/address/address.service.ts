import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async createAddressService(
    createAddress: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    const address = await this.addressRepository.save({
      ...createAddress,
      userId,
    });
    return address;
  }
}
