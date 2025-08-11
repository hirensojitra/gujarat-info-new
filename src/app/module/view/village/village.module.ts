import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VillageRoutingModule } from './village-routing.module';
import { VillageComponent } from './village.component';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VillageComponent
  ],
  imports: [
      CommonModule,
      VillageRoutingModule,
      SharedModule,
      ReactiveFormsModule,
      FormsModule
    ]
})
export class VillageModule { }
