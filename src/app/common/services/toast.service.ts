import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  constructor(private platformService:PlatformService) {}

  show(message: string, options: any = {}): void {
    options.show = true;
    this.toasts.push({ message, ...options });

    if (this.platformService.isBrowser()) {
      // Ensure this only runs on the browser side
      this.scheduleAutoDismiss();
    }
  }

  remove(toast: any): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  private scheduleAutoDismiss(): void {
    setTimeout(() => {
      this.toasts.forEach((toast, index) => {
        setTimeout(() => this.remove(toast), 500 * (index + 1));
      });
    }, 5000);
  }
}
