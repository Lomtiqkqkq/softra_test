import { DataSource } from 'typeorm';
import { BookEntity } from '../repository/book.entity';

export const booksProviders = [
  {
    provide: 'BOOKS_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      dataSource.getRepository(BookEntity);
    },
    inject: ['DATA_SOURCE'],
  },
];
