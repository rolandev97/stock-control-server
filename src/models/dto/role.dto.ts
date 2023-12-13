import {RoleEntity} from "../entities/role.entity";
import {UserDto} from "./user.dto";

export class RoleDto {
    id: string;
    name: string;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;

    users: UserDto[];

    public static fromEntity(role: RoleEntity | null): RoleDto{
        const roleDto = new RoleDto();
        roleDto.id = role!.id;
        roleDto.name = role!.name;
        roleDto.createdDate = role!.createdDate;
        roleDto.createdBy = role!.createdBy;
        roleDto.updatedBy = role!.updatedBy;
        roleDto.updatedDate = role!.updatedDate;
        roleDto.users = role!.users?.map( user => UserDto.fromEntity(user) );

        return roleDto;
    }
}
