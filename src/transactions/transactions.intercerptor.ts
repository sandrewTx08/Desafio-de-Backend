import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailsService } from 'src/emails.service';
import { UsersService } from 'src/users/users.service';
import {
  TransactionBuyType,
  TransactionDepositType,
  TransactionTransferType,
} from './transactions.types';

@Injectable()
export class TransactionsEmailNotification implements NestInterceptor {
  constructor(
    private readonly emailService: EmailsService,
    private readonly userService: UsersService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map(async (data) => {
        {
          switch (data.transaction_type) {
            case 1: {
              const from_user = await this.userService.findOne({
                id: (<TransactionDepositType>data).from.id,
              });

              return this.emailService.sendByGmailProvider({
                to: from_user.email,
              });
            }

            case 2: {
              const [from_user, to_user] = await Promise.all([
                this.userService.findOne({
                  id: (<TransactionTransferType>data).from.id,
                }),
                this.userService.findOne({
                  id: (<TransactionTransferType>data).to.id,
                }),
              ]);

              const [from_user_email, to_user_email] = await Promise.all([
                this.emailService.sendByGmailProvider({ to: from_user.email }),
                this.emailService.sendByGmailProvider({ to: to_user.email }),
              ]);
            }

            case 3: {
              const [from_user, to_user] = await Promise.all([
                this.userService.findOne({
                  id: (<TransactionBuyType>data).from.id,
                }),
                this.userService.findOne({
                  id: (<TransactionBuyType>data).to.id,
                }),
              ]);

              const [from_user_email, to_user_email] = await Promise.all([
                this.emailService.sendByGmailProvider({ to: from_user.email }),
                this.emailService.sendByGmailProvider({ to: to_user.email }),
              ]);
            }
          }
        }
      }),
    );
  }
}
