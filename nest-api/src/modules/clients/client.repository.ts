import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ClientEntity, ClientId } from "./clients.entity";
import { ClientModel, UpdateClientModel, CreateClientModel } from "./client.model";
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

    public async getAllClients(): Promise<[ClientModel[], number]> {
        return this.clientRepository.findAndCount();
    }

    public async createClient(client: CreateClientModel): Promise<ClientModel> {
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
}