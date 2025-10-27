import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {CreateSaleModel, SaleModel} from "./sales.model";
import { Repository } from "typeorm";
import { SaleEntity } from "./sales.entity";
import { BookEntity, BookId } from "../books/entities/book.entity";
import { ClientEntity, ClientId } from "../clients/clients.entity";

@Injectable()
export class SalesRepository {
    constructor(
        @InjectRepository(SaleEntity)
        private readonly saleRepository: Repository<SaleEntity>,
        private readonly bookrepository: Repository<BookEntity>,
        private readonly clientrepository: Repository<ClientEntity>,
    ) {}

    public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
        const book = await this.bookrepository.findOne({
            where: { id: sale.bookId as BookId },
        });

        if(!book){
            throw new Error('Book not found');
        }

        const client =  await this.clientrepository.findOne({
            where: { id: sale.clientId as ClientId},
        });
        if(!client){
            throw new Error('Client not found');
        }

        return this.saleRepository.save(this.saleRepository.create(sale));
    }

    
}