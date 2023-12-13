import {BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn} from "typeorm";

export class Audit{
    @BeforeInsert()
    createdBy: string;
    @BeforeUpdate()
    updatedBy: string;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;
}