import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author.controller';
import { AuthorEntity } from './author.entity';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';
import { BookRepository } from '../books/book.repository';
import { BookEntity } from '../books/entities/book.entity';
import { SalesRepository } from '../sales/sales.repository';
import { SaleEntity } from '../sales/sales.entity';
import { ClientEntity } from '../clients/clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity, BookEntity, SaleEntity, ClientEntity])],
  controllers: [AuthorController],
  providers: [AuthorRepository, AuthorService, BookRepository, SalesRepository],
})
export class AuthorModule {}
