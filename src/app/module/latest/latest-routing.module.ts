import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestComponent } from './latest.component';

const routes: Routes = [{
  path: '',
  component: LatestComponent,
  data: {
    title: 'Proposal for Web Application Poster Generation Service | PostNew',
    description: 'Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material.',
    keywords: 'poster generation, campaign posters, election posters, festival posts, promotional activities, customization, PostNew, web application',
    robots: 'index, follow',
    'og:image': 'https://api.postnew.in/api/v1/img/uploads/wLmyK?quality=10',
    'og:image:alt': 'PostNew Logo',
    'og:image:type': 'image/svg+xml',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:title': 'Web Application Poster Generation Service | PostNew',
    'og:description': 'Generate personalized posters for campaigns and festivals with Gujarat Info’s web application. Easily customize with your photos, names, and contact details.',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LatestRoutingModule { }
