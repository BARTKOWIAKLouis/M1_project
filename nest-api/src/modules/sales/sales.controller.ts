import { Body, Controller, Post } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './sales.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSale(createSaleDto);
  }
}
