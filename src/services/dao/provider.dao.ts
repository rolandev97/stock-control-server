import {ProviderDto} from "../../models/dto/provider.dto";
import {PaginationDataDto} from "../../models/dto/pagination-data.dto";


export interface ProviderDao {
    createProvider(providerDto: ProviderDto): Promise<ProviderDto>;
    deleteProvider(providerId: string): Promise<boolean>;
    updateProvider(providerId: number, providerDto: ProviderDto): Promise<ProviderDto>;
    getProviderById(providerId: number): Promise<ProviderDto>;
    getProviders(page: number, limit: number): Promise<PaginationDataDto<ProviderDto>>;
    getAllProviders(): Promise<ProviderDto[]>;
}