import { Module } from '@nestjs/common';
import {AuthService} from "../services/dao-impl/auth.service";
import {AuthController} from "../controllers/auth.controller";
import {UserModule} from "./user.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RoleModule} from "./role.module";
import {MailModule} from "./mail.module";

@Module({
    imports: [
        UserModule,
        ConfigModule,
        MailModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get('JWT_SECRET_KEY'),
            }),
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
