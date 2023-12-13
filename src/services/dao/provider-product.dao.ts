import {ProviderProductDto} from "../../models/dto/provider-product.dto";

export interface ProviderProductDao {
    create(providerProduct: ProviderProductDto): Promise<ProviderProductDto>;
    delete(id: number): Promise<boolean>;
}