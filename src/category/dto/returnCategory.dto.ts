import { ReturnProductDto } from '../../product/dto/returnProduct.dto';
import { CategoryEntity } from '../entities/category.entity';

export class ReturnCategoryDto {
  id: number;
  name: string;
  products?: ReturnProductDto[];
  amountProducts?: number;

  constructor(categoryEntity: CategoryEntity, amountProducts?: number) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
    this.amountProducts = amountProducts;
  }
}
