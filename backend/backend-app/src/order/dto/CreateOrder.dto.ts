import {
  IsInt,
  IsOptional,
  IsArray,
  IsUUID,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from 'src/order-items/dto/CreateOrderItem.dto';

export class CreateOrderDto {
  @IsUUID()
  clientId: string;

  @IsInt()
  totalPrice: number;

  @IsInt()
  totalItems: number;

  @IsString()
  comment: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsOptional()
  orderItems?: CreateOrderItemDto[];
}
