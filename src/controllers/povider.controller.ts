import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from "@nestjs/common";
import {ProviderService} from "../services/dao-impl/provider.service";
import {ProviderDto} from "../models/dto/provider.dto";
import {ApiTags} from "@nestjs/swagger";


@ApiTags("provider")
@Controller("provider")
export class ProviderController{
    constructor(private providerService: ProviderService) {
    }

    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    async createProvider(@Body() providerDto: ProviderDto){
        return this.providerService.createProvider(providerDto);
    }

    @Delete("delete/:id")
    @HttpCode(HttpStatus.OK)
    async deleteProvider(@Param("id") providerId: string){
        return this.providerService.deleteProvider(providerId);
    }

    @Patch("update/:id")
    @HttpCode(HttpStatus.OK)
    async updateProvider(@Param("id") providerId: string, @Body() providerDto: ProviderDto){
        return this.providerService.updateProvider(Number.parseInt(providerId), providerDto);
    }

    @Get("get-providers/:page/:limit")
    @HttpCode(HttpStatus.OK)
    async getProviders(@Param("page") page: number, @Param("limit") limit:number){
        return this.providerService.getProviders(page, limit ?? 10);
    }

    @Get("get-all-providers")
    @HttpCode(HttpStatus.OK)
    async getAllProviders(){
        return this.providerService.getAllProviders();
    }

    @Get("get-provider/:id")
    @HttpCode(HttpStatus.OK)
    async getProvider(@Param("id") providerId: string){
        return this.providerService.getProviderById(Number.parseInt(providerId));
    }
}