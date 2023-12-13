import {IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {UserEntity} from "../entities/user.entity";
import {OrderDto} from "./order.dto";
import {RoleDto} from "./role.dto";
import {ApiProperty} from "@nestjs/swagger";
import {OrderEntity} from "../entities/order.entity";
import {RoleEntity} from "../entities/role.entity";

export class UserDto {
    @ApiProperty()
    id: number;
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    address: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @MinLength(9)
    @IsString()
    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    password: string;
    @ApiProperty()
    imageUrl: string;
    @ApiProperty()
    tokenResetPassword: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdBy: string;
    @ApiProperty()
    createdDate: Date;
    @ApiProperty()
    updatedBy: string;
    @ApiProperty()
    updatedDate: Date;

    @ApiProperty({type: () => OrderDto})
    orderDto: OrderDto[];
    @ApiProperty({ type: ()=> RoleDto})
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
