import {ProductEntity} from "../entities/product.entity";
import {ProviderEntity} from "../entities/provider.entity";
import {ProviderProductEntity} from "../entities/provider-product.entity";
import {ProductDto} from "./product.dto";
import {ProviderDto} from "./provider.dto";

export class ProviderProductDto{
    id: number;
    productDto: ProductDto;
    providerDto: ProviderDto;

    static fromEntity(entity: ProviderProductEntity | null): ProviderProductDto{
        const dto = new ProviderProductDto();
        dto.id = entity!.id;
        dto.providerDto = ProviderDto.fromEntity(entity?.provider!);
        dto.productDto = ProductDto.fromEntity(entity?.product!);

        return dto;
    }
}