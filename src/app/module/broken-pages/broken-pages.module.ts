import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrokenPagesRoutingModule } from './broken-pages-routing.module';
import { BrokenPagesComponent } from './broken-pages.component';


@NgModule({
  declarations: [
    BrokenPagesComponent
  ],
  imports: [
    CommonModule,
    BrokenPagesRoutingModule
  ]
})
export class BrokenPagesModule { }
