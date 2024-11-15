import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import FingerprintJS from '@fingerprintjs/fingerprintjs';
import DeviceDetector from 'device-detector-js';
@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private deviceDetector: DeviceDetector;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.deviceDetector = new DeviceDetector();
  }

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
  public getDeviceInfo(): any {
    if (this.isBrowser()) {
      const userAgent = navigator.userAgent;
      const deviceInfo = this.deviceDetector.parse(userAgent);
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
