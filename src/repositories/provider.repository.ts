import {Repository} from "typeorm";
import {ProviderEntity} from "../models/entities/provider.entity";
import {InjectRepository} from "@nestjs/typeorm";

export class ProviderRepository extends Repository<ProviderEntity>{
    constructor(
        @InjectRepository(ProviderEntity)
        private providerRepo: Repository<ProviderEntity>
    ) {
        super(providerRepo.target, providerRepo.manager, providerRepo.queryRunner);
    }
}