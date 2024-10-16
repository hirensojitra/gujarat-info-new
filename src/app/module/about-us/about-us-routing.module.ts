import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us.component';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
    data: {
      title: 'Proposal for Web Application Poster Generation Service | Gujarat Uvach',
      description: 'Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material.',
      keywords: 'poster generation, campaign posters, election posters, festival posts, promotional activities, customization, Gujarat Uvach, web application',
      robots: 'index, follow',
      'og:image': 'https://vmi2070714.contaboserver.net/api/v1/img/uploads/wLmyK?quality=30',
      'og:image:alt': 'Gujarat Uvach Logo',
      'og:image:type': 'image/svg+xml',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:title': 'Web Application Poster Generation Service | Gujarat Uvach',
      'og:description': 'Generate personalized posters for campaigns and festivals with Gujarat Info’s web application. Easily customize with your photos, names, and contact details.',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
