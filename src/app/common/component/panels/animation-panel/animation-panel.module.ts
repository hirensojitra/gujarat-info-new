import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationPanelComponent } from './animation-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AnimationPanelComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSliderModule, FormsModule],
  exports: [AnimationPanelComponent],
})
export class AnimationPanelModule {}
