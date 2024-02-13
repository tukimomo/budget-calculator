import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from './models/transaction';

@Pipe({
  name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

  transform(value: "INCOME" | "EXPENSE"): TransactionType {
    return TransactionType[value];
  }

}
