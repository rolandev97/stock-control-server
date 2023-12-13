import {Module} from "@nestjs/common";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {OrderEntity} from "../models/entities/order.entity";
import {OrderController} from "../controllers/order.controller";
import {OrderService} from "../services/dao-impl/order.service";
import {SectorRepository} from "../repositories/sector.repository";
import {SectorEntity} from "../models/entities/sector.entity";
import {OrderRepository} from "../repositories/order.repository";
import {OrderTypeEntity} from "../models/entities/order-type.entity";
import {OrderTypeService} from "../services/dao-impl/order-type.service";
import {OrderTypeRepository} from "../repositories/order-type.repository";

@Module({
    imports: [TypeOrmModule.forFeature([OrderTypeEntity])],
    controllers: [],
    providers: [OrderTypeService, {
        provide: OrderTypeRepository,
        useFactory: (orderTypRepository) => new OrderTypeRepository(orderTypRepository),
        inject: [getRepositoryToken(OrderTypeEntity)]
    }],
    exports: [OrderTypeService]
})
export class OrderTypeModule {}