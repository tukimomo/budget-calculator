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

describe('AppComponent', () => {
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToolbarModule,
        TableModule,
        InputNumberModule,
        InputTextModule,
        SelectButtonModule
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
});
