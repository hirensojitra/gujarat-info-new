import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostSubcategoryComponent } from './post-subcategory.component';

const routes: Routes = [{
  path: '',
  component: PostSubcategoryComponent,
  data: { title: 'PostSubcategory New', breadcrumb:'PostSubcategory New' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostSubcategoryRoutingModule { }
