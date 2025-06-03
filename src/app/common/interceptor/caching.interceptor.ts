// src/app/common/interceptor/caching.interceptor.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CacheStoreService } from '../services/cache-store.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private useBrowserCache: boolean;

  constructor(
    private cache: CacheStoreService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.useBrowserCache =
      isPlatformBrowser(this.platformId) &&
      typeof caches !== 'undefined';
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const key = req.urlWithParams;

    // Wrap promise-based cache in an Observable
    const cached$ = from(this.cache.getWithTTL(key, 300_000)); // TTL: 5 minutes

    return cached$.pipe(
      switchMap((cachedResp) => {
        if (cachedResp) {
          // Reconstruct HttpResponse from serialized cache
          const headersObj: any = {};
          cachedResp.headers.forEach((value: string, key: string) => {
            headersObj[key] = value;
          });
          const httpResponse = new HttpResponse({
            body: cachedResp.body,
            headers: new (require('@angular/common/http').HttpHeaders)(headersObj),
            status: cachedResp.status,
            statusText: cachedResp.statusText,
            url: cachedResp.url
          });
          return of(httpResponse);
        }
        // No cache hit — forward to network
        return next.handle(req).pipe(
          tap((event) => {
            if (event instanceof HttpResponse) {
              // Store successful network response
              // Serialize the HttpResponse before storing
              // Convert Angular HttpHeaders to native Headers
              const nativeHeaders = new Headers();
              event.headers.keys().forEach((name) => {
                nativeHeaders.set(name, event.headers.get(name)!);
              });
              // Create a native Response object for caching
              const response = new Response(
                JSON.stringify(event.body),
                {
                  status: event.status,
                  statusText: event.statusText,
                  headers: nativeHeaders
                }
              );
              this.cache.set(key, response);
            }
          })
        );
      })
    );
  }
}
