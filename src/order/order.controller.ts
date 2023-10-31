import { OrderService } from './order.service';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/cart/:cartId')
  async createOrder(
    @Body() createOrder: CreateOrderDto,
    @Param('cartId') cartId: number,
  ) {
    return this.orderService.createOrderService(createOrder, cartId);
  }
}
