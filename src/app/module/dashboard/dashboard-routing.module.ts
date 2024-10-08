import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  data: {
    title: 'Dashboard | Gujarat Uvach',
    description: 'Welcome to the Gujarat Uvach dashboard. Access a variety of services and features designed to enhance your experience.',
    keywords: 'Gujarat Uvach, services, dashboard, user portal, features, access',
    robots: 'index, follow',
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
