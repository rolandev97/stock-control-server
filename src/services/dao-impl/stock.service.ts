import {StockDao} from "../dao/stock.dao";
import {Injectable} from "@nestjs/common";
import {StockDto} from "../../models/dto/stock.dto";
import {StockRepository} from "../../repositories/stock.repository";
import {PaginationDataDto} from "../../models/dto/pagination-data.dto";
import {ProductDto} from "../../models/dto/product.dto";
import {StockEntity} from "../../models/entities/stock.entity";

@Injectable()
export class StockService implements StockDao{

    constructor(private stockRepo: StockRepository) {
    }

    async createStock(stockDto: StockDto): Promise<StockDto> {
        return StockDto.fromEntity(await this.stockRepo.save(stockDto));
    }

    deleteStock(stockId: string): Promise<boolean> {
        return this.stockRepo.delete(stockId)
            .then( ()=> Promise.resolve(true) )
            .catch( ()=> Promise.resolve(false));
    }

    getStockById(stockId: number): Promise<StockDto> {
        return this.stockRepo.findOne( { where: {id: stockId}, relations: ["product"] })
            .then( entity => StockDto.fromEntity(entity!));
    }

    async getStocks(page: number, limit: number): Promise<PaginationDataDto<StockDto>> {
        const skip = (page - 1) * limit;
        const [data, total] = await this.stockRepo.findAndCount({
            skip: skip,
            take: limit,
            relations: ['product']
        });
        const totalPages = Math.ceil(total / limit);

        const paginationDataDto = new PaginationDataDto<StockDto>();
        paginationDataDto.data = data.map((p) => StockDto.fromEntity(p));
        paginationDataDto.currentPage = page;
        paginationDataDto.totalPages = totalPages;

        return paginationDataDto;
    }

    updateStock(stockId: number, stockDto: StockDto): Promise<StockDto> {
        return this.stockRepo.update(stockId, stockDto)
            .then(() => this.stockRepo.findOne({where: {id: stockId}, relations: ["product"]}))
            .then(p => StockDto.fromEntity(p!));
    }

    getStocksWithoutPagination(): Promise<StockDto[]> {
        return this.stockRepo.
        find({relations: ["product"]}).
        then( entity => entity.map( s => StockDto.fromEntity(s)));
    }

}