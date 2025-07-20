import { Injectable, signal } from '@angular/core';
import * as fabric from 'fabric'; // ✅ Correct
import { PosterService } from './poster';
import { FabricImage } from 'fabric';
@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private canvas: fabric.Canvas | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private isInitialized = signal<boolean>(false);

  constructor(private posterService: PosterService) {}

  initializeCanvas(canvasElement: HTMLCanvasElement): void {
    this.canvasElement = canvasElement;
    this.canvas = new fabric.Canvas(canvasElement, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
    });

    this.setupCanvasEvents();
    this.isInitialized.set(true);
  }

  private setupCanvasEvents(): void {
    if (!this.canvas) return;

    this.canvas.on('selection:created', (e) => {
      // Handle object selection
    });

    this.canvas.on('selection:updated', (e) => {
      // Handle selection change
    });

    this.canvas.on('selection:cleared', (e) => {
      // Handle selection clear
    });

    this.canvas.on('object:modified', (e) => {
      // Handle object modification
      this.updateCanvasState();
    });

    this.canvas.on('object:added', (e) => {
      // Handle object addition
      this.updateCanvasState();
    });

    this.canvas.on('object:removed', (e) => {
      // Handle object removal
      this.updateCanvasState();
    });
  }

  private updateCanvasState(): void {
    // Update the current page's canvas state
    const currentPage = this.posterService.getCurrentPage();
    if (currentPage && this.canvas) {
      currentPage.canvas = this.canvas;
      currentPage.objects = this.canvas.getObjects();
    }
  }

  getCanvas(): fabric.Canvas | null {
    return this.canvas;
  }

  addText(text: string = 'New Text'): void {
    if (!this.canvas) return;

    const textObject = new fabric.Text(text, {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 20,
      fill: '#000000',
    });

    this.canvas.add(textObject);
    this.canvas.setActiveObject(textObject);
    this.canvas.renderAll();
  }

  async addImage(imageUrl: string): Promise<void> {
    if (!this.canvas) return;

    try {
      const img = await fabric.FabricImage.fromURL(imageUrl);

      img.scale(0.5);
      img.set({
        left: 100,
        top: 100,
      });

      this.canvas.add(img);
      this.canvas.setActiveObject(img);
      this.canvas.renderAll();
    } catch (error) {
      console.error('Failed to load image:', error);
    }
  }

  addShape(shapeType: 'rectangle' | 'circle' | 'triangle'): void {
    if (!this.canvas) return;

    let shape: fabric.Object;

    switch (shapeType) {
      case 'rectangle':
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#ff0000',
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: '#00ff00',
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: '#0000ff',
        });
        break;
    }

    this.canvas.add(shape);
    this.canvas.setActiveObject(shape);
    this.canvas.renderAll();
  }

  setBackgroundColor(color: string): void {
    if (!this.canvas) return;

    this.canvas.backgroundColor = color;
    this.canvas.renderAll();

    const currentPage = this.posterService.getCurrentPage();
    if (currentPage) {
      currentPage.backgroundColor = color;
    }
  }

  resizeCanvas(width: number, height: number): void {
    if (!this.canvas) return;

    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    this.canvas.renderAll();

    const currentPage = this.posterService.getCurrentPage();
    if (currentPage) {
      currentPage.width = width;
      currentPage.height = height;
    }
  }

  deleteSelected(): void {
    if (!this.canvas) return;

    const activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        this.canvas!.remove(obj);
      });
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
    }
  }

  clearCanvas(): void {
    if (!this.canvas) return;

    this.canvas.clear();
    this.canvas.backgroundColor = '#ffffff';
    this.canvas.renderAll();
  }

  exportAsImage(format: 'png' | 'jpeg' = 'png'): string {
    if (!this.canvas) return '';

    return this.canvas.toDataURL({
      format,
      quality: 1,
      multiplier: 0
    });
  }

  zoomIn(): void {
    if (!this.canvas) return;

    const zoom = this.canvas.getZoom();
    this.canvas.setZoom(Math.min(zoom * 1.1, 3));
  }

  zoomOut(): void {
    if (!this.canvas) return;

    const zoom = this.canvas.getZoom();
    this.canvas.setZoom(Math.max(zoom * 0.9, 0.1));
  }

  resetZoom(): void {
    if (!this.canvas) return;

    this.canvas.setZoom(1);
    this.canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    this.canvas.renderAll();
  }
}
