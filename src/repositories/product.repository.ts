import {Repository} from "typeorm";
import {ProductEntity} from "../models/entities/product.entity";
import {InjectRepository} from "@nestjs/typeorm";

export class ProductRepository extends Repository<ProductEntity>{
    constructor(
        @InjectRepository(ProductEntity)
        private repos: Repository<ProductEntity>) {
        super(repos.target, repos.manager, repos.queryRunner);
    }
}