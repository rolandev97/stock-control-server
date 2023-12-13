import { ProviderDto } from "src/models/dto/provider.dto";
import {ProviderDao} from "../dao/provider.dao";
import {Injectable} from "@nestjs/common";
import {ProviderRepository} from "../../repositories/provider.repository";
import {OrderDto} from "../../models/dto/order.dto";
import {log} from "util";
import {PaginationDataDto} from "../../models/dto/pagination-data.dto";
import {ProductDto} from "../../models/dto/product.dto";

@Injectable()
export class ProviderService implements ProviderDao{

    constructor(private providerRepo: ProviderRepository) {}

    createProvider(providerDto: ProviderDto): Promise<ProviderDto> {
        return this.providerRepo.save(providerDto);
    }

    deleteProvider(providerId: string): Promise<boolean> {
        return this.providerRepo.delete(providerId)
            .then( ()=> Promise.resolve(true) )
            .catch( ()=> Promise.resolve(false));
    }

    getProviderById(providerId: number): Promise<ProviderDto> {
        return this.providerRepo.findOne( { where: {id: providerId}, relations: ["providerProduct"] })
            .then( entity => ProviderDto.fromEntity(entity!));
    }

    async getProviders(page: number, limit: number): Promise<PaginationDataDto<ProviderDto>> {
        const skip = (page - 1) * limit;
        const [data, total] = await this.providerRepo.findAndCount({
            skip: skip,
            take: limit,
            relations: ['providerProduct']
        });
        const totalPages = Math.ceil(total / limit);
        const paginationDataDto = new PaginationDataDto<ProviderDto>();
        paginationDataDto.data = data.map((p) => ProviderDto.fromEntity(p));
        paginationDataDto.currentPage = page;
        paginationDataDto.totalPages = totalPages;

        return paginationDataDto;
    }

    updateProvider(providerId: number, providerDto: ProviderDto): Promise<ProviderDto> {
        return this.providerRepo.update(providerId, providerDto)
            .then(() => this.providerRepo.findOne({where: {id: providerId}, relations: ["providerProduct"]}))
            .then(o => ProviderDto.fromEntity(o!));
    }

}