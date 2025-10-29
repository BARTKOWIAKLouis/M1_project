import { Injectable } from "@nestjs/common";
import{ ClientModel, CreateClientModel, UpdateClientModel } from "./client.model";

import { ClientRepository } from "./client.repository";
import { SalesRepository } from "../sales/sales.repository";

@Injectable()
export class ClientService {
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly salesRepository: SalesRepository,
    ) {}

    public async getAllClients(): Promise<[{client : ClientModel, purchaseCount : number}[],number]>{ //Possibility to add pagination later
        // Get all clients and its associated purchase counts

        const [clients, totalCount] = await this.clientRepository.getAllClients();
        //Map through each client to get their purchase count
        const clientsWithPurchaseCounts = await Promise.all(
            clients.map(async (client)=>{
                const [ , purchaseCount] = await this.salesRepository.getClientPurchases(client.id);
                return { client, purchaseCount };
            }),
        );

        return [clientsWithPurchaseCounts, totalCount];

    }

    public async createClient(client: CreateClientModel): Promise<ClientModel> {
        return this.clientRepository.createClient(client);
    }

    public async updateClient(id: string, client: UpdateClientModel,): Promise<ClientModel | undefined>{
        const oldclient = await this.clientRepository.updateClient(id, client);
        if (!oldclient) {
            return undefined;
        }
        
        return this.clientRepository.updateClient(id, client);
    }
}