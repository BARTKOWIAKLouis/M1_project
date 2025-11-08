import { Body, Controller, Get, Post, Delete, Patch, Query, Param} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, GetAuthorsDto, UpdateAuthorDto } from './author.dto';
import { AuthorModel, GetAuthorsModel } from './author.model';
import { BookModel } from '../books/book.model';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAllAuthors(@Query() input: GetAuthorsDto): Promise<GetAuthorsModel> {
    const [property, direction] = input.sort ? input.sort.split(',') : ['title', 'ASC'];

    const [authorsWithBooks, totalCount]= await this.authorService.getAllAuthors({...input, sort:{[property]: direction}});
    
    return{
      data:authorsWithBooks,
      totalCount
    }
  }

  @Get(':id')
  async getAuthorInfo(@Param("id") id:string): Promise<{data: {author: AuthorModel, writtenBooks: BookModel[], totalCount: number, averageSales: number}| undefined}>{
    const authorInfo = await this.authorService.getAuthorInfo(id);

    if(!authorInfo){
      return {data: undefined};
    }

    const [author, writtenBooks, totalCount, averageSales] = authorInfo;
    return {data: {author, writtenBooks, totalCount, averageSales}};
  }

  @Post()
  createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Patch(':id')
  updateAuthor(@Param('id') id:string, @Body() updateAuthorDto: UpdateAuthorDto){
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }

  @Delete(':id')
  deleteAuthor(@Param('id') id:string){
    return this.authorService.deleteAuthor(id);
  }
}
