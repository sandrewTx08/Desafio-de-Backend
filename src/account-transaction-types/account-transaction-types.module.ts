import { Module } from '@nestjs/common';
import { AccountTransactionTypesService } from './account-transaction-types.service';
import { AccountTransactionTypesController } from './account-transaction-types.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AccountTransactionTypesController],
  providers: [AccountTransactionTypesService, PrismaService]
})
export class AccountTransactionTypesModule {}
