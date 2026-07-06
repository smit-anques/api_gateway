import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../../product.service';
import { AdminGuard } from 'src/authGuards/admin.guard';

@Controller('api/admin/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('create')
  @UseGuards(AdminGuard)
  async create(@Body() body: any) {
    try {
      const response = await this.productService.createProduct(body);
      return response;
    } catch (error: any) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('list')
  @UseGuards(AdminGuard)
  async findAll() {
    try {
      return await this.productService.listProduct();
    } catch (error: any) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @UseGuards(AdminGuard)
  async findOne(@Param('id') id: number) {
    try {
      return await this.productService.getProduct({ id });
    }
    catch (error: any) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update/:id')
  @UseGuards(AdminGuard)
  async update(@Param('id') id: number, @Body() body: any) {
    try {
      return await this.productService.updateProduct({ id, ...body });
    } catch (error: any) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete/:id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: number) {
    try {
      return await this.productService.deleteProduct({ id });
    } catch (error: any) {
      const message = error?.details || error?.message || 'Internal server error';
      throw new HttpException({ status: false, message }, HttpStatus.BAD_REQUEST);
    }
  }
}
