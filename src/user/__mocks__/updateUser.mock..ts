import { UpdateteUserDto } from "../dto/updateUser.dto";


export const updatePasswordMock: UpdateteUserDto = {
  lastPassword: '1234',
  newPassword: 'fdsafj',
};

export const updatePasswordInvalidMock: UpdateteUserDto = {
  lastPassword: 'lkfdjsa',
  newPassword: 'flkjbla',
};