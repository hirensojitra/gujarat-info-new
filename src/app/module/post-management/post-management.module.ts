import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostManagementRoutingModule } from './post-management-routing.module';
import { PostManagementComponent } from './post-management.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PostManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PostManagementRoutingModule
  ]
})
export class PostManagementModule { }
