import {CategoryDto} from "./category.dto";
import {SectorEntity} from "../entities/sector.entity";
import {ApiProperty} from "@nestjs/swagger";

export class SectorDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;

    @ApiProperty()
    categoriesDto: CategoryDto[];

    static fromEntity(entity: SectorEntity): SectorDto{
        const dto = new SectorDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.categoriesDto = entity.categories.map((c) => CategoryDto.fromEntity(c));

        return dto;
    }
}