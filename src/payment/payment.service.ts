import { CreateOrderDto } from './../order/dto/createOrder.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentCreditCardEntity } from './entities/paymentCreditCard.entity ';
import { PaymentType } from '../payment-status/enum/paymentType.enum';
import { PaymentPixEntity } from './entities/paymentPix.entity ';
import { type } from 'os';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async createPaymentService(
    createOrder: CreateOrderDto,
  ): Promise<PaymentEntity> {
    if (createOrder.amountPayments) {
      const paymentCreditCard = new PaymentCreditCardEntity(
        PaymentType.Done,
        0,
        0,
        0,
        createOrder,
      );
      console.log(paymentCreditCard);
      return this.paymentRepository.save(paymentCreditCard)
    } else if (createOrder.codePix && createOrder.datePayment) {
      const paymentPix = new PaymentPixEntity(
        PaymentType.Done,
        0,
        0,
        0,
        createOrder,
      );
       return  this.paymentRepository.save(paymentPix);
    }
    throw new BadRequestException(
      'Amount Payments or code pix or date payment not found',
    );
  }
}
