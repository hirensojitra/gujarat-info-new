import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ImageElement, AspectRatios } from '../interfaces/image-element';

@Injectable({
  providedIn: 'root'
})
export class SvgImageService {
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createImage(imageData: ImageElement, svg: SVGSVGElement): SVGElement | null {
    const {
      x,
      y,
      r,
      imageUrl,
      borderColor,
      borderWidth,
      shape,
      editable,
      rotate
    } = imageData;

    const { w, h } = this.calculateWH(imageData);
    let element: SVGElement;

    switch (shape) {
      case 'circle':
        element = this.renderer.createElement('circle', 'http://www.w3.org/2000/svg');
        this.setAttrs(element, {
          cx: String(x),
          cy: String(y),
          r: String(r),
          fill: '#FFF',
          'data-type': 'circle'
        });
        break;

      case 'ellipse':
        element = this.renderer.createElement('ellipse', 'http://www.w3.org/2000/svg');
        this.setAttrs(element, {
          cx: String(x),
          cy: String(y),
          rx: String(r),
          ry: String(r),
          'data-type': 'ellipse'
        });
        break;

      default:
        if (shape.startsWith('rect')) {
          element = this.renderer.createElement('rect', 'http://www.w3.org/2000/svg');
          this.setAttrs(element, {
            x: String(x),
            y: String(y),
            width: String(w),
            height: String(h),
            'data-type': 'rect'
          });
          break;
        } else {
          console.error('Invalid shape provided:', shape);
          return null;
        }
    }

    // Pattern fill
    const patternId = 'pattern_' + Math.random().toString(36).substr(2, 9);
    this.renderer.setAttribute(element, 'fill', `url(#${patternId})`);
    this.renderer.setStyle(element, 'cursor', 'grab');
    this.renderer.setStyle(element, 'filter', 'url(#shadow)');

    const pattern = this.renderer.createElement('pattern', 'http://www.w3.org/2000/svg');
    this.setAttrs(pattern, {
      id: patternId,
      x: '0',
      y: '0',
      width: '100%',
      height: '100%',
      viewBox: `0 0 ${w} ${h}`
    });

    if (editable) {
      const extraRect = this.renderer.createElement('rect', 'http://www.w3.org/2000/svg');
      this.setAttrs(extraRect, {
        x: '0',
        y: '0',
        width: String(w),
        height: String(h),
        fill: '#FFF'
      });
      this.renderer.appendChild(pattern, extraRect);
    }

    const image = this.renderer.createElement('image', 'http://www.w3.org/2000/svg');
    this.setAttrs(image, {
      x: '0',
      y: '0',
      width: String(w),
      height: String(h),
      href: imageUrl
    });

    this.renderer.appendChild(pattern, image);
    this.renderer.appendChild(svg, pattern);
    this.renderer.appendChild(svg, element);

    // Optional border
    if (borderColor && borderWidth) {
      this.setAttrs(element, {
        stroke: borderColor,
        'stroke-width': String(borderWidth)
      });
    }

    // Optional rotation
    if (rotate || (x !== undefined && y !== undefined)) {
      const bbox = element.getBBox();
      const centerX = x + bbox.width / 2;
      const centerY = y + bbox.height / 2;
      this.renderer.setAttribute(element, 'transform', `rotate(${rotate || 0} ${centerX} ${centerY})`);
    }

    return element;
  }

  private setAttrs(el: SVGElement, attrs: { [key: string]: string }) {
    for (const key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        this.renderer.setAttribute(el, key, attrs[key]);
      }
    }
  }

  private calculateWH(image: ImageElement): { w: number, h: number } {
    const r = image.r || 160;
    const shape = image.shape;
    const aspectRatios: AspectRatios = {
      'circle': { ratio: 1, divisor: 1 },
      'ellipse': { ratio: 1, divisor: 1 },
      'rect': { ratio: 1, divisor: 1 },
      'rect_3_2': { ratio: 3, divisor: 2 },
      'rect_4_3': { ratio: 4, divisor: 3 },
      'rect_16_9': { ratio: 16, divisor: 9 },
      'rect_1_1': { ratio: 1, divisor: 1 },
      'rect_5_4': { ratio: 5, divisor: 4 },
      'rect_3_1': { ratio: 3, divisor: 1 },
      'rect_7_5': { ratio: 7, divisor: 5 },
      'rect_2_3': { ratio: 2, divisor: 3 },
      'rect_3_4': { ratio: 3, divisor: 4 },
      'rect_9_16': { ratio: 9, divisor: 16 },
      'rect_4_5': { ratio: 4, divisor: 5 },
      'rect_5_7': { ratio: 5, divisor: 7 }
    };

    const aspect = aspectRatios[shape] || { ratio: 1, divisor: 1 };
    const width = r * 2;
    const height = (width * aspect.ratio) / aspect.divisor;

    return { w: width, h: height };
  }
}
