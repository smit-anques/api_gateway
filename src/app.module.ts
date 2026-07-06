import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuardsModule } from './authGuards/auth.module';
import { PlateformCategoryController } from './product/admin/plateform_category/plateform_category.controller';
import { ProductService } from './product/product.service';
import { CategoryController } from './product/admin/category/category.controller';
import { UserPlateformCategoryController } from './product/user/plateform_category/plateform_category.controller';
import { UserCategoryController } from './product/user/category/category.controller';
import { SubCategoryController } from './product/admin/sub_category/sub_category.controller';
import { UserSubCategoryController } from './product/user/sub_category/sub_category.controller';
import { ProductController } from './product/admin/product/product.controller';
import { UserProductController } from './product/user/product/product.controller';
import { DiscountController } from './product/admin/discount/discount.controller';
import { UserDiscountController } from './product/user/discount/discount.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthGuardsModule,
    AuthModule,
  ],
  controllers: [AppController, PlateformCategoryController,CategoryController,UserPlateformCategoryController,UserCategoryController,SubCategoryController,UserSubCategoryController,ProductController,UserProductController,DiscountController,UserDiscountController
  ],
  providers: [AppService, ProductService],
})
export class AppModule { }
