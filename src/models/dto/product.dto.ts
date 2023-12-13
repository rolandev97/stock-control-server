import {CategoryDto} from "./category.dto";
import {StockDto} from "./stock.dto";
import {OrderProductDto} from "./order-product.dto";
import {ProviderProductDto} from "./provider-product.dto";
import {ProductEntity} from "../entities/product.entity";
import {ApiProperty} from "@nestjs/swagger";

export class ProductDto {
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
    orderProductDto: OrderProductDto[];
    @ApiProperty()
    stockDto: StockDto[];
    @ApiProperty()
    providerProductDto: ProviderProductDto[];
    @ApiProperty()
    categoryDto: CategoryDto;

    static fromEntity(entity: ProductEntity): ProductDto{
        const dto = new ProductDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.description = entity.description;
        dto.price = entity.price;
        dto.orderProductDto = entity.orderProduct.map((op) => OrderProductDto.fromEntity(op))
        dto.stockDto = entity.stock.map((s) => StockDto.fromEntity(s));
        dto.providerProductDto = entity.providerProduct.map((pp) => ProviderProductDto.fromEntity(pp));
        dto.categoryDto = CategoryDto.fromEntity(entity.category);

        return dto;
    }

}
