import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResizePreset } from 'src/app/common/interfaces/poster.model';
import { PosterService } from 'src/app/common/services/poster';

@Component({
  selector: 'app-resize-panel',
  templateUrl: './resize-panel.component.html',
  styleUrl: './resize-panel.component.scss'
})
export class ResizePanelComponent {
 @Input() isOpen = false;
  @Output() closePanel = new EventEmitter<void>();
  @Output() resizeCanvas = new EventEmitter<{width: number, height: number}>();

  presets: ResizePreset[] = [];
  selectedPreset: ResizePreset | null = null;
  customWidth = 800;
  customHeight = 600;
  customUnit: 'px' | 'mm' | 'in' = 'px';
  lockAspectRatio = false;
  currentAspectRatio = 1;

  aspectRatios = [
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4/3 },
    { label: '16:9', value: 16/9 },
    { label: '3:2', value: 3/2 },
    { label: '9:16', value: 9/16 }
  ];

  get currentWidth(): number {
    return this.selectedPreset ? this.selectedPreset.width : this.customWidth;
  }

  get currentHeight(): number {
    return this.selectedPreset ? this.selectedPreset.height : this.customHeight;
  }

  get currentUnit(): string {
    return this.selectedPreset ? this.selectedPreset.unit : this.customUnit;
  }

  get previewWidth(): number {
    const ratio = this.currentWidth / this.currentHeight;
    return Math.min(200, 150 * ratio);
  }

  get previewHeight(): number {
    const ratio = this.currentWidth / this.currentHeight;
    return Math.min(150, 200 / ratio);
  }

  constructor(private posterService: PosterService) {
    this.presets = this.posterService.getResizePresets();
  }

  selectPreset(preset: ResizePreset): void {
    this.selectedPreset = preset;
    this.customWidth = preset.width;
    this.customHeight = preset.height;
    this.customUnit = preset.unit;
    this.currentAspectRatio = preset.width / preset.height;
  }

  onCustomDimensionChange(): void {
    this.selectedPreset = null;
    if (this.lockAspectRatio) {
      this.currentAspectRatio = this.customWidth / this.customHeight;
    }
  }

  toggleLockAspectRatio(): void {
    this.lockAspectRatio = !this.lockAspectRatio;
    if (this.lockAspectRatio) {
      this.currentAspectRatio = this.customWidth / this.customHeight;
    }
  }

  applyAspectRatio(ratio: number): void {
    this.currentAspectRatio = ratio;
    if (this.lockAspectRatio) {
      this.customHeight = Math.round(this.customWidth / ratio);
    } else {
      this.customHeight = Math.round(this.customWidth / ratio);
    }
    this.selectedPreset = null;
  }

  applyResize(): void {
    const width = this.currentWidth;
    const height = this.currentHeight;
    
    // Convert to pixels if necessary
    let finalWidth = width;
    let finalHeight = height;
    
    if (this.currentUnit === 'mm') {
      finalWidth = Math.round(width * 3.779527559); // mm to px at 96 DPI
      finalHeight = Math.round(height * 3.779527559);
    } else if (this.currentUnit === 'in') {
      finalWidth = Math.round(width * 96); // in to px at 96 DPI
      finalHeight = Math.round(height * 96);
    }

    this.resizeCanvas.emit({ width: finalWidth, height: finalHeight });
    this.close();
  }

  close(): void {
    this.closePanel.emit();
  }
}
