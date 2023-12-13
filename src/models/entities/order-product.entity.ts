import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {OrderEntity} from "./order.entity";
import {ProductEntity} from "./product.entity";
import {Audit} from "../audit";

@Entity({name: 'OrderProduct'})
export class OrderProductEntity extends Audit{
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @ManyToOne(type => OrderEntity, order => order.orderProduct)
    order: OrderEntity;
    @ManyToOne(type => ProductEntity, product => product.orderProduct)
    product: ProductEntity;
}
