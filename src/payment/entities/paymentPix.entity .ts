import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import { CreateOrderDto } from '../../order/dto/createOrder.dto';

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
  @Column({ name: 'code', nullable: false })
  code: string;

  @Column({ name: 'date_payment', nullable: false })
  datePayment: Date;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrder: CreateOrderDto,
  ) {
    super(statusId, price, discount, finalPrice);
    this.code = createOrder?.codePix || '';
    this.datePayment = new Date(createOrder?.datePayment || '')
  }
}
