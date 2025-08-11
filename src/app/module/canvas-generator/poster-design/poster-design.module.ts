import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterDesignComponent } from './poster-design.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PosterDesignComponent,
    data: { title: 'Poster Design', breadcrumb: 'Poster Design' },
  },
];

@NgModule({
  declarations: [PosterDesignComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PosterDesignModule { }
