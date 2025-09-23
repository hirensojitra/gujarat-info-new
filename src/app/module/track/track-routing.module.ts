import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackViewComponent } from './track-view/track-view.component';

const routes: Routes = [
  {
    path: ':imgParam',
    component: TrackViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackRoutingModule { }
