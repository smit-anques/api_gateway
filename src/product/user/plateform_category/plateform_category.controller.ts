import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../../product.service';
import { AdminGuard } from 'src/authGuards/admin.guard';
import { UserGuard } from 'src/authGuards/user.guard';

@Controller('api/user/platform-category')
export class UserPlateformCategoryController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  @UseGuards(UserGuard)
  async findAll() {
    return this.productService.listPlatformCategories();
  }
}
