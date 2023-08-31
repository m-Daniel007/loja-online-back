import { Controller } from '@nestjs/common';
import { Roles } from 'decorators/roles.decorators';
import { UserType } from 'user/enum/userType.unum';

@Roles(UserType.User)
@Controller('cart')
export class CartController {}
