import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, HostListener, AfterViewInit } from '@angular/core';
import { PlatformService } from '../services/platform.service';

@Directive({
  selector: '[remSize]'
})
export class RemSizeDirective implements OnChanges, AfterViewInit {
  @Input() fs?: number;
  @Input() p?: number;
  @Input() ps?: number;
  @Input() pe?: number;
  @Input() pt?: number;
  @Input() pb?: number;
  @Input() m?: number;
  @Input() ms?: number;
  @Input() me?: number;
  @Input() mt?: number;
  @Input() mb?: number;
  @Input() hPX?: number;
  @Input() wPX?: number;
  @Input() minHPX?: number;
  @Input() minWPX?: number;
  @Input() maxHPX?: number;
  @Input() maxWPX?: number;

  private htmlFontSize: number;
  private resizeTimeout: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private platformService: PlatformService
  ) {
    if (this.platformService.isBrowser()) {
      this.htmlFontSize = this.getResponsiveFontSize();
      this.listenToWindowLoad();
    } else {
      this.htmlFontSize = 14; // Fallback value for SSR
    }
  }

  ngAfterViewInit(): void {
    if (this.platformService.isBrowser()) {
      this.htmlFontSize = this.getResponsiveFontSize();
      this.applyStyles();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyStyles();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.htmlFontSize = this.getResponsiveFontSize();
      this.applyStyles();
    }, 200); // Throttle resize events to reduce reflows
  }

  /**
   * Calculate the responsive font size based on window height.
   * Scales from 14px at 1080px height to 1px at 100px height.
   */
  private getResponsiveFontSize(): number {
    const windowHeight = window.innerHeight;
    const baseHeight = 1080; // Reference height
    const baseFontSize = 14; // Font size at 1080px height

    // Calculate font size based on the window height
    const fontSize = (baseHeight / windowHeight) * baseFontSize;

    return 14;
  }



  private listenToWindowLoad(): void {
    this.renderer.listen('window', 'load', () => {
      this.htmlFontSize = this.getResponsiveFontSize();
      this.applyStyles();
    });
  }

  private applyStyles(): void {
    this.applyStyle('height', this.hPX);
    this.applyStyle('width', this.wPX);
    this.applyStyle('min-height', this.minHPX);
    this.applyStyle('min-width', this.minWPX);
    this.applyStyle('max-height', this.maxHPX);
    this.applyStyle('max-width', this.maxWPX);
    this.applyStyle('padding', this.p);
    this.applyStyle('padding-left', this.ps);
    this.applyStyle('padding-right', this.pe);
    this.applyStyle('padding-top', this.pt);
    this.applyStyle('padding-bottom', this.pb);
    this.applyStyle('margin', this.m);
    this.applyStyle('margin-left', this.ms);
    this.applyStyle('margin-right', this.me);
    this.applyStyle('margin-top', this.mt);
    this.applyStyle('margin-bottom', this.mb);
    this.applyStyle('font-size', this.fs);
  }

  private applyStyle(styleName: string, pxValue?: number): void {
    if (pxValue !== undefined) {
      const remValue = Math.round((pxValue / this.htmlFontSize) * 1000) / 1000;
      this.renderer.setStyle(this.el.nativeElement, styleName, `${remValue}rem`);
    } else {
      this.renderer.removeStyle(this.el.nativeElement, styleName);
    }
  }
}
