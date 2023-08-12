import { CreateAddressDto } from '../../address/dto/create-address.dto';
import { cityMock } from '../../city/__mocks__/city.mock';
import { addressMock } from './address.mock';

export const createAddressMock: CreateAddressDto = {
  cep: addressMock.cep,
  cityId: cityMock.id,
  complement: addressMock.complement,
  numberAddress: addressMock.numberAddress,
};
