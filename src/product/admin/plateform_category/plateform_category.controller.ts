import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../../product.service';
import { AdminGuard } from 'src/authGuards/admin.guard';

@Controller('api/admin/platform-category')
export class PlateformCategoryController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(AdminGuard)
  async create(@Body() body: any) {
    const response = await this.productService.createPlatformCategory(body);
    return response;
  }

  @Get('list')
  @UseGuards(AdminGuard)
  async findAll() {
    return this.productService.listPlatformCategories();
  }

  @Put('update/:id')
  @UseGuards(AdminGuard)
  async update(@Param('id') id: number, @Body() body: any) {
    return this.productService.updatePlatformCategory({ id, ...body });
  }

  @Delete('delete/:id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: number) {
    return this.productService.deletePlatformCategory({ id });
  }
}
