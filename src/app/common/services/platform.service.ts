import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public async getDeviceId(): Promise<string | null> {
    if (this.isBrowser()) {
      try {
        const { DeviceUUID } = await import('device-uuid');
        return new DeviceUUID().get();
      } catch (error) {
        console.error('Error getting device ID:', error);
        return null;
      }
    }
    return null;
  }

  public async getDeviceFingerprint(): Promise<any> {
    if (this.isBrowser()) {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      return result; // contains visitorId, components with browser, OS, device details, etc.
    }
    return null;
  }

  public async getDeviceInfo(): Promise<any> {
    if (this.isBrowser()) {
      const DeviceDetector = (await import('device-detector-js')).default;
      const deviceDetector = new DeviceDetector();
      const userAgent = navigator.userAgent;
      const deviceInfo = deviceDetector.parse(userAgent);
      if (deviceInfo.device.type === 'desktop') {
        return {
          ...deviceInfo,
          additionalPlatformInfo: navigator.platform || 'unknown'
        };
      }
      return deviceInfo;
    }
    return null;
  }
}
