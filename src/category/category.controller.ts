import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorators';
import { UserType } from '../user/enum/userType.unum';
import { ReturnCategory } from './dto/returnCategory.dto';
import { CategoryEntity } from './entities/category.entity';
import { createCategoryDto } from './dto/createCastegory.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return (await this.categoryService.findAllCategoriesService()).map(
      (category) => new ReturnCategory(category),
    );
  }

  @Roles(UserType.User)
  @Post()
  async createCategory(
    @Body() createCategory: createCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoryService.createCategoryService(createCategory);
  }
}
