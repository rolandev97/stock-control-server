import {OrderDto} from "../../models/dto/order.dto";
import {PaginationDataDto} from "../../models/dto/pagination-data.dto";

export interface OrderDao {
    createOrder(orderDto: OrderDto): Promise<OrderDto>;
    deleteOrder(orderId: string): Promise<boolean>;
    updateOrder(orderId: number, orderDto: OrderDto): Promise<OrderDto>;
    getOrderById(orderId: number): Promise<OrderDto>;
    getOrders(page: number, limit: number): Promise<PaginationDataDto<OrderDto>>;
}