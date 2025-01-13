import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  public createProduct(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> &
      Partial<{ options: Record<string, any> }>,
  ): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
        options: productData.options || {},
      },
    });
  }

  public getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: { images: true },
    });
  }

  public getProductById(id: Product['id']): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });
  }

  public deleteProductById(id: Product['id']): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  public updateProductById(
    id: Product['id'],
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> &
      Partial<{ options: Record<string, any> }>,
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        updatedAt: new Date(),
        options: productData.options || {},
      },
    });
  }
}
