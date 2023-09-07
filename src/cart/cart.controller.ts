import { Body, Controller, Post } from '@nestjs/common';
import { CartEntity } from './entities/cart.entity';
import { UserType } from '../user/enum/userType.unum';
import { Roles } from '../decorators/roles.decorators';
import { CartService } from './cart.service';
import { InsertCartDTO } from './dto/insertCart.dto';
import { UserId } from '../decorators/userId.decorator';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<CartEntity> {
    return this.cartService.insertProductInCartService(insertCart, userId);
  }
}
