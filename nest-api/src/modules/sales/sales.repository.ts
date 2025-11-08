import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {CreateSaleModel, SaleModel} from "./sales.model";
import { Repository } from "typeorm";
import { SaleEntity } from "./sales.entity";
import { BookEntity, BookId} from "../books/entities/book.entity";
import { ClientEntity, ClientId } from "../clients/clients.entity";
import { BookModel } from "../books/book.model";
import { ClientModel } from "../clients/client.model";

@Injectable()
export class SalesRepository {
    constructor(
        @InjectRepository(SaleEntity)
        private readonly saleRepository: Repository<SaleEntity>,
        @InjectRepository(BookEntity)
        private readonly bookrepository: Repository<BookEntity>,
        @InjectRepository(ClientEntity)
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
    
    public async getClientPurchases(id: string): Promise<[BookModel[], number]>{
        // Get all sales from the sales repository where clientId matches the given id
        const [sales, totalCount] = await this.saleRepository.findAndCount({
            where: { clientId: id as ClientId },
            relations: { book: true },
        });
        // Extract the books from the sales
        const books = sales.map((sale) => sale.book);
        return ( [books, totalCount] );
    }
    
    public async getBookSales(id: string): Promise<[ClientModel[],number]>{
        const [sales, totalCount] = await this.saleRepository.findAndCount({
            where: { bookId: id as BookId },
            relations: { client: true },
        });
        // Extract the clients from the sales
        const clients = sales.map((sale) => sale.client);
        return ( [clients, totalCount] );
    }

    public async getAuthorAverageSales(books: BookModel[]): Promise<number>{
        let totalSales = 0;
        for (const book of books){
            const [ , bookSalesCount ] = await this.getBookSales(book.id);
            totalSales += bookSalesCount;
        }
        return books.length ? totalSales / books.length : 0;
    }
}