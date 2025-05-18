import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCategoryComponent } from './post-category.component';

const routes: Routes = [{
  path: '',
  component: PostCategoryComponent,
  data: { title: 'Post Category', breadcrumb:'Post Category' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostCategoryRoutingModule { }
