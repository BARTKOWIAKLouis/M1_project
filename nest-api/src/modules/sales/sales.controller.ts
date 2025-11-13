import {Body, Controller, Post} from "@nestjs/common";
import { SalesService } from "./sales.service";
import { CreateSaleDto } from "./sales.dto";

@Controller("sales")
export class SalesController {
    constructor(private readonly salesService: SalesService) {}

    @Post()
    createSale(@Body() createSaleDto: CreateSaleDto) {
        console.log("Received sale creation request:", createSaleDto); // Debugging
        return this.salesService.createSale(createSaleDto);
    }
}

// 32e58ea2-5a7d-4e2f-934d-fd0f87b0c4e8
// d47933b4-3a68-4688-9357-3bc71318dee1