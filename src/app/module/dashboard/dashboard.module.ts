import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CanvasWorkspaceModule } from 'src/app/common/component/canvas-workspace/canvas-workspace.module';
import { FloatingActionBarModule } from 'src/app/common/component/floating-action-bar/floating-action-bar.module';
import { PageSidebarModule } from 'src/app/common/component/page-sidebar/page-sidebar.module';
import { ResizePanelModule } from 'src/app/common/component/panels/resize-panel/resize-panel.module';
import { ColorPickerPanelModule } from 'src/app/common/component/panels/color-picker-panel/color-picker-panel.module';
import { ThemePanelModule } from 'src/app/common/component/panels/theme-panel/theme-panel.module';
import { AnimationPanelModule } from 'src/app/common/component/panels/animation-panel/animation-panel.module';
import { LayersPanelModule } from 'src/app/common/component/panels/layers-panel/layers-panel.module';
import { AddElementPanelModule } from 'src/app/common/component/panels/add-element-panel/add-element-panel.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CanvasWorkspaceModule,
    FloatingActionBarModule,
    PageSidebarModule,
    ResizePanelModule,
    ColorPickerPanelModule,
    ThemePanelModule,
    AnimationPanelModule,
    LayersPanelModule,
    AddElementPanelModule
  ],
})
export class DashboardModule {}
