import {Repository} from "typeorm";
import {SectorEntity} from "../models/entities/sector.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../models/entities/user.entity";

export class SectorRepository extends Repository<SectorEntity>{
    constructor(
        @InjectRepository(SectorEntity)
        private sectorRepository: Repository<SectorEntity>
    ) {
        super(sectorRepository.target, sectorRepository.manager, sectorRepository.queryRunner);
    }
}