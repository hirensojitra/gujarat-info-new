import './polyfills.server.mjs';
import {
  PLATFORM_ID,
  isPlatformBrowser,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-5I3IBUKT.mjs";

// src/app/common/services/platform.service.ts
var PlatformService = class _PlatformService {
  constructor(platformId) {
    this.platformId = platformId;
  }
  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  static {
    this.\u0275fac = function PlatformService_Factory(t) {
      return new (t || _PlatformService)(\u0275\u0275inject(PLATFORM_ID));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlatformService, factory: _PlatformService.\u0275fac, providedIn: "root" });
  }
};

export {
  PlatformService
};
//# sourceMappingURL=chunk-SJGHJV2H.mjs.map
