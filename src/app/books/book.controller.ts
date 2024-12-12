import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { AuthGuard } from '../auth/auth.guard';
import { Auth, IAuth } from 'src/common/auth.decorator';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookNotFound } from '../errors';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  BookNotFoundResponse,
  BookResponse,
} from 'src/api-response/book-response';
import { ForbiddenResponse } from 'src/api-response/common-response';

@ApiBearerAuth()
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @ApiResponse({
    status: 200,
    type: BookResponse,
    isArray: true,
  })
  @ApiResponse({ status: 401, type: ForbiddenResponse })
  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Auth() auth: IAuth) {
    try {
      return this.bookService.getAll(auth);
    } catch {
      throw new HttpException('Server error', 500);
    }
  }

  @ApiResponse({
    status: 200,
    type: BookResponse,
  })
  @ApiResponse({ status: 401, type: ForbiddenResponse })
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getOne(@Auth() auth: IAuth, @Param('id') id: string) {
    try {
      return this.bookService.getOne(auth, id);
    } catch {
      throw new HttpException('Server error', 500);
    }
  }

  @ApiResponse({
    status: 201,
    type: BookResponse,
  })
  @ApiResponse({ status: 401, type: ForbiddenResponse })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Auth() auth: IAuth, @Body() data: CreateBookDto) {
    try {
      return this.bookService.create(auth, data);
    } catch {
      throw new HttpException('Server error', 500);
    }
  }

  @ApiResponse({
    status: 200,
    example: true,
  })
  @ApiResponse({ status: 401, type: ForbiddenResponse })
  @ApiResponse({ status: 404, type: BookNotFoundResponse })
  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(
    @Auth() auth: IAuth,
    @Body() data: UpdateBookDto,
    @Param('id') id: string,
  ) {
    try {
      return this.bookService.update(auth, data, id);
    } catch (error: unknown) {
      if (error instanceof BookNotFound) {
        throw new HttpException('Book not found', 404);
      } else {
        throw new HttpException('Server error', 500);
      }
    }
  }

  @ApiResponse({
    status: 200,
    example: true,
  })
  @ApiResponse({ status: 401, type: ForbiddenResponse })
  @ApiResponse({ status: 404, type: BookNotFoundResponse })
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Auth() auth: IAuth, @Param('id') id: string) {
    try {
      return this.bookService.delete(auth, id);
    } catch (error: unknown) {
      if (error instanceof BookNotFound) {
        throw new HttpException('Book not found', 404);
      } else {
        throw new HttpException('Server error', 500);
      }
    }
  }
}
