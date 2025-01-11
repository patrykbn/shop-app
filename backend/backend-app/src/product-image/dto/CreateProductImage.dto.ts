import { IsUUID, IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateProductImageDto {
  @IsUUID()
  productId: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
