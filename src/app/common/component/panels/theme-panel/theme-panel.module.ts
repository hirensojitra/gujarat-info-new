import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePanelComponent } from './theme-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [ThemePanelComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
  ],
  exports: [ThemePanelComponent],
})
export class ThemePanelModule {}
