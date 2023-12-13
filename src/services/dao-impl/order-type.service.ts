import {Injectable} from "@nestjs/common";
import {OrderTypeDto} from "../../models/dto/order-type.dto";
import {PaginationDataDto} from "../../models/dto/pagination-data.dto";
import {OrderTypeDao} from "../dao/order-type.dao";
import {OrderTypeRepository} from "../../repositories/order-type.repository";

@Injectable()
export class OrderTypeService implements OrderTypeDao{

    constructor(private orderTypeRepo: OrderTypeRepository) {
    }

    createOrderType(orderTypeDto: OrderTypeDto): Promise<OrderTypeDto> {
        return this.orderTypeRepo.save(orderTypeDto);
    }

    async checkIfDataExist(): Promise<boolean> {
        const count = await this.orderTypeRepo.count();
        return count === 0;
    }

    deleteOrderType(orderTypeId: string): Promise<boolean> {
        return this.orderTypeRepo.delete(orderTypeId)
            .then(() => Promise.resolve(true)
                .catch(() => Promise.resolve(false)));
    }

    getOrderTypeById(orderTypeId: number): Promise<OrderTypeDto> {
        return this.orderTypeRepo.findOne( { where: {id: orderTypeId}, relations: ["order"] })
            .then( entity => OrderTypeDto.fromEntity(entity));
    }

    async getOrderTypes(page: number, limit: number): Promise<PaginationDataDto<OrderTypeDto>> {
        const skip = (page - 1) * limit;
        const [data, total] = await this.orderTypeRepo.findAndCount({
            skip: skip,
            take: limit
        });
        const totalPages = Math.ceil(total / limit);

        const paginationDataDto = new PaginationDataDto<OrderTypeDto>();
        paginationDataDto.data = data.map((o) => OrderTypeDto.fromEntity(o));
        paginationDataDto.currentPage = page;
        paginationDataDto.totalPages = totalPages;

        return paginationDataDto;
    }

    updateOrderType(orderTypeId: number, orderTypeDto: OrderTypeDto): Promise<OrderTypeDto> {
        return this.orderTypeRepo.update(orderTypeId, orderTypeDto)
            .then(() => this.orderTypeRepo.findOne({where: {id: orderTypeId}, relations: ["order"]}))
            .then(o => OrderTypeDto.fromEntity(o));
    }

}