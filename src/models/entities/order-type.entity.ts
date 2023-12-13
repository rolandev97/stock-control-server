import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {OrderEntity} from "./order.entity";

@Entity({name: 'OrderType'})
export class OrderTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;

    @OneToMany(type => OrderEntity, o => o.orderType)
    order: OrderEntity[];
}
