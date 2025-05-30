import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class BaseUrlService {
    private baseUrl: string = '';

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    getBaseUrl(): string {
        if (isPlatformBrowser(this.platformId)) {
            // Access Document only in the browser
            let baseUrl = this.document.baseURI;
            if (!baseUrl.startsWith('https://')) {
                // Prepend 'https://' if the base URL doesn't start with it
                baseUrl = 'https://' + baseUrl.substring(baseUrl.indexOf('://') + 3);
            }
            this.baseUrl = baseUrl;
        } else {
            this.baseUrl = 'https://postnew.in/'; // Replace with a sensible fallback for SSR
        }
        return this.baseUrl;
    }
}
