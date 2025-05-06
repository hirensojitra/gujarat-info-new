import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpSupportRoutingModule } from './help-support-routing.module';
import { HelpSupportComponent } from './help-support.component';


@NgModule({
  declarations: [
    HelpSupportComponent
  ],
  imports: [
    CommonModule,
    HelpSupportRoutingModule
  ]
})
export class HelpSupportModule { }
