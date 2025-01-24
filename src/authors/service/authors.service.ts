import { Inject, Injectable } from '@nestjs/common';
import { AuthorEntity } from '../repository/author.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateAuthorDto } from '../dto/create.author.dto';
import { UpdateAuthorDTO } from '../dto/update.author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @Inject('AUTHORS_REPOSITORY')
    private readonly authorsRepo: Repository<AuthorEntity>,
  ) {}
  async getAuthorsWithBooks(): Promise<AuthorEntity[] | null> {
    const author = await this.authorsRepo.find({
      relations: { books: true },
    });
    if (!author) {
      return null;
    }
    return author;
  }
  async getAuthorsByID(id: number): Promise<AuthorEntity | null> {
    const author = await this.authorsRepo.findOne({ where: { id } });
    if (!author) {
      return null;
    }
    return author;
  }
  async createAuthor(
    createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorEntity | null> {
    const candidate = await this.authorsRepo.findOneBy({
      firstName: createAuthorDto.firstName,
      lastName: createAuthorDto.lastName,
    });
    if (candidate) {
      throw new Error('author already exists');
    }
    return this.authorsRepo.create(createAuthorDto);
  }
  async updateAuthor(
    id: number,
    updateAuthorDto: UpdateAuthorDTO,
  ): Promise<UpdateResult> {
    return this.authorsRepo.update(id, updateAuthorDto);
  }
  async deleteAuthor(id: number): Promise<void> {
    await this.authorsRepo.delete(id);
  }
}
