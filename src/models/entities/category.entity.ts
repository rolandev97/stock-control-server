import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductEntity} from "./product.entity";
import {Audit} from "../audit";
import {SectorEntity} from "./sector.entity";

@Entity("category")
export class CategoryEntity extends Audit{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    code: string;

    @OneToMany(type => ProductEntity, product => product.category)
    product: ProductEntity[] | null;
    @ManyToOne(type => SectorEntity, sector => sector.categories)
    sector: SectorEntity | null;
}