import {RoleDto} from "../../models/dto/role.dto";

export interface RoleDao {
    createRole(roleDto: RoleDto): Promise<RoleDto>;
    findAll(): Promise<RoleDto[]>
    findRoleByName(roleName: string): Promise<RoleDto>;
    checkIfDataExist(): Promise<boolean>;
}
