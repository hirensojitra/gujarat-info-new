import { Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasService } from '../../services/canvas';
import { PosterService } from '../../services/poster';

@Component({
  selector: 'app-canvas-workspace',
  templateUrl: './canvas-workspace.component.html',
  styleUrl: './canvas-workspace.component.scss'
})
export class CanvasWorkspaceComponent {
  @ViewChild('canvasElement', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  zoomLevel = 100;
  showGrid = false;
  showRulers = false;
  isDragOver = false;
  canvasWidth = 800;
  canvasHeight = 600;
  selectedObjectsCount = 0;
  layerCount = 0;

  gridPattern = `
    linear-gradient(to right, #e0e0e0 1px, transparent 1px),
    linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)
  `;

  constructor(
    private canvasService: CanvasService,
    private posterService: PosterService
  ) {}

  ngOnInit(): void {
    this.initializeCanvas();
    this.updateCanvasInfo();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  private initializeCanvas(): void {
    setTimeout(() => {
      this.canvasService.initializeCanvas(this.canvasElement.nativeElement);
      this.updateCanvasInfo();
    }, 100);
  }
    onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }
    const files = input.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        this.handleImageUpload(file);
      }
    }
    // Clear the input value so selecting the same file again triggers change event
    input.value = '';
  }
  private updateCanvasInfo(): void {
    const canvas = this.canvasService.getCanvas();
    if (canvas) {
      this.canvasWidth = canvas.width || 800;
      this.canvasHeight = canvas.height || 600;
      this.layerCount = canvas.getObjects().length;
      this.selectedObjectsCount = canvas.getActiveObjects().length;
      this.zoomLevel = Math.round((canvas.getZoom() || 1) * 100);
    }
  }

  zoomIn(): void {
    this.canvasService.zoomIn();
    this.updateCanvasInfo();
  }

  zoomOut(): void {
    this.canvasService.zoomOut();
    this.updateCanvasInfo();
  }

  resetZoom(): void {
    this.canvasService.resetZoom();
    this.updateCanvasInfo();
  }

  toggleGrid(): void {
    this.showGrid = !this.showGrid;
  }

  toggleRulers(): void {
    this.showRulers = !this.showRulers;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          this.handleImageUpload(file);
        }
      }
    }
  }

  private handleImageUpload(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      this.canvasService.addImage(imageUrl);
      this.updateCanvasInfo();
    };
    reader.readAsDataURL(file);
  }

}
