import {Repository} from "typeorm";
import {ProviderProductEntity} from "../models/entities/provider-product.entity";
import {InjectRepository} from "@nestjs/typeorm";

export class ProviderProductRepository extends Repository<ProviderProductEntity>{
    constructor(
        @InjectRepository(ProviderProductEntity)
        private ppRepo: Repository<ProviderProductEntity>
    ) {
        super(ppRepo.target, ppRepo.manager, ppRepo.queryRunner);
    }
}