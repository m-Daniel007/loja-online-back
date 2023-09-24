import { UpdateCartDto } from "../../cart/dto/updateCart.dto";
import { productMock } from "../../product/mocks/product.mock";


export const updateCartMock: UpdateCartDto = {
  amount: 54638,
  productId: productMock.id,
};