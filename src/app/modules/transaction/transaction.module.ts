import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BankAccountService } from '../account/services/bank-account.service';
import { TransactionLayoutComponent } from './components/transaction-layout/transaction-layout.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { TransactionAddComponent } from './pages/transaction-add/transaction-add.component';
import { TransactionEditComponent } from './pages/transaction-details/transaction-edit.component';
import { TransactionListComponent } from './pages/transaction-list/transaction-list.component';
import { TransactionService } from './services/transaction.service';

import { TransactionRoutingModule } from './transaction-routing.module';

@NgModule({
  declarations: [
    TransactionEditComponent,
    TransactionListComponent,
    TransactionAddComponent,
    TransactionLayoutComponent,
    TransactionTableComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  providers: [
    TransactionService,
    BankAccountService
  ]
})
export class TransactionModule {
}
