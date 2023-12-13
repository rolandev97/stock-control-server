import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Audit} from "../audit";
import {OrderEntity} from "./order.entity";
import {RoleEntity} from "./role.entity";

@Entity({name: 'User'})
export class UserEntity extends Audit {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: '255', nullable: false})
    name: string;
    @Column({type: "varchar", length: '255', nullable: false})
    address: string;
    @Column({type: "varchar", length: '255', nullable: false})
    email: string;
    @Column({type: "varchar", length: '255', nullable: false})
    phoneNumber: string;
    @Column({type: "varchar", length: '255', nullable: false})
    password: string;
    @Column()
    imageUrl: string;
    @Column({default: true})
    isActive: boolean;
    @Column({name: "reset-password-token", length: "1000", nullable: false, unique: false})
    tokenResetPassword: string;

    //relationship
    @OneToMany(type => OrderEntity, order => order.user)
    order: OrderEntity[];
    @ManyToOne(type => RoleEntity, role => role.users, {nullable:false})
    @JoinColumn({name: "roleId"})
    role: RoleEntity;

}
