import { CartProductEntity } from "../../cart-product/entities/cartProduct.entity";
import { cartMock } from "../../cart/__mocks__/cart.mocks";
import { productMock } from "../../product/mocks/product.mock";


export const cartProductMock: CartProductEntity = {
  amount: 5435,
  cartId: cartMock.id,
  createdAt: new Date(),
  id: 234,
  productId: productMock.id,
  updatedAt: new Date(),
};