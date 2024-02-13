import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { mockTransactions } from '../mock-transaction-data';
import { Transaction, TransactionType } from './models/transaction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  transactionTypes: TransactionType[] = [
    TransactionType.EXPENSE,
    TransactionType.INCOME
  ];
  transactionForm = new FormBuilder().group({
    name: ['', Validators.required],
    amount: ['', Validators.min(0)],
    type: [TransactionType.INCOME]
  });
  transactions: Transaction[] = [];
  incomeTransactions: Transaction[] = this.transactions.filter(transaction => transaction.type == TransactionType.INCOME)
  expenseTransactions: Transaction[] = this.transactions.filter(transaction => transaction.type == TransactionType.EXPENSE)
  totalRemaining = 0;

  ngOnInit(): void {
    this.totalRemaining = this.calculateRemaining();
  }

  add(transaction: Transaction) {
    if (transaction.type == TransactionType.INCOME) {
      this.incomeTransactions.push(transaction)
    } else {
      this.expenseTransactions.push(transaction)
    }
    this.totalRemaining = this.calculateRemaining();
  }

  delete(transaction: Transaction) {
    if (transaction.type == TransactionType.EXPENSE) {
      this.expenseTransactions = this.expenseTransactions.filter(t => t != transaction)

    } else {
      this.incomeTransactions = this.incomeTransactions.filter(t => t != transaction)
    }
    this.totalRemaining = this.calculateRemaining();
  }

  calculateRemaining(): number {
    return this.incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
      - this.expenseTransactions.reduce((sum, transaction) => sum += transaction.amount, 0);
  }
}
