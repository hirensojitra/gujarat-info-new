import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimationPreset } from 'src/app/common/interfaces/poster.model';
import { PosterService } from 'src/app/common/services/poster';

@Component({
  selector: 'app-animation-panel',
  templateUrl: './animation-panel.component.html',
  styleUrl: './animation-panel.component.scss',
})
export class AnimationPanelComponent {
  @Input() isOpen = false;
  @Output() closePanel = new EventEmitter<void>();
  @Output() animationSelected = new EventEmitter<AnimationPreset | null>();

  animationPresets: AnimationPreset[] = [];
  selectedAnimation: AnimationPreset | null = null;
  isPreviewActive = '';

  easingOptions = [
    { label: 'Ease', value: 'ease' },
    { label: 'Ease In', value: 'ease-in' },
    { label: 'Ease Out', value: 'ease-out' },
    { label: 'Ease In Out', value: 'ease-in-out' },
    { label: 'Linear', value: 'linear' },
    { label: 'Bounce', value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
  ];

  constructor(private posterService: PosterService) {
    this.animationPresets = this.posterService.getAnimationPresets();
  }

  selectAnimation(animation: AnimationPreset | null): void {
    this.selectedAnimation = animation;
  }

  onDurationChange(event: any): void {
    if (this.selectedAnimation) {
      this.selectedAnimation.duration = event.value;
    }
  }

  selectEasing(easing: string): void {
    if (this.selectedAnimation) {
      this.selectedAnimation.easing = easing;
    }
  }

  playPreview(): void {
    if (this.selectedAnimation) {
      this.isPreviewActive = this.selectedAnimation.name;
      setTimeout(() => {
        this.isPreviewActive = '';
      }, this.selectedAnimation.duration);
    }
  }

  applyAnimation(): void {
    this.animationSelected.emit(this.selectedAnimation);
    this.close();
  }

  close(): void {
    this.closePanel.emit();
  }
}
