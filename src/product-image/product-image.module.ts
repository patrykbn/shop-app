import { Module } from '@nestjs/common';
import { ProductImagesService } from './product-image.service';
import { ProductImagesController } from './product-image.controller';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  providers: [ProductImagesService, PrismaService],
  controllers: [ProductImagesController],
})
export class ProductImageModule {}
