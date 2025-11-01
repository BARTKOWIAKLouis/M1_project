import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "./clients.entity";
import { ClientRepository } from "./client.repository";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";


@Module({
    imports: [TypeOrmModule.forFeature([ClientEntity])],
    providers: [ClientRepository, ClientService],
    controllers: [ClientController]
})

export class ClientModule {}