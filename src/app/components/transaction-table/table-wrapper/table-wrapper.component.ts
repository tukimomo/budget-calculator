import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../../models/transaction';
import { mockTransactions } from '../../../../mock-transaction-data';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrl: './table-wrapper.component.scss'
})
export class TableWrapperComponent {
  @Input()
  transactions: Transaction[] = [];

  @Input()
  title: string = '';

  @Output()
  deleteEvent = new EventEmitter<Transaction>();

  delete(transaction: Transaction) {
    this.deleteEvent.emit(transaction);
  }
}
