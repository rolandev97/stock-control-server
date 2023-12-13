import {ProductDto} from "../../models/dto/product.dto";
import {Injectable} from "@nestjs/common";
import {ProductDao} from "../dao/product.dao";
import {ProductRepository} from "../../repositories/product.repository";
import {PaginationDataDto} from "../../models/dto/pagination-data.dto";
import {OrderDto} from "../../models/dto/order.dto";

@Injectable()
export class ProductService implements ProductDao{

    constructor(private productRepo: ProductRepository) {
    }

    createProduct(productDto: ProductDto): Promise<ProductDto> {
        return this.productRepo.save(productDto);
    }

    deleteProduct(productId: string): Promise<boolean> {
        return this.productRepo.delete(productId)
            .then( ()=> Promise.resolve(true) )
            .catch( ()=> Promise.resolve(false));
    }

    getProductById(productId: number): Promise<ProductDto> {
        return this.productRepo.findOne( { where: {id: productId}, relations: ["stock", "category"] })
            .then( entity => ProductDto.fromEntity(entity!));
    }

   async getProducts(page: number, limit: number): Promise<PaginationDataDto<ProductDto>> {
        const skip = (page - 1) * limit;
        const [data, total] = await this.productRepo.findAndCount({
            skip: skip,
            take: limit
        });
        const totalPages = Math.ceil(total / limit);

        const paginationDataDto = new PaginationDataDto<ProductDto>();
        paginationDataDto.data = data.map((p) => ProductDto.fromEntity(p));
        paginationDataDto.currentPage = page;
        paginationDataDto.totalPages = totalPages;

        return paginationDataDto;
    }

    updateProduct(productId: number, productDto: ProductDto): Promise<ProductDto> {
        return this.productRepo.update(productId, productDto)
            .then(() => this.productRepo.findOne({where: {id: productId}, relations: ["user", "category"]}))
            .then(p => ProductDto.fromEntity(p!));
    }

}