import {UserDto} from "./user.dto";
import {OrderEntity} from "../entities/order.entity";
import {UserEntity} from "../entities/user.entity";

export class OrderDto {
    id: number;
    quantity: number;
    amount: number;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;

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