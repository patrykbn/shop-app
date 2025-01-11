import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { ProductCategory } from '@prisma/client';

@Injectable()
export class ProductCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  public createCategory(
    categoryData: Omit<ProductCategory, 'id'>,
  ): Promise<ProductCategory> {
    return this.prisma.productCategory.create({
      data: categoryData,
    });
  }

  public getAllCategories(): Promise<ProductCategory[]> {
    return this.prisma.productCategory.findMany({
      include: {
        products: true,
      },
    });
  }

  public getCategoryById(
    id: ProductCategory['id'],
  ): Promise<ProductCategory | null> {
    return this.prisma.productCategory.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  public updateCategoryById(
    id: ProductCategory['id'],
    categoryData: Omit<ProductCategory, 'id'>,
  ): Promise<ProductCategory> {
    return this.prisma.productCategory.update({
      where: { id },
      data: categoryData,
    });
  }

  public deleteCategoryById(
    id: ProductCategory['id'],
  ): Promise<ProductCategory> {
    return this.prisma.productCategory.delete({
      where: { id },
    });
  }
}
