import {CategoryDto} from "../../models/dto/category.dto";

export interface CategoryDao {
    createCategory(cat: any): Promise<CategoryDto>;
    checkIfDataExist(): Promise<boolean>;
}