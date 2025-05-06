import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokenPagesComponent } from './broken-pages.component';

const routes: Routes = [{
    path: '',
    component: BrokenPagesComponent,
    data: {
      title: 'PostNew | Authentication',
      description: 'Login or register to PostNew portal for accessing services',
      keywords: 'PostNew, login, register, authentication, portal',
      robots: 'index, follow',
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'unauthorized' },
      { path: 'unauthorized', loadChildren: () => import('./unauthorized/unauthorized.module').then(m => m.UnauthorizedModule) }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokenPagesRoutingModule { }
