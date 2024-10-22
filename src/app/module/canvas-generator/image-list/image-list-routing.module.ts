import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageListComponent } from './image-list.component';
import { AuthGuard } from 'src/app/common/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: ImageListComponent,
  data: {
    title: 'Image List',
    breadcrumb: 'Image List',
    description: 'Your Page Description'
  }
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageListRoutingModule { }
