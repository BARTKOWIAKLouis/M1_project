import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ClientEntity, ClientId } from "./clients.entity";
import { ClientModel, UpdateClientModel } from "./client.model";
import { BookModel } from "../books/book.model";
import { SaleEntity } from "../sales/sales.entity";

@Injectable()
export class ClientRepository {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
        @InjectRepository(SaleEntity)
        private readonly saleRepository: Repository<SaleEntity>,
    ) {}

    public async getAllClients(): Promise<ClientModel[]> {
        return this.clientRepository.find();
    }

    public async createClient(client: ClientModel): Promise<ClientModel> {
        return this.clientRepository.save(this.clientRepository.create(client));
    }

    public async updateClient( id: string,client: UpdateClientModel,
    ): Promise<ClientModel | undefined>{
        const oldclient = await this.clientRepository.findOne({where: {id: id as ClientId},});
        if (!oldclient) {
            return undefined;
        }

        await this.clientRepository.update(id, client);
    } 

    public async deleteClient(id: string): Promise<void> {
        await this.clientRepository.delete(id as ClientId);
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
}