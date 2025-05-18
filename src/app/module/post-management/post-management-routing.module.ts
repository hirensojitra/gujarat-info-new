import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostManagementComponent } from './post-management.component';

const routes: Routes = [
  {
    path: '',
    component: PostManagementComponent,

    children: [
      { path: '', pathMatch: 'full', redirectTo: 'post-category' },
      {
        path: 'post-category',
        loadChildren: () =>
          import('./post-category/post-category.module').then((m) => m.PostCategoryModule),
      },
      {
        path: 'post-subcategory',
        loadChildren: () =>
          import('./post-subcategory/post-subcategory.module').then((m) => m.PostSubcategoryModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostManagementRoutingModule {}
