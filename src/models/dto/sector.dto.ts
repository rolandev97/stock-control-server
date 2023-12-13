import {CategoryDto} from "./category.dto";
import {SectorEntity} from "../entities/sector.entity";

export class SectorDto {
    id: number;
    name: string;

    categoriesDto: CategoryDto[];

    static fromEntity(entity: SectorEntity): SectorDto{
        const dto = new SectorDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.categoriesDto = entity.categories.map((c) => CategoryDto.fromEntity(c));

        return dto;
    }
}