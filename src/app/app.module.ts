// src/app/app.module.ts
import { NgModule, inject } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';

import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';

import { LoaderModule } from './common/component/loader/loader.module';
import { ToastModule } from './common/component/toast/toast.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './common/guards/auth.guard';
import { HttpLoaderInterceptor } from './common/interceptor/http-loader.interceptor';
import { EmailVerificationComponent } from './module/email-verification/email-verification.component';

import { provideApollo } from 'apollo-angular';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [AppComponent, EmailVerificationComponent],
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
    CookieService,
    // ─── Apollo GraphQL Setup ──────────────────────────────────────────
    provideApollo(() => {
      const cookieService = inject(CookieService);
      const authLink = new ApolloLink((operation, forward) => {
        const token = cookieService.get('token');
        console.log('Token:', token);
        operation.setContext({
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        return forward(operation);
      });

      const uploadLink = createUploadLink({
        uri: `${environment.GraphApi}/graphql`,
        credentials: 'include',
      }) as ApolloLink;

      return {
        link: authLink.concat(uploadLink),
        cache: new InMemoryCache(),
      };
    }),

    // ───────────────────────────────────────────────────────────────────
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
