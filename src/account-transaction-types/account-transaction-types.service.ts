import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccountTransactionTypesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.AccountTransactionTypesCreateInput) {
    return this.prisma.accountTransactionTypes.create({ data });
  }

  findAll() {
    return this.prisma.accountTransactionTypes.findMany();
  }

  findOne(where: Prisma.AccountTransactionTypesWhereInput) {
    return this.prisma.accountTransactionTypes.findFirst({ where });
  }

  update(
    where: Prisma.AccountTransactionTypesWhereUniqueInput,
    data: Prisma.AccountTransactionTypesUpdateInput,
  ) {
    return this.prisma.accountTransactionTypes.update({ where, data });
  }

  remove(where: Prisma.AccountTransactionTypesWhereUniqueInput) {
    return this.prisma.accountTransactionTypes.delete({ where });
  }
}
