import { Module } from '@nestjs/common';
import { pgProviders } from './pg.providers';

@Module({
  providers: [...pgProviders],
  exports: [...pgProviders],
})
export class PgModule {}
