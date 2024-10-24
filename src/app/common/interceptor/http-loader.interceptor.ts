import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  private activeRequests: number = 0;
  private pendingRequests: number = 0;

  constructor(private loaderService: LoaderService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isExcludedUrl(request.url)) {

      return next.handle(request);
    }
    if (this.pendingRequests === 0) {
      this.loaderService.show(1);
    } else {
      this.loaderService.hide();
    }
    this.pendingRequests++;
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.activeRequests++;
            this.checkHideLoader();
          }
        },
        () => {
          this.activeRequests++;
          this.checkHideLoader();
        }
      ),
      finalize(() => {
        this.pendingRequests--;
        this.checkHideLoader();
      })
    );
  }
  private checkHideLoader() {
    if (!this.pendingRequests) {
      this.loaderService.hide();
    }
  }
  private isExcludedUrl(url: string): boolean {
    // Define URLs that should be excluded from showing the loader
    const excludedUrls = [
      // '/api/auth',
      // '/api/excluded-url-2',
      // '/api/Notification/GetCitizenUserNotificationviewmore',
      // '/api/Notification/UpdateCitizenUserReadNotification'
      // Add more excluded URLs as needed
    ];
    // Check if the request URL matches any of the excluded URLs
    return excludedUrls.some(excludedUrl => url.includes(excludedUrl));
  }
}
