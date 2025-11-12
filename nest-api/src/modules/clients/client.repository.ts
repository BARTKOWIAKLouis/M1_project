import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ClientEntity, ClientId } from "./clients.entity";
import { ClientModel, UpdateClientModel, CreateClientModel, FilterClientModel} from "./client.model";
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

    public async getAllClients(input?: FilterClientModel): Promise<[ClientModel[], number]> {
        return this.clientRepository.findAndCount({take: input?.limit, skip: input?.offset, order: input?.sort});
    }

    public async createClient(client: CreateClientModel): Promise<ClientModel> {
        console.log("Creating client:", client);
        return this.clientRepository.save(this.clientRepository.create(client));

    }

    public async findClient(id: string) : Promise<ClientModel | undefined> {
        const client = await this.clientRepository.findOne({where: {id: id as ClientId},});

        if (!client) {
            return undefined;
        }

        return client;
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