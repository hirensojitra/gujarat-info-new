import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../../common/component/header/header.module';



@NgModule({
  declarations: [
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule
  ],
  exports: [
    DashboardLayoutComponent
  ]
})
export class DashboardLayoutModule { }
