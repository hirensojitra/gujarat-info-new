// src/app/shape-manager/upload-shape/upload-shape.component.ts

import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Represents a single SVG shape extracted from the uploaded file.
 */
export interface ShapeItem {
  id: string;
  rawSvg: string;
  type: string;
  viewBox: string;
  selected: boolean;
  data: { [key: string]: any };
}

@Component({
  selector: 'app-upload-shape',
  templateUrl: './upload-shape.component.html',
  styleUrls: ['./upload-shape.component.scss'],
})
export class UploadShapeComponent {
  uploadForm: FormGroup;
  uploading = false;
  errorMessage: string | null = null;
  extractedShapes: ShapeItem[] = [];
  mergeSelection: string[] = [];

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private host: ElementRef
  ) {
    this.uploadForm = this.fb.group({ file: [null, Validators.required] });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.uploadForm.patchValue({ file: input.files[0] });
    }
  }

  async onUpload(): Promise<void> {
    if (this.uploadForm.invalid) return;
    this.uploading = true;
    this.errorMessage = null;
    try {
      const file: File = this.uploadForm.get('file')!.value;
      this.extractedShapes = await this.getAllShapes(file);
    } catch (err) {
      console.error(err);
      this.errorMessage = 'Upload failed';
    } finally {
      this.uploading = false;
    }
  }

  deleteShape(id: string): void {
    this.extractedShapes = this.extractedShapes.filter((s) => s.id !== id);
  }

  mergeShapes(): void {
    if (this.mergeSelection.length < 2) {
      console.warn('Select at least two shapes to merge');
      return;
    }
    const merged = this.mergeSelection
      .map((id) => this.extractedShapes.find((s) => s.id === id)?.rawSvg)
      .filter(Boolean)
      .join('');
    this.extractedShapes = this.extractedShapes.filter(
      (s) => !this.mergeSelection.includes(s.id)
    );
    this.extractedShapes.push({
      id: Date.now().toString(),
      rawSvg: `<g>${merged}</g>`,
      type: 'g',
      viewBox: this.extractedShapes[0]?.viewBox ?? '0 0 0 0',
      selected: false,
      data: {},
    });
    this.mergeSelection = [];
  }

  private async getAllShapes(file: File): Promise<ShapeItem[]> {
    const svgText = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const svgRoot = doc.querySelector('svg') as SVGSVGElement;
    this.inlineSvgStyles(svgRoot);

    const allEls = Array.from(
      svgRoot.querySelectorAll<SVGGraphicsElement>(
        'rect, circle, ellipse, line, polyline, polygon, path'
      )
    );
    const nodes = allEls.filter((el) => el.hasAttribute('fill'));

    const offscreen = this.renderer.createElement('div');
    this.renderer.setStyle(offscreen, 'position', 'absolute');
    this.renderer.setStyle(offscreen, 'visibility', 'hidden');
    this.renderer.appendChild(this.host.nativeElement, offscreen);
    const measureSvg = this.renderer.createElement('svg', 'svg');
    this.renderer.appendChild(offscreen, measureSvg);

    const shapes: ShapeItem[] = nodes.map((node, idx) => {
      const clone = node.cloneNode(true) as SVGGraphicsElement;
      this.renderer.appendChild(measureSvg, clone);
      const bbox = clone.getBBox();
      this.renderer.removeChild(measureSvg, clone);
      const strokeW = Number(node.getAttribute('stroke-width') || 0);
      const pad = strokeW + 2;
      const padded = {
        x: bbox.x - pad,
        y: bbox.y - pad,
        width: bbox.width + pad * 2,
        height: bbox.height + pad * 2,
      };

      const type = node.tagName.toLowerCase();
      const data: any = {};
      // Fill
      const fillRaw = node.getAttribute('fill')!;
      if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(fillRaw))
        data.fill = fillRaw;
      else if (/^rgb\(/.test(fillRaw)) {
        const [r, g, b] = fillRaw.match(/\d+/g)!.map((n) => parseInt(n, 10));
        data.fill =
          '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
      } else data.fill = 'none';
      // Stroke
      if (node.hasAttribute('stroke'))
        data.stroke = node.getAttribute('stroke')!;
      if (node.hasAttribute('stroke-width'))
        data.strokeWidth = Number(node.getAttribute('stroke-width'));
      if (type === 'path') data.d = node.getAttribute('d') || '';
      [
        'x',
        'y',
        'width',
        'height',
        'cx',
        'cy',
        'r',
        'rx',
        'ry',
        'x1',
        'y1',
        'x2',
        'y2',
        'points',
      ].forEach((attr) => {
        if (node.hasAttribute(attr)) {
          const v = node.getAttribute(attr)!;
          data[attr] = isNaN(Number(v)) ? v : Number(v);
        }
      });

      return {
        id: idx.toString(),
        rawSvg: node.outerHTML,
        type,
        viewBox: this.normalizeToSquare(padded),
        selected: false,
        data,
      };
    });

    this.renderer.removeChild(this.host.nativeElement, offscreen);
    return shapes;
  }

  private normalizeToSquare(b: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): string {
    const { x, y, width, height } = b;
    const s = Math.max(width, height);
    const dx = (s - width) / 2,
      dy = (s - height) / 2;
    return `${x - dx} ${y - dy} ${s} ${s}`;
  }

  private inlineSvgStyles(svg: SVGSVGElement): void {
    const styleEl = svg.querySelector('style');
    if (!styleEl) return;
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styleEl.textContent || '');
    for (const r of Array.from(sheet.cssRules)) {
      if (!(r instanceof CSSStyleRule)) continue;
      const elems = Array.from(
        svg.querySelectorAll<SVGElement>(r.selectorText)
      );
      for (const el of elems) {
        const st = (r as CSSStyleRule).style;
        for (let i = 0; i < st.length; i++) {
          const p = st.item(i)!;
          if (!el.hasAttribute(p))
            el.setAttribute(p, st.getPropertyValue(p).trim());
        }
      }
    }
    styleEl.remove();
  }
  onToggleMergeSelection(id: string, checked: boolean): void {
    if (checked) {
      this.mergeSelection.push(id);
    } else {
      this.mergeSelection = this.mergeSelection.filter((s) => s !== id);
    }
  }
}
