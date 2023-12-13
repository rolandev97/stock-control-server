import {Column, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductEntity} from "../entities/product.entity";
import {ProductDto} from "./product.dto";
import {StockEntity} from "../entities/stock.entity";

export class StockDto {
    id: number;
    quantity: number;
    location: string;
    releaseDate: Date;

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