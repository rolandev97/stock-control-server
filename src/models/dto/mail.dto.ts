import { ApiProperty } from "@nestjs/swagger";

export class MailDto {
    @ApiProperty()
    to: string;
    @ApiProperty()
    subject: string;
    @ApiProperty()
    content: string;
    @ApiProperty()
    htmlContent?: string;
    @ApiProperty()
    template?: string;
}