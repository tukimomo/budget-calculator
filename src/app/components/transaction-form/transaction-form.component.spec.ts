import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFormComponent } from './transaction-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarModule } from 'primeng/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionTypePipe } from '../../transaction-type.pipe';
import { SelectButtonModule } from 'primeng/selectbutton';
describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionFormComponent, TransactionTypePipe],
      imports: [
        InputTextModule,
        RadioButtonModule,
        InputNumberModule,
        ToolbarModule,
        ReactiveFormsModule,
        SelectButtonModule
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
