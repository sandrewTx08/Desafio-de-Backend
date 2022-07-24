import { Accounts, Products } from '@prisma/client';

export type TransactionTransferType = {
  from: Accounts;
  to: Accounts;
  transaction_type: 2;
};

export type TransactionDepositType = { from: Accounts; transaction_type: 1 };

export type TransactionBuyType = {
  to: Accounts;
  from: Accounts;
  product: Products;
  transaction_type: 3;
};
