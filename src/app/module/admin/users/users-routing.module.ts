import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Gujarat Uvach | Authentication',
      description: 'Login or register to Gujarat Uvach portal for accessing services',
      keywords: 'Gujarat Uvach, login, register, authentication, portal',
      robots: 'index, follow',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
