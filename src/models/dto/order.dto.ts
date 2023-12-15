import {UserDto} from "./user.dto";
import {OrderEntity} from "../entities/order.entity";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    amount: number;
    @ApiProperty()
    createdBy: string;
    @ApiProperty()
    createdDate: Date;
    @ApiProperty()
    updatedBy: string;
    @ApiProperty()
    updatedDate: Date;

    @ApiProperty({ type: () => UserDto})
    userDto: UserDto;

    public static fromEntity(order: OrderEntity | null): OrderDto{
        const dto = new OrderDto();
        dto.id = order!.id;
        dto.amount = order!.amount;
        dto.quantity = order!.quantity;
        dto.createdBy = order!.createdBy;
        dto.createdDate = order!.createdDate;
        dto.updatedBy = order!.updatedBy;
        dto.updatedDate = order!.updatedDate;
        dto.userDto = UserDto.fromEntity(order!.user);

        return dto;
    }

}