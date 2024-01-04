import {ProductDto} from "./product.dto";
import {SectorDto} from "./sector.dto";
import {CategoryEntity} from "../entities/category.entity";
import {StockDto} from "./stock.dto";
import {ApiProperty} from "@nestjs/swagger";

export class CategoryDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    code: string;

    @ApiProperty()
    product: ProductDto[] | null;
    @ApiProperty()
    sector: SectorDto | null;

    static fromEntity(entity: CategoryEntity): CategoryDto{
        const dto = new CategoryDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.code = entity.code;
        dto.product = entity.product != null ? entity.product.map((p) => ProductDto.fromEntity(p)) : null ;
        dto.sector = entity.sector != null ? SectorDto.fromEntity(entity.sector) : null;

        return dto;
    }

    static toEntity(dto: CategoryDto): CategoryEntity{
        const entity = new CategoryEntity();
        entity.id = dto.id;
        entity.name = dto.name;
        entity.code = dto.code;
        entity.product = dto.product != null ? dto.product.map((p) => ProductDto.toEntity(p)) : null ;
        entity.sector = dto.sector != null ? SectorDto.toEntity(dto.sector) : null;

        return entity;
    }
}