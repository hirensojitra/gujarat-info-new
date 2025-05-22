import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './user-layout.component';
import { RouterModule } from '@angular/router';
import { AdminHeaderModule } from 'src/app/common/component/admin-header/admin-header.module';



@NgModule({
  declarations: [
    UserLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminHeaderModule
  ],
  exports:[
    UserLayoutComponent
  ]
})
export class UserLayoutModule { }
