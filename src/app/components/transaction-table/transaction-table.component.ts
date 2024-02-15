import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionType, Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss'
})
export class TransactionTableComponent implements OnInit {
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
