import { Injectable, signal } from '@angular/core';
import * as fabric from 'fabric'; // ✅ Correct
import { PosterService } from './poster';
import { HistoryService } from 'src/app/core/services/history.service';
import { FabricImage } from 'fabric';
@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private canvas: fabric.Canvas | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private isInitialized = signal<boolean>(false);

  constructor(
    private posterService: PosterService,
    private historyService: HistoryService
  ) {}

  initializeCanvas(canvasElement: HTMLCanvasElement): void {
    this.canvasElement = canvasElement;
    this.canvas = new fabric.Canvas(canvasElement, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      renderOnAddRemove: false, // Optimize rendering
    });

    this.setupCanvasEvents();
    this.isInitialized.set(true);
    this.saveCanvasState(); // Save initial state
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
      this.saveCanvasState();
    });

    this.canvas.on('object:added', (e) => {
      // Handle object addition
      this.saveCanvasState();
    });

    this.canvas.on('object:removed', (e) => {
      // Handle object removal
      this.saveCanvasState();
    });
  }

  private saveCanvasState(): void {
    if (!this.canvas) return;
    const json = JSON.stringify(this.canvas.toJSON());
    this.historyService.saveState(json);

    // Update the current page's canvas state
    const currentPage = this.posterService.getCurrentPage();
    if (currentPage) {
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
    this.canvas.requestRenderAll(); // Use requestRenderAll
    this.saveCanvasState();
  }

  addImage(imageUrl: string): void {
    console.log('addImage called with URL:', imageUrl);
    if (!this.canvas) {
      console.error('Canvas not initialized.');
      return;
    }

    console.log('Attempting to load image using HTMLImageElement for robustness.');

    const imgElement = new Image();
    imgElement.crossOrigin = 'anonymous'; // Good practice for external images

    imgElement.onload = () => {
      console.log('HTMLImageElement loaded successfully.');
      const fabricImage = new fabric.Image(imgElement);

      fabricImage.scale(0.5);
      fabricImage.set({
        left: this.canvas!.getCenter().left,
        top: this.canvas!.getCenter().top,
        originX: 'center',
        originY: 'center',
      });

      this.canvas!.add(fabricImage);
      this.canvas!.setActiveObject(fabricImage);
      this.canvas!.requestRenderAll(); // Use requestRenderAll
      this.saveCanvasState();
      console.log('Image added to canvas and rendered via HTMLImageElement.');
    };

    imgElement.onerror = (error) => {
      console.error('HTMLImageElement loading error:', error);
      console.error(`Failed to load image from URL: ${imageUrl}`);
    };

    imgElement.src = imageUrl;
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
    this.canvas.requestRenderAll(); // Use requestRenderAll
    this.saveCanvasState();
  }

  setBackgroundColor(color: string): void {
    if (!this.canvas) return;

    this.canvas.backgroundColor = color;
    this.canvas.requestRenderAll(); // Use requestRenderAll

    const currentPage = this.posterService.getCurrentPage();
    if (currentPage) {
      currentPage.backgroundColor = color;
    }
    this.saveCanvasState();
  }

  resizeCanvas(width: number, height: number): void {
    if (!this.canvas) return;

    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    this.canvas.requestRenderAll(); // Use requestRenderAll

    const currentPage = this.posterService.getCurrentPage();
    if (currentPage) {
      currentPage.width = width;
      currentPage.height = height;
    }
    this.saveCanvasState();
  }

  deleteSelected(): void {
    if (!this.canvas) return;

    const activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        this.canvas!.remove(obj);
      });
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll(); // Use requestRenderAll
      this.saveCanvasState();
    }
  }

  clearCanvas(): void {
    if (!this.canvas) return;

    this.canvas.clear();
    this.canvas.backgroundColor = '#ffffff';
    this.canvas.requestRenderAll(); // Use requestRenderAll
    this.saveCanvasState();
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
    this.canvas.requestRenderAll();
  }

  zoomOut(): void {
    if (!this.canvas) return;

    const zoom = this.canvas.getZoom();
    this.canvas.setZoom(Math.max(zoom * 0.9, 0.1));
    this.canvas.requestRenderAll();
  }

  resetZoom(): void {
    if (!this.canvas) return;

    this.canvas.setZoom(1);
    this.canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    this.canvas.requestRenderAll();
  }

  undo(): void {
    if (!this.canvas) return;
    const currentState = JSON.stringify(this.canvas.toJSON());
    const prevState = this.historyService.undo(currentState);
    if (prevState) {
      this.canvas.loadFromJSON(JSON.parse(prevState), () => {
        this.canvas!.requestRenderAll();
      });
    }
  }

  redo(): void {
    if (!this.canvas) return;
    const currentState = JSON.stringify(this.canvas.toJSON());
    const nextState = this.historyService.redo(currentState);
    if (nextState) {
      this.canvas.loadFromJSON(JSON.parse(nextState), () => {
        this.canvas!.requestRenderAll();
      });
    }
  }
}
