import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Prisma } from '@prisma/client';
import {
  TransactionBuyPipe,
  TransactionDepositPipe,
  TransactionTransferPipe,
} from './transactions.pipe';
import { TransactionsEmailNotification } from './transactions.intercerptor';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Put('/deposit')
  @UseInterceptors(TransactionsEmailNotification)
  deposit(@Body() body: TransactionDepositPipe) {
    return this.transactionsService.deposit(body);
  }

  @Put('/transfer')
  @UseInterceptors(TransactionsEmailNotification)
  transfer(@Body() body: TransactionTransferPipe) {
    return this.transactionsService.transfer(body);
  }

  @Put('/buy')
  @UseInterceptors(TransactionsEmailNotification)
  buy(@Body() body: TransactionBuyPipe) {
    return this.transactionsService.buy(body);
  }

  @Post()
  create(
    @Body() createTransactionDto: Prisma.TransactionsUncheckedCreateInput,
  ) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transactionsService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update({ id }, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.transactionsService.remove({ id });
  }
}
