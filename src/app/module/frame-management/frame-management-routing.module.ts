import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameManagementComponent } from './frame-management.component';

const routes: Routes = [{
  path: '',
  component: FrameManagementComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameManagementRoutingModule { }
