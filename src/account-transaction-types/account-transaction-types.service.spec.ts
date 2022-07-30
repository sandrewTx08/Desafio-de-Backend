import { Test, TestingModule } from '@nestjs/testing';
import { AccountTransactionTypesService } from './account-transaction-types.service';

describe('AccountTransactionTypesService', () => {
  let service: AccountTransactionTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountTransactionTypesService],
    }).compile();

    service = module.get<AccountTransactionTypesService>(AccountTransactionTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
