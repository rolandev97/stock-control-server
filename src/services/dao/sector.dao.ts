import {CategoryDto} from "../../models/dto/category.dto";
import {SectorDto} from "../../models/dto/sector.dto";

export interface SectorDao {
    createSector(sector: any): Promise<SectorDto>;
    checkIfDataExist(): Promise<boolean>;
}