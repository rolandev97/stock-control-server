import {Module} from "@nestjs/common";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {SectorEntity} from "../models/entities/sector.entity";
import {SectorService} from "../services/dao-impl/sector.service";
import {CategoryService} from "../services/dao-impl/category.service";
import {CategoryRepository} from "../repositories/category.repository";
import {CategoryEntity} from "../models/entities/category.entity";
import {SectorRepository} from "../repositories/sector.repository";

@Module({
    imports: [TypeOrmModule.forFeature([SectorEntity])],
    controllers: [],
    providers: [SectorService, {
        provide: SectorRepository,
        useFactory: (setRepository) => new SectorRepository(setRepository),
        inject: [getRepositoryToken(SectorEntity)]
    }],
    exports: [SectorService]
})
export class SectorModule {}