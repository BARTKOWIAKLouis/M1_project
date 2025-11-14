import { IsDate, IsString } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  clientId: string;

  @IsString()
  bookId: string;

  @IsDate()
  saleDate: Date;
}
