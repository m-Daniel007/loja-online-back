import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProdutEntity } from './entites/cartProduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProdutEntity])],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
