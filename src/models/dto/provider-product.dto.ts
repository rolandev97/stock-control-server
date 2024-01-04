import {ProviderProductEntity} from "../entities/provider-product.entity";
import {ProductDto} from "./product.dto";
import {ProviderDto} from "./provider.dto";
import {ApiProperty} from "@nestjs/swagger";

export class ProviderProductDto{
    @ApiProperty()
    id: number;
    @ApiProperty()
    product: ProductDto;
    @ApiProperty()
    provider: ProviderDto;

    static fromEntity(entity: ProviderProductEntity | null): ProviderProductDto{
        const dto = new ProviderProductDto();
        dto.id = entity!.id;
        dto.provider = ProviderDto.fromEntity(entity?.provider!);
        dto.product = ProductDto.fromEntity(entity?.product!);

        return dto;
    }

    static toEntity(dto: ProviderProductDto | null): ProviderProductEntity{
        const entity = new ProviderProductEntity();
        entity.id = dto!.id;
        entity.provider = ProviderDto.toEntity(dto!.provider!);
        entity.product = ProductDto.toEntity(dto!.product!);

        return entity;
    }
}