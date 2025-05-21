import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameManagementRoutingModule } from './frame-management-routing.module';
import { FrameManagementComponent } from './frame-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [FrameManagementComponent],
  imports: [
    CommonModule,
    FrameManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
  ],
  exports: [FrameManagementComponent],
})
export class FrameManagementModule {}
