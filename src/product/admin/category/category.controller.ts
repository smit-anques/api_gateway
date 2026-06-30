import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../../product.service';
import { AdminGuard } from 'src/authGuards/admin.guard';

@Controller('api/admin/category')
export class CategoryController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(AdminGuard)
  async create(@Body() body: any) {
    console.log('HTTP BODY:', body);
    const response = await this.productService.createCategory(body);
    return response;
  }

  @Get('list')
  @UseGuards(AdminGuard)
  async findAll() {
    return this.productService.listCategories();
  }

  @Put('update/:id')
  @UseGuards(AdminGuard)
  async update(@Param('id') id: number, @Body() body: any) {
    return this.productService.updateCategory({ id, ...body });
  }

  @Delete('delete/:id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: number) {
    return this.productService.deleteCategory({ id });
  }
}
