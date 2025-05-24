import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasGeneratorComponent } from './canvas-generator.component';
import { AuthGuard } from 'src/app/common/guards/auth.guard';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { NewAuthGuard } from 'src/app/common/guards/new-auth.guard';
import { RoleGuard } from 'src/app/common/guards/role.guard';

const routes: Routes = [{
  path: '',
  component: CanvasGeneratorComponent,
  data: {
    title: 'Canvas Generator', breadcrumb: 'Canvas Generator', layout: 'dense-layout'
  },
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'list' },
    { path: 'list', loadChildren: () => import('./image-list/image-list.module').then(m => m.ImageListModule) },
    { path: 'generate', data: { roles: ['owner', 'administrator'] }, canActivate: [NewAuthGuard, RoleGuard], loadChildren: () => import('./image-generate/image-generate.module').then(m => m.ImageGenerateModule) },
    { path: 'deleted', data: { roles: ['owner', 'administrator'] }, canActivate: [NewAuthGuard, RoleGuard], loadChildren: () => import('./image-deleted/image-deleted.module').then(m => m.ImageDeletedModule) },
    { path: 'uploaded-images', data: { roles: ['owner', 'administrator'] }, canActivate: [NewAuthGuard, RoleGuard], loadChildren: () => import('./image-data/image-data.module').then(m => m.ImageDataModule) },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanvasGeneratorRoutingModule { }
