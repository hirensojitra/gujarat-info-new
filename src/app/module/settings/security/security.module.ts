import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SecurityModule { }
