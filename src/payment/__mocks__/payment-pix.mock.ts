
import { PaymentPixEntity } from '../entities/paymentPix.entity ';
import { paymentMock } from './payment.mock';

export const paymentPixMock: PaymentPixEntity = {
  ...paymentMock,
  code: 'fdsafdsa',
  datePayment: new Date(),
};