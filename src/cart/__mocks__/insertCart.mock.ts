import { productMock } from "../../product/mocks/product.mock";
import { InsertCartDTO } from "../../cart/dto/insertCart.dto";


export const insertCartMock: InsertCartDTO = {
  amount: 535,
  productId: productMock.id,
};