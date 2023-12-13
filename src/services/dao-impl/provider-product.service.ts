import {ProviderProductDao} from "../dao/provider-product.dao";
import {Injectable} from "@nestjs/common";
import {ProviderProductDto} from "../../models/dto/provider-product.dto";
import {ProviderProductRepository} from "../../repositories/provider-product.repository";

@Injectable()
export class ProviderProductService implements ProviderProductDao{

    constructor(private ppRepo: ProviderProductRepository) {
    }

    create(providerProduct: ProviderProductDto): Promise<ProviderProductDto> {
        return this.ppRepo.save(providerProduct);
    }

    delete(id: number): Promise<boolean> {
        return this.ppRepo.delete(id)
            .then( ()=> Promise.resolve(true) )
            .catch( ()=> Promise.resolve(false));
    }

}