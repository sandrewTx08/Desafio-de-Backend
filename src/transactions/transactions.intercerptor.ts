import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { EmailsService } from 'src/emails.service';
import { UsersService } from 'src/users/users.service';
import {
  TransactionBuyType,
  TransactionDepositType,
  TransactionTransferType,
} from './transactions.types';

@Injectable()
export class TransactionBuyEmailNotification implements NestInterceptor {
  constructor(
    private readonly emailService: EmailsService,
    private readonly userService: UsersService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<TransactionBuyType>) {
    return next.handle().pipe(
      tap(async (data) => {
        const [from_user, to_user] = await Promise.all([
          this.userService.findOne({
            id: data.from.id,
          }),
          this.userService.findOne({
            id: data.to.id,
          }),
        ]);

        await Promise.all([
          this.emailService.sendByGmailProvider({ to: from_user.email }),
          this.emailService.sendByGmailProvider({ to: to_user.email }),
        ]);
      }),
    );
  }
}

@Injectable()
export class TransactionDepositEmailNotification implements NestInterceptor {
  constructor(
    private readonly emailService: EmailsService,
    private readonly userService: UsersService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<TransactionDepositType>,
  ) {
    return next.handle().pipe(
      tap(async (data) => {
        const from_user = await this.userService.findOne({
          id: data.from.id,
        });

        this.emailService.sendByGmailProvider({
          to: from_user.email,
        });
      }),
    );
  }
}

@Injectable()
export class TransactionTransferEmailNotification implements NestInterceptor {
  constructor(
    private readonly emailService: EmailsService,
    private readonly userService: UsersService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<TransactionTransferType>,
  ) {
    return next.handle().pipe(
      tap(async (data) => {
        const [from_user, to_user] = await Promise.all([
          this.userService.findOne({
            id: data.from.id,
          }),
          this.userService.findOne({
            id: data.to.id,
          }),
        ]);

        await Promise.all([
          this.emailService.sendByGmailProvider({ to: from_user.email }),
          this.emailService.sendByGmailProvider({ to: to_user.email }),
        ]);
      }),
    );
  }
}
