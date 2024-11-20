import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LatestRoutingModule } from './latest-routing.module';
import { LatestComponent } from './latest.component';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LatestComponent
  ],
  imports: [
    CommonModule,
    LatestRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LatestModule { }
