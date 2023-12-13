import {IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {UserEntity} from "../entities/user.entity";
import {OrderDto} from "./order.dto";
import {RoleDto} from "./role.dto";
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    id: number;
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(9)
    @IsString()
    phoneNumber: string;

    password: string;
    imageUrl: string;
    tokenResetPassword: string;

    isActive: boolean;

    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;

    orderDto: OrderDto[];
    role: RoleDto;

    public static fromEntity(entity: UserEntity | null) : UserDto{
        const dto = new UserDto();
        dto.id = entity!.id;
        dto.email = entity!.email;
        dto.address = entity!.address;
        dto.name = entity!.name;
        dto.password = entity!.password;
        dto.tokenResetPassword = entity!.tokenResetPassword;
        dto.phoneNumber = entity!.phoneNumber;
        dto.isActive = entity!.isActive;
        dto.createdBy = entity!.createdBy;
        dto.createdDate = entity!.createdDate;
        dto.updatedBy = entity!.updatedBy;
        dto.imageUrl = entity!.imageUrl;
        dto.updatedDate = entity!.updatedDate;
        dto.role = RoleDto.fromEntity(entity!.role);

        return dto;
    }
}
