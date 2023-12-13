import {ProductDto} from "../../models/dto/product.dto";
import {PaginationDataDto} from "../../models/dto/pagination-data.dto";

export interface ProductDao{
    createProduct(productDto: ProductDto): Promise<ProductDto>;
    deleteProduct(productId: string): Promise<boolean>;
    updateProduct(productId: number, productDto: ProductDto): Promise<ProductDto>;
    getProductById(productId: number): Promise<ProductDto>;
    getProducts(page: number, limit: number): Promise<PaginationDataDto<ProductDto>>;
}