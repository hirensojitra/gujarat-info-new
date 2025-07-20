import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayersPanelComponent } from './layers-panel.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LayersPanelComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    DragDropModule,
  ],
  exports: [LayersPanelComponent],
})
export class LayersPanelModule {}
