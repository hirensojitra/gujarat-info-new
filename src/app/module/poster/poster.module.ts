import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosterRoutingModule } from './poster-routing.module';
import { PosterComponent } from './poster.component';
import { SharedModule } from '../../common/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PosterComponent
  ],
  imports: [
    CommonModule,
    PosterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PosterModule { }
