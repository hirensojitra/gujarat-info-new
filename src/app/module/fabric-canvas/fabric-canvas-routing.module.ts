import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FabricCanvasComponent } from './fabric-canvas.component';

const routes: Routes = [{
  path:'',
  component: FabricCanvasComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricCanvasRoutingModule { }
