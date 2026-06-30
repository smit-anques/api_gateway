import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../../product.service';
import { AdminGuard } from 'src/authGuards/admin.guard';

@Controller('api/admin/sub-category')
export class SubCategoryController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(AdminGuard)
  async create(@Body() body: any) {
    try {
      console.log('HTTP BODY:', body);
      return await this.productService.createSubCategory(body);
    } catch (error) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('list')
  @UseGuards(AdminGuard)
  async findAll() {
    try {
      return await this.productService.listSubCategories();
    } catch (error) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update/:id')
  @UseGuards(AdminGuard)
  async update(@Param('id') id: number, @Body() body: any) {
    try {
      return await this.productService.updateSubCategory({ id, ...body });
    } catch (error) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete/:id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: number) {
    try {
      return await this.productService.deleteSubCategory({ id });
    } catch (error) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }
}
