import { OrderService } from './order.service';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UserId } from '../decorators/userId.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() createOrder: CreateOrderDto,
    @Param('cartId') cartId: number,
    @UserId() userId: number,
  ) {
    return this.orderService.createOrderService(createOrder, userId);
  }
}
