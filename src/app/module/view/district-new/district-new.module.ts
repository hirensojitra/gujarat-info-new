import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictNewRoutingModule } from './district-new-routing.module';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { DistrictNewComponent } from './district-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DistrictNewComponent],
  imports: [
    CommonModule,
    DistrictNewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DistrictNewModule {}
