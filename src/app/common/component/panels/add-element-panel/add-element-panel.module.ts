import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddElementPanelComponent } from './add-element-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    AddElementPanelComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule, MatIconModule, MatTabsModule
  ],
  exports: [
    AddElementPanelComponent
  ]
})
export class AddElementPanelModule { }
