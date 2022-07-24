import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactiontypesModule } from './transactiontypes/transactiontypes.module';
import { ProductsModule } from './products/products.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { AccountsModule } from './accounts/accounts.module';
import { AccountTypesModule } from './account-types/account-types.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppResponseTemplate } from './app.interceptor';

@Module({
  imports: [UsersModule, TransactionsModule, TransactiontypesModule, ProductsModule, ProductTypesModule, AccountsModule, AccountTypesModule],
  controllers: [AppController],
  providers: [AppService, {provide: APP_INTERCEPTOR, useClass: AppResponseTemplate }],
})
export class AppModule {}
