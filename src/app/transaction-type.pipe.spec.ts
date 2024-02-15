import { TransactionType } from './models/transaction';
import { TransactionTypePipe } from './transaction-type.pipe';

describe('TransactionTypePipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionTypePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return transaction type expense when passing in expense string', () => {
    expect(new TransactionTypePipe().transform("EXPENSE")).toBe(TransactionType.EXPENSE);
  });

  it('should return transaction type expense when passing in income string', () => {
    expect(new TransactionTypePipe().transform("INCOME")).toBe(TransactionType.INCOME);
  });
});
