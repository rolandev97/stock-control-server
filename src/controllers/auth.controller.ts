import {Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Req} from "@nestjs/common";
import {AuthService} from "../services/dao-impl/auth.service";
import {UserDto} from "../models/dto/user.dto";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiGoneResponse,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {MailDto} from "../models/dto/mail.dto";
import {MailService} from "../services/dao-impl/mail.service";
import {Request} from "express";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService, private mailService: MailService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    @ApiOkResponse({ description: "User successful logged"})
    @ApiUnauthorizedResponse({ description: "Unauthorized."})
    async login(@Body('email') email: string, @Body('password') password: string){
        return await this.authService.login(email, password);
    }

    @Post("register")
    @ApiCreatedResponse({ description: "User successful created"})
    @ApiBadRequestResponse({ description: "Bad Request."})
    async register(@Body() userDto: UserDto){
        return await this.authService.register(userDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("verify-otp-code")
    async verifyOtpCode(@Body("otpCode") otpCode: string, @Body("email") email: string){
        return await this.authService.verifyOtpCode(otpCode, email);
    }

    @Post("forgot-password")
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body("email") email : string, @Req() req: Request){
        return await this.authService.forgotPassword(email, `${req.protocol}://localhost:3000`);
    }

    @Post("reset-password")
    @HttpCode(HttpStatus.OK)
    async resetPassword(@Body("newPassword") newPassword: string, @Body("token") token: string){
        return await this.authService.resetPassword(newPassword, token);
    }

    @Post("resend-otp-code")
    @HttpCode(HttpStatus.OK)
    async resendOtpCode(@Body("email") email: string){
        return await this.authService.resendOtpCode(email);
    }

}