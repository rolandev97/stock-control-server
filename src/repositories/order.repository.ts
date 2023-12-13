import {Repository} from "typeorm";
import {OrderEntity} from "../models/entities/order.entity";
import {InjectRepository} from "@nestjs/typeorm";

export class OrderRepository extends Repository<OrderEntity>{
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepo: Repository<OrderEntity>
    ) {
        super(orderRepo.target, orderRepo.manager, orderRepo.queryRunner);
    }
}