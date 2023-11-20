import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDTO } from './dto/createProduct.dto';
import { CategoryService } from '../category/category.service';
import { updateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async createProductService(
    createProduct: CreateProductDTO,
  ): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId);
    return this.productRepository.save({
      ...createProduct,
    });
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException(`ProductId ${productId} not found!`);
    }
    return product;
  }

  async findAllProductService(productId?: number[]): Promise<ProductEntity[]> {
    let findOptions = {};

    if (productId && productId.length > 0) {
      findOptions = {
        where: {
          id: In(productId),
        },
      };
    }

    const products = await this.productRepository.find(findOptions);

    if (!products || products.length === 0) {
      throw new NotFoundException('Not found products');
    }

    return products;
  }

  async deleteProductService(productId: number): Promise<DeleteResult> {
    await this.findProductById(productId);
    return await this.productRepository.delete({ id: productId });
  }

  async updateProductService(
    updateProduct: updateProductDto,
    productId: number,
  ): Promise<ProductEntity> {
    const product = await this.findProductById(productId);
    return await this.productRepository.save({
      ...product,
      ...updateProduct,
    });
  }
}
