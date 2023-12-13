import {OrderDao} from "../dao/order.dao";
import {Injectable} from "@nestjs/common";
import {OrderDto} from "../../models/dto/order.dto";
import {OrderRepository} from "../../repositories/order.repository";
import {UserDto} from "../../models/dto/user.dto";
import {PaginationDataDto} from "../../models/dto/pagination-data.dto";

@Injectable()
export class OrderService implements OrderDao{

    constructor(private orderRepo: OrderRepository) {
    }

    createOrder(orderDto: OrderDto): Promise<OrderDto> {
        return this.orderRepo.save(orderDto);
    }

    deleteOrder(orderId: string): Promise<boolean> {
        return this.orderRepo.delete(orderId)
            .then(() => Promise.resolve(true)
                .catch(() => Promise.resolve(false)));
    }

    getOrderById(orderId: number): Promise<OrderDto> {
        return this.orderRepo.findOne( { where: {id: orderId}, relations: ["user"] })
            .then( entity => OrderDto.fromEntity(entity));
    }

    async getOrders(page: number, limit: number): Promise<PaginationDataDto<OrderDto>> {
        const skip = (page - 1) * limit;
        const [data, total] = await this.orderRepo.findAndCount({
            skip: skip,
            take: limit
        });
        const totalPages = Math.ceil(total / limit);

        const paginationDataDto = new PaginationDataDto<OrderDto>();
        paginationDataDto.data = data.map((o) => OrderDto.fromEntity(o));
        paginationDataDto.currentPage = page;
        paginationDataDto.totalPages = totalPages;

        return paginationDataDto;
    }

    updateOrder(orderId: number, orderDto: OrderDto): Promise<OrderDto> {
        return this.orderRepo.update(orderId, orderDto)
            .then(() => this.orderRepo.findOne({where: {id: orderId}, relations: ["user"]}))
            .then(o => OrderDto.fromEntity(o));
    }

}