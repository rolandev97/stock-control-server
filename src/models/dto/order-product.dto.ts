import {ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {OrderEntity} from "../entities/order.entity";
import {ProductEntity} from "../entities/product.entity";
import {ProductDto} from "./product.dto";
import {OrderDto} from "./order.dto";
import {OrderProductEntity} from "../entities/order-product.entity";
import {ApiProperty} from "@nestjs/swagger";

export class OrderProductDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    orderDto: OrderDto;
    @ApiProperty( { type: () => ProductDto})
    productDto: ProductDto;

    static fromEntity(entity: OrderProductEntity): OrderProductDto{
        const dto = new OrderProductDto();
        dto.id = entity.id;
        dto.productDto = ProductDto.fromEntity(entity.product);
        dto.orderDto = OrderDto.fromEntity(entity.order);

        return dto;
    }
}