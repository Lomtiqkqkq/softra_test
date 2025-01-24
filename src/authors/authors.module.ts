import { Module } from '@nestjs/common';
import { AuthorsService } from './service/authors.service';
import { AuthorsController } from './controller/authors.controller';
import { PgModule } from '../db/pg.module';
import { authorsProviders } from './provider/authors.providers';

@Module({
  providers: [AuthorsService, ...authorsProviders],
  controllers: [AuthorsController],
  imports: [PgModule],
})
export class AuthorsModule {}
