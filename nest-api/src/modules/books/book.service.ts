import { Injectable } from '@nestjs/common';
import {
  BookModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookRepository } from './book.repository';
import { SalesRepository } from '../sales/sales.repository';
import { ClientModel } from '../clients/client.model';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository, private readonly salesRepository: SalesRepository) {}

  public async getAllBooks(input?: FilterBooksModel,): Promise<[{Books : BookModel, Sales_count: number}[], number]> {
    const [books, totalCount] = await this.bookRepository.getAllBooks(input);
    //Map through each book to get their sales count
    const booksWithSalesCounts = await Promise.all(
      books.map(async (book) => {
        const [ , salesCount ] = await this.salesRepository.getBookSales(book.id);
        return {Books :book, Sales_count :salesCount};
      }),
    );
    return [booksWithSalesCounts, totalCount];
  }

  public async getBookInfo(id: string): Promise<[BookModel, ClientModel[], number ]| undefined> {
    const book = await this.bookRepository.findBook(id);

    if (!book) {
      return undefined;
    }

    const [purchasingClients, purchaseCount] = await this.salesRepository.getBookSales(id);

    return [book, purchasingClients, purchaseCount];
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    return this.bookRepository.createBook(book);
  }

  public async updateBook(
    id: string,
    book: UpdateBookModel,
  ): Promise<BookModel | undefined> {
    return this.bookRepository.updateBook(id, book);
  }

  public async deleteBook(id: string): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }
}
