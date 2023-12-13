import {MailDao} from "../dao/mail.dao";
import {MailDto} from "../../models/dto/mail.dto";
import {Injectable} from "@nestjs/common";
import {MailerService} from "@nestjs-modules/mailer";
import {SentMessageInfo} from "nodemailer";

@Injectable()
export class MailService implements MailDao{

    constructor(private mailerService: MailerService) {}

    async sendMail(mailDto: MailDto): Promise<SentMessageInfo> {
        const result = await this.mailerService.sendMail({
            to: mailDto.to,
            html: mailDto.htmlContent!,
            subject: mailDto.subject,
            text: mailDto.content,
        })
        return result;
    }

}