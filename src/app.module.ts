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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthGuardsModule,
    AuthModule,
  ],
  controllers: [AppController, PlateformCategoryController,CategoryController,UserPlateformCategoryController,UserCategoryController],
  providers: [AppService, ProductService],
})
export class AppModule { }
