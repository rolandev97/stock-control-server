export class MailDto {
    to: string;
    subject: string;
    content: string;
    htmlContent?: string;
    template?: string;
}