import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from "@nestjs/common";
import {ProductService} from "../services/dao-impl/product.service";
import {ProductDto} from "../models/dto/product.dto";

@ApiTags("product")
@Controller("product")
export class ProductController {

    constructor(private productService: ProductService) {
    }

    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() productDto: ProductDto){
        return this.productService.createProduct(productDto);
    }

    @Delete("delete/:id")
    @HttpCode(HttpStatus.OK)
    async deleteProduct(@Param("id") productId: string){
        return this.productService.deleteProduct(productId);
    }

    @Patch("update/:id")
    @HttpCode(HttpStatus.OK)
    async updateProduct(@Param("id") productId: string, @Body() productDto: ProductDto){
        return this.productService.updateProduct(Number.parseInt(productId), productDto);
    }

    @Get("get-products/:page/:limit")
    @HttpCode(HttpStatus.OK)
    async getProducts(@Param("page") page: number, @Param("limit") limit: number){
        return this.productService.getProducts(page, limit ?? 10);
    }

    @Get("get-product/:id")
    @HttpCode(HttpStatus.OK)
    async getProduct(@Param("id") productId: string){
        return this.productService.getProductById(Number.parseInt(productId));
    }
}