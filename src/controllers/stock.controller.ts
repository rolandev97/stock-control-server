import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {StockService} from "../services/dao-impl/stock.service";
import {StockDto} from "../models/dto/stock.dto";

@ApiTags("stock")
@Controller("stock")
export class StockController {

    constructor(private stockService: StockService) {
    }

    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    async createStock(@Body() stockDto: StockDto){
        return this.stockService.createStock(stockDto);
    }

    @Delete("delete/:id")
    @HttpCode(HttpStatus.OK)
    async deleteStock(@Param("id") stockId: string){
        return this.stockService.deleteStock(stockId);
    }

    @Patch("update/:id")
    @HttpCode(HttpStatus.OK)
    async updateStock(@Param("id") stockId: string, @Body() stockDto: StockDto){
        return this.stockService.updateStock(Number.parseInt(stockId), stockDto);
    }

    @Get("get-stocks/:page/:limit")
    @HttpCode(HttpStatus.OK)
    async getStocks(@Param("page") page: number, @Param("limit") limit: number){
        return this.stockService.getStocks(page, limit ?? 10);
    }

    @Get("get-stock/:id")
    @HttpCode(HttpStatus.OK)
    async getStock(@Param("id") stockId: string){
        return this.stockService.getStockById(Number.parseInt(stockId));
    }

    @Get("get-all-stock")
    @HttpCode(HttpStatus.OK)
    async getAllStock(){
        return this.stockService.getStocksWithoutPagination();
    }

}