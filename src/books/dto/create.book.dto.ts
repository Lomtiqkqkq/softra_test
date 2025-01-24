import { IsNotEmpty, IsString } from 'class-validator';
import { AuthorEntity } from '../../authors/repository/author.entity';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  genre: string;
  @IsNotEmpty()
  author: AuthorEntity;
}
