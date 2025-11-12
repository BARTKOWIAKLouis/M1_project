import{Body, Controller, Delete, Get, Param, Patch, Post, Query,} from "@nestjs/common";
import { CreateClientDto, UpdateClientDto, GetClientDto} from "./client.dto";
import { ClientModel, GetClientModel } from "./client.model";
import { ClientService } from "./client.service";
import { BookModel } from "../books/book.model";

@Controller("clients")
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Get()
    async getAllClients(@Query() input:GetClientDto): Promise<GetClientModel> {
        const [property, direction] = input.sort? input.sort.split(',') : ['firstName', 'ASC'];

        const [clientsWithPurchase, totalCount] = await this.clientService.getAllClients({...input, sort :{[property]: direction,}});

        return {
            data: clientsWithPurchase,
            totalCount,
        };
    }

    @Get(":id")
    async getClientInfo(@Param("id") id:string): Promise<{data :{client: ClientModel, purchasedBooks: BookModel[], number} | undefined}> {
        const clientInfo = await this.clientService.GetClientInfo(id);
        if (!clientInfo) {
            return {data: undefined};
        }
        const [client, purchasedBooks, number] = clientInfo;
        return {data: {client, purchasedBooks, number}};

    }

    @Post()
    createClient(@Body() createClientDto: CreateClientDto) {
        return this.clientService.createClient(createClientDto);
    }

    @Patch(':id')
    updateBook(@Param('id') id:string, @Body() updateClientDto: UpdateClientDto){
        return this.clientService.updateClient(id,updateClientDto)
    }

    @Delete(':id')
    deleteClient(@Param('id') id:string){
        return this.clientService.deleteClient(id);
    }
}