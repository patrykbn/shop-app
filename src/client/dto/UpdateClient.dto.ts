import { IsString, IsInt } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsInt()
  phoneNr: number;
}
