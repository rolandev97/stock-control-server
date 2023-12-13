import {OrderTypeDto} from "../../models/dto/order-type.dto";
import {PaginationDataDto} from "../../models/dto/pagination-data.dto";

export interface OrderTypeDao {
    createOrderType(orderTypeDto: OrderTypeDto): Promise<OrderTypeDto>;
    deleteOrderType(orderTypeId: string): Promise<boolean>;
    updateOrderType(orderTypeId: number, orderTypeDto: OrderTypeDto): Promise<OrderTypeDto>;
    getOrderTypeById(orderTypeId: number): Promise<OrderTypeDto>;
    getOrderTypes(page: number, limit: number): Promise<PaginationDataDto<OrderTypeDto>>;
    checkIfDataExist(): Promise<boolean>;
}