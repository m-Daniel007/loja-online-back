import { UserId } from './../decorators/userId.decorator';
import { PaymentService } from './../payment/payment.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
  ) {}

  async createOrderService(createOrder: CreateOrderDto, cartId: number,userId: number) {
    const payment: PaymentEntity =
      await this.paymentService.createPaymentService(createOrder);

    const order = await this.orderRepository.save({
      addressId: createOrder.addressId,
      date: new Date(),
      paymentId:payment.id,
      userId,
    })

    const cart = await this.cartService.findCartByUserId(userId,true);
    cart.cartProduct?.forEach((cartProduct) => {
      this.orderProductService.createOrderProductService(
        cartProduct.productId,
        order.id,
        0,
        cartProduct.amount,
      );
    });

    return null;
  }
}
