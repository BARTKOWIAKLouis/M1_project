import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "./clients.entity";
import { ClientRepository } from "./client.repository";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { SaleEntity } from "../sales/sales.entity";
import { SalesRepository } from "../sales/sales.repository";
import { BookEntity } from "../books/entities/book.entity";
import { BookRepository } from "../books/book.repository";
import { AuthorEntity } from "../authors/author.entity";


@Module({
    imports: [TypeOrmModule.forFeature([ClientEntity, SaleEntity, BookEntity, AuthorEntity])],
    providers: [ClientRepository, ClientService, SalesRepository, BookEntity, BookRepository],
    controllers: [ClientController]
})

export class ClientModule {}