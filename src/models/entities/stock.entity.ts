import {Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Audit} from "../audit";
import {ProductEntity} from "./product.entity";

@Entity({name: 'Stock'})
export class StockEntity extends Audit{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    location: string;
    @Column()
    releaseDate: Date;

    @ManyToOne(type => ProductEntity, p => p.stock)
    product: ProductEntity;

}
