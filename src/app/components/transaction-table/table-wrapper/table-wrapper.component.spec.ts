import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TableWrapperComponent } from './table-wrapper.component';
import { mockTransactions } from '../../../../mock-transaction-data';

describe('TableWrapperComponent', () => {
  let component: TableWrapperComponent;
  let fixture: ComponentFixture<TableWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableModule, ButtonModule],
      declarations: [TableWrapperComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no data row when transaction is empty', () => {
    const emptyRow = fixture.nativeElement.querySelector('td#emptyMessageRow');
    expect(emptyRow).not.toBe(null)
  });

  it('should not show no data row when transaction is not empty', () => {
    component.transactions = [mockTransactions[0]]
    fixture.detectChanges()
    const emptyRow = fixture.nativeElement.querySelector('td#emptyMessageRow');
    expect(emptyRow).toBe(null);
  });

  it('should not show no data row when transaction is not empty', () => {
    component.transactions = [mockTransactions[0]]
    fixture.detectChanges()
    const emptyRow = fixture.nativeElement.querySelector('td#emptyMessageRow');
    expect(emptyRow).toBe(null);
  });

  it('should emit delete event', () => {
    component.transactions = [mockTransactions[0]];
    fixture.detectChanges();
    spyOn(component.deleteEvent, 'emit');
    const deleteButton = fixture.nativeElement.querySelector('#deleteButton');
    deleteButton.dispatchEvent(new Event('click'));
    expect(component.deleteEvent.emit).toHaveBeenCalledWith(mockTransactions[0]);    
  });
});
