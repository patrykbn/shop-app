import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { ProductImage } from '@prisma/client';

@Injectable()
export class ProductImagesService {
  constructor(private readonly prisma: PrismaService) {}

  public async createProductImage(
    imageData: Omit<ProductImage, 'id'>,
  ): Promise<ProductImage> {
    return this.prisma.productImage.create({
      data: imageData,
    });
  }

  public async getAllProductImages(): Promise<ProductImage[]> {
    return this.prisma.productImage.findMany({
      include: { product: true },
    });
  }

  public async getProductImageById(
    id: ProductImage['id'],
  ): Promise<ProductImage | null> {
    return this.prisma.productImage.findUnique({
      where: { id },
      include: { product: true },
    });
  }

  public async deleteProductImageById(
    id: ProductImage['id'],
  ): Promise<ProductImage> {
    return this.prisma.productImage.delete({
      where: { id },
    });
  }

  public async updateProductImageById(
    id: ProductImage['id'],
    imageData: Partial<ProductImage>,
  ): Promise<ProductImage> {
    return this.prisma.productImage.update({
      where: { id },
      data: imageData,
    });
  }
}
