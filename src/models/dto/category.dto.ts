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
    productDto: ProductDto[];
    @ApiProperty()
    sectorDto: SectorDto;

    static fromEntity(entity: CategoryEntity): CategoryDto{
        const dto = new CategoryDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.code = entity.name;
        dto.productDto = entity.product.map((p) => ProductDto.fromEntity(p));
        dto.sectorDto = SectorDto.fromEntity(entity.sector);

        return dto;
    }
}