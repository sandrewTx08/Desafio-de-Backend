import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountTypesService } from './account-types.service';
import { Prisma } from '@prisma/client';

@Controller('accountTypes')
export class AccountTypesController {
  constructor(private readonly accountTypesService: AccountTypesService) {}

  @Post()
  create(@Body() createAccountTypeDto: Prisma.AccountTypesCreateInput) {
    return this.accountTypesService.create(createAccountTypeDto);
  }

  @Get()
  findAll() {
    return this.accountTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.accountTypesService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAccountTypeDto: Prisma.AccountTypesUpdateInput,
  ) {
    return this.accountTypesService.update({ id }, updateAccountTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.accountTypesService.remove({ id });
  }
}
