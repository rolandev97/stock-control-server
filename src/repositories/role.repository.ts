import {Repository} from "typeorm";
import {RoleEntity} from "../models/entities/role.entity";
import {InjectRepository} from "@nestjs/typeorm";


export class RoleRepository extends Repository<RoleEntity>{
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>
    ) {
        super(roleRepository.target, roleRepository.manager, roleRepository.queryRunner);
    }
}
