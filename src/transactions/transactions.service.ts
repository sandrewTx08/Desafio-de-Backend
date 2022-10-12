import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AccountTransactionTypesService } from 'src/account-transaction-types/account-transaction-types.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { PrismaService } from 'src/prisma.service';
import { ProductsService } from 'src/products/products.service';
import {
  ERROR_NO_FUNDS,
  ERROR_USER_TRANSFER,
  ERROR_YOURSELF_TRANSFER,
} from './transactions.exception';
import {
  TransactionBuyPipe,
  TransactionDepositPipe,
  TransactionTransferPipe,
} from './transactions.pipe';
import {
  TransactionBuyType,
  TransactionCode,
  TransactionDepositType,
  TransactionTransferType,
} from './transactions.types';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accountService: AccountsService,
    private readonly productService: ProductsService,
    private readonly accountTransactionTypeService: AccountTransactionTypesService,
  ) {}

  async transfer(
    data: TransactionTransferPipe,
  ): Promise<TransactionTransferType> {
    const { from_account_id, to_account_id, amount } = data;

    if (from_account_id === to_account_id) throw ERROR_YOURSELF_TRANSFER;

    const [from, to] = await this.prisma.$transaction([
      this.accountService.findOne({ id: from_account_id }),
      this.accountService.findOne({ id: to_account_id }),
    ]);

    if (!to || !from) throw ERROR_USER_TRANSFER;

    const { fee_percentage, fee_fixed } =
      await this.accountTransactionTypeService.findOne({
        account_type_id: from.account_type_id,
        transaction_type_id: TransactionCode.TRANSFER,
      });

    const from_balance = from.balance.toNumber();
    const from_transfer_fee = Math.abs(
      amount * fee_percentage.toNumber() - fee_fixed.toNumber(),
    );
    const from_tranfer_balance = from_balance - amount - from_transfer_fee;

    if (from_tranfer_balance < amount) throw ERROR_NO_FUNDS;

    const to_balance = to.balance.toNumber();

    const [to_update, from_update] = await this.prisma.$transaction([
      this.accountService.update(
        { id: to_account_id },
        { balance: to_balance + amount },
      ),
      this.accountService.update(
        { id: from_account_id },
        { balance: from_tranfer_balance },
      ),
      this.create({
        amount,
        from_account_id,
        to_account_id,
        transaction_type: TransactionCode.TRANSFER,
      }),
    ]);

    return {
      to: to_update,
      from: from_update,
      transaction_type: TransactionCode.TRANSFER,
    };
  }

  async deposit(data: TransactionDepositPipe): Promise<TransactionDepositType> {
    const { from_account_id, amount } = data;

    const from = await this.accountService.findOne({
      id: from_account_id,
    });

    const { fee_percentage, fee_fixed } =
      await this.accountTransactionTypeService.findOne({
        account_type_id: from.account_type_id,
        transaction_type: TransactionCode.DEPOSIT,
      } as Prisma.AccountTransactionTypesWhereInput);

    const balance = from.balance.toNumber();
    const deposit_fee = Math.abs(
      amount * fee_percentage.toNumber() - fee_fixed.toNumber(),
    );

    const [from_update] = await this.prisma.$transaction([
      this.accountService.update(
        { id: from_account_id },
        { balance: balance + amount - deposit_fee },
      ),
      this.create({
        amount,
        from_account_id,
        transaction_type: TransactionCode.DEPOSIT,
      }),
    ]);

    return { from: from_update, transaction_type: TransactionCode.DEPOSIT };
  }

  async buy(data: TransactionBuyPipe): Promise<TransactionBuyType> {
    const { from_account_id, product_id, quantity } = data;

    const product = await this.productService.findOne({ id: product_id });
    const product_price = product.price.toNumber();
    const price = product_price * quantity;

    if (from_account_id === product.account_id) throw ERROR_YOURSELF_TRANSFER;

    const [from, to] = await this.prisma.$transaction([
      this.accountService.findOne({ id: from_account_id }),
      this.accountService.findOne({ id: product.account_id }),
    ]);

    const from_balance = from.balance.toNumber();
    if (from_balance < price) throw ERROR_NO_FUNDS;
    const from_amount = from_balance - price;

    const to_balance = to.balance.toNumber();
    const to_amount = to_balance + price;

    const [product_update, to_update, from_update] =
      await this.prisma.$transaction([
        this.productService.update(
          { id: product_id },
          { quantity: product.quantity - quantity },
        ),
        this.accountService.update(
          { id: product.account_id },
          { balance: to_amount },
        ),
        this.accountService.update(
          { id: from_account_id },
          { balance: from_amount },
        ),
        this.create({
          amount: from_amount,
          from_account_id,
          to_account_id: product.account_id,
          transaction_type: TransactionCode.BUY,
        }),
      ]);

    return {
      to: to_update,
      from: from_update,
      product: product_update,
      transaction_type: TransactionCode.BUY,
    };
  }

  create(data: Prisma.TransactionsUncheckedCreateInput) {
    return this.prisma.transactions.create({ data });
  }

  findAll() {
    return this.prisma.transactions.findMany();
  }

  DAY = 1000 * 60 * 60 * 24;
  findDays(where: Prisma.TransactionsWhereInput, numberOfDays: number) {
    const gte = new Date(
      new Date().getMilliseconds() - this.DAY * numberOfDays,
    );
    return this.prisma.transactions.findMany({
      where: { ...where, date: { gte } },
    });
  }

  WEEK = 1000 * 60 * 60 * 24 * 7;
  findWeeks(where: Prisma.TransactionsWhereInput, numberOfWeeks: number) {
    const gte = new Date(
      new Date().getMilliseconds() - this.WEEK * numberOfWeeks,
    );
    return this.prisma.transactions.findMany({
      where: { ...where, date: { gte } },
    });
  }

  findOne(where: Prisma.TransactionsWhereInput) {
    return this.prisma.transactions.findFirst({ where });
  }

  update(
    where: Prisma.TransactionsWhereUniqueInput,
    data: Prisma.TransactionsUpdateInput,
  ) {
    return this.prisma.transactions.update({ where, data });
  }

  remove(where: Prisma.TransactionsWhereUniqueInput) {
    return this.prisma.transactions.delete({ where });
  }
}
