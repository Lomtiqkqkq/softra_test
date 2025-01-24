import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from '../../books/repository/book.entity';
import { OneToMany } from 'typeorm/browser';

@Entity({ name: 'Author' })
export class AuthorEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @Column({ type: 'string', name: 'name', nullable: false })
  firstName: string;
  @Column({ type: 'string', name: 'name', nullable: false })
  lastName: string;
  @Column()
  age: number;
  @Column()
  photoUrl: string;
  @OneToMany(() => BookEntity, (book) => book.author) // не учитывается момент, когда у одной книги может быть несколько авторов (связь many to many)
  books: BookEntity[];
}
