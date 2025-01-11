import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-category.service';
import { ProductCategoriesController } from './product-category.controller';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  providers: [ProductCategoriesService, PrismaService],
  controllers: [ProductCategoriesController],
})
export class ProductCategoryModule {}
