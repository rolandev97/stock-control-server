import {ProductDto} from "./product.dto";
import {OrderDto} from "./order.dto";
import {OrderProductEntity} from "../entities/order-product.entity";
import {ApiProperty} from "@nestjs/swagger";
import {Audit} from "../audit";

export class OrderProductDto extends Audit{
    @ApiProperty()
    id: number;
    @ApiProperty()
    order: OrderDto;
    @ApiProperty( { type: () => ProductDto})
    product: ProductDto;

    static fromEntity(entity: OrderProductEntity): OrderProductDto{
        const dto = new OrderProductDto();
        dto.id = entity.id;
        dto.product = ProductDto.fromEntity(entity.product);
        dto.order = OrderDto.fromEntity(entity.order);

        return dto;
    }

    static toEntity(dto: OrderProductDto): OrderProductEntity{
        const entity = new OrderProductEntity();
        entity.id = dto.id;
        entity.product = ProductDto.toEntity(dto.product);
        entity.order = OrderDto.toEntity(dto.order);

        return entity;
    }
}