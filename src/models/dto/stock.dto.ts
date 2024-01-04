import {ProductDto} from "./product.dto";
import {StockEntity} from "../entities/stock.entity";
import { ApiProperty } from "@nestjs/swagger";
import {ProductEntity} from "../entities/product.entity";
import {Audit} from "../audit";

export class StockDto extends Audit{
    @ApiProperty()
    id: number;
    @ApiProperty()
    location: string;
    @ApiProperty()
    releaseDate: Date;

    @ApiProperty({ type: () => ProductDto})
    product: ProductDto | null;

    static fromEntity(entity: StockEntity | null): StockDto{
        const dto = new StockDto();
        dto.id = entity!.id;
        dto.location = entity!.location;
        dto.createdDate = entity!.createdDate;
        dto.createdBy = entity!.createdBy;
        dto.updatedBy = entity!.updatedBy;
        dto.product = entity!.product != null ? ProductDto.fromEntity(entity!.product) : null;
        return dto;
    }

    static toEntity(dto: StockDto | null): StockEntity{
        const entity = new StockEntity();
        entity.id = dto!.id;
        entity.location = dto!.location;
        entity.createdDate = dto!.createdDate;
        entity.createdBy = dto!.createdBy;
        entity.updatedBy = dto!.updatedBy;
        entity.product = dto!.product != null ? ProductDto.toEntity(dto!.product) : null;
        return entity;
    }
}