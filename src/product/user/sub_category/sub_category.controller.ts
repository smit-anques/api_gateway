import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../../product.service';
import { AdminGuard } from 'src/authGuards/admin.guard';

@Controller('api/user/sub-category')
export class UserSubCategoryController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  @UseGuards(UseGuards)
  async findAll() {
    return this.productService.listSubCategories();
  }

}
