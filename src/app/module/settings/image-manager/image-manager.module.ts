import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageManagerRoutingModule } from './image-manager-routing.module';
import { ImageManagerComponent } from './image-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [ImageManagerComponent],
  imports: [
    CommonModule,
    ImageManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule
  ],
})
export class ImageManagerModule {}
