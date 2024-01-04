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
    user: UserDto;

    public static fromEntity(order: OrderEntity | null): OrderDto{
        const dto = new OrderDto();
        dto.id = order!.id;
        dto.amount = order!.amount;
        dto.quantity = order!.quantity;
        dto.createdBy = order!.createdBy;
        dto.createdDate = order!.createdDate;
        dto.updatedBy = order!.updatedBy;
        dto.updatedDate = order!.updatedDate;
        dto.user = UserDto.fromEntity(order!.user);

        return dto;
    }

    public static toEntity(orderDto: OrderDto | null): OrderEntity{
        const entity = new OrderEntity();
        entity.id = orderDto!.id;
        entity.amount = orderDto!.amount;
        entity.quantity = orderDto!.quantity;
        entity.createdBy = orderDto!.createdBy;
        entity.createdDate = orderDto!.createdDate;
        entity.updatedBy = orderDto!.updatedBy;
        entity.updatedDate = orderDto!.updatedDate;
        entity.user = UserDto.toEntity(orderDto!.user);

        return entity;
    }

}