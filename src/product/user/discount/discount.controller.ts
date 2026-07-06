import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../../product.service';
import { AdminGuard } from 'src/authGuards/admin.guard';

@Controller('api/user/discount')
export class UserDiscountController {
  constructor(private readonly productService: ProductService) { }

  @Get('list')
  @UseGuards(AdminGuard)
  async findAll() {
    try {
      return await this.productService.listDiscountCodes();
    } catch (error: any) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @UseGuards(AdminGuard)
  async findOne(@Param('id') id: number) {
    try {
      return await this.productService.getDiscountCode({ id });
    }
    catch (error: any) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }
}
