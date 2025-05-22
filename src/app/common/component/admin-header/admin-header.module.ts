import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AngularBootstrapSidebar } from 'projects/angular-bootstrap-sidebar/src/public-api';

@NgModule({
  declarations: [AdminHeaderComponent],
  imports: [CommonModule, RouterModule, SharedModule, AngularBootstrapSidebar],
  exports: [AdminHeaderComponent],
})
export class AdminHeaderModule {}
