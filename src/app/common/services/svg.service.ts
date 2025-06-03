// src/app/services/svg.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

interface DummyShape {
  id: string;
  svgContent: string;
  bbox: { x: number; y: number; width: number; height: number };
  selected: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SvgService {
  // Dummy in-memory store
  private files = new Map<string, DummyShape[]>();
  private fileCounter = 1;
  private shapeCounter = 1;

  /** 
   * Simulates uploading an SVG file.
   * Breaks it into dummy shapes and stores in-memory.
   */
  uploadSvg(file: File): Observable<{ fileId: string }> {
    const fileId = `${this.fileCounter++}`;
    // Create 4 dummy shapes per upload
    const shapes: DummyShape[] = Array.from({ length: 4 }).map(() => ({
      id: `${this.shapeCounter++}`,
      svgContent: `<path d="M0,0 L50,0 L50,50 L0,50 Z" fill="none" stroke="black"/>`,
      bbox: { x: 0, y: 0, width: 50, height: 50 },
      selected: false
    }));
    this.files.set(fileId, shapes);

    // Simulate network latency
    return of({ fileId }).pipe(delay(500));
  }

  /**
   * Returns a list of all uploaded SVG files.
   */
  listSvgFiles(): Observable<{ fileId: string; filename: string }[]> {
    const list = Array.from(this.files.keys()).map(fileId => ({
      fileId,
      filename: `dummy-${fileId}.svg`
    }));
    return of(list).pipe(delay(200));
  }

  /**
   * Fetches shapes for a given fileId.
   */
  getShapes(fileId: string): Observable<{ shapes: DummyShape[] }> {
    const shapes = this.files.get(fileId) || [];
    return of({ shapes }).pipe(delay(300));
  }

  /**
   * Toggles selection of a shape and persists in-memory.
   */
  selectShape(shapeId: string, selected: boolean): Observable<{ success: boolean }> {
    for (const shapes of this.files.values()) {
      const shape = shapes.find(s => s.id === shapeId);
      if (shape) {
        shape.selected = selected;
        break;
      }
    }
    return of({ success: true }).pipe(delay(100));
  }
}
