import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionTypePipe } from './transaction-type.pipe';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TransactionType } from './models/transaction';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

describe('AppComponent', () => {
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToolbarModule,
        TableModule,
        InputNumberModule,
        InputTextModule,
        SelectButtonModule,
        ReactiveFormsModule,
        ButtonModule
      ],
      declarations: [
        AppComponent,
        TransactionTypePipe,
        TransactionFormComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should add the income when giving income transaction', () => {
    const fixture = TestBed.createComponent(AppComponent);
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
    const fixture = TestBed.createComponent(AppComponent);
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
    const fixture = TestBed.createComponent(AppComponent);
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
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.incomeTransactions.length).toBe(0);
    expect(app.expenseTransactions.length).toBe(0);
    expect(app.totalRemaining).toBe(0);
  });

  it('should remove income transaction out the list when delete income transaction', () => {
    const fixture = TestBed.createComponent(AppComponent);
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
  })
});
