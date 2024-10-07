import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImgComponent } from './img.component';

const routes: Routes = [{path: '',
  component: ImgComponent,
  data: {
    title: 'Images | Gujarat Info',
    description: 'Welcome to the Gujarat Info dashboard. Access a variety of services and features designed to enhance your experience.',
    keywords: 'Gujarat Info, services, dashboard, user portal, features, access',
    robots: 'index, follow',
  }}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImgRoutingModule { }