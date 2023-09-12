import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProdutEntity } from './entites/cartProduct.entity';
import { Repository } from 'typeorm';
import { InsertCartDTO } from '../cart/dto/insertCart.dto';
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProdutEntity)
    private readonly cartProductRepository: Repository<CartProdutEntity>,
    private readonly productService: ProductService
  ) {}

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProdutEntity> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!cartProduct) {
      throw new NotFoundException('Product not found in cart');
    }

    return cartProduct;
  }

  async createProductInCartService(
    insertCart: InsertCartDTO,
    cartId: number,
  ): Promise<CartProdutEntity> {
    return this.cartProductRepository.save({
      amount: insertCart.amount,
      productId: insertCart.productId,
      cartId,
    });
  }

  async insertProductInCartService(
    insertCart: InsertCartDTO,
    cart: CartEntity,
  ): Promise<CartProdutEntity> {
    await this.productService.findProductById(insertCart.productId)
    const cartProduct = await this.verifyProductInCart(
      insertCart.productId,
      cart.id,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createProductInCartService(insertCart, cart.id);
    }

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + insertCart.amount,
    });
  }
}
