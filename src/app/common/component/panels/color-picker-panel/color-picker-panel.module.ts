import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerPanelComponent } from './color-picker-panel.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [ColorPickerPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
  ],
  exports: [ColorPickerPanelComponent],
})
export class ColorPickerPanelModule {}
