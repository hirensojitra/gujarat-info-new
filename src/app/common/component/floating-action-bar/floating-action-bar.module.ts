import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingActionBarComponent } from './floating-action-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    FloatingActionBarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    FloatingActionBarComponent
  ]
})
export class FloatingActionBarModule { }
