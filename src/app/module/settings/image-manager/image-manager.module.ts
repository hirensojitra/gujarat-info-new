import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageManagerRoutingModule } from './image-manager-routing.module';
import { ImageManagerComponent } from './image-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared/shared.module';


@NgModule({
  declarations: [
    ImageManagerComponent
  ],
  imports: [
    CommonModule,
    ImageManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ImageManagerModule { }
