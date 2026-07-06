import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../../product.service';
import { AdminGuard } from 'src/authGuards/admin.guard';
import { UserGuard } from 'src/authGuards/user.guard';

@Controller('api/user/product')
export class UserProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('list')
  @UseGuards(UserGuard)
  async findAll() {
    try {
      return await this.productService.listProduct();
    } catch (error: any) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @UseGuards(UserGuard)
  async findOne(@Param('id') id: number) {
    try {
      return await this.productService.getProduct({ id });
    }
    catch (error: any) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }
}
