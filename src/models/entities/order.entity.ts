import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";
import {Audit} from "../audit";
import {ProductEntity} from "./product.entity";
import {OrderProductEntity} from "./order-product.entity";
import {OrderTypeEntity} from "./order-type.entity";

@Entity({name: 'Order'})
export class OrderEntity extends Audit{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    quantity: number;
    @Column()
    amount: number;

    @ManyToOne(type => UserEntity, user => user.order)
    user: UserEntity;
    @OneToMany(type => OrderProductEntity, orderProduct => orderProduct.order)
    orderProduct: OrderProductEntity[];
    @ManyToOne( type => OrderTypeEntity, ot => ot.order)
    orderType: OrderTypeEntity;

}
