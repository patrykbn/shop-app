import { IsString, IsInt } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsInt()
  phoneNr: number;
}
