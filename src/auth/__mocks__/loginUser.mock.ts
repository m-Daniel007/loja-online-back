import { LoginDto } from 'auth/dto/login.dto';
import { userEntityMock } from '../../user/__mocks__/user.mock';


export const loginUserMock: LoginDto = {
  email: userEntityMock.email,
  password: '1234',
};