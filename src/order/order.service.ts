import { UserId } from './../decorators/userId.decorator';
import { PaymentService } from './../payment/payment.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';
import { ProductService } from '../product/product.service';
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { OrderProductEntity } from '../order-product/entities/orderProduct.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
    private readonly productService: ProductService,
  ) {}

  async saveOrder(
    createOrder: CreateOrderDto,
    payment: PaymentEntity,
    userId: number,
  ): Promise<OrderEntity> {
    return this.orderRepository.save({
      addressId: createOrder.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });
  }

  async createOrderProductUsingCart(
    cart: CartEntity,
    orderId: number,
    products: ProductEntity[],
  ): Promise<OrderProductEntity[]> {
    return Promise.all(
      cart.cartProduct?.map((cartProduct) =>
        this.orderProductService.createOrderProductService(
          cartProduct.productId,
          orderId,
          products.find((product) => product.id === cartProduct.productId)
            ?.price || 0,
          cartProduct.amount,
        ),
      ),
    );
  }
  async createOrderService(
    createOrder: CreateOrderDto,
    userId: number,
  ): Promise<OrderEntity> {
    const cart = await this.cartService.findCartByUserId(userId, true);
    const products = await this.productService.findAllProductService(
      cart.cartProduct?.map((cartProduct) => cartProduct.productId),
    );

    const payment: PaymentEntity =
      await this.paymentService.createPaymentService(
        createOrder,
        products,
        cart,
      );

    const order = await this.saveOrder(createOrder, payment, userId);

    await this.createOrderProductUsingCart(cart, order.id, products);

    await this.cartService.clearCartService(userId);

    return order;
  }

  async findOrdersByUserId(userId: number): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      where: {
        userId,
      },
      relations: {
        address: true,
        ordersProduct: {
          product: true,
        },
        payment: {
          paymentStatus: true,
        },
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException('Orders not found');
    }

    return orders;
  }

  async findAllOrdersService(): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      relations: {
        user: true,
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException('Orders not found');
    }
    return orders;
  }
}
