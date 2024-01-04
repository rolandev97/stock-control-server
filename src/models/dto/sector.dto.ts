import {CategoryDto} from "./category.dto";
import {SectorEntity} from "../entities/sector.entity";
import {ApiProperty} from "@nestjs/swagger";

export class SectorDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;

    @ApiProperty()
    categories: CategoryDto[] | null;

    static fromEntity(entity: SectorEntity): SectorDto{
        const dto = new SectorDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.categories =  entity.categories != null ? entity.categories.map((c) => CategoryDto.fromEntity(c)) : null;

        return dto;
    }

    static toEntity(dto: SectorDto): SectorEntity{
        const entity = new SectorEntity();
        entity.id = dto.id;
        entity.name = dto.name;
        entity.categories =  dto.categories != null ? dto.categories.map((c) => CategoryDto.toEntity(c)) : null;

        return entity;
    }
}