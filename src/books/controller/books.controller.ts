import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BooksService } from '../service/books.service';

import { CreateBookDto } from '../dto/create.book.dto';
import { UpdateBookDto } from '../dto/update.book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get('/')
  getAll() {
    try {
      return this.booksService.getAllBooks();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    const book = this.booksService.getBookById(id);
    if (book == null) {
      throw new NotFoundException('Not Found');
    }
    return book;
  }
  @Post('/create')
  create(@Body() createBookDto: CreateBookDto) {
    try {
      return this.booksService.createBook(createBookDto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    try {
      return this.booksService.updateBook(id, updateBookDto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.booksService.deleteBook(id);
      return 'deleted';
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
