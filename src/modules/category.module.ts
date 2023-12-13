import {Module} from "@nestjs/common";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "../models/entities/role.entity";
import {RoleController} from "../controllers/role.controller";
import {RoleService} from "../services/dao-impl/role.service";
import {RoleRepository} from "../repositories/role.repository";
import {CategoryEntity} from "../models/entities/category.entity";
import {CategoryService} from "../services/dao-impl/category.service";
import {CategoryRepository} from "../repositories/category.repository";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    controllers: [],
    providers: [CategoryService, {
        provide: CategoryRepository,
        useFactory: (catRepository) => new CategoryRepository(catRepository),
        inject: [getRepositoryToken(CategoryEntity)]
    }],
    exports: [CategoryService]
})
export class CategoryModule {}