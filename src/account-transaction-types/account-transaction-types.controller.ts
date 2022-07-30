import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountTransactionTypesService } from './account-transaction-types.service';
import { Prisma } from '@prisma/client';

@Controller('accountTransactionTypes')
export class AccountTransactionTypesController {
  constructor(
    private readonly accountTransactionTypesService: AccountTransactionTypesService,
  ) {}

  @Post()
  create(
    @Body()
    createAccountTransactionTypeDto: Prisma.AccountTransactionTypesCreateInput,
  ) {
    return this.accountTransactionTypesService.create(
      createAccountTransactionTypeDto,
    );
  }

  @Get()
  findAll() {
    return this.accountTransactionTypesService.findAll();
  }

  @Get(':account_type_id/:transaction_type_id')
  findOne(
    @Param('account_type_id') account_type_id: number,
    @Param('transaction_type_id') transaction_type_id: number,
  ) {
    return this.accountTransactionTypesService.findOne({
      account_type_id,
      transaction_type_id,
    });
  }

  @Patch(':id')
  update(
    @Param('account_type_id') account_type_id: number,
    @Param('transaction_type_id') transaction_type_id: number,
    @Body()
    updateAccountTransactionTypeDto: Prisma.AccountTransactionTypesUpdateInput,
  ) {
    return this.accountTransactionTypesService.update(
      {
        account_type_id_transaction_type_id: {
          account_type_id,
          transaction_type_id,
        },
      },
      updateAccountTransactionTypeDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('account_type_id') account_type_id: number,
    @Param('transaction_type_id') transaction_type_id: number,
  ) {
    return this.accountTransactionTypesService.remove({
      account_type_id_transaction_type_id: {
        account_type_id,
        transaction_type_id,
      },
    });
  }
}
