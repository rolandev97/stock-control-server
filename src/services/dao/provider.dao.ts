import {ProviderDto} from "../../models/dto/provider.dto";


export interface ProviderDao {
    createProvider(providerDto: ProviderDto): Promise<ProviderDto>;
    deleteProvider(providerId: string): Promise<boolean>;
    updateProvider(providerId: number, providerDto: ProviderDto): Promise<ProviderDto>;
    getProviderById(providerId: number): Promise<ProviderDto>;
    getProviders(): Promise<ProviderDto[]>;
}