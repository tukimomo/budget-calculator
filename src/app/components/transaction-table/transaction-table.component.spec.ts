import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTableComponent } from './transaction-table.component';
import { TransactionType } from '../../models/transaction';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

describe('TransactionTableComponent', () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionTableComponent, TransactionFormComponent],
      imports: [
        ToolbarModule,
        TableModule,
        InputNumberModule,
        InputTextModule,
        SelectButtonModule,
        ReactiveFormsModule,
        ButtonModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the income when giving income transaction', () => {
    const fixture = TestBed.createComponent(TransactionTableComponent);
    const app = fixture.componentInstance;
    const mockIncomeTransaction = {
      id: 'mock id',
      name: 'income',
      amount: 1000,
      type: TransactionType.INCOME
    }
    app.add(mockIncomeTransaction)
    fixture.detectChanges()
    expect(app.incomeTransactions.includes(mockIncomeTransaction)).toBeTruthy();
    expect(app.expenseTransactions.includes(mockIncomeTransaction)).toBeFalsy();
    expect(app.totalRemaining).toBe(1000);
  });

  it('should add the expense when giving expense transaction', () => {
    const fixture = TestBed.createComponent(TransactionTableComponent);
    const app = fixture.componentInstance;
    const mockExpenseTransaction = {
      id: 'mock id',
      name: 'expense',
      amount: 1000,
      type: TransactionType.EXPENSE
    }
    app.add(mockExpenseTransaction)
    fixture.detectChanges()
    expect(app.incomeTransactions.includes(mockExpenseTransaction)).toBeFalsy();
    expect(app.expenseTransactions.includes(mockExpenseTransaction)).toBeTruthy();
    expect(app.totalRemaining).toBe(-1000);
  })

  it('should return total remaining equal to total income minus total expense when giving income and expense transactions', () => {
    const fixture = TestBed.createComponent(TransactionTableComponent);
    const app = fixture.componentInstance;
    const mockIncomeTransaction = {
      id: 'mock id 1',
      name: 'income',
      amount: 1000,
      type: TransactionType.INCOME
    }
    const mockExpenseTransaction = {
      id: 'mock id 2',
      name: 'expense',
      amount: 400,
      type: TransactionType.EXPENSE
    }
    app.add(mockIncomeTransaction)
    app.add(mockExpenseTransaction)
    fixture.detectChanges()
    expect(app.incomeTransactions.includes(mockIncomeTransaction)).toBeTruthy();
    expect(app.expenseTransactions.includes(mockExpenseTransaction)).toBeTruthy();
    expect(app.totalRemaining).toBe(600);
  })

  it('should return total remaining equal to 0 when income and expense list are all empty', () => {
    const fixture = TestBed.createComponent(TransactionTableComponent);
    const app = fixture.componentInstance;
    expect(app.incomeTransactions.length).toBe(0);
    expect(app.expenseTransactions.length).toBe(0);
    expect(app.totalRemaining).toBe(0);
  });

  it('should remove income transaction out the list when delete income transaction', () => {
    const fixture = TestBed.createComponent(TransactionTableComponent);
    const app = fixture.componentInstance;
    const mockIncomeTransaction = {
      id: 'mock id 1',
      name: 'income',
      amount: 1000,
      type: TransactionType.INCOME
    }
    const mockExpenseTransaction = {
      id: 'mock id 2',
      name: 'expense',
      amount: 400,
      type: TransactionType.EXPENSE
    }
    app.add(mockIncomeTransaction);
    app.add(mockExpenseTransaction);
    app.delete(mockIncomeTransaction);
    fixture.detectChanges();

    expect(app.incomeTransactions.length).toEqual(0);
    expect(app.totalRemaining).toBe(-400);
  });
});
