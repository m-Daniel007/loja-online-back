import { UserType } from '../enum/userType.unum';
import { UserEntity } from '../entities/user.entity';


export const userEntityMock: UserEntity = {
  cpf: '123543543',
  createdAt: new Date(),
  email: 'emailmock@emali.com',
  id: 43242,
  name: 'nameMock',
  password: '$2b$10$WwPzFY0rntOg83CCtQo2sOdHaJySPy0uY42.n/oaZ/aooDRplraKy',
  phone: '321532523532',
  typeUser: UserType.User,
  updatedAt: new Date(),
};