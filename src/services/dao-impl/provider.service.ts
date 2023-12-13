import { ProviderDto } from "src/models/dto/provider.dto";
import {ProviderDao} from "../dao/provider.dao";
import {Injectable} from "@nestjs/common";
import {ProviderRepository} from "../../repositories/provider.repository";
import {OrderDto} from "../../models/dto/order.dto";

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

    getProviders(): Promise<ProviderDto[]> {
        return this.providerRepo.find({relations: ["providerProduct"] })
            .then( entityMap => entityMap.map( providerEntity => ProviderDto.fromEntity(providerEntity)) );
    }

    updateProvider(providerId: number, providerDto: ProviderDto): Promise<ProviderDto> {
        return this.providerRepo.update(providerId, providerDto)
            .then(() => this.providerRepo.findOne({where: {id: providerId}, relations: ["providerProduct"]}))
            .then(o => ProviderDto.fromEntity(o!));
    }

}