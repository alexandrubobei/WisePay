import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserManagementLayoutComponent } from './components/user-management-layout/user-management-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserManagementRoutingModule } from './user-managemenet-routing.module';

@NgModule({
  declarations: [ProfileComponent, UserManagementLayoutComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ]
})
export class UserManagementModule { }
