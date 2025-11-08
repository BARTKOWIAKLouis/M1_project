import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel, FilterAuthorModel, GetAuthorsModel, UpdateAuthorModel} from './author.model';
import { AuthorRepository } from './author.repository';
import { SalesRepository } from '../sales/sales.repository';
import { BookRepository } from '../books/book.repository';
import { BookModel } from '../books/book.model';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository, private readonly bookRepository: BookRepository, private readonly saleRepository: SalesRepository) {}

  public async getAllAuthors(input: FilterAuthorModel): Promise<[{Authors: AuthorModel, Number_of_Books: number}[], number]> {
    const [authors, totalCount]= await this.authorRepository.getAllAuthors(input);
    const AuthorsWithBookNumber = await Promise.all(
          authors.map(async (author)=> {
      const [, booksCount] = await this.bookRepository.GetAuthorBooks(author.id);
      return {Authors: author, Number_of_Books: booksCount};
    }),
    );
    return [AuthorsWithBookNumber, totalCount];

  }

  public async getAuthorInfo(id: string): Promise<[AuthorModel, BookModel[], number, number] |undefined>{
    const author = await this.authorRepository.findAuthor(id);

    if(!author){
      return undefined
    }
    const [Books, TotalCount] = await this.bookRepository.GetAuthorBooks(id);

    const averageSales = await this.saleRepository.getAuthorAverageSales(Books);
    return [author, Books, TotalCount, averageSales]
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }

  public async updateAuthor(id: string, author: UpdateAuthorModel): Promise<AuthorModel | undefined>{
    return this.authorRepository.updateAuthor(id, author);
  }

  public async deleteAuthor(id: string): Promise<void> {
    return this.authorRepository.deleteAuthor(id);
  }

}
