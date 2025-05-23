import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageGenerateComponent } from './image-generate.component';
import { AuthGuard } from 'src/app/common/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: ImageGenerateComponent,
  data: { title: 'Image Generate', breadcrumb: 'Image Generate' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageGenerateRoutingModule { }
