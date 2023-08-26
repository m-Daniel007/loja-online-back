import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryModule } from 'category/category.module';

@Module({})
@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]),CategoryModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}