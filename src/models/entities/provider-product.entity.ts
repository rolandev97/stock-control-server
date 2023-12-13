import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductEntity} from "./product.entity";
import {ProviderEntity} from "./provider.entity";
import {Audit} from "../audit";

@Entity({name: 'ProviderProduct'})
export class ProviderProductEntity extends Audit{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => ProductEntity, product => product.providerProduct)
    product: ProductEntity;
    @ManyToOne(type => ProviderEntity, provider => provider.providerProduct)
    provider: ProviderEntity;
}
