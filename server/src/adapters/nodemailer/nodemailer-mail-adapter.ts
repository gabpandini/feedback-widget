import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "f1bd123ff73e18",
		pass: "784306abf276ee"
	}
  });


export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
		from: 'Equpe Feedget <oi@feedget.com>',
		to: 'Gabriela Pandini <gabipandini123@gmail.com>',
		subject,
		html: body,
	})
    }
}