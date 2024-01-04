import {CategoryDao} from "../dao/category.dao";
import {CategoryDto} from "../../models/dto/category.dto";
import {Injectable} from "@nestjs/common";
import {CategoryRepository} from "../../repositories/category.repository";

@Injectable()
export class CategoryService implements CategoryDao{

    constructor(private catRepository: CategoryRepository) {}

    createCategory(cat: any): Promise<CategoryDto> {
        return this.catRepository.save(cat);
    }

    async checkIfDataExist(): Promise<boolean> {
        const count = await this.catRepository.count();
        return count === 0;
    }

    getCategories(): Promise<CategoryDto[]> {
        return this.catRepository.find({ relations: ["sector", "product"]})
            .then( entity => entity.map( c => CategoryDto.fromEntity(c)));
    }

}