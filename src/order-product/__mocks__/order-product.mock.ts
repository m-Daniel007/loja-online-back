import { orderMock } from "../../order/__mocks__/order.mock";
import { productMock } from "../../product/mocks/product.mock";
import { OrderProductEntity } from "../entities/orderProduct.entity";

export const orderProductMock: OrderProductEntity = {
  amount: 543,
  createdAt: new Date(),
  id: 45543,
  orderId: orderMock.id,
  price: 543.4,
  productId: productMock.id,
  updatedAt: new Date(),
};