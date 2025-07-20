import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-floating-action-bar',
  templateUrl: './floating-action-bar.component.html',
  styleUrl: './floating-action-bar.component.scss',
})
export class FloatingActionBarComponent {
  @Output() addClick = new EventEmitter<void>();
  @Output() resizeClick = new EventEmitter<void>();
  @Output() themeClick = new EventEmitter<void>();
  @Output() backgroundColorClick = new EventEmitter<void>();
  @Output() animateClick = new EventEmitter<void>();
  @Output() layersClick = new EventEmitter<void>();
  @Output() quickReplaceClick = new EventEmitter<void>();

  onAddClick(): void {
    this.addClick.emit();
  }

  onResizeClick(): void {
    this.resizeClick.emit();
  }

  onThemeClick(): void {
    this.themeClick.emit();
  }

  onBackgroundColorClick(): void {
    this.backgroundColorClick.emit();
  }

  onAnimateClick(): void {
    this.animateClick.emit();
  }

  onLayersClick(): void {
    this.layersClick.emit();
  }

  onQuickReplaceClick(): void {
    this.quickReplaceClick.emit();
  }
}
