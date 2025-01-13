import { IsString, IsUUID, IsUrl } from 'class-validator';

export class UpdateProductImageDto {
  @IsUUID()
  productId: string;

  @IsString()
  @IsUrl()
  imageUrl: string;
}
