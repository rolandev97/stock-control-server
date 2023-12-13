import {Module} from "@nestjs/common";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../models/entities/user.entity";
import {UserService} from "../services/dao-impl/user.service";
import {UserRepository} from "../repositories/user.repository";
import {UserController} from "../controllers/user.controller";
import { AuthModule } from './auth.module';
import {RoleModule} from "./role.module";
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as fs from 'fs';
import { extname, join } from 'path';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MailModule} from "./mail.module";


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule, MailModule,
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                storage: diskStorage({
                    destination: (req, file, callback) => {
                        const path = configService.get("PATH_STORAGE");
                        fs.mkdirSync(path, { recursive: true});
                        return callback(null, path);

                    },
                    filename: (req, file, cb) => {
                        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                        return cb(null, `${randomName}${extname(file.originalname)}`);
                    }
                })
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [UserController],
    providers: [UserService, {
        provide: UserRepository,
        useFactory: (userRepository) => new UserRepository(userRepository),
        inject: [getRepositoryToken(UserEntity)],
    }],
    exports: [UserService]
})
export class UserModule {}