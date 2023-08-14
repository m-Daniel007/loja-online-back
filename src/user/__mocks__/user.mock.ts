import { UserType } from '../enum/userType.unum';
import { UserEntity } from '../entities/user.entity';


export const userEntityMock: UserEntity = {
  cpf: '123543543',
  createdAt: new Date(),
  email: 'emailmock@emali.com',
  id: 43242,
  name: 'nameMock',
  password: '$2b$10$EkOm97T3BXqZzF2IxPzjwutG.pOu1iIfFyP8jOMWXKRgRxzZGk.6m',
  phone: '321532523532',
  typeUser: UserType.User,
  updatedAt: new Date(),
};