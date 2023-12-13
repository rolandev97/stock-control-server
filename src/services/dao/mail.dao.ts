import {MailDto} from "../../models/dto/mail.dto";
import {SentMessageInfo} from "nodemailer";

export interface MailDao {
    sendMail(mailDto: MailDto): Promise<SentMessageInfo>;
}