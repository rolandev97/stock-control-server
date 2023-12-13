import {Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProviderProductDto} from "./provider-product.dto";
import {ProviderEntity} from "../entities/provider.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ProviderDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    telephone: string;

    @ApiProperty()
    providerProductDto: ProviderProductDto[];

    static fromEntity(entity: ProviderEntity): ProviderDto{
        const dto = new ProviderDto();
        dto.id = entity!.id;
        dto.name = entity!.name;
        dto.address = entity!.address;
        dto.telephone = entity!.telephone;
        dto.providerProductDto = entity!.providerProduct.map( p => ProviderProductDto.fromEntity(p));

        return dto;
    }
}