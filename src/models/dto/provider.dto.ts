import {Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProviderProductEntity} from "../entities/provider-product.entity";
import {ProviderProductDto} from "./provider-product.dto";
import {ProviderEntity} from "../entities/provider.entity";

export class ProviderDto {
    id: number;
    name: string;
    address: string;
    telephone: string;

    providerProductDto: ProviderProductDto;

    static fromEntity(entity: ProviderEntity): ProviderDto{
        const dto = new ProviderDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.address = entity.address;
        dto.telephone = entity.telephone;
        dto.providerProductDto = ProviderProductDto.fromEntity(entity.providerProduct);

        return dto;
    }
}