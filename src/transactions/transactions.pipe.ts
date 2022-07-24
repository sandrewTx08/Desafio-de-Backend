import { Type } from 'class-transformer';
import { IsInt, Max } from 'class-validator';

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
  @Max(2000)
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
