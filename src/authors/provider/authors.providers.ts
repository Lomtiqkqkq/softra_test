import { DataSource } from 'typeorm';
import { AuthorEntity } from '../repository/author.entity';

export const authorsProviders = [
  {
    provide: 'AUTHORS_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      dataSource.getRepository(AuthorEntity);
    },
    inject: ['DATA_SOURCE'],
  },
];
