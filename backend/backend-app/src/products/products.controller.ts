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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
    this.productsService = productsService;
  }

  @Get('/')
  public async getAllProducts(): Promise<any> {
    return await this.productsService.getAllProducts();
  }

  @Get('/:id')
  public async getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getProductById(id);
    if (!prod) throw new NotFoundException('Product not found...');
    return prod;
  }

  @Post('/')
  public async createProduct(@Body() productData: CreateProductDto) {
    return await this.productsService.createProduct(productData);
  }

  @Put('/:id')
  public async updateProductById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDto,
  ) {
    if (!(await this.productsService.getProductById(id)))
      throw new NotFoundException('Product not found...');

    await this.productsService.updateProductById(id, productData);
    return { success: true };
  }

  @Delete('/:id')
  public async deleteProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getProductById(id)))
      throw new NotFoundException('Product not found...');
    await this.productsService.deleteProductById(id);
    return { success: true };
  }
}
