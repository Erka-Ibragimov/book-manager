import { Injectable } from '@nestjs/common';
import { IAuth } from 'src/common/auth.decorator';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookNotFound } from '../errors';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  async getAll(auth: IAuth) {
    return await this.prismaService.book.findMany({
      where: {
        userId: auth.id,
      },
    });
  }

  async getOne(auth: IAuth, id: string) {
    return await this.prismaService.book.findUnique({
      where: {
        id,
        userId: auth.id,
      },
    });
  }

  async create(auth: IAuth, data: CreateBookDto) {
    return await this.prismaService.book.create({
      data: {
        title: data.title,
        description: data.description,
        author: data.author,
        userId: auth.id,
        categoryId: data.categoryId,
        tags: {
          create: data.tagIds.map((tagId) => ({
            tag: {
              connect: { id: tagId },
            },
          })),
        },
      },
    });
  }

  async update(auth: IAuth, data: UpdateBookDto, id: string) {
    const isExistBook = await this.prismaService.book.findUnique({
      where: {
        id,
        userId: auth.id,
      },
    });

    if (!isExistBook) throw new BookNotFound();

    await this.prismaService.bookTag.deleteMany({
      where: {
        bookId: isExistBook.id,
      },
    });

    await this.prismaService.book.update({
      where: {
        id: isExistBook.id,
      },
      data: {
        title: data?.title,
        description: data?.description,
        author: data?.author,
        categoryId: data?.categoryId,
        tags: {
          create:
            data?.tagIds?.length &&
            data?.tagIds.map((tagId) => ({
              tag: {
                connect: { id: tagId },
              },
            })),
        },
      },
    });

    return true;
  }

  async delete(auth: IAuth, id: string) {
    const isExistBook = await this.prismaService.book.findUnique({
      where: {
        id,
        userId: auth.id,
      },
    });

    if (!isExistBook) throw new BookNotFound();

    await this.prismaService.bookTag.deleteMany({
      where: { bookId: isExistBook.id },
    });

    await this.prismaService.book.delete({ where: { id: isExistBook.id } });

    return true;
  }
}
