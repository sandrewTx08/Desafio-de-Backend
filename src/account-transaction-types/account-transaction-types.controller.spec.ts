import { Test, TestingModule } from '@nestjs/testing';
import { AccountTransactionTypesController } from './account-transaction-types.controller';
import { AccountTransactionTypesService } from './account-transaction-types.service';

describe('AccountTransactionTypesController', () => {
  let controller: AccountTransactionTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountTransactionTypesController],
      providers: [AccountTransactionTypesService],
    }).compile();

    controller = module.get<AccountTransactionTypesController>(AccountTransactionTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
