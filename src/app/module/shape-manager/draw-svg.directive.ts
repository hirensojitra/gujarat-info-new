// src/app/shape-manager/draw-svg.directive.ts

import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2
} from '@angular/core';
import { ShapeItem } from './upload-shape/upload-shape.component';

@Directive({
  selector: '[drawSVG]'
})
export class DrawSvgDirective implements OnChanges {
  @Input('drawSVG') shape!: ShapeItem;

  constructor(
    private el: ElementRef<SVGElement>,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shape'] && this.shape) {
      const svgEl = this.el.nativeElement;

      // Clear previous content
      while (svgEl.firstChild) {
        svgEl.removeChild(svgEl.firstChild);
      }

      // Render rawSvg string safely as DOM nodes
      const parser = new DOMParser();
      const parsedDoc = parser.parseFromString(
        `<svg xmlns="http://www.w3.org/2000/svg">${this.shape.rawSvg}</svg>`,
        'image/svg+xml'
      );
      const rootSvg = parsedDoc.querySelector('svg');

      if (!rootSvg) return;

      // Recursively append nodes
      Array.from(rootSvg.childNodes).forEach(node => {
        this.appendNodeRecursively(node, svgEl);
      });

      // Dynamically calculate viewBox
      requestAnimationFrame(() => {
        const bbox = (svgEl as SVGGraphicsElement).getBBox();
        const pad = 2;
        const padded = {
          x: bbox.x - pad,
          y: bbox.y - pad,
          width: bbox.width + pad * 2,
          height: bbox.height + pad * 2,
        };
        const size = Math.max(padded.width, padded.height);
        const dx = (size - padded.width) / 2;
        const dy = (size - padded.height) / 2;
        const viewBox = `${padded.x - dx} ${padded.y - dy} ${size} ${size}`;
        this.renderer.setAttribute(svgEl, 'viewBox', viewBox);
      });
    }
  }

  private appendNodeRecursively(node: ChildNode, parent: SVGElement) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const newEl = this.renderer.createElement(el.tagName, 'svg') as SVGElement;

      // Copy attributes
      for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes[i];
        this.renderer.setAttribute(newEl, attr.name, attr.value);
      }

      // Recurse for children
      el.childNodes.forEach(child => {
        this.appendNodeRecursively(child, newEl);
      });

      this.renderer.appendChild(parent, newEl);
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      const textNode = this.renderer.createText(node.textContent);
      this.renderer.appendChild(parent, textNode);
    }
  }
}
