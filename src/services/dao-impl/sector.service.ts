import {SectorDao} from "../dao/sector.dao";
import {Injectable} from "@nestjs/common";
import {SectorDto} from "../../models/dto/sector.dto";
import {SectorRepository} from "../../repositories/sector.repository";

@Injectable()
export class SectorService implements SectorDao{

    constructor(private sectorCategory: SectorRepository) {
    }

    async checkIfDataExist(): Promise<boolean> {
        const count = await this.sectorCategory.count();
        return count === 0;
    }

    createSector(sector: any): Promise<SectorDto> {
        return this.sectorCategory.save(sector);
    }

}