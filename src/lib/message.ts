import twilio, { RequestClient, Twilio } from "twilio";

class MessageService {
  private accoundSid!: string;
  private authToken!: string;
  private messageClient: Twilio | null = null;

  constructor(sid: string, accessToken: string) {
    this.accoundSid = sid;
    this.authToken = accessToken;

    this.messageClient = twilio(this.accoundSid, this.authToken);
  }

  async sendMessage(from: string, to: string, message: string) {
    if (this.messageClient == null)
      throw new Error("No message client available");

    await this.messageClient.messages.create(
      { from, to, body: message },
      (error: Error | null) => {
        if (error === null) return;

        console.error(error);
      }
    );
  }
}

export default MessageService;
