import { Component, effect } from '@angular/core';

import { CanvasService } from 'src/app/common/services/canvas';
import { PosterService } from 'src/app/common/services/poster';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isDarkTheme = false;

  // Panel states
  showAddElementPanel = false;
  showResizePanel = false;
  showColorPickerPanel = false;
  showThemePanel = false;
  showAnimationPanel = false;
  showLayersPanel = false;

  constructor(
    private posterService: PosterService,
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    // Initialize with a default project
    this.posterService.createProject('New Poster Project');

    effect(() => {
      const isDark = this.posterService.getIsDarkTheme();
      this.isDarkTheme = isDark;
      this.updateThemeClass();
    });
  }

  get hasAnyPanelOpen(): boolean {
    return (
      this.showAddElementPanel ||
      this.showResizePanel ||
      this.showColorPickerPanel ||
      this.showThemePanel ||
      this.showAnimationPanel ||
      this.showLayersPanel
    );
  }

  toggleTheme(): void {
    this.posterService.toggleTheme();
  }

  private updateThemeClass(): void {
    const body = document.body;
    if (this.isDarkTheme) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }

  closeAllPanels(): void {
    this.showAddElementPanel = false;
    this.showResizePanel = false;
    this.showColorPickerPanel = false;
    this.showThemePanel = false;
    this.showAnimationPanel = false;
    this.showLayersPanel = false;
  }

  // Event handlers
  onElementAdded(event: { type: string; data: any }): void {
    console.log('Element added:', event);

    switch (event.type) {
      case 'text':
        this.canvasService.addText(event.data.text);
        break;
      case 'shape':
        this.canvasService.addShape(event.data.shapeType);
        break;
      case 'image':
        this.canvasService.addImage(event.data.url);
        break;
    }

    this.showAddElementPanel = false;
  }

  onResizeCanvas(event: { width: number; height: number }): void {
    console.log('Resize canvas:', event);
    this.canvasService.resizeCanvas(event.width, event.height);
  }

  onColorSelected(color: string): void {
    console.log('Color selected:', color);
    this.canvasService.setBackgroundColor(color);
  }

  onThemeSelected(theme: any): void {
    console.log('Theme selected:', theme);
    // Apply theme colors to canvas
    if (theme.colors && theme.colors.length > 0) {
      this.canvasService.setBackgroundColor(theme.colors[0]);
    }
  }

  onAnimationSelected(animation: any): void {
    console.log('Animation selected:', animation);
    // Apply animation to selected objects
  }

  onLayerSelected(layer: any): void {
    console.log('Layer selected:', layer);
  }

  onLayerVisibilityChanged(event: any): void {
    console.log('Layer visibility changed:', event);
  }

  onLayerLockChanged(event: any): void {
    console.log('Layer lock changed:', event);
  }

  onLayerOpacityChanged(event: any): void {
    console.log('Layer opacity changed:', event);
  }

  onLayerOrderChanged(layers: any[]): void {
    console.log('Layer order changed:', layers);
  }

  onQuickReplace(): void {
    console.log('Quick replace clicked');
    // Implement quick replace functionality
  }

  saveProject(): void {
    console.log('Save project');
    // Implement save functionality
  }

  exportProject(): void {
    console.log('Export project');
    const imageData = this.canvasService.exportAsImage('png');

    // Create download link
    const link = document.createElement('a');
    link.download = 'poster.png';
    link.href = imageData;
    link.click();
  }
}
