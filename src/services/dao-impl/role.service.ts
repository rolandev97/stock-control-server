import { Injectable } from '@nestjs/common';
import {RoleDao} from "../dao/role.dao";
import {RoleDto} from "../../models/dto/role.dto";
import {RoleRepository} from "../../repositories/role.repository";

@Injectable()
export class RoleService implements RoleDao{

    constructor(private roleRepository: RoleRepository) {
    }

    async checkIfDataExist(): Promise<boolean> {
        const count = await this.roleRepository.count();
        return count === 0;
    }

    createRole(roleDto: RoleDto): Promise<RoleDto> {
        return this.roleRepository.save(roleDto);
    }

    findAll(): Promise<RoleDto[]> {
        return this.roleRepository.find()
            .then( roleEntity => roleEntity.map( role => RoleDto.fromEntity(role)) );
    }

    findRoleByName(roleName: string): Promise<RoleDto> {
        return this.roleRepository.findOneBy({name: roleName})
            .then( role => RoleDto.fromEntity(role) );
    }

}
