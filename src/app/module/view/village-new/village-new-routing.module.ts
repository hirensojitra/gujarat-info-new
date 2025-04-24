import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VillageNewComponent } from './village-new.component';

const routes: Routes = [{
  path: '',
  component: VillageNewComponent,
  data: { title: 'Village New', breadcrumb:'Village New' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VillageNewRoutingModule { }
