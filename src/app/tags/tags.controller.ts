import { Controller, Get, HttpException } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiResponse } from '@nestjs/swagger';
import { CategoryTagResponse } from 'src/api-response/category-tag-response';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @ApiResponse({ status: 200, type: CategoryTagResponse, isArray: true })
  @Get()
  async getAll() {
    try {
      return await this.tagsService.getAll();
    } catch {
      throw new HttpException('Server error', 500);
    }
  }
}
