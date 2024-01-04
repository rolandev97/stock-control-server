import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {CategoryService} from "../../services/dao-impl/category.service";
import {ApiTags} from "@nestjs/swagger";


@ApiTags("category")
@Controller('category')
export class CategoryController {

    constructor(private catService: CategoryService) {}

    @Get("get-all-categories")
    @HttpCode(HttpStatus.OK)
    async getCategories(){
        return await this.catService.getCategories();
    }
}
