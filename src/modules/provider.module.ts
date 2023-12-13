import {Module} from "@nestjs/common";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {ProviderService} from "../services/dao-impl/provider.service";
import {ProviderRepository} from "../repositories/provider.repository";
import {ProviderEntity} from "../models/entities/provider.entity";
import {ProviderController} from "../controllers/povider.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ProviderEntity])],
    controllers: [ProviderController],
    providers: [ProviderService, {
        provide: ProviderRepository,
        useFactory: (providerRepository) => new ProviderRepository(providerRepository),
        inject: [getRepositoryToken(ProviderEntity)]
    }],
    exports: [ProviderService]
})
export class ProviderModule {}