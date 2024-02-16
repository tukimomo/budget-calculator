import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionTypePipe } from './transaction-type.pipe';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { TableWrapperComponent } from './components/transaction-table/table-wrapper/table-wrapper.component';
@NgModule({
  declarations: [
    AppComponent,
    TransactionFormComponent,
    TransactionTypePipe,
    TransactionTableComponent,
    TableWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    RadioButtonModule,
    SelectButtonModule
  ],
  providers: [TransactionTypePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
