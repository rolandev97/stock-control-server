import {ProviderProductEntity} from "../entities/provider-product.entity";
import {ProductDto} from "./product.dto";
import {ProviderDto} from "./provider.dto";
import {ApiProperty} from "@nestjs/swagger";

export class ProviderProductDto{
    @ApiProperty()
    id: number;
    @ApiProperty()
    productDto: ProductDto;
    @ApiProperty()
    providerDto: ProviderDto;

    static fromEntity(entity: ProviderProductEntity | null): ProviderProductDto{
        const dto = new ProviderProductDto();
        dto.id = entity!.id;
        dto.providerDto = ProviderDto.fromEntity(entity?.provider!);
        dto.productDto = ProductDto.fromEntity(entity?.product!);

        return dto;
    }
}