import {Audit} from "../audit";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CategoryEntity} from "./category.entity";

@Entity("sector")
export class SectorEntity extends Audit{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToMany(type => CategoryEntity, cat => cat.sector)
    categories: CategoryEntity[];
}