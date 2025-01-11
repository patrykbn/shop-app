import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductCategoriesService } from './product-category.service';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { UpdateCategoryDto } from './dto/UpdateCategory.dto';

@Controller('categories')
export class ProductCategoriesController {
  constructor(private productCategoriesService: ProductCategoriesService) {}

  @Get('/')
  public async getAllCategories(): Promise<any> {
    return await this.productCategoriesService.getAllCategories();
  }

  @Get('/:id')
  public async getCategoryById(@Param('id', new ParseUUIDPipe()) id: string) {
    const category = await this.productCategoriesService.getCategoryById(id);
    if (!category) throw new NotFoundException('Category not found...');
    return category;
  }

  @Post('/')
  public async createCategory(@Body() categoryData: CreateCategoryDto) {
    return await this.productCategoriesService.createCategory(categoryData);
  }

  @Put('/:id')
  public async updateCategoryById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() categoryData: UpdateCategoryDto,
  ) {
    if (!(await this.productCategoriesService.getCategoryById(id)))
      throw new NotFoundException('Category not found...');
    await this.productCategoriesService.updateCategoryById(id, categoryData);
    return { success: true };
  }

  @Delete('/:id')
  public async deleteCategoryById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!(await this.productCategoriesService.getCategoryById(id)))
      throw new NotFoundException('Category not found...');
    await this.productCategoriesService.deleteCategoryById(id);
    return { success: true };
  }
}
