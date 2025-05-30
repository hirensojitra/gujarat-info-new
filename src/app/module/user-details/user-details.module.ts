import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details.component';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserDetailsModule { }
