import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[squareSize]'
})
export class SquareSizeDirective implements AfterViewInit, OnDestroy, OnChanges {
  @Input('squareSize') basedOn: 'width' | 'height' = 'width';
  private resizeObserver?: ResizeObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.observe();
    this.adjustSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['basedOn']) {
      this.adjustSize();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private observe(): void {
    this.resizeObserver = new ResizeObserver(() => this.adjustSize());
    this.resizeObserver.observe(this.el.nativeElement);
  }

  private adjustSize(): void {
    const element = this.el.nativeElement;

    if (this.basedOn === 'width') {
      const width = element.offsetWidth;
      if (width > 0) {
        this.renderer.setStyle(element, 'height', `${width}px`);
      }
    } else if (this.basedOn === 'height') {
      const height = element.offsetHeight;
      if (height > 0) {
        this.renderer.setStyle(element, 'width', `${height}px`);
      }
    }
  }
}
