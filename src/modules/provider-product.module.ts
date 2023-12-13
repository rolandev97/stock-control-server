import {Module} from "@nestjs/common";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {ProviderService} from "../services/dao-impl/provider.service";
import {ProviderRepository} from "../repositories/provider.repository";
import {ProviderEntity} from "../models/entities/provider.entity";
import {ProviderProductEntity} from "../models/entities/provider-product.entity";
import {ProviderProductService} from "../services/dao-impl/provider-product.service";
import {ProviderProductRepository} from "../repositories/provider-product.repository";
import {ProductModule} from "./product.module";
import {ProviderModule} from "./provider.module";

@Module({
    imports: [TypeOrmModule.forFeature([ProviderProductEntity]), ProductModule, ProviderModule],
    controllers: [],
    providers: [ProviderProductService, {
        provide: ProviderProductRepository,
        useFactory: (ppRepository) => new ProviderProductRepository(ppRepository),
        inject: [getRepositoryToken(ProviderProductEntity)]
    }],
    exports: [ProviderProductService]
})
export class ProviderProductModule {}