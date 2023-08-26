import { CreateProductDTO } from '../../product/dto/createProduct.dto';
import { categoryMock } from '../../category/__mocks__/category.mock';


export const createProductMock: CreateProductDTO = {
  categoryId: categoryMock.id,
  image: 'lkfdjsafkldsa',
  name: 'name mock product',
  price: 25.00,
};