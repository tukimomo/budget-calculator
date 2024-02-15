import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFormComponent } from './transaction-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarModule } from 'primeng/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionTypePipe } from '../../transaction-type.pipe';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TransactionType } from '../../models/transaction';
import { UuidGeneratorService } from '../../services/uuid-generator.service';
describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;
  let uuidServiceMock: jasmine.SpyObj<UuidGeneratorService>;
  beforeEach(() => {
    uuidServiceMock = jasmine.createSpyObj('UuidService', ['v4']);
  })
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
      providers: [
        { provide: UuidGeneratorService, useValue: uuidServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the add button when form is empty', () => {
    let saveButton = fixture.nativeElement.querySelector("button#saveButton");
    expect(saveButton.disabled).toBeTruthy();
  });

  it('should disable the add button when form contains amount is less than 0', () => {
    component.transactionForm.patchValue({
      name: "test transaction",
      amount: -1000,
      type: TransactionType.EXPENSE
    })
    let saveButton = fixture.nativeElement.querySelector("button#saveButton");
    expect(saveButton.disabled).toBeTruthy();
  });

  it('should disable the add button when form contains empty name', () => {
    component.transactionForm.patchValue({
      name: "",
      amount: 1000,
      type: TransactionType.EXPENSE
    })
    let saveButton = fixture.nativeElement.querySelector("button#saveButton");
    expect(saveButton.disabled).toBeTruthy();
  });

  it('should enable the add button when form is valid', () => {
    component.transactionForm.patchValue({
      name: "test transaction",
      amount: 1000,
      type: TransactionType.EXPENSE
    })
    let saveButton = fixture.nativeElement.querySelector("button#saveButton");
    expect(saveButton.disabled).toBeTruthy();
  });

  it('should emit transaction object when click add transaction button', () => {
    const newUuid = 'some-randomly-generated-uuid';
    uuidServiceMock.v4.and.returnValue(newUuid);
    spyOn(component.saveEvent, 'emit')
    component.transactionForm.patchValue({
      name: "test transaction",
      amount: 1000,
      type: TransactionType.EXPENSE
    })

    let saveButton = fixture.nativeElement.querySelector("button#saveButton");
    saveButton.dispatchEvent(new Event('click'));

    fixture.detectChanges;

    expect(component.saveEvent.emit).toHaveBeenCalledWith({
      id:'some-randomly-generated-uuid',
      name: "test transaction",
      amount: 1000,
      type: TransactionType.EXPENSE
    });
  })
});
