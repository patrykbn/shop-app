import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsArray,
  Min,
  IsOptional,
  IsObject,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? value : parsedValue;
  })
  @IsInt()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  imgMain: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  categoryId: string;

  @IsObject()
  @IsNotEmpty()
  options: Record<string, any>;
}
