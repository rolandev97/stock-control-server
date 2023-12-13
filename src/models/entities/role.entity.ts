import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";
import {Audit} from "../audit";

@Entity({name: 'roles'})
export class RoleEntity extends Audit{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: "varchar", nullable: false})
    name: string;

    @OneToMany(type => UserEntity, user => user.role)
    users: UserEntity[];
}
