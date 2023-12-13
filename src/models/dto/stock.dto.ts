import {ProductDto} from "./product.dto";
import {StockEntity} from "../entities/stock.entity";
import { ApiProperty } from "@nestjs/swagger";
import {ProductEntity} from "../entities/product.entity";

export class StockDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    location: string;
    @ApiProperty()
    releaseDate: Date;

    @ApiProperty({ type: () => ProductDto})
    productDto: ProductDto;

    static fromEntity(entity: StockEntity): StockDto{
        const dto = new StockDto();
        dto.id = entity.id;
        dto.location = entity.location;
        dto.quantity = entity.quantity;
        dto.productDto = ProductDto.fromEntity(entity.product);
        return dto;
    }
}