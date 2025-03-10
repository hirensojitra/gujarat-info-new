import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  private pendingRequests: number = 0;

  constructor(private loaderService: LoaderService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isExcludedUrl(request.url)) {
      return next.handle(request);
    }

    this.pendingRequests++;
    if (this.pendingRequests === 1) {
      this.loaderService.show(1);
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.pendingRequests--;
        if (this.pendingRequests === 0) {
          this.loaderService.hide();
        }
      })
    );
  }

  private isExcludedUrl(url: string): boolean {
    const excludedUrls = [
      `${environment.MasterApi}/images`,
      // Add other excluded URLs as needed
    ];
    return excludedUrls.some(excludedUrl => url.startsWith(excludedUrl));
  }
}