import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgUploadRoutingModule } from './img-upload-routing.module';
import { ImgUploadComponent } from './img-upload.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImgUploadComponent
  ],
  imports: [
    CommonModule,
    ImgUploadRoutingModule,
    FormsModule
  ]
})
export class ImgUploadModule { }
