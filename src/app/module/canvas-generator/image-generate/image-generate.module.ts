import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ImageGenerateRoutingModule } from './image-generate-routing.module';
import { ImageGenerateComponent } from './image-generate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    ImageGenerateComponent
  ],
  imports: [
    CommonModule,
    ImageGenerateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DragDropModule,
    MatTabsModule
  ]
})
export class ImageGenerateModule { }
