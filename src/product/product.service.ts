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

interface ProductServices {
    CreateProduct(data: any): Observable<any>;
    ListProducts(data: any): Observable<any>;
    GetProductById(data: any): Observable<any>;
    UpdateProduct(data: any): Observable<any>;
    DeleteProduct(data: any): Observable<any>;
}

interface DiscountCodeServices {
    CreateDiscountCode(data: any): Observable<any>;
    ListDiscountCode(data: any): Observable<any>;
    GetDiscountCodeById(data: any): Observable<any>;
    UpdateDiscountCode(data: any): Observable<any>;
    DeleteDiscountCode(data: any): Observable<any>;
}

@Injectable()
export class ProductService implements OnModuleInit {
    private productService!: PlateformCategoryService;
    private categoryService!: CategoryService;
    private subcategoryService!:SubCategoryService;
    private productServices!: ProductServices;
    private discountCodeServices!: DiscountCodeServices;

    constructor(@Inject('PRODUCT_PACKAGE') private readonly client: ClientGrpc) { }

    onModuleInit() {
        this.productService = this.client.getService<PlateformCategoryService>('PlateformCategoryService');
        this.categoryService = this.client.getService<CategoryService>('CategoryService');
        this.subcategoryService = this.client.getService<SubCategoryService>('SubCategoryService');
        this.productServices = this.client.getService<ProductServices>('ProductService');
        this.discountCodeServices = this.client.getService<DiscountCodeServices>('DiscountCodeServices');
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

    async createProduct(body: any) {
        return firstValueFrom(this.productServices.CreateProduct(body));
    }

    async listProduct() {
        return firstValueFrom(this.productServices.ListProducts({}));
    }

    async updateProduct(body: any) {
        return firstValueFrom(this.productServices.UpdateProduct(body));
    }

    async deleteProduct(body: any) {
        return firstValueFrom(this.productServices.DeleteProduct(body));
    }

    async getProduct(data: any) {
        return firstValueFrom(this.productServices.GetProductById(data));
    }

    async createDiscountCode(body: any) {
        return firstValueFrom(this.discountCodeServices.CreateDiscountCode(body));
    }

    async listDiscountCodes() {
        return firstValueFrom(this.discountCodeServices.ListDiscountCode({}));
    }

    async getDiscountCode(data: any) {
        return firstValueFrom(this.discountCodeServices.GetDiscountCodeById(data));
    }

    async updateDiscountCode(body: any) {
        return firstValueFrom(this.discountCodeServices.UpdateDiscountCode(body));
    }

    async deleteDiscountCode(data: any) {
        return firstValueFrom(this.discountCodeServices.DeleteDiscountCode(data));
    }

}
