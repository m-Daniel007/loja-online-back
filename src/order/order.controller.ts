import { OrderService } from './order.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UserId } from '../decorators/userId.decorator';
import { OrderEntity } from './entities/order.entity';
import { UserType } from 'user/enum/userType.unum';
import { Roles } from '../decorators/roles.decorators';
import { ReturnOrderDto } from './dto/returnOrder.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() createOrder: CreateOrderDto,
    @Param('cartId') cartId: number,
    @UserId() userId: number,
  ): Promise<OrderEntity> {
    return this.orderService.createOrderService(createOrder, userId);
  }
  @Get()
  async findOrdersByUserId(@UserId() userId: number): Promise<OrderEntity[]> {
    return this.orderService.findOrdersByUserId(userId);
  }
  @Roles(UserType.Admin)
  @Get('/all')
  async findAllOrders(): Promise<ReturnOrderDto[]> {
    return (await this.orderService.findAllOrdersService()).map(
      (order) => new ReturnOrderDto(order),
    );
  }
}
