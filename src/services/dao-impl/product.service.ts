import {ProductDto} from "../../models/dto/product.dto";
import {Injectable} from "@nestjs/common";
import {ProductDao} from "../dao/product.dao";
import {ProductRepository} from "../../repositories/product.repository";
import {PaginationDataDto} from "../../models/dto/pagination-data.dto";
import {StockService} from "./stock.service";
import {StockRepository} from "../../repositories/stock.repository";
import {StockEntity} from "../../models/entities/stock.entity";
import {ProductEntity} from "../../models/entities/product.entity";

@Injectable()
export class ProductService implements ProductDao{

    constructor(private productRepo: ProductRepository, private stockService: StockService, private stockRepository: StockRepository) {
    }

    async createProduct(productDto: ProductDto): Promise<ProductDto> {
        const product = await this.productRepo.save(productDto);
        return ProductDto.fromEntity(product);
    }

    async deleteProduct(productId: string): Promise<boolean> {
        const product = await this.productRepo
            .findOneOrFail({where: {id: Number.parseInt(productId)}, relations: ["stock", "category"] });
        await Promise.all(product.stock!.map( async (s) => {
            await this.stockRepository
                .createQueryBuilder()
                .update(StockEntity)
                .set({product: null})
                .where('id = :id', {id: s.id})
                .execute();
        }));
        const removeProduct = await this.productRepo.remove(product);

        return removeProduct != null;
    }

    getProductById(productId: number): Promise<ProductDto> {
        return this.productRepo.findOne( { where: {id: productId}, relations: ["stock", "category"] })
            .then( entity => ProductDto.fromEntity(entity!));
    }

   async getProducts(page: number, limit: number): Promise<PaginationDataDto<ProductDto>> {
        const skip = (page - 1) * limit;
        const [data, total] = await this.productRepo.findAndCount({
            skip: skip,
            take: limit,
            relations: ["category", "stock"]
        });
        const totalPages = Math.ceil(total / limit);

        const paginationDataDto = new PaginationDataDto<ProductDto>();
        paginationDataDto.data = data.map((p) => ProductDto.fromEntity(p));
        paginationDataDto.currentPage = page;
        paginationDataDto.totalPages = totalPages;

        return paginationDataDto;
    }

    async updateProduct(productId: number, productDto: ProductDto): Promise<ProductDto> {
        const productToUpdate = await this.productRepo.findOneOrFail({ where: {id: productId}, relations: ["stock", "category"]});
        const dto = ProductDto.fromEntity(productToUpdate);
        dto.id = productDto.id;
        dto.name = productDto.name;
        dto.quantity = productDto.quantity;
        dto.price = productDto.price;
        dto.description = productDto.description;
        dto.category = productDto.category;
        dto.stock = productDto.stock;
        dto.providerProduct = productDto.providerProduct;
        dto.orderProduct = productDto.orderProduct;

        return await this.productRepo.save(dto);
    }

}