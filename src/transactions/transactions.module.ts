import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma.service';
import { EmailsService } from 'src/emails.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, AccountsService, EmailsService, ProductsService, UsersService],
})
export class TransactionsModule {}
