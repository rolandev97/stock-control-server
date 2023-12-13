import {InjectRepository} from "@nestjs/typeorm";
import {StockEntity} from "../models/entities/stock.entity";
import {Repository} from "typeorm";

export class StockRepository extends Repository<StockEntity>{
    constructor(
        @InjectRepository(StockEntity)
        private stockRepo: StockRepository
    ) {
        super(stockRepo.target, stockRepo.manager, stockRepo.queryRunner)
    }
}