import { paymentPixMock } from '../../payment/__mocks__/payment-pix.mock';
import { addressMock } from '../../address/__mocks__/address.mock';

import { paymentCreditCardMock } from '../../payment/__mocks__/payment-credit-card.mock';
import { CreateOrderDto } from '../dto/createOrder.dto';

export const createOrderPixMock: CreateOrderDto = {
  addressId: addressMock.id,
  codePix: paymentPixMock.code,
  datePayment: '2020-01-01',
};

export const createOrderCreditCardMock: CreateOrderDto = {
  addressId: addressMock.id,
  amountPayments: paymentCreditCardMock.amountPayments,
};