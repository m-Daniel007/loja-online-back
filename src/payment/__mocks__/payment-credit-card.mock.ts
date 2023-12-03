import { PaymentCreditCardEntity } from '../entities/paymentCreditCard.entity ';
import { paymentMock } from './payment.mock';


export const paymentCreditCardMock: PaymentCreditCardEntity = {
  ...paymentMock,
  amountPayments: 54,
};