import {Controller, Get} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {RoleService} from "../services/dao-impl/role.service";

@ApiTags("role")
@Controller("role")
export class RoleController {

    constructor(private roleService: RoleService) {
    }

    @Get("all")
    async getRoles(){
        return await this.roleService.findAll();
    }
}