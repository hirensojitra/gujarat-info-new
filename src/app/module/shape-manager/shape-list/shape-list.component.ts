// src/app/shape-manager/shape-list/shape-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SvgService } from 'src/app/common/services/svg.service';

export interface ShapeItem {
  id: string;
  rawSvg: string;
  viewBox: string;
  selected: boolean;
}

@Component({
  selector: 'app-shape-list',
  templateUrl: './shape-list.component.html',
  styleUrls: ['./shape-list.component.scss']
})
export class ShapeListComponent implements OnInit {
  fileId!: string;
  shapes$!: Observable<ShapeItem[]>;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private svgService: SvgService
  ) {}

  ngOnInit(): void {
    
  }

  normalizeToSquare(bbox: { x: number; y: number; width: number; height: number }): string {
    const { x, y, width, height } = bbox;
    // compute a square viewBox around the shape
    if (width === height) {
      return `${x} ${y} ${width} ${height}`;
    }
    const size = Math.max(width, height);
    const dx = (size - width) / 2;
    const dy = (size - height) / 2;
    return `${x - dx} ${y - dy} ${size} ${size}`;
  }

  toggleSelect(shape: ShapeItem) {
    const newState = !shape.selected;
    this.svgService.selectShape(shape.id, newState).subscribe(
      () => shape.selected = newState,
      err => console.error('Selection update failed', err)
    );
  }
}
