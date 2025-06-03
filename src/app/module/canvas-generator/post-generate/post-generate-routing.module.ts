import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostGenerateComponent } from './post-generate.component';
import { AuthGuard } from 'src/app/common/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: PostGenerateComponent,
  data: { title: 'Post Generate', breadcrumb: 'Post Generate' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostGenerateRoutingModule { }
