import { Component, effect } from '@angular/core';

import { CanvasService } from 'src/app/common/services/canvas';
import { PosterService } from 'src/app/common/services/poster';
import { GraphQLService, Poster } from 'src/app/graphql/graphql.service';

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
    private canvasService: CanvasService,
    private graphQLService: GraphQLService
  ) {
    effect(() => {
      const isDark = this.posterService.getIsDarkTheme();
      this.isDarkTheme = isDark;
      this.updateThemeClass();
    });
  }

  ngOnInit(): void {
    // Initialize with a default project
    this.posterService.createProject('New Poster Project');
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
    const canvas = this.canvasService.getCanvas();
    if (!canvas) {
      console.error('Canvas not initialized. Cannot save project.');
      return;
    }

    const currentProject = this.posterService.getCurrentProject();
    if (!currentProject) {
      console.error('No current project to save.');
      return;
    }

    const poster: Poster = {
      name: currentProject.name,
      canvasState: JSON.stringify(canvas.toJSON()),
      backgroundColor: currentProject.backgroundColor,
      width: currentProject.width,
      height: currentProject.height,
    };

    // If the project already has an ID, include it for updates
    if (currentProject.id) {
      poster.id = currentProject.id;
    }

    this.graphQLService.savePoster(poster).subscribe({
      next: (savedPoster) => {
        console.log('Project saved successfully:', savedPoster);
        // Update the current project with the ID from the backend if it's a new project
        if (!currentProject.id) {
          this.posterService.updateCurrentProjectId(savedPoster.id!);
        }
        alert('Project saved successfully!');
      },
      error: (error) => {
        console.error('Error saving project:', error);
        alert('Failed to save project.');
      },
    });
  }

  loadProject(projectId: string): void {
    console.log('Loading project:', projectId);
    this.graphQLService.getPoster(projectId).subscribe({
      next: (poster) => {
        console.log('Project loaded successfully:', poster);
        const canvas = this.canvasService.getCanvas();
        if (canvas) {
          canvas.loadFromJSON(JSON.parse(poster.canvasState), () => {
            canvas.renderAll();
            console.log('Canvas loaded from JSON.');
          });
        }
        // Update poster service with loaded project details
        this.posterService.loadProject(poster);
        alert('Project loaded successfully!');
      },
      error: (error) => {
        console.error('Error loading project:', error);
        alert('Failed to load project.');
      },
    });
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
