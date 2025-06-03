import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LineProperties } from '../interfaces/image-element';

@Injectable({
  providedIn: 'root'
})
export class SvgLineService {
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createLine(lineData: LineProperties): SVGLineElement {
    const {
      x1,
      y1,
      x2,
      y2,
      stroke,
      strokeWidth,
      opacity,
      rotate
    } = lineData;

    const line: SVGLineElement = this.renderer.createElement('line', 'svg');

    this.renderer.setAttribute(line, 'x1', String(x1));
    this.renderer.setAttribute(line, 'y1', String(y1));
    this.renderer.setAttribute(line, 'x2', String(x2));
    this.renderer.setAttribute(line, 'y2', String(y2));
    this.renderer.setAttribute(line, 'data-type', 'line');

    this.renderer.setAttribute(line, 'stroke', stroke || '#000');
    this.renderer.setAttribute(line, 'stroke-width', String(strokeWidth ?? 2));
    this.renderer.setAttribute(line, 'opacity', String(opacity ?? 1));

    if (rotate) {
      // Apply rotation around the starting point (x1, y1)
      this.renderer.setAttribute(line, 'transform', `rotate(${rotate} ${x1} ${y1})`);
    }

    return line;
  }
}
