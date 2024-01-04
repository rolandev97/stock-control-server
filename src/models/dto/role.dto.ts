import {RoleEntity} from "../entities/role.entity";
import {UserDto} from "./user.dto";
import {ApiProperty} from "@nestjs/swagger";

export class RoleDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    createdBy: string;
    @ApiProperty()
    createdDate: Date;
    @ApiProperty()
    updatedBy: string;
    @ApiProperty()
    updatedDate: Date;

    @ApiProperty()
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

    public static toEntity(dto: RoleDto | null): RoleEntity{
        const entity = new RoleEntity();
        entity.id = dto!.id;
        entity.name = dto!.name;
        entity.createdDate = dto!.createdDate;
        entity.createdBy = dto!.createdBy;
        entity.updatedBy = dto!.updatedBy;
        entity.updatedDate = dto!.updatedDate;
        entity.users = dto!.users?.map( user => UserDto.toEntity(user) );

        return entity;
    }
}
