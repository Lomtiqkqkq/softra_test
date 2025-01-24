import { Inject, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { BookEntity } from '../repository/book.entity';
import { CreateBookDto } from '../dto/create.book.dto';
import { UpdateBookDto } from '../dto/update.book.dto';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY')
    private readonly booksRepo: Repository<BookEntity>,
  ) {}
  async getAllBooks(): Promise<BookEntity[]> {
    return this.booksRepo.find({ relations: { author: true } });
  }
  async getBookById(id: number): Promise<BookEntity | null> {
    const book = await this.booksRepo.findOneBy({ id });
    if (!book) {
      return null;
    }
    return book;
  }
  async createBook(bookDto: CreateBookDto): Promise<BookEntity> {
    const book = await this.booksRepo.findOne({
      where: { title: bookDto.title, author: bookDto.author },
    });
    if (book) {
      throw new Error('Book already exists');
    }
    const newBook = this.booksRepo.create(bookDto);
    await this.booksRepo.save(newBook);
    return newBook;
  }
  async updateBook(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    return await this.booksRepo.update(id, updateBookDto);
  }
  async deleteBook(id: number): Promise<void> {
    await this.booksRepo.delete(id);
  }
}
