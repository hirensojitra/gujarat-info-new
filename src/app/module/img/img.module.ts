import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgRoutingModule } from './img-routing.module';
import { ImgComponent } from './img.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../common/shared/shared.module';


@NgModule({
  declarations: [
    ImgComponent
  ],
  imports: [
    CommonModule,
    ImgRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ImgModule { }
