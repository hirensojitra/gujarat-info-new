import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasWorkspaceComponent } from './canvas-workspace.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CanvasWorkspaceComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  exports: [CanvasWorkspaceComponent],
})
export class CanvasWorkspaceModule {}
