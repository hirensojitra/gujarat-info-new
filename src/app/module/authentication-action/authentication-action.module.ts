import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationActionRoutingModule } from './authentication-action-routing.module';
import { AuthenticationActionComponent } from './authentication-action.component';


@NgModule({
  declarations: [
    AuthenticationActionComponent
  ],
  imports: [
    CommonModule,
    AuthenticationActionRoutingModule
  ]
})
export class AuthenticationActionModule { }
