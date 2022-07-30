import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountTransactionTypeDto } from './create-account-transaction-type.dto';

export class UpdateAccountTransactionTypeDto extends PartialType(CreateAccountTransactionTypeDto) {}
