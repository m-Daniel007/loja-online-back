import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserType } from '../user/enum/userType.unum';
import { Roles } from '../decorators/roles.decorators';
import { CartService } from './cart.service';
import { InsertCartDTO } from './dto/insertCart.dto';
import { UserId } from '../decorators/userId.decorator';
import { ReturnCartDto } from './dto/returnCart.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.insertProductInCartService(insertCart, userId),
    );
  }

  @Get()
  async findCartByUser(@UserId() userId: number): Promise<ReturnCartDto> {
    return new ReturnCartDto(await this.cartService.findCartByUserId(userId,true));
  }

  @Delete()
  async clearCart(@UserId()userId:number):Promise<DeleteResult>{
    return this.cartService.clearCartService(userId);
  }
}
