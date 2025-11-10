import { Injectable } from "@nestjs/common";
import { SalesRepository } from "./sales.repository";

@Injectable()
export class SalesService {
    constructor(private readonly salesRepository :SalesRepository) {}

    public async createSale(saleData: {bookId: string, clientId: string, saleDate: Date}): Promise<void> {
        await this.salesRepository.createSale(saleData);
    }
}