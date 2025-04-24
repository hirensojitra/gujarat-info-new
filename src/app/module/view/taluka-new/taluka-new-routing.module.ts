import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalukaNewComponent } from './taluka-new.component';

const routes: Routes = [{
  path: '',
  component: TalukaNewComponent,
  data: { title: 'Taluka New', breadcrumb:'Taluka New' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalukaNewRoutingModule { }
