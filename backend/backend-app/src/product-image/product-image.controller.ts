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
import { ProductImagesService } from './product-image.service';
import { CreateProductImageDto } from './dto/CreateProductImage.dto';
import { UpdateProductImageDto } from './dto/UpdateProductImage.dto';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Get('/')
  public async getAllProductImages(): Promise<any> {
    return await this.productImagesService.getAllProductImages();
  }

  @Get('/:id')
  public async getProductImageById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const image = await this.productImagesService.getProductImageById(id);
    if (!image) throw new NotFoundException('Product Image not found...');
    return image;
  }

  @Post('/')
  public async createProductImage(@Body() imageData: CreateProductImageDto) {
    return await this.productImagesService.createProductImage(imageData);
  }

  @Put('/:id')
  public async updateProductImageById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() imageData: UpdateProductImageDto,
  ) {
    if (!(await this.productImagesService.getProductImageById(id)))
      throw new NotFoundException('Product Image not found...');

    await this.productImagesService.updateProductImageById(id, imageData);
    return { success: true };
  }

  @Delete('/:id')
  public async deleteProductImageById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!(await this.productImagesService.getProductImageById(id)))
      throw new NotFoundException('Product Image not found...');
    await this.productImagesService.deleteProductImageById(id);
    return { success: true };
  }
}
