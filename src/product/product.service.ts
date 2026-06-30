import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

interface PlateformCategoryService {
    CreatePlatformCategory(data: any): Observable<any>;
    ListPlatformCategories(data: any): Observable<any>;
    UpdatePlatformCategory(data: any): Observable<any>;
    DeletePlatformCategory(data: any): Observable<any>;
}

interface CategoryService {
    CreateCategory(data: any): Observable<any>;
    ListCategories(data: any): Observable<any>;
    UpdateCategory(data: any): Observable<any>;
    DeleteCategory(data: any): Observable<any>;
}

interface SubCategoryService {
    CreateSubCategory(data: any): Observable<any>;
    ListSubCategories(data: any): Observable<any>;
    UpdateSubCategory(data: any): Observable<any>;
    DeleteSubCategory(data: any): Observable<any>;
}

@Injectable()
export class ProductService implements OnModuleInit {
    private productService!: PlateformCategoryService;
    private categoryService!: CategoryService;
    private subcategoryService!:SubCategoryService;

    constructor(@Inject('PRODUCT_PACKAGE') private readonly client: ClientGrpc) { }

    onModuleInit() {
        this.productService = this.client.getService<PlateformCategoryService>('PlateformCategoryService');
        this.categoryService = this.client.getService<CategoryService>('CategoryService');
        this.subcategoryService = this.client.getService<SubCategoryService>('SubCategoryService');

    }

    async createPlatformCategory(body: any) {
        return firstValueFrom(this.productService.CreatePlatformCategory(body));
    }

    async listPlatformCategories() {
        return firstValueFrom(this.productService.ListPlatformCategories({}));
    }

    async updatePlatformCategory(body: any) {
        return firstValueFrom(this.productService.UpdatePlatformCategory(body));
    }

    async deletePlatformCategory(body: any) {
        return firstValueFrom(this.productService.DeletePlatformCategory(body));
    }

    async createCategory(body: any) {
        const payload = {
            name: body.name,
            image: body.image,
            platform_category_id: Number(body.platform_category_id), // IMPORTANT
        };

        console.log('GRPC PAYLOAD:', payload);

        return firstValueFrom(
            this.categoryService.CreateCategory(payload),
        );
    }

    async listCategories() {
        return firstValueFrom(this.categoryService.ListCategories({}));
    }

    async updateCategory(body: any) {
        return firstValueFrom(this.categoryService.UpdateCategory(body));
    }

    async deleteCategory(body: any) {
        return firstValueFrom(this.categoryService.DeleteCategory(body));
    }

    async createSubCategory(body: any) {
        const payload = {
            name: body.name,
            image: body.image,
            category_id: Number(body.category_id), // IMPORTANT
        };

        console.log('GRPC PAYLOAD:', payload);

        return firstValueFrom(
            this.subcategoryService.CreateSubCategory(payload),
        );
    }

    async listSubCategories() {
        return firstValueFrom(this.subcategoryService.ListSubCategories({}));
    }

    async updateSubCategory(body: any) {
        return firstValueFrom(this.subcategoryService.UpdateSubCategory(body));
    }

    async deleteSubCategory(body: any) {
        return firstValueFrom(this.subcategoryService.DeleteSubCategory(body));
    }


}
