import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorsService } from '../service/authors.service';
import { CreateAuthorDto } from '../dto/create.author.dto';
import { UpdateAuthorDTO } from '../dto/update.author.dto';

// TODO взяты вместо привычных req res встроенные декораторы (для лучшей валидации)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}
  @Get('/getAll')
  getAllWithBooks() {
    const authors = this.authorsService.getAuthorsWithBooks();
    if (authors === null) {
      throw new NotFoundException('Not Found');
    }
    return authors;
  }
  @Get(':id')
  async getById(@Param('id') id: number) {
    const one = await this.authorsService.getAuthorsByID(id);
    if (!one) throw new NotFoundException('Not Found');
    return one;
  }
  @Post('create')
  create(@Body() createAuthorDto: CreateAuthorDto) {
    try {
      return this.authorsService.createAuthor(createAuthorDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body('author') updateDTO: UpdateAuthorDTO) {
    try {
      return this.authorsService.updateAuthor(id, updateDTO);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.authorsService.deleteAuthor(id);
    return 'deleted!';
  }
}
