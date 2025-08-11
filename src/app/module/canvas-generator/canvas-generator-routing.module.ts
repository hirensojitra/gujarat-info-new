import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasGeneratorComponent } from './canvas-generator.component';
import { RoleGuard } from 'src/app/common/guards/role.guard';
import { AuthGuard } from 'src/app/common/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: CanvasGeneratorComponent,
  data: {
    title: 'Canvas Generator', breadcrumb: 'Canvas Generator', layout: 'dense-layout'
  },
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'list' },
    { path: 'list', loadChildren: () => import('./image-list/image-list.module').then(m => m.ImageListModule) },
    { path: 'generate', data: { roles: ['owner', 'administrator'] }, canActivate: [AuthGuard, RoleGuard], loadChildren: () => import('./image-generate/image-generate.module').then(m => m.ImageGenerateModule) },
    { path: 'post-generate', data: { roles: ['owner', 'administrator'] }, canActivate: [AuthGuard, RoleGuard], loadChildren: () => import('./post-generate/post-generate.module').then(m => m.PostGenerateModule) },
    { path: 'deleted', data: { roles: ['owner', 'administrator'] }, canActivate: [AuthGuard, RoleGuard], loadChildren: () => import('./image-deleted/image-deleted.module').then(m => m.ImageDeletedModule) },
    { path: 'uploaded-images', data: { roles: ['owner', 'administrator'] }, canActivate: [AuthGuard, RoleGuard], loadChildren: () => import('./image-data/image-data.module').then(m => m.ImageDataModule) },
    { path: 'poster-design', data: { roles: ['owner', 'administrator'] }, canActivate: [AuthGuard, RoleGuard], loadChildren: () => import('./poster-design/poster-design.module').then(m => m.PosterDesignModule) },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanvasGeneratorRoutingModule { }
