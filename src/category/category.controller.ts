import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorators';
import { UserType } from '../user/enum/userType.unum';
import { ReturnCategory } from './dto/returnCategory.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return (await this.categoryService.findAllCategories()).map(
      (category) => new ReturnCategory(category),
    );
  }
}
