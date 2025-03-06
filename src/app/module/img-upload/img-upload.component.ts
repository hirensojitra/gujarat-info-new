import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID, Renderer2, OnDestroy } from '@angular/core';
interface EditorState {
  offsetX: number;
  offsetY: number;
  imgWidth: number;
  imgHeight: number;
  zoomLevel: number;
}
@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent implements AfterViewInit, OnDestroy {
  @ViewChild('svgContainer', { static: false }) svgContainer!: ElementRef;
  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef;

  imageSrc: string | null = null;
  isDragging: boolean = false;
  imgWidth: number = 0;
  imgHeight: number = 0;
  offsetX: number = 0;
  offsetY: number = 0;
  startX: number = 0;
  startY: number = 0;
  svgWidth: number = 500;  // Default (will be updated dynamically)
  svgHeight: number = 500; // Default (will be updated dynamically)
  svgElement!: SVGSVGElement | null;
  zoomLevel: number = 1;
  preserveAspectRatio: boolean = true;
  maxHistorySteps = 50;
  history: EditorState[] = [];
  currentStateIndex = -1;
  private initialTouch?: Touch;
  
  private eventListeners: Function[] = []; // Store listeners for cleanup

  constructor(@Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSvgLoadDetection();
    }
  }

  ngOnDestroy() {
    this.safeDOMOperation(() => {
      this.eventListeners.forEach(remove => remove());
    });
  }
  private initializeSvgLoadDetection() {
    const svg = this.svgContainer?.nativeElement;
    if (svg?.contentDocument?.readyState === 'complete') {
      this.onSvgLoaded();
    } else {
      const loadHandler = () => {
        this.onSvgLoaded();
        svg.removeEventListener('load', loadHandler);
      };
      svg.addEventListener('load', loadHandler);
    }
  }
  initializeSVG() {
    if (!this.svgContainer?.nativeElement) return;
    this.svgElement = this.svgContainer.nativeElement;
    if (this.svgElement) {
      // Extract viewBox values
      const viewBox = this.svgElement.getAttribute('viewBox');
      if (viewBox) {
        const [x, y, width, height] = viewBox.split(' ').map(Number);
        this.svgWidth = width;
        this.svgHeight = height;
      }
    }
  }

  onImageUpload(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target!.result as string;
        setTimeout(() => this.fitImageInsideSVG(), 50);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }
  private onSvgLoaded() {
    this.initializeSVG();
    this.addEventListeners();
    this.saveState(); // Initial state
  }

  private saveState() {
    if (++this.currentStateIndex >= this.maxHistorySteps) {
      this.history.shift();
      this.currentStateIndex--;
    }
    this.history = this.history.slice(0, this.currentStateIndex + 1);
    
    this.history.push({
      offsetX: this.offsetX,
      offsetY: this.offsetY,
      imgWidth: this.imgWidth,
      imgHeight: this.imgHeight,
      zoomLevel: this.zoomLevel
    });
  }

  undo() {
    if (this.currentStateIndex > 0) {
      this.currentStateIndex--;
      this.applyState(this.history[this.currentStateIndex]);
    }
  }

  redo() {
    if (this.currentStateIndex < this.history.length - 1) {
      this.currentStateIndex++;
      this.applyState(this.history[this.currentStateIndex]);
    }
  }

  private applyState(state: EditorState) {
    this.offsetX = state.offsetX;
    this.offsetY = state.offsetY;
    this.imgWidth = state.imgWidth;
    this.imgHeight = state.imgHeight;
    this.zoomLevel = state.zoomLevel;
  }

  fitImageInsideSVG() {
    if (!this.imageSrc) return;

    const img = new Image();
    img.src = this.imageSrc;

    img.onload = () => {
      let scale: number;
      if (this.preserveAspectRatio) {
        scale = Math.min(
          this.svgWidth / img.width,
          this.svgHeight / img.height
        );
      } else {
        scale = Math.max(
          this.svgWidth / img.width,
          this.svgHeight / img.height
        );
      }

      this.imgWidth = img.width * scale * this.zoomLevel;
      this.imgHeight = img.height * scale * this.zoomLevel;

      this.centerImage();
      this.saveState();
    };
  }
  // Zoom functionality
  adjustZoom(level: number) {
    const prevZoom = this.zoomLevel;
    this.zoomLevel = Math.min(Math.max(level, 0.5), 3);
    
    const scaleFactor = this.zoomLevel / prevZoom;
    this.imgWidth *= scaleFactor;
    this.imgHeight *= scaleFactor;
    
    this.centerImage();
    this.saveState();
  }

  private centerImage() {
    this.offsetX = (this.svgWidth - this.imgWidth) / 2;
    this.offsetY = (this.svgHeight - this.imgHeight) / 2;
  }

  // SSR-safe DOM operations
  private safeDOMOperation(callback: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      callback();
    }
  }

  getMousePosition(evt: MouseEvent | TouchEvent): { x: number, y: number } {
    if (!this.svgElement) return { x: 0, y: 0 };

    const touchOrMouse = 'touches' in evt ? evt.touches[0] : evt;
    const CTM = this.svgElement.getScreenCTM();

    if (!CTM) return { x: 0, y: 0 };
    return {
      x: (touchOrMouse.clientX - CTM.e) / CTM.a,
      y: (touchOrMouse.clientY - CTM.f) / CTM.d
    };
  }

  // Handles mouse and touch start events
  onPointerDown = (event: MouseEvent | TouchEvent) => {
    if (!isPlatformBrowser(this.platformId) || !this.svgElement) return;

    this.isDragging = true;
    
    const { x, y } = this.getMousePosition(event);

    this.startX = x - this.offsetX;
    this.startY = y - this.offsetY;

    // Add listeners for move and up events
    this.svgElement.addEventListener('pointermove', this.onPointerMove);
    this.svgElement.addEventListener('pointerup', this.onPointerUp);
    this.svgElement.addEventListener('pointerleave', this.onPointerUp); // Stop dragging when leaving SVG

    // Prevent default behavior for touch devices (scrolling, zooming, etc.)
    if ('touches' in event) {
      event.preventDefault();
    }
  };

  // Handles mouse and touch move events
  onPointerMove = (event: MouseEvent | TouchEvent) => {
    if (!this.isDragging) return;

    const { x, y } = this.getMousePosition(event);
    const zoomFactor = 1 / this.zoomLevel;

    this.offsetX = Math.max(
      -(this.imgWidth - this.svgWidth) * zoomFactor,
      Math.min((x - this.startX) * zoomFactor, 0)
    );

    this.offsetY = Math.max(
      -(this.imgHeight - this.svgHeight) * zoomFactor,
      Math.min((y - this.startY) * zoomFactor, 0)
    );
  }

  // Handles mouse and touch end events
  onPointerUp = () => {
    this.isDragging = false;
    this.svgElement.removeEventListener('pointermove', this.onPointerMove);
    this.svgElement.removeEventListener('pointerup', this.onPointerUp);
    this.svgElement.removeEventListener('pointerleave', this.onPointerUp);
  };

  addEventListeners() {
    // Adding event listeners using Renderer2 to handle mouse and touch events
    const mousedownListener = this.renderer.listen(this.svgElement, 'mousedown', this.onPointerDown);
    const touchstartListener = this.renderer.listen(this.svgElement, 'touchstart', this.onPointerDown);
    const mousemoveListener = this.renderer.listen(this.svgElement, 'mousemove', this.onPointerMove);
    const touchmoveListener = this.renderer.listen(this.svgElement, 'touchmove', this.onPointerMove);
    const mouseupListener = this.renderer.listen(this.svgElement, 'mouseup', this.onPointerUp);
    const mouseleaveListener = this.renderer.listen(this.svgElement, 'mouseleave', this.onPointerUp);
    const touchendListener = this.renderer.listen(this.svgElement, 'touchend', this.onPointerUp);

    // Store listeners for cleanup
    this.eventListeners.push(mousedownListener, touchstartListener, mousemoveListener,
      touchmoveListener, mouseupListener, mouseleaveListener, touchendListener);
  }

  exportDesign() {
    if (!isPlatformBrowser(this.platformId)) return;
    const svgElement = this.svgContainer.nativeElement;
    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svgElement);
    const cleanedSvgData = svgData.replace(/_ngcontent-[^=]*=""/g, ''); // Remove Angular attributes
    const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(cleanedSvgData);
    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'href', dataUrl);
    this.renderer.setAttribute(link, 'download', 'mobile_skin_design.svg');
    link.click();
  }
  
}
