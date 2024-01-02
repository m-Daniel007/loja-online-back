import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorators';
import { UserType } from '../user/enum/userType.unum';
import { CategoryEntity } from './entities/category.entity';
import { createCategoryDto } from './dto/createCastegory.dto';
import { ReturnCategoryDto } from './dto/returnCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserType.Admin)
  @Post()
  async createCategory(
    @Body() createCategory: createCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoryService.createCategoryService(createCategory);
  }

  @Get()
  async findAllCategories(): Promise<ReturnCategoryDto[]> {
    return this.categoryService.findAllCategoriesService();
  }
}
