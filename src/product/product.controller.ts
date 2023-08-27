import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ReturnProductDto } from './dto/returnProduct.dto';
import { Roles } from 'decorators/roles.decorators';
import { UserType } from 'user/enum/userType.unum';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult } from 'typeorm';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserType.Admin)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDTO,
  ): Promise<ProductEntity> {
    return this.productService.createProductService(createProduct);
  }

  @Get()
  async findAll(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAllProductService()).map(
      (product) => new ReturnProductDto(product),
    );
  }

  @Roles(UserType.Admin)
  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: number,
  ): Promise<DeleteResult> {
    return  this.productService.deleteProductService(productId);
  }
}
