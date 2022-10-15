import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailsService {
  sendByGmailProvider<T, M extends Mail<T>['options']>(
    mailInfo: Omit<M, 'from'>,
  ) {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    return transporter.sendMail({
      ...mailInfo,
      from: process.env.GMAIL_USER,
    });
  }
}
