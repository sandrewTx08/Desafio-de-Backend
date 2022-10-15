import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class TransactionPipe {
  @IsInt()
  @Type(() => Number)
  from_account_id: number;
}

export class TransactionTransferPipe extends TransactionPipe {
  @IsInt()
  @Type(() => Number)
  to_account_id: number;

  @IsInt()
  @Type(() => Number)
  amount: number;
}

export class TransactionDepositPipe extends TransactionPipe {
  @IsInt()
  @Type(() => Number)
  amount: number;
}

export class TransactionBuyPipe extends TransactionPipe {
  @IsInt()
  @Type(() => Number)
  product_id: number;

  @IsInt()
  @Type(() => Number)
  quantity: number;
}
