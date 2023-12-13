import {Module} from "@nestjs/common";
import {MailerModule} from "@nestjs-modules/mailer";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MailService} from "../services/dao-impl/mail.service";

@Module({
    imports:[
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get('EMAIL_HOST'),
                    port: configService.get('EMAIL_PORT'),
                    secure: true,
                    auth: {
                        user: configService.get('EMAIL_AUTH_USERNAME'),
                        pass: configService.get('EMAIL_AUTH_PASS')
                    },
                },
                defaults: {
                    from: configService.get('EMAIL_FROM')
                }
            })
        }),
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}