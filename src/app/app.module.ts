// src/app/app.module.ts
import { NgModule, inject } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule }   from './app-routing.module';
import { AppComponent }       from './app.component';
import { LayoutModule }       from './layout/layout.module';

import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';

import { LoaderModule }            from './common/component/loader/loader.module';
import { ToastModule }             from './common/component/toast/toast.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard }               from './common/guards/auth.guard';
import { HttpLoaderInterceptor }   from './common/interceptor/http-loader.interceptor';
import { EmailVerificationComponent } from './module/email-verification/email-verification.component';

import { provideApollo } from 'apollo-angular';
import { HttpLink }      from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment }   from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    EmailVerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    LoaderModule,
    ToastModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),

    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoaderInterceptor,
      multi: true,
    },

    // ─── Apollo GraphQL Setup ──────────────────────────────────────────
    provideApollo(() => {
      // inject the HttpLink service that uses Angular's HttpClient:
      const httpLink = inject(HttpLink);

      return {
        link:  httpLink.create({ uri: `${environment.GraphApi}/graphql` }),
        cache: new InMemoryCache(),
      };
    }),
    // ───────────────────────────────────────────────────────────────────
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
