import {
  ActivatedRoute,
  Meta,
  NavigationEnd,
  PLATFORM_ID,
  Router,
  Title,
  filter,
  isPlatformBrowser,
  map,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-B5FGZX5H.js";

// src/app/common/services/seo.service.ts
var SEOService = class _SEOService {
  constructor(titleService, metaService, router, activatedRoute, platformId) {
    this.titleService = titleService;
    this.metaService = metaService;
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.platformId = platformId;
  }
  initSEO() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route.snapshot.data;
    })).subscribe((data) => {
      if (isPlatformBrowser(this.platformId)) {
        this.updateTitle(data["title"]);
        this.updateMetaTags(data);
      } else {
        this.updateTitle(data["title"]);
        this.updateMetaTags(data);
      }
    });
  }
  updateTitle(title) {
    if (title) {
      this.titleService.setTitle(title);
    }
  }
  updateMetaTags(data) {
    if (data["description"]) {
      this.metaService.updateTag({ name: "description", content: data["description"] });
    }
    if (data["keywords"]) {
      this.metaService.updateTag({ name: "keywords", content: data["keywords"] });
    }
    if (data["robots"]) {
      this.metaService.updateTag({ name: "robots", content: data["robots"] });
    }
    if (data["image"]) {
      this.metaService.updateTag({ property: "og:image", content: data["image"] });
      this.metaService.updateTag({ property: "twitter:image", content: data["image"] });
    }
  }
  static {
    this.\u0275fac = function SEOService_Factory(t) {
      return new (t || _SEOService)(\u0275\u0275inject(Title), \u0275\u0275inject(Meta), \u0275\u0275inject(Router), \u0275\u0275inject(ActivatedRoute), \u0275\u0275inject(PLATFORM_ID));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SEOService, factory: _SEOService.\u0275fac, providedIn: "root" });
  }
};

export {
  SEOService
};
//# sourceMappingURL=chunk-DUINWVQR.js.map
