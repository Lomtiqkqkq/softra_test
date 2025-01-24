import { Module } from '@nestjs/common';
import { PgModule } from './db/pg.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [PgModule, AuthorsModule, BooksModule],
})
export class AppModule {}
