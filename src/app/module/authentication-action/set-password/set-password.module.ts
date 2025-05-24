import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPasswordRoutingModule } from './set-password-routing.module';
import { SetPasswordComponent } from './set-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared/shared.module';


@NgModule({
  declarations: [
    SetPasswordComponent
  ],
  imports: [
    CommonModule,
    SetPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SetPasswordModule { }
