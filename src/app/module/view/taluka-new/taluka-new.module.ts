import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalukaNewRoutingModule } from './taluka-new-routing.module';
import { TalukaNewComponent } from './taluka-new.component';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TalukaNewComponent
  ],
  imports: [
      CommonModule,
      TalukaNewRoutingModule,
      SharedModule,
      ReactiveFormsModule,
      FormsModule
    ]
})
export class TalukaNewModule { }
