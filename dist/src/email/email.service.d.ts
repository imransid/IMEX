import { MailerService } from '@nestjs-modules/mailer';
type mailOptions = {
    subject: string;
    email: string;
    name: string;
    activationCode: string;
    template: string;
};
export declare class EmailService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendMail({ subject, email, activationCode, template, name, }: mailOptions): Promise<void>;
}
export {};
