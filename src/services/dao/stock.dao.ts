import {StockDto} from "../../models/dto/stock.dto";
import {PaginationDataDto} from "../../models/dto/pagination-data.dto";

export interface StockDao{
    createStock(stockDto: StockDto): Promise<StockDto>;
    deleteStock(stockId: string): Promise<boolean>;
    updateStock(stockId: number, stockDto: StockDto): Promise<StockDto>;
    getStockById(stockId: number): Promise<StockDto>;
    getStocks(page: number, limit: number): Promise<PaginationDataDto<StockDto>>;
}