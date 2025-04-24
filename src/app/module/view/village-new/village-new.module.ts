import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VillageNewRoutingModule } from './village-new-routing.module';
import { VillageNewComponent } from './village-new.component';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VillageNewComponent
  ],
  imports: [
      CommonModule,
      VillageNewRoutingModule,
      SharedModule,
      ReactiveFormsModule,
      FormsModule
    ]
})
export class VillageNewModule { }
