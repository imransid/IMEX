import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
type mailOptions = {
  subject: string;
  email: string;
  name: string;
  activationCode: string;
  template: string;
};

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail({
    subject,
    email,
    activationCode,
    template,
    name,
  }: mailOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        name,
        activationCode,
      },
    });
  }
}
