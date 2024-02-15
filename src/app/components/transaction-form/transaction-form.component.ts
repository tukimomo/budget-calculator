import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Transaction, TransactionType } from '../../models/transaction';
import {v4 as uuidv4} from 'uuid';
import { UuidGeneratorService } from '../../services/uuid-generator.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent {
  @Output()
  saveEvent = new EventEmitter<Transaction>();
  uuidGeneratorService = inject(UuidGeneratorService);
  transactionTypes = [
    { value: TransactionType.EXPENSE, label: "EXPENSE" },
    { value: TransactionType.INCOME, label: "INCOME" }
  ];
  transactionForm = new FormBuilder().group({
    name: ['', Validators.required],
    amount: [0, Validators.min(0)],
    type: [TransactionType.EXPENSE]
  });

  onSaveTransaction() {
    const transaction: Transaction = {
      id: this.uuidGeneratorService.v4(),
      name: this.transactionForm.get("name")?.value!,
      amount: this.transactionForm.get("amount")?.value || 0,
      type: this.transactionForm.get("type")?.value!
    }
    this.saveEvent.emit(transaction)
  }
}
