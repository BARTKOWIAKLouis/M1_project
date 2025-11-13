import { Injectable } from "@nestjs/common";
import{ ClientModel, CreateClientModel, FilterClientModel, UpdateClientModel } from "./client.model";
import { BookModel } from "../books/book.model";
import { ClientRepository } from "./client.repository";
import { SalesRepository } from "../sales/sales.repository";
import { BookRepository } from "../books/book.repository";

@Injectable()
export class ClientService {
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly salesRepository: SalesRepository,
        private readonly bookRepository: BookRepository,
    ) {}

    public async getAllClients(input?: FilterClientModel): Promise<[{client : ClientModel, purchaseCount : number}[],number]>{ //Possibility to add pagination later
        // Get all clients and its associated purchase counts

        const [clients, totalCount] = await this.clientRepository.getAllClients(input);
        //Map through each client to get their purchase count
        const clientsWithPurchaseCounts = await Promise.all(
            clients.map(async (client)=>{
                const [ , purchaseCount] = await this.salesRepository.getClientPurchases(client.id);
                return { client, purchaseCount };
            }),
        );

        return [clientsWithPurchaseCounts, totalCount];

    }

    public async GetClientInfo(id: string): Promise<[ClientModel, BookModel[] ,number] | undefined> {
        const client = await this.clientRepository.findClient(id);
        if (!client) {
            return undefined;
        }

        const [booksId, purchaseCount] = await this.salesRepository.getClientPurchases(id);
        if(booksId.length === 0){
            return [client, [], purchaseCount];
        }
        const purchasedBooks = await Promise.all(
            booksId.map(async (bookId) => {
                const book = await this.bookRepository.findBook(bookId);
                return book!;
            }),
        );
        return [client, purchasedBooks, purchaseCount];
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

    public async deleteClient(id: string): Promise<void> {
        await this.clientRepository.deleteClient(id);
    }
}