import {BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "./user.service";
import {UserDto} from "../../models/dto/user.dto";
import {RoleService} from "./role.service";
import * as bcrypt from "bcrypt";
import * as speakeasy from "speakeasy";
import {MailService} from "./mail.service";
import {MailDto} from "../../models/dto/mail.dto";
import {AuthDao} from "../dao/auth.dao";


@Injectable()
export class AuthService implements AuthDao{

    constructor(private jwtService: JwtService,
                private userService: UserService, private mailService: MailService) {}

    async login(email: string, password: string): Promise<any> {
        //Get user by email
        const user = await this.userService.findByEmail(email);
        if(user != null){
            //Check pass is valid
            if(await bcrypt.compare(password, user.password) && user.email == email){
                //Config JWT
                const payload = { sub: user.id, email: user.email, role: user.role};

                return {
                    access_token: await this.jwtService.signAsync(payload, {expiresIn: "1h"}),
                    refresh_token: await this.jwtService.signAsync(payload, {expiresIn: "2h"})
                };
            }else{
                throw new UnauthorizedException();
            }
        }else{
            throw new UnauthorizedException();
        }
    }

    async register(userDto: UserDto): Promise<any> {

        const userInDb = await this.userService.findByEmail(userDto.email);
        if(userInDb == null ){
            //Create user in DB
            userDto.isActive = false;
            const user = await this.userService.createUser(userDto);

            //Generate and Send otp code via mail
            const otpCode = speakeasy.totp({
                secret: process.env.OTP_SECRET as any,
                encoding: "base32",
                algorithm: "sha512",
                step: 300
            });

            const mailDto = new MailDto();
            mailDto.to = user.email;
            mailDto.subject = "Account Activation";
            mailDto.content = "Use this otp code : "+otpCode+" to complet your inscription";
            const sendMailResult = await this.mailService.sendMail(mailDto);
            if(sendMailResult.accepted.length > 0){
                return {
                    message: "OTP code successfully send"
                };
            }
            else {
                throw new BadRequestException("Oops!, OTP Code not send");
            }
        }else{
            throw new BadRequestException("User with this email :"+userInDb.email+" already exist in system.");
        }

    }

    async verifyOtpCode(otpCode: string, email: string): Promise<any> {

        //Get user
        const user = await this.userService.findByEmail(email);

        //Verify otp code
        const otpVerification = speakeasy.totp.verify({
            secret: process.env.OTP_SECRET as any,
            algorithm: "sha512",
            step: 300,
            encoding: "base32",
            token: otpCode
        });

        if(otpVerification){
            user!.isActive = true;
            const userUserData = this.userService.updateUser(user!.id, user!)
            //Config JWT
            const payload = { sub: user?.id, email: user?.email, role: user?.role};

            return {
                access_token: await this.jwtService.signAsync(payload, {expiresIn: "8h"}),
                refresh_token: await this.jwtService.signAsync(payload, {expiresIn: "16h"})
            };
        }else{
            throw new BadRequestException("Wrong OTP code.")
        }
    }

    async forgotPassword(email: string, hostName: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if(user != null){
            //Generate token
            const tokenPayload = { email: user.email };
            const token = await this.jwtService.signAsync(tokenPayload, { expiresIn: "5min" })
            const resetLink = `<a href="${hostName}/reset-password/${token}">Link</a>`;

            //Update user table
            user.tokenResetPassword = token;
            const userUpdated = await this.userService.updateUser(user.id, user);
            console.log(JSON.stringify(userUpdated));

            //Send reset mail to user
            const mailer = new MailDto();
            mailer.to = user.email;
            mailer.htmlContent = `Please click on this link below to reset your password<br>${resetLink}`;
            mailer.subject = "Reset Your Stock Control App Password";
            const sendMail = await this.mailService.sendMail(mailer);
            if(sendMail.accepted.length > 0){
                return { message: 'Email reset password successfully send' }
            }else{
                throw new BadRequestException('Something wrong when sending E-mail, please try again or contact support')
            }

        }else{
            throw new BadRequestException('Email address not exist')
        }
    }

    async resetPassword(newPassword: string, token: string): Promise<any> {
        try {
            console.log(newPassword)
            const payload = await this.jwtService.verifyAsync(token);
            const decodedToken = this.jwtService.decode(token) as any;
            const email = decodedToken?.email;
            const user = await this.userService.findByEmail(email);
            if(user?.tokenResetPassword != null){
                //Encrypt password
                const salt = await bcrypt.genSalt();
                const encryptPass = await bcrypt.hash(newPassword, salt);
                user.password = encryptPass;

                return { message: "Password has been successfully reset!" }
            }
        }catch (e) {
            console.log(e);
            throw new UnauthorizedException('Link are expire, please restart reset password process.');
        }

    }

    async resendOtpCode(email: string): Promise<any> {

        const user = await this.userService.findByEmail(email);

        //Generate and Send otp code via mail
        const otpCode = speakeasy.totp({
            secret: process.env.OTP_SECRET as any,
            encoding: "base32",
            algorithm: "sha512",
            step: 300
        });

        const mailDto = new MailDto();
        mailDto.to = user!.email;
        mailDto.subject = "Account Activation";
        mailDto.content = "Use this otp code : "+otpCode+" to complet your inscription";
        const sendMailResult = await this.mailService.sendMail(mailDto);
        if(sendMailResult.accepted.length > 0){
            return {
                message: "OTP code successfully send"
            };
        }
        else {
            throw new BadRequestException("Oops!, OTP Code not send");
        }
    }


}
