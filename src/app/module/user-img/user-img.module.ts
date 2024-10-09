import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserImgRoutingModule } from './user-img-routing.module';
import { UserImgComponent } from './user-img.component';
import { SharedModule } from '../../common/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserImgComponent
  ],
  imports: [
    CommonModule,
    UserImgRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserImgModule { }
