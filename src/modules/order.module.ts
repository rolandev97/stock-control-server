import {Module} from "@nestjs/common";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {OrderEntity} from "../models/entities/order.entity";
import {OrderController} from "../controllers/order.controller";
import {OrderService} from "../services/dao-impl/order.service";
import {SectorRepository} from "../repositories/sector.repository";
import {SectorEntity} from "../models/entities/sector.entity";
import {OrderRepository} from "../repositories/order.repository";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity])],
    controllers: [OrderController],
    providers: [OrderService, {
        provide: OrderRepository,
        useFactory: (orderRepository) => new OrderRepository(orderRepository),
        inject: [getRepositoryToken(OrderEntity)]
    }],
    exports: [OrderService]
})
export class OrderModule {}