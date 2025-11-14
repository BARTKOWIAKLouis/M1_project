import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sales.entity';
import { BookEntity } from '../books/entities/book.entity';
import { ClientEntity } from '../clients/clients.entity';
import { SalesRepository } from './sales.repository';
import { BookRepository } from '../books/book.repository';
import { ClientRepository } from '../clients/client.repository';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { AuthorEntity } from '../authors/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SaleEntity,
      BookEntity,
      ClientEntity,
      AuthorEntity,
    ]),
  ],
  controllers: [SalesController],
  providers: [SalesRepository, SalesService, BookRepository, ClientRepository],
})
export class SalesModule {}
