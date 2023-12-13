import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from "@nestjs/common";
import {OrderService} from "../services/dao-impl/order.service";
import {OrderDto} from "../models/dto/order.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("order")
@Controller("order")
export class OrderController{
    constructor(private orderService: OrderService) {
    }

    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    async createOrder(@Body() orderDto: OrderDto){
        return this.orderService.createOrder(orderDto);
    }

    @Delete("delete/:id")
    @HttpCode(HttpStatus.OK)
    async deleteOrder(@Param("id") orderId: string){
        return this.orderService.deleteOrder(orderId);
    }

    @Patch("update/:id")
    @HttpCode(HttpStatus.OK)
    async updateOrder(@Param("id") orderId: string, @Body() orderDto: OrderDto){
        return this.orderService.updateOrder(Number.parseInt(orderId), orderDto);
    }

    @Get("get-orders/:page/:limit")
    @HttpCode(HttpStatus.OK)
    async getOrders(@Param("page") page: number, @Param("limit") limit: number){
        return this.orderService.getOrders(page, limit ?? 10);
    }

    @Get("get-order/:id")
    @HttpCode(HttpStatus.OK)
    async getOrder(@Param("id") orderId: string){
        return this.orderService.getOrderById(Number.parseInt(orderId));
    }
}