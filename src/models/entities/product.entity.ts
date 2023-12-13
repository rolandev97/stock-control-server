import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {Audit} from "../audit";
import {OrderEntity} from "./order.entity";
import {OrderProductEntity} from "./order-product.entity";
import {StockEntity} from "./stock.entity";
import {ProviderProductEntity} from "./provider-product.entity";
import {CategoryEntity} from "./category.entity";

@Entity({name: 'Product'})
export class ProductEntity extends Audit{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', nullable: false, length: '255'})
    name: string;
    @Column({type: 'varchar', nullable: false, length: '255'})
    description: string;
    @Column({type: 'int', nullable: false})
    price: number;

    @OneToMany(type => OrderProductEntity, orderProduct => orderProduct.product)
    orderProduct: OrderProductEntity[];
    @OneToMany(type => StockEntity, s => s.product)
    stock: StockEntity[];
    @OneToMany(type => ProviderProductEntity, providerProduct => providerProduct.product)
    providerProduct: ProviderProductEntity[];
    @ManyToOne(type => CategoryEntity, category => category.product)
    category: CategoryEntity;
}
