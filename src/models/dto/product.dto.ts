import {CategoryDto} from "./category.dto";
import {StockDto} from "./stock.dto";
import {OrderProductDto} from "./order-product.dto";
import {ProviderProductDto} from "./provider-product.dto";
import {ProductEntity} from "../entities/product.entity";
import {ApiProperty} from "@nestjs/swagger";
import {Audit} from "../audit";

export class ProductDto extends Audit {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    quantity: number;

    @ApiProperty()
    orderProduct: OrderProductDto[] | null;
    @ApiProperty()
    stock: StockDto[] | null;
    @ApiProperty()
    providerProduct: ProviderProductDto[] | null;
    @ApiProperty({type: ()=> CategoryDto})
    category: CategoryDto | null;

    static fromEntity(entity: ProductEntity | null): ProductDto{
        const dto = new ProductDto();
        dto.id = entity!.id;
        dto.name = entity!.name;
        dto.description = entity!.description;
        dto.price = entity!.price;
        dto.quantity = entity!.quantity;
        dto.createdBy = entity!.createdBy;
        dto.createdDate = entity!.createdDate;
        dto.orderProduct = entity!.orderProduct != null ? entity!.orderProduct.map((op) => OrderProductDto.fromEntity(op)) : null;
        dto.stock = entity!.stock != null ? entity!.stock.map((s) => StockDto.fromEntity(s)) : null;
        dto.providerProduct = entity!.providerProduct != null ? entity!.providerProduct.map((pp) => ProviderProductDto.fromEntity(pp)) : null;
        dto.category = entity!.category != null ? CategoryDto.fromEntity(entity!.category) : null;

        return dto;
    }

    static toEntity(dto: ProductDto): ProductEntity {
        const entity = new ProductEntity();
        entity.id = dto.id;
        entity.name = dto.name;
        entity.description = dto.description;
        entity.price = dto.price;
        entity.quantity = dto.quantity;
        entity.orderProduct = dto.orderProduct != null ? dto.orderProduct.map((op) => OrderProductDto.toEntity(op)) : null;
        entity.stock = dto.stock != null ? dto.stock.map((s) => StockDto.toEntity(s)) : null;
        entity.providerProduct = dto.providerProduct != null ? dto.providerProduct.map((pp) => ProviderProductDto.toEntity(pp)) : null;
        entity.category = dto.category != null ? CategoryDto.toEntity(dto.category) : null;
        return entity;
    }


}
