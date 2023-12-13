import { Module } from '@nestjs/common';
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "../models/entities/role.entity";
import {RoleService} from "../services/dao-impl/role.service";
import {RoleRepository} from "../repositories/role.repository";
import {RoleController} from "../controllers/role.controller";

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])],
    controllers: [RoleController],
    providers: [RoleService, {
        provide: RoleRepository,
        useFactory: (roleRepository) => new RoleRepository(roleRepository),
        inject: [getRepositoryToken(RoleEntity)]
    }],
    exports: [RoleService]
})
export class RoleModule {}
