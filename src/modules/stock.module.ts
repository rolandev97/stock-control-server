import {Module} from "@nestjs/common";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {StockEntity} from "../models/entities/stock.entity";
import {StockController} from "../controllers/stock.controller";
import {StockService} from "../services/dao-impl/stock.service";
import {StockRepository} from "../repositories/stock.repository";

@Module({
    imports: [TypeOrmModule.forFeature([StockEntity])],
    controllers: [StockController],
    providers: [StockService, {
        provide: StockRepository,
        useFactory: (stockRepository) => new StockRepository(stockRepository),
        inject: [getRepositoryToken(StockEntity)]
    }],
    exports: [StockService]
})
export class StockModule {}