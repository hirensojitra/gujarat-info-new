import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabricCanvasRoutingModule } from './fabric-canvas-routing.module';
import { FabricCanvasComponent } from './fabric-canvas.component';

@NgModule({
  declarations: [FabricCanvasComponent],
  imports: [CommonModule, FabricCanvasRoutingModule],
  exports: [FabricCanvasComponent],
})
export class FabricCanvasModule {}
