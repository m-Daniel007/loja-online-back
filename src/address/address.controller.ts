import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'decorators/roles.decorators';
import { UserType } from 'user/enum/userType.unum';
import { UserId } from 'decorators/userId.decorator';
import { ReturnAddressDto } from './dto/returnAddress.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(
    @Body() createAddress: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    const saveAddress = await this.addressService.createAddressService(
      createAddress,
      userId,
    );
    return saveAddress;
  }

  @Get()
  async findAllAddressesByUserId(
    @UserId() userId: number,
  ): Promise<ReturnAddressDto[]> {
    return (
      await this.addressService.findAllAddressesByUserIdService(userId)
    ).map((address) => new ReturnAddressDto(address));
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.addressService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
  //   return this.addressService.update(+id, updateAddressDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.addressService.remove(+id);
  // }
}
