import {ProductDto} from "./product.dto";
import {SectorDto} from "./sector.dto";
import {CategoryEntity} from "../entities/category.entity";
import {StockDto} from "./stock.dto";

export class CategoryDto {
    id: number;
    name: string;
    code: string;

    productDto: ProductDto[];
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