import { IsUUID, IsInt, Min, Max, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID()
  orderId: string;

  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  @Max(10)
  quantity: number;

  @IsInt()
  basePrice: number;

  @IsInt()
  totalPrice: number;

  @IsString()
  productOption: string;

  @IsString()
  comment: string;
}
