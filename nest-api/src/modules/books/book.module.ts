import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { AuthorEntity } from '../authors/author.entity';
import { SaleEntity } from '../sales/sales.entity';
import { SalesRepository } from '../sales/sales.repository';
import { ClientEntity } from '../clients/clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity, SaleEntity, ClientEntity])],
  controllers: [BookController],
  providers: [BookRepository, BookService, SalesRepository, ClientEntity],
})
export class BookModule {}
