import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';

@NgModule({
  declarations: [DashboardViewComponent, DashboardLayoutComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
