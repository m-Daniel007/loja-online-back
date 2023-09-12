import { CartProdutEntity } from "cart-product/entites/cartProduct.entity";
import { ReturnCartDto } from "../../cart/dto/returnCart.dto";
import { ReturnProductDto } from "../../product/dto/returnProduct.dto";

export class ReturnCartProductDto {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ReturnProductDto;
  cart?: ReturnCartDto;

  constructor(cartProduct: CartProdutEntity) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ReturnProductDto(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart
      ? new ReturnCartDto(cartProduct.cart)
      : undefined;
  }
}