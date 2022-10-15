import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ERROR_NO_FUNDS } from 'src/transactions/transactions.exception';

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
    return this.prisma.accountTransactionTypes
      .findFirst({ where })
      .then((data) => ({
        ...data,

        fee(amount: number) {
          const fee = data.fee_percentage
            .mul(amount)
            .div(100)
            .add(data.fee_fixed);

          if (fee.gt(amount)) throw ERROR_NO_FUNDS;
          return fee;
        },
      }));
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
