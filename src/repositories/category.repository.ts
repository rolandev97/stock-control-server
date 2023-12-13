import {Repository} from "typeorm";
import {CategoryEntity} from "../models/entities/category.entity";
import {InjectRepository} from "@nestjs/typeorm";

export class CategoryRepository extends Repository<CategoryEntity>{
    constructor(
        @InjectRepository(CategoryEntity)
        private catRepository: Repository<CategoryEntity>
    ) {
        super(catRepository.target, catRepository.manager, catRepository.queryRunner);
    }
}