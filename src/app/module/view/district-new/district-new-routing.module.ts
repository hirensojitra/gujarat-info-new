import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictNewComponent } from './district-new.component';

const routes: Routes = [{
  path: '',
  component: DistrictNewComponent,
  data: { title: 'District New', breadcrumb:'District New' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictNewRoutingModule { }
