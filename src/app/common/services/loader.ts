import {
  Injectable,
  Renderer2,
  RendererFactory2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoaderService implements HttpInterceptor {
  private showLoaderSubject = new BehaviorSubject<boolean>(false);
  private showLoaderTrans = new BehaviorSubject<boolean>(false);
  public showLoader$ = this.showLoaderSubject.asObservable();
  public showLoaderTrans$ = this.showLoaderTrans.asObservable();

  private renderer: Renderer2;
  private isBrowser: boolean;

  constructor(
    private titleService: Title,
    private rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    // Initialize Renderer2
    this.renderer = this.rendererFactory.createRenderer(null, null);
    // Check if we are in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  show(n: number) {
    this.showLoaderSubject.next(true);
    this.showLoaderTrans.next(n ? true : false);

    if (this.isBrowser) {
      // Only manipulate the DOM if we're in a browser environment
      const body = document.body;
      this.renderer.setStyle(body, 'overflow', 'hidden');
      this.renderer.setStyle(body, 'position', 'fixed');
      this.renderer.setStyle(body, 'width', '100%');
      this.renderer.setStyle(body, 'height', '100%');
    }
  }

  hide() {
    setTimeout(() => {
      this.showLoaderSubject.next(false);
      this.showLoaderTrans.next(false);

      if (this.isBrowser) {
        // Only manipulate the DOM if we're in a browser environment
        const body = document.body;
        this.renderer.removeStyle(body, 'overflow');
        this.renderer.removeStyle(body, 'position');
        this.renderer.removeStyle(body, 'width');
        this.renderer.removeStyle(body, 'height');
      }
    }, 500);
  }

  getTitle() {
    return this.titleService.getTitle();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.show(0);
    return next.handle(request).pipe(
      finalize(() => {
        this.hide();
      })
    );
  }
  updateProgress(progress: {
    loaded: number;
    total: number;
    percentage: number;
  }) {
    // Implement your progress handling logic here
    // You can use Subject/BehaviorSubject to broadcast progress updates
  }
}
