import {Module} from "@nestjs/common";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {ProductEntity} from "../models/entities/product.entity";
import {ProductService} from "../services/dao-impl/product.service";
import {ProductRepository} from "../repositories/product.repository";
import {StockModule} from "./stock.module";
import {ProductController} from "../controllers/product.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), StockModule],
    controllers: [ProductController],
    providers: [ProductService, {
        provide: ProductRepository,
        useFactory: (productRepository) => new ProductRepository(productRepository),
        inject: [getRepositoryToken(ProductEntity)]
    }],
    exports: [ProductService]
})
export class ProductModule {

}