import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictRoutingModule } from './district-routing.module';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { DistrictComponent } from './district.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DistrictComponent],
  imports: [
    CommonModule,
    DistrictRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DistrictModule {}
