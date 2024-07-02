import sgMail, { MailService } from "@sendgrid/mail";

class EmailService {
  private mailClient: MailService | null = null;
  private from!: string;

  constructor(apiKey: string, from: string) {
    this.mailClient = sgMail;
    this.mailClient.setApiKey(apiKey);
    this.from = from;
  }

  async sendEmail(to: string, subject: string, text: string) {
    if (this.mailClient === null) return;
    await this.mailClient.send({ from: this.from, subject, to, text });
  }
}

export default EmailService;
