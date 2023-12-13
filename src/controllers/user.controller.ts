import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post, Req,
    Res, UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {UserDto} from "../models/dto/user.dto";
import {UserService} from "../services/dao-impl/user.service";
import {TransformInterceptor} from "../helpers/transform.interceptor";
import {ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {Request} from "express";

@ApiTags("user")
@Controller("user")
export class UserController {

    constructor(private userService: UserService) {}

    @Get("all")
    async findAllUsers(): Promise<UserDto[]>{
        return await this.userService.findAllUsers();
    }

    @Delete("delete/:id")
    async deleteUser(@Param("id") id: number): Promise<boolean>{
        return await this.userService.deleteUser(id);
    }

    @Patch("update/:id")
    async updateUser(@Param("id") id: number, @Body() updateData: UserDto): Promise<UserDto>{
        return await this.userService.updateUser(id, updateData);
    }

    @Get("get/:id")
    //@HttpCode(HttpStatus.OK)
    async getUserById(@Param("id") id: number){
        return await this.userService.getUser(id);
    }

    @Post("upload-file")
    @UseInterceptors(FileInterceptor('file'))
    @HttpCode(HttpStatus.OK)
    async uploadProfilPicture(@UploadedFile() file: Express.Multer.File, @Body("userId") userId: string,
                              @Req() req: Request){
        const userData = await this.userService.getUser(Number.parseInt(userId));
        //Create image url
        const imageUrl = `${req.protocol}://${req.get("host")}${process.env.SERVE_STATIC_IMAGE_URL}/${file.filename}`;
        userData.imageUrl = imageUrl;

        return await this.userService.updateUser(userData.id, userData);

    }

    @Patch("change-password/:userId")
    async changePassword(@Param("userId") userId: string, @Body("oldPassword") oldPassword: string, @Body("newPassword") newPassword: string){
        return await this.userService.changePassword(oldPassword, newPassword, userId);
    }

    @Post("create")
    async createUserWithRole(@Body() user: UserDto) {
        return await this.userService.createUser(user);
    }

}