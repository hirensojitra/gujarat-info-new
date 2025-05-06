// src/app/common/services/loader.service.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoaderService implements HttpInterceptor {
  private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  /** Observable you bind to in your component */
  loading$ = this.loadingSubject.asObservable();

  /** Call this to increment the loader count */
  show() {
    this.loadingCount++;
    if (this.loadingCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  /** Call this to decrement the loader count */
  hide() {
    if (this.loadingCount > 0) {
      this.loadingCount--;
      if (this.loadingCount === 0) {
        this.loadingSubject.next(false);
      }
    }
  }

  /** HTTP interceptor to catch all HttpClient calls */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.show();
    return next.handle(req).pipe(finalize(() => this.hide()));
  }
}
