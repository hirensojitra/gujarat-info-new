import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDeletedComponent } from './image-deleted.component';

const routes: Routes = [{
  path: '',
  component: ImageDeletedComponent,
  data: { title: 'Deleted Images', breadcrumb: 'Deleted Images' }
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageDeletedRoutingModule { }
