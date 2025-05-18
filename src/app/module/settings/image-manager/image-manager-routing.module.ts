import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageManagerComponent } from './image-manager.component';

const routes: Routes = [
  {
    path: '',
    component: ImageManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageManagerRoutingModule {}
