import {Repository} from "typeorm";
import {OrderEntity} from "../models/entities/order.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderTypeEntity} from "../models/entities/order-type.entity";

export class OrderTypeRepository extends Repository<OrderTypeEntity>{
    constructor(
        @InjectRepository(OrderTypeEntity)
        private orderRepo: Repository<OrderTypeEntity>
    ) {
        super(orderRepo.target, orderRepo.manager, orderRepo.queryRunner);
    }
}