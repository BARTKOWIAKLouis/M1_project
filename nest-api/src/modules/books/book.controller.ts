import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBookDto, GetBooksDto, UpdateBookDto } from './book.dto';
import { BookModel, GetBooksModel } from './book.model';
import { BookService } from './book.service';
import { ClientModel } from '../clients/client.model';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(@Query() input: GetBooksDto): Promise<GetBooksModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['title', 'ASC']; //If input not defined, default sort value is by title in Ascendant order

    const [booksWithSales, totalCount] = await this.bookService.getAllBooks({
      ...input,
      sort: {
        [property]: direction,
      },
    });

    return {
      data: booksWithSales,
      totalCount,
    };
  }

  @Get(':id')
  public async getBook(
    @Param('id') id: string,
  ): Promise<{
    data: { book: BookModel; clients: ClientModel[]; number } | undefined;
  }> {
    const bookInfo = await this.bookService.getBookInfo(id);
    if (!bookInfo) {
      return { data: undefined };
    }
    const [book, clients, number] = bookInfo;
    return { data: { book, clients, number } };
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
