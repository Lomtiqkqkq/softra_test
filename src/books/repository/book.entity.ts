import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AuthorEntity} from '../../authors/repository/author.entity';

@Entity({ name: 'books' })
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  genre: string;
  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;
}
