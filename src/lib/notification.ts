import {
  SENDGRID_API_KEY,
  SENDGRID_EMAIL_ADDRESS,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} from "../config/constants";
import EmailService from "./email";
import MessageService from "./message";

class NotificationService {
  async sendEmail(to: string, text: string, subject: string) {
    const emailService = new EmailService(
      SENDGRID_API_KEY,
      SENDGRID_EMAIL_ADDRESS
    );

    await emailService.sendEmail(to, subject, text);
  }

  async sendMessage(text: string, to: string) {
    const messageService = new MessageService(
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN
    );

    await messageService.sendMessage(TWILIO_PHONE_NUMBER, to, text);
  }
}

export default new NotificationService();
