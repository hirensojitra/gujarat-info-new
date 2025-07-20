import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSidebarComponent } from './page-sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [PageSidebarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  exports: [PageSidebarComponent],
})
export class PageSidebarModule {}
