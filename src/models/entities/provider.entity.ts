import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Audit} from "../audit";
import {ProviderProductEntity} from "./provider-product.entity";

@Entity({name: 'Provider'})
export class ProviderEntity extends Audit{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: '255'})
    name: string;
    @Column({length: '255'})
    address: string;
    @Column()
    telephone: string;

    @OneToMany(type => ProviderProductEntity, providerProduct => providerProduct.product)
    providerProduct: ProviderProductEntity[];
}
