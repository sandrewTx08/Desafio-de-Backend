import { Accounts, Products } from '@prisma/client';

export enum TransactionCode {
  DEPOSIT = 1,
  TRANSFER = 2,
  BUY = 3,
}

export type TransactionTypeBase<Code extends TransactionCode, T = any> = T & {
  from: Accounts;
  transaction_type: Code;
};

export type TransactionTransferType = TransactionTypeBase<
  TransactionCode.TRANSFER,
  {
    to: Accounts;
  }
>;

export type TransactionDepositType =
  TransactionTypeBase<TransactionCode.DEPOSIT>;

export type TransactionBuyType = TransactionTypeBase<
  TransactionCode.BUY,
  { to: Accounts; product: Products }
>;
