import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProdutEntity } from './entites/cartProduct.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartProdutEntity]),ProductModule],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
