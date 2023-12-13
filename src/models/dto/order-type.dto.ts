import {Column} from "typeorm";
import {OrderDto} from "./order.dto";
import {ApiProperty} from "@nestjs/swagger";
import {OrderEntity} from "../entities/order.entity";
import {UserDto} from "./user.dto";
import {OrderTypeEntity} from "../entities/order-type.entity";

export class OrderTypeDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    type: string;

    @ApiProperty()
    orderDto: OrderDto[];

    public static fromEntity(orderType: OrderTypeEntity | null): OrderTypeDto{
        const dto = new OrderTypeDto();
        dto.id = orderType!.id;
        dto.orderDto = orderType!.order.map( o => OrderDto.fromEntity(o));
        dto.type = orderType!.type;

        return dto;
    }
}