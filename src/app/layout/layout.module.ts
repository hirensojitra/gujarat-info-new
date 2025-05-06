import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { EmptyLayoutModule } from './empty-layout/empty-layout.module';
import { DashboardLayoutModule } from './dashboard-layout/dashboard-layout.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserLayoutModule } from './user-layout/user-layout.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    EmptyLayoutModule,
    DashboardLayoutModule,
    UserLayoutModule,
    RouterModule,
    RouterOutlet
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
