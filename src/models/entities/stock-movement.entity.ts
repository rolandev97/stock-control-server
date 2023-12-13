import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'StockMovement'})
export class StockMovementEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;
}
