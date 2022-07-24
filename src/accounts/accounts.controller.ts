import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Prisma } from '@prisma/client';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: Prisma.AccountsCreateInput) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.accountsService.findOne({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAccountDto: Prisma.AccountsUpdateInput,
  ) {
    return this.accountsService.update({ id }, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.accountsService.remove({ id });
  }
}
