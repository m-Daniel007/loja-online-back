import { CreateOrderDto } from './../order/dto/createOrder.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentCreditCardEntity } from './entities/paymentCreditCard.entity ';
import { PaymentType } from '../payment-status/enum/paymentType.enum';
import { PaymentPixEntity } from './entities/paymentPix.entity ';
import { ProductEntity } from '../product/entities/product.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { CartProductEntity } from '../cart-product/entities/cartProduct.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  generateFinalPrice(cart: CartEntity, products: ProductEntity[]) {
    if (!cart.cartProduct || cart.cartProduct.length === 0) {
      return 0;
    }

    return cart.cartProduct
      .map((cartProduct: CartProductEntity) => {
        const product = products.find(
          (product) => product.id === cartProduct.productId,
        );
        if (product) {
          return cartProduct.amount * product.price;
        }

        return 0;
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  async createPaymentService(
    createOrder: CreateOrderDto,
    products: ProductEntity[],
    cart: CartEntity,
  ): Promise<PaymentEntity> {
    const finalPrice = this.generateFinalPrice(cart, products);

    if (createOrder.amountPayments) {
      const paymentCreditCard = new PaymentCreditCardEntity(
        PaymentType.Done,
        finalPrice,
        0,
        finalPrice,
        createOrder,
      );
      return this.paymentRepository.save(paymentCreditCard);
    } else if (createOrder.codePix && createOrder.datePayment) {
      const paymentPix = new PaymentPixEntity(
        PaymentType.Done,
        finalPrice,
        0,
        finalPrice,
        createOrder,
      );
      return this.paymentRepository.save(paymentPix);
    }
    throw new BadRequestException(
      'Amount Payments or code pix or date payment not found',
    );
  }
}
