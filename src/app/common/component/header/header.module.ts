import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AngularBootstrapSidebar } from '../../../../../projects/angular-bootstrap-sidebar/src/public-api';
import { HeaderComponent } from './header.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AngularBootstrapSidebar
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
