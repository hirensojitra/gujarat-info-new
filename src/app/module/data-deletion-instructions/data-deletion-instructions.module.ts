import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataDeletionInstructionsRoutingModule } from './data-deletion-instructions-routing.module';
import { DataDeletionInstructionsComponent } from '../data-deletion-instructions/data-deletion-instructions.component';


@NgModule({
  declarations: [
    DataDeletionInstructionsComponent
  ],
  imports: [
    CommonModule,
    DataDeletionInstructionsRoutingModule
  ]
})
export class DataDeletionInstructionsModule { }
