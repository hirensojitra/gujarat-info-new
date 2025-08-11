import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { AdminHeaderModule } from 'src/app/common/component/admin-header/admin-header.module';



@NgModule({
  declarations: [
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminHeaderModule
  ],
  exports: [
    DashboardLayoutComponent
  ]
})
export class DashboardLayoutModule { }
