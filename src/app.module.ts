import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./modules/user.module";
import {AuthModule} from "./modules/auth.module";
import {RoleModule} from "./modules/role.module";
import {MailModule} from "./modules/mail.module";
import {CategoryModule} from "./modules/category.module";
import {SectorModule} from "./modules/sector.module";
import {OrderModule} from "./modules/order.module";
import {ProviderModule} from "./modules/provider.module";
import {ProviderProductModule} from "./modules/provider-product.module";

@Module({
  imports: [
      ConfigModule.forRoot({envFilePath : 'src/config/envi-config.env', isGlobal: true}),

      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              type: "mysql",
              host: configService.get('DATABASE_HOST'),
              port: parseInt(<string>configService.get('DATABASE_PORT')),
              username: configService.get('DATABASE_USERNAME'),
              password: configService.get('DATABASE_PASSWORD'),
              database: configService.get('DATABASE_NAME'),
              entities: ["dist/**/*.entity.js"],
              synchronize: false,
              migrations: ["dist/db/migrations/*.js"],
              logging: true,
          }),
      }),
      UserModule, AuthModule, RoleModule,

      MailModule, CategoryModule, SectorModule,
      OrderModule, ProviderModule, ProviderProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
