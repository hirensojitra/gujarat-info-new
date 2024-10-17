import {
  DevelopmentService
} from "./chunk-3FGB26MD.js";
import {
  SEOService
} from "./chunk-DUINWVQR.js";
import {
  AsteriskDirective,
  FontService,
  SharedModule,
  SvgCircleService,
  SvgEllipseService,
  SvgRectService,
  ToastService
} from "./chunk-TUD4Z2WI.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-63CLPE7A.js";
import {
  LoaderService
} from "./chunk-AM4HOOHV.js";
import {
  PlatformService
} from "./chunk-QJMPY6Q2.js";
import {
  environment
} from "./chunk-UHQMXXXD.js";
import {
  ActivatedRoute,
  CommonModule,
  DOCUMENT,
  ElementRef,
  HttpClient,
  Meta,
  NgClass,
  NgForOf,
  NgIf,
  PLATFORM_ID,
  Renderer2,
  RouterLink,
  RouterModule,
  Title,
  __async,
  __spreadProps,
  __spreadValues,
  isPlatformBrowser,
  isPlatformServer,
  map,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-B5FGZX5H.js";

// src/app/common/services/post-detail.service.ts
var PostDetailService = class _PostDetailService {
  constructor(http) {
    this.http = http;
    this.baseUrl = environment.MasterApi + "/post-detail";
  }
  getAllPosts(page) {
    return this.http.get(`${this.baseUrl}?page=${page}`);
  }
  addPost(newPostData) {
    console.log(newPostData);
    return this.http.post(`${this.baseUrl}`, newPostData).pipe(map((response) => {
      console.log(response);
      const newPostId = response.id;
      newPostData.id = newPostId;
      return newPostData;
    }));
  }
  getPostById(id) {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }
  updatePost(newData) {
    return this.http.put(`${this.baseUrl}/update/`, newData);
  }
  softDeletePost(id) {
    return this.http.delete(`${this.baseUrl}/soft-delete/${id}`);
  }
  recoverPost(id) {
    return this.http.delete(`${this.baseUrl}/recover/${id}`);
  }
  hardDeletePost(id) {
    return this.http.delete(`${this.baseUrl}/hard-delete/${id}`);
  }
  downloadCounter(id) {
    return this.http.get(`${this.baseUrl}/download-counter/${id}`);
  }
  updateDownloadCounter(id) {
    return this.http.get(`${this.baseUrl}/update-download-counter/${id}`);
  }
  getAllSoftDeletedPosts(page) {
    return this.http.get(`${this.baseUrl}/soft-deleted/?page=${page}`);
  }
  getTotalPostLength() {
    return this.http.get(`${this.baseUrl}/post-length`);
  }
  getTotalDeletedPostLength() {
    return this.http.get(`${this.baseUrl}/post-deleted-length`);
  }
  static {
    this.\u0275fac = function PostDetailService_Factory(t) {
      return new (t || _PostDetailService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PostDetailService, factory: _PostDetailService.\u0275fac, providedIn: "root" });
  }
};

// src/app/common/services/baseuri.service.ts
var BaseUrlService = class _BaseUrlService {
  constructor(document2, platformId) {
    this.document = document2;
    this.platformId = platformId;
    this.baseUrl = "";
  }
  getBaseUrl() {
    if (isPlatformBrowser(this.platformId)) {
      let baseUrl = this.document.baseURI;
      if (!baseUrl.startsWith("https://")) {
        baseUrl = "https://" + baseUrl.substring(baseUrl.indexOf("://") + 3);
      }
      this.baseUrl = baseUrl;
    } else {
      console.warn("Document is not available in SSR. Returning fallback base URL.");
      this.baseUrl = "https://gujarat-uvach.netlify.app/";
    }
    return this.baseUrl;
  }
  static {
    this.\u0275fac = function BaseUrlService_Factory(t) {
      return new (t || _BaseUrlService)(\u0275\u0275inject(DOCUMENT), \u0275\u0275inject(PLATFORM_ID));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BaseUrlService, factory: _BaseUrlService.\u0275fac, providedIn: "root" });
  }
};

// src/app/module/poster/poster.component.ts
var _c0 = ["imageDraw"];
var _c1 = ["textInput"];
var _c2 = ["imageInput"];
var _c3 = (a0) => ({ "d-none": a0 });
function PosterComponent_ng_container_1_h1_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h1", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.postDetails.title);
  }
}
function PosterComponent_ng_container_1_h2_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.postDetails.info);
  }
}
function PosterComponent_ng_container_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "h5", 60)(2, "b");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.postStatus);
  }
}
function PosterComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, PosterComponent_ng_container_1_h1_1_Template, 2, 1, "h1", 56)(2, PosterComponent_ng_container_1_h2_2_Template, 2, 1, "h2", 57)(3, PosterComponent_ng_container_1_ng_container_3_Template, 4, 1, "ng-container", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.postDetails.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.postDetails.info);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.postStatus !== "loading" && ctx_r1.isDeleted == false);
  }
}
function PosterComponent_img_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 61);
  }
}
function PosterComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Loading");
    \u0275\u0275elementEnd();
  }
}
function PosterComponent_form_12_div_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "label", 75);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 76);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const field_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275propertyInterpolate("for", field_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(field_r4.title);
    \u0275\u0275advance();
    \u0275\u0275propertyInterpolate("id", field_r4.id);
    \u0275\u0275propertyInterpolate("name", field_r4.id);
    \u0275\u0275propertyInterpolate("formControlName", field_r4.id);
    \u0275\u0275property("placeholder", field_r4.title);
  }
}
function PosterComponent_form_12_div_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "label", 77);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 78);
    \u0275\u0275elementStart(4, "input", 79);
    \u0275\u0275listener("change", function PosterComponent_form_12_div_1_ng_container_2_Template_input_change_4_listener($event) {
      \u0275\u0275restoreView(_r5);
      const field_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onFileChange($event, field_r4.id, field_r4.index));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const field_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r4.title);
    \u0275\u0275advance();
    \u0275\u0275propertyInterpolate("id", field_r4.id);
    \u0275\u0275propertyInterpolate("name", field_r4.id);
    \u0275\u0275propertyInterpolate("formControlName", field_r4.id);
    \u0275\u0275advance();
    \u0275\u0275propertyInterpolate1("id", "", field_r4.id, "-file");
    \u0275\u0275propertyInterpolate1("name", "", field_r4.id, "-file");
    \u0275\u0275propertyInterpolate1("formControlName", "", field_r4.id, "-file");
  }
}
function PosterComponent_form_12_div_1_ng_container_3_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 84);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r6 = ctx.$implicit;
    const field_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("value", option_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(field_r4.lang == "gu" ? option_r6.gu_name : option_r6.name);
  }
}
function PosterComponent_form_12_div_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "label", 80);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 81)(4, "option", 82);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, PosterComponent_form_12_div_1_ng_container_3_option_6_Template, 2, 2, "option", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const field_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r4.title);
    \u0275\u0275advance();
    \u0275\u0275propertyInterpolate("formControlName", field_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("-- Select ", field_r4.title, " --");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.apiData[field_r4.controlName]);
  }
}
function PosterComponent_form_12_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275template(1, PosterComponent_form_12_div_1_ng_container_1_Template, 4, 6, "ng-container", 4)(2, PosterComponent_form_12_div_1_ng_container_2_Template, 5, 10, "ng-container", 4)(3, PosterComponent_form_12_div_1_ng_container_3_Template, 7, 4, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", field_r4.type === "text");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", field_r4.type === "image");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", field_r4.type === "select" && field_r4.controlName);
  }
}
function PosterComponent_form_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 62);
    \u0275\u0275listener("ngSubmit", function PosterComponent_form_12_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmitFormData());
    });
    \u0275\u0275template(1, PosterComponent_form_12_div_1_Template, 4, 3, "div", 63);
    \u0275\u0275elementStart(2, "div", 64);
    \u0275\u0275element(3, "hr", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 66)(5, "button", 67);
    \u0275\u0275element(6, "i", 68);
    \u0275\u0275text(7, "Generate Poster");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 69);
    \u0275\u0275listener("click", function PosterComponent_form_12_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetForm());
    });
    \u0275\u0275element(9, "i", 33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 64);
    \u0275\u0275element(11, "hr", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 70)(13, "button", 71);
    \u0275\u0275listener("click", function PosterComponent_form_12_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.checkDownload("whatsapp"));
    });
    \u0275\u0275element(14, "i", 10);
    \u0275\u0275elementStart(15, "span", 72);
    \u0275\u0275text(16, "WhatsApp");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 73);
    \u0275\u0275listener("click", function PosterComponent_form_12_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.shareOnFacebook());
    });
    \u0275\u0275element(18, "i", 51);
    \u0275\u0275text(19, "Facebook ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.formData);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.dataset);
  }
}
function PosterComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "h5", 85)(2, "b");
    \u0275\u0275text(3, "No any post available for this link.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
}
function PosterComponent_div_14_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 90);
    \u0275\u0275text(1, "Created by ");
    \u0275\u0275elementStart(2, "a", 91);
    \u0275\u0275listener("click", function PosterComponent_div_14_span_1_Template_a_click_2_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.myInfo.show();
      return \u0275\u0275resetView(false);
    });
    \u0275\u0275text(3, "Hiren Sojitra");
    \u0275\u0275elementEnd()();
  }
}
function PosterComponent_div_14_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92)(1, "div", 64)(2, "div", 93)(3, "button", 94);
    \u0275\u0275listener("click", function PosterComponent_div_14_div_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.checkDownload("download"));
    });
    \u0275\u0275element(4, "i", 95);
    \u0275\u0275text(5, "Download ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 96);
    \u0275\u0275listener("click", function PosterComponent_div_14_div_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.resetForm());
    });
    \u0275\u0275element(7, "i", 97);
    \u0275\u0275text(8, "Reset ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 64);
    \u0275\u0275element(10, "hr", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 98)(12, "button", 99);
    \u0275\u0275listener("click", function PosterComponent_div_14_div_3_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.checkDownload("whatsapp"));
    });
    \u0275\u0275element(13, "i", 10);
    \u0275\u0275elementStart(14, "span", 72);
    \u0275\u0275text(15, "WhatsApp");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 100);
    \u0275\u0275listener("click", function PosterComponent_div_14_div_3_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.checkDownload("facebook"));
    });
    \u0275\u0275element(17, "i", 51);
    \u0275\u0275text(18, "Facebook ");
    \u0275\u0275elementEnd()()();
  }
}
function PosterComponent_div_14_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 101)(1, "a", 102);
    \u0275\u0275text(2, "More Info");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", "/about-us");
  }
}
function PosterComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86);
    \u0275\u0275template(1, PosterComponent_div_14_span_1_Template, 4, 0, "span", 87);
    \u0275\u0275elementStart(2, "div", 11);
    \u0275\u0275template(3, PosterComponent_div_14_div_3_Template, 19, 0, "div", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PosterComponent_div_14_span_4_Template, 3, 1, "span", 89);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.postDetails == null ? null : ctx_r1.postDetails.info_show);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.canDownload);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r1.postDetails == null ? null : ctx_r1.postDetails.info_show));
  }
}
function PosterComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 101)(2, "a", 103);
    \u0275\u0275text(3, "More Info");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 104)(5, "div", 105);
    \u0275\u0275listener("click", function PosterComponent_ng_container_15_Template_div_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.myInfo.show());
    });
    \u0275\u0275element(6, "i", 106);
    \u0275\u0275text(7, "Contact Us");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
}
var PosterComponent = class _PosterComponent {
  constructor(route, titleService, metaService, PS, renderer, Rect, Circle, Ellipse, commonService, fb, platformService, http, toastService, loaderService, fontService, elementRef, baseUrlService, seoService, platformId) {
    this.route = route;
    this.titleService = titleService;
    this.metaService = metaService;
    this.PS = PS;
    this.renderer = renderer;
    this.Rect = Rect;
    this.Circle = Circle;
    this.Ellipse = Ellipse;
    this.commonService = commonService;
    this.fb = fb;
    this.platformService = platformService;
    this.http = http;
    this.toastService = toastService;
    this.loaderService = loaderService;
    this.fontService = fontService;
    this.elementRef = elementRef;
    this.baseUrlService = baseUrlService;
    this.seoService = seoService;
    this.platformId = platformId;
    this.postStatus = "loading";
    this.dataset = [];
    this.apiData = {};
    this.selectData = {};
    this.selectedIndex = null;
    this.selectedID = null;
    this.downloaded = false;
    this.canDownload = false;
    this.textModalTitle = "";
    this.encodedText = encodeURIComponent("Hello, Hiren!\nI'm interested to create Poster Generate Link");
    this.selectedImage = "";
    this.pageLink = "";
    this.imgModalTitle = "";
    this.cropperModalTitle = "";
    this.inputTextForm = this.fb.group({
      text: ["", Validators.required]
    });
    this.inputImageForm = this.fb.group({
      image: [""]
    });
    this.formData = this.fb.group({});
    this.baseUrl = this.baseUrlService.getBaseUrl();
  }
  ngOnInit() {
    return __async(this, null, function* () {
      if (isPlatformBrowser(this.platformId)) {
        console.log("Running on the browser");
        yield this.route.paramMap.subscribe((params) => __async(this, null, function* () {
          this.imgParam = params.get("img");
          if (this.imgParam) {
            this.postDetailsDefault = yield this.PS.getPostById(this.imgParam.toString()).toPromise();
            if (this.postDetailsDefault && !this.postDetailsDefault.deleted) {
              this.getPostById();
            }
          }
        }));
      }
      if (isPlatformServer(this.platformId)) {
        this.route.data.subscribe((data) => __async(this, null, function* () {
          !data["title"] && this.titleService.setTitle(data["title"] || "Poster Download");
          !data["description"] && this.metaService.updateTag({ name: "description", content: data["description"] || "Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material." });
          !data["keywords"] && this.metaService.updateTag({ name: "keywords", content: data["keywords"] || "poster generation, campaign posters, election posters, festival posts, promotional activities, customization, Gujarat Uvach, web application" });
          !data["robots"] && this.metaService.updateTag({ name: "robots", content: data["robots"] || "index, follow" });
          !data["og:title"] && this.metaService.updateTag({ property: "og:title", content: data["og:title"] || "Default OG title" });
          !data["og:description"] && this.metaService.updateTag({ property: "og:description", content: data["og:description"] || "Default OG description" });
          !data["og:image"] && this.metaService.updateTag({ property: "og:image", content: data["og:image"] || "https://vmi2070714.contaboserver.net/api/v1/img/uploads/wLmyK?quality=30" });
        }));
        yield this.seoService.initSEO();
        yield this.route.paramMap.subscribe((params) => __async(this, null, function* () {
          this.imgParam = params.get("img");
          if (this.imgParam) {
            this.postDetailsDefault = yield this.PS.getPostById(this.imgParam.toString()).toPromise();
            if (this.postDetailsDefault && !this.postDetailsDefault.deleted) {
              yield this.changeMetadataDynamically();
            }
          }
        }));
      }
      yield new Promise((resolve) => setTimeout(resolve, 1500));
    });
  }
  changeMetadataDynamically() {
    return __async(this, null, function* () {
      this.titleService.setTitle(this.postDetailsDefault.title);
      this.metaService.updateTag({ name: "description", content: this.postDetailsDefault.info });
    });
  }
  getPostById() {
    return __async(this, null, function* () {
      const post = this.postDetailsDefault;
      if (!post)
        return;
      this.postDetails = post;
      const p = JSON.parse(JSON.stringify(post));
      this.isDeleted = post.deleted;
      if (!post.deleted) {
        this.postStatus = "loading";
        const bg = yield this.getImageDataUrl(post.backgroundurl);
        post.backgroundurl = bg;
        post.data.map((item) => __async(this, null, function* () {
          if (item.image && item.image.imageUrl) {
            item.image.imageUrl = yield this.getImageDataUrl(item.image.imageUrl);
          }
        }));
        this.initialize();
      } else if (post.deleted && post.msg) {
        this.postStatus = post.msg;
      }
      this.textModal = new bootstrap.Modal(document.getElementById("textModal"), { focus: false, keyboard: false, static: false });
      this.textModal._element.addEventListener("hide.bs.modal", () => {
        this.inputTextForm.reset();
      });
      this.textModal._element.addEventListener("show.bs.modal", () => {
      });
      this.textModal._element.addEventListener("shown.bs.modal", () => {
        this.textInput.nativeElement.focus();
      });
      this.myInfo = new bootstrap.Modal(document.getElementById("myInfo"), { focus: false, keyboard: false, static: false });
      this.cropperModal = new bootstrap.Modal(document.getElementById("cropperModal"), { focus: false, keyboard: false, static: false });
      this.cropperModal._element.addEventListener("hide.bs.modal", () => {
        if (this.cropper) {
          this.cropper.destroy();
        }
      });
      this.cropperModal._element.addEventListener("show.bs.modal", () => {
      });
      this.imageCropper = new bootstrap.Modal(document.getElementById("imageCropper"), { focus: false, keyboard: false, static: false });
      this.imageCropper._element.addEventListener("hide.bs.modal", () => {
        if (this.cropper) {
          this.cropper.destroy();
        }
      });
      this.imageCropper._element.addEventListener("show.bs.modal", () => {
      });
    });
  }
  getImageDataUrl(imageUrl) {
    return __async(this, null, function* () {
      try {
        const response = yield fetch(imageUrl);
        const blob = yield response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Error fetching or converting image:", error);
        throw error;
      }
    });
  }
  initialize() {
    return __async(this, null, function* () {
      try {
        yield Promise.all([this.drawSVG(), this.buildForm()]);
      } catch (error) {
        console.error("An error occurred during initialization:", error);
      }
    });
  }
  drawSVG() {
    return __async(this, null, function* () {
      if (this.postDetails) {
        const backgroundurl = this.postDetails.backgroundurl;
        const svg = this.imageDraw.nativeElement;
        const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        this.postStatus = "Total Download: " + this.postDetails.download_counter;
        while (svg.firstChild) {
          svg.removeChild(svg.firstChild);
        }
        const linkElement = document.createElementNS("http://www.w3.org/2000/svg", "link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", "https://fonts.googleapis.com/css2?family=Anek+Gujarati:wght@100..800&family=Baloo+Bhai+2:wght@400..800&family=Farsan&family=Hind+Vadodara:wght@300;400;500;600;700&family=Kumar+One&family=Kumar+One+Outline&family=Mogra&family=Mukta+Vaani:wght@200;300;400;500;600;700;800&family=Noto+Sans+Gujarati:wght@100..900&family=Noto+Serif+Gujarati:wght@100..900&family=Rasa:ital,wght@0,300..700;1,300..700&family=Shrikhand&display=swap");
        svgDefs.appendChild(linkElement);
        svg.appendChild(svgDefs);
        this.renderer.setAttribute(svg, "viewBox", "0 0 " + (this.postDetails.w || 0) + " " + (this.postDetails.h || 0));
        const b = this.renderer.createElement("image", "http://www.w3.org/2000/svg");
        this.renderer.setAttribute(b, "x", "0");
        this.renderer.setAttribute(b, "y", "0");
        this.renderer.setAttribute(b, "width", "100%");
        this.renderer.setAttribute(b, "height", "100%");
        this.renderer.setAttribute(b, "preserveAspectRatio", "xMidYMid slice");
        this.renderer.setAttribute(b, "href", backgroundurl);
        this.renderer.appendChild(svg, svgDefs);
        this.renderer.appendChild(svg, b);
        let s = 0;
        this.postDetails?.data.forEach((item, i) => __async(this, null, function* () {
          const uniqueId = item.editable ? this.dataset[s]?.id || Math.random().toString(36).substr(2, 9) : Math.random().toString(36).substr(2, 9);
          switch (true) {
            case !!item.text:
              if (item.text) {
                const t = this.renderer.createElement("text", "http://www.w3.org/2000/svg");
                let { x, y, fs, fw, text, type, controlName, api, lang, dependency, color, fontStyle, rotate, fontFamily, textShadow, backgroundColor, textEffects, textAnchor, alignmentBaseline, letterSpacing, lineHeight, textTransformation, originX, originY, opacity } = item.text;
                if (text) {
                  const lines = this.textFormat(text);
                  item.editable && this.renderer.setStyle(t, "pointer-events", "none");
                  if (lines.length === 1) {
                    const textElement = this.renderer.createText(text);
                    if (controlName && lang && type && type == "select") {
                      this.selectData[controlName] = {
                        lang,
                        value: text,
                        api,
                        dependency: dependency || "none",
                        text: textElement
                      };
                    }
                    this.renderer.appendChild(t, textElement);
                  } else {
                    const dyOffset = fs * lineHeight || 0;
                    let dxOffset = 0;
                    switch (textAnchor) {
                      case "middle":
                        const totalWidth = lines.reduce((sum, line) => sum + this.getTextWidth(line, fs, fontFamily), 0);
                        dxOffset = totalWidth / 2;
                        break;
                      case "end":
                        dxOffset = lines.reduce((maxWidth, line) => {
                          const lineWidth = this.getTextWidth(line, fs, fontFamily);
                          return lineWidth > maxWidth ? lineWidth : maxWidth;
                        }, 0);
                        break;
                    }
                    lines.forEach((line, index) => {
                      const tspanElement = this.renderer.createElement("tspan", "http://www.w3.org/2000/svg");
                      this.renderer.appendChild(tspanElement, this.renderer.createText(line));
                      if (index > 0 || index === 0 && line.trim() === "") {
                        this.renderer.setAttribute(tspanElement, "dy", `${dyOffset}px`);
                      }
                      this.renderer.setAttribute(tspanElement, "x", x.toString());
                      switch (textAnchor) {
                        case "middle":
                          this.renderer.setAttribute(tspanElement, "dx", `-${dxOffset}px`);
                          break;
                        case "end":
                          this.renderer.setAttribute(tspanElement, "dx", `-${dxOffset}px`);
                          break;
                      }
                      this.renderer.appendChild(t, tspanElement);
                    });
                  }
                }
                let textAttributes = {
                  "data-type": "text",
                  "x": x.toString(),
                  "y": y.toString(),
                  "font-size": fs.toString(),
                  "fill": color || "#000000",
                  // Set default fill color to black if not provided
                  "text-anchor": textAnchor || "start",
                  "alignment-baseline": alignmentBaseline || "middle",
                  "dominant-baseline": "reset-size",
                  "font-family": fontFamily ? "'" + fontFamily + "', sans-serif" : "'Hind Vadodara', sans-serif",
                  "font-weight": fw || "normal",
                  "text-decoration": fontStyle.underline ? "underline" : "none",
                  "font-style": fontStyle.italic ? "italic" : "normal",
                  "opacity": opacity ? opacity.toString() : "100"
                };
                if (backgroundColor) {
                  textAttributes["background-color"] = backgroundColor;
                }
                if (textEffects) {
                }
                let textStyles = {
                  "-webkit-user-select": "none",
                  "letter-spacing": letterSpacing ? `${letterSpacing}px` : "normal",
                  "line-height": lineHeight ? `${lineHeight}` : "normal",
                  "text-transform": textTransformation || "none"
                };
                if (textShadow.enable) {
                  textAttributes["filter"] = `drop-shadow(${textShadow.offsetX}px ${textShadow.offsetY}px ${textShadow.blur}px ${textShadow.color})` || "none";
                }
                Object.entries(textAttributes).forEach(([key, value]) => this.renderer.setAttribute(t, key, value));
                Object.entries(textStyles).forEach(([key, value]) => this.renderer.setStyle(t, key, value));
                this.renderer.setAttribute(t, "data-id", uniqueId);
                if (rotate || originX !== void 0 && originY !== void 0) {
                  const bbox = t.getBBox();
                  const width = bbox.width;
                  const height = bbox.height;
                  const transformValue = `rotate(${rotate || 0} ${x + width / 2} ${y + height / 2})`;
                  this.renderer.setAttribute(t, "transform", transformValue);
                }
                if (this.dataset[s] == void 0 && item.editable) {
                  this.dataset.push({ id: uniqueId, lang: lang || "en", value: text || "Select " + item.title, index: i.toString(), type, title: item.title, controlName, api, dependency });
                }
                this.renderer.appendChild(svg, t);
                this.renderer.addClass(t, "pointer-events-none");
                item.editable && this.renderer.listen(t, "click", () => {
                  this.selectedIndex = i;
                  this.selectedID = uniqueId;
                  this.setText();
                });
                if (item.editable) {
                  s++;
                } else {
                }
              }
              break;
            case !!item.rect:
              if (item.rect) {
                const rect = this.Rect.createRect(item.rect);
                this.renderer.appendChild(svg, rect);
                return rect;
              }
              break;
            case !!item.circle:
              if (item.circle) {
                const c = this.Circle.createCircle(item.circle);
                this.renderer.appendChild(svg, c);
                return c;
              }
              break;
            case !!item.ellipse:
              if (item.ellipse) {
                const e = this.Ellipse.createEllipse(item.ellipse);
                this.renderer.appendChild(svg, e);
                return e;
              }
              break;
            case !!item.image:
              if (item.image) {
                const { x, y, r, imageUrl, borderColor, borderWidth, shape, origin, placeholder, svgProperties, rotate } = item.image;
                const { w, h } = this.commonService.calculateWH(item.image);
                let element;
                switch (shape) {
                  case "circle":
                    element = this.renderer.createElement("circle", "http://www.w3.org/2000/svg");
                    this.renderer.setAttribute(element, "cx", String(x));
                    this.renderer.setAttribute(element, "cy", String(y));
                    this.renderer.setAttribute(element, "r", String(r));
                    this.renderer.setAttribute(element, "data-type", "circle");
                    break;
                  case "ellipse":
                    element = this.renderer.createElement("ellipse", "http://www.w3.org/2000/svg");
                    this.renderer.setAttribute(element, "cx", String(x));
                    this.renderer.setAttribute(element, "cy", String(y));
                    this.renderer.setAttribute(element, "rx", String(r));
                    this.renderer.setAttribute(element, "ry", String(r));
                    this.renderer.setAttribute(element, "data-type", "ellipse");
                    break;
                  case "rect":
                  case "rect_3_2":
                  case "rect_4_3":
                  case "rect_16_9":
                  case "rect_1_1":
                  case "rect_5_4":
                  case "rect_3_1":
                  case "rect_7_5":
                  case "rect_2_3":
                  case "rect_3_4":
                  case "rect_9_16":
                  case "rect_4_5":
                  case "rect_5_7":
                    element = this.renderer.createElement("rect", "http://www.w3.org/2000/svg");
                    this.renderer.setAttribute(element, "x", String(x));
                    this.renderer.setAttribute(element, "y", String(y));
                    this.renderer.setAttribute(element, "width", String(w));
                    this.renderer.setAttribute(element, "height", String(h));
                    this.renderer.setAttribute(element, "data-type", "rect");
                    this.renderer.setAttribute(element, "fill", "#FFF");
                    break;
                  default:
                    console.error("Invalid shape");
                    return null;
                }
                if (element !== null) {
                  const id = uniqueId;
                  this.renderer.addClass(element, "pointer-events-none");
                  this.renderer.setAttribute(element, "fill", "url(#" + id + ")");
                  item.editable && this.renderer.setStyle(element, "pointer-events", "none");
                  this.renderer.setStyle(element, "filter", "url(#shadow)");
                  const imagePattern = this.renderer.createElement("pattern", "http://www.w3.org/2000/svg");
                  this.renderer.setAttribute(imagePattern, "id", id);
                  this.renderer.setAttribute(imagePattern, "x", "0");
                  this.renderer.setAttribute(imagePattern, "y", "0");
                  this.renderer.setAttribute(imagePattern, "height", "100%");
                  this.renderer.setAttribute(imagePattern, "width", "100%");
                  this.renderer.setAttribute(imagePattern, "viewBox", "0 0 " + String(w) + " " + String(h));
                  this.renderer.setAttribute(element, "data-id", uniqueId);
                  if (this.dataset[s] == void 0 && item.editable) {
                    this.dataset.push({ id: uniqueId, value: "", index: i.toString(), type: "image", title: item.title });
                  }
                  item.editable && this.renderer.listen(element, "click", () => {
                    this.selectedIndex = i;
                    this.selectedID = uniqueId;
                    this.setImage();
                  });
                  const image = this.renderer.createElement("image", "http://www.w3.org/2000/svg");
                  this.renderer.setAttribute(image, "x", "0");
                  this.renderer.setAttribute(image, "y", "0");
                  this.renderer.setAttribute(image, "width", String(w));
                  this.renderer.setAttribute(image, "height", String(h));
                  this.renderer.setAttribute(image, "href", imageUrl);
                  const extraRect = this.renderer.createElement("rect", "http://www.w3.org/2000/svg");
                  this.renderer.setAttribute(extraRect, "x", "0");
                  this.renderer.setAttribute(extraRect, "y", "0");
                  this.renderer.setAttribute(extraRect, "width", String(w));
                  this.renderer.setAttribute(extraRect, "height", String(h));
                  this.renderer.setAttribute(extraRect, "fill", "#FFFFFF");
                  item.editable && this.renderer.appendChild(imagePattern, extraRect);
                  this.renderer.appendChild(imagePattern, image);
                  this.renderer.appendChild(svg, imagePattern);
                  if (borderWidth && borderColor) {
                    this.renderer.setAttribute(element, "stroke", borderColor);
                    this.renderer.setAttribute(element, "stroke-width", String(borderWidth));
                  }
                  this.renderer.appendChild(svg, element);
                  if (rotate || x !== void 0 && y !== void 0) {
                    const bbox = element.getBBox();
                    const width = bbox.width;
                    const height = bbox.height;
                    const transformValue = `rotate(${rotate || 0} ${x + width / 2} ${y + height / 2})`;
                    this.renderer.setAttribute(element, "transform", transformValue);
                  }
                  if (item.editable) {
                    s++;
                  } else {
                  }
                  return element;
                }
              }
              break;
            default:
              console.log("Element data not found");
              break;
          }
        }));
      }
      this.downloaded = false;
      this.canDownload = false;
      this.formData.reset();
      for (const key in this.selectData) {
        const data = this.selectData[key];
        if (data.dependency === "none") {
          yield this.loadData(key, data.api);
        } else {
          yield this.setupDependency(key, data);
        }
        const filteredData = this.apiData[key].filter((item) => item.id == data.value);
        if (filteredData.length) {
          this.renderer.setValue(data.text, filteredData[0][data.lang == "gu" ? "gu_name" : "name"]);
        }
      }
    });
  }
  buildForm() {
    return __async(this, null, function* () {
      Object.keys(this.formData.controls).forEach((key) => {
        this.formData.get(key) && this.formData.removeControl(key);
      });
      const selectData = {};
      this.dataset.forEach((field) => {
        const index = parseInt(field.index, 10);
        if (!isNaN(index) && this.postDetails?.data) {
          if (field.type === "text") {
            const textData = this.postDetails.data.filter((_, i) => i === index)[0]?.text;
            if (textData) {
              this.formData.addControl(field.id, this.fb.control("", Validators.required));
              this.formData.get(field.id)?.valueChanges.subscribe((v) => {
                textData.text = v;
                field.value = v;
              });
            }
          } else if (field.type === "select") {
            const textData = this.postDetails.data.filter((_, i) => i === index)[0]?.text;
            if (textData) {
              const c = this.formData.addControl(field.id, this.fb.control(field.value, Validators.required));
              this.formData.get(field.id)?.valueChanges.subscribe((v) => {
                textData.text = v;
                field.value = v;
              });
              if (field.dependency && field.controlName && field.api) {
                selectData[field.controlName] = {
                  title: field.title,
                  control: this.formData.get(field.id),
                  api: field.api,
                  dependency: field.dependency
                };
              }
            }
          } else if (field.type === "image") {
            const textData = this.postDetails.data.filter((_, i) => i === index)[0]?.image;
            if (textData) {
              this.formData.addControl(field.id, this.fb.control("", Validators.required));
              this.formData.addControl(field.id + "-file", this.fb.control("", Validators.required));
              this.formData.get(field.id)?.valueChanges.subscribe((v) => {
                textData.imageUrl = v;
                field.value = v;
              });
            }
          }
        }
      });
      for (const key in selectData) {
        const s = selectData[key];
        if (selectData[key].dependency !== "none" && selectData[selectData[key].dependency].control) {
          selectData[selectData[key].dependency].control.valueChanges.subscribe((value) => __async(this, null, function* () {
            const dependentApi = `${s.api}${value}`;
            yield this.fetchDataFromAPI(dependentApi, key);
          }));
        }
      }
    });
  }
  textFormat(text) {
    const formattedText = text.replace(/\n/g, "\n").replace(/\n(?!\*{3})/g, "***\n");
    const lines = formattedText.split("\n");
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/\*\*\*/g, "\xA0");
    }
    return lines;
  }
  getTextWidth(text, fontSize, fontFamily) {
    const svgText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    svgText.setAttribute("font-size", `${fontSize}px`);
    svgText.setAttribute("font-family", `fontFamily`);
    svgText.textContent = text;
    document.body.appendChild(svgText);
    const width = svgText.getBBox().width;
    document.body.removeChild(svgText);
    return width;
  }
  setText() {
    this.inputTextForm.reset();
    const i = this.selectedIndex;
    if (i !== null) {
      const t = this.postDetails?.data[i].text?.text;
      const dt = this.postDetailsDefault?.data[i].text?.text;
      let v = t == dt ? "" : t;
      this.inputTextForm.get("text")?.setValue(v);
      this.textInput.nativeElement.placeholder = dt;
      this.textModalTitle = this.postDetails?.data[i].title || void 0;
      this.textModal.show();
    }
  }
  setImage() {
    this.inputImageForm.reset();
    const i = this.selectedIndex;
    if (i !== null) {
      const t = this.postDetails?.data[i].image?.imageUrl;
      const dt = this.postDetailsDefault?.data[i].image?.imageUrl;
      let v = t == dt ? dt : t;
      this.inputImageForm.get("image")?.setValue(v);
      this.cropperModalTitle = this.postDetails?.data[i].title || void 0;
      this.cropperModal.show();
    }
  }
  loadData(key, api) {
    return __async(this, null, function* () {
      if (!this.apiData[key]) {
        yield this.fetchDataFromAPI(api, key);
      }
    });
  }
  setupDependency(key, data) {
    return __async(this, null, function* () {
      if (!data.api.endsWith("/")) {
        data.api += "/";
      }
      const dependencyKey = data.dependency;
      const dependencyControl = this.selectData[dependencyKey].value;
      const dependentApi = `${data.api}${dependencyControl}`;
      yield this.fetchDataFromAPI(dependentApi, key);
    });
  }
  fetchDataFromAPI(apiUrl, controlName) {
    return __async(this, null, function* () {
      try {
        const data = yield this.http.get(apiUrl).toPromise();
        if (controlName && data) {
          this.apiData[controlName] = data;
        } else {
          this.apiData[controlName] = [];
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    });
  }
  onSubmitFormData() {
    return __async(this, null, function* () {
      this.commonService.markFormGroupTouched(this.formData);
      if (this.formData.valid) {
        this.dataset.forEach((field) => {
          const index = parseInt(field.index, 10);
          if (!isNaN(index) && this.postDetails?.data) {
            if (field.type === "text") {
              const textData = this.postDetails.data.filter((_, i) => i === index)[0]?.text;
              if (textData) {
                textData.text = field.value;
                this.canDownload = false;
              }
            } else if (field.type === "image") {
              const imageData = this.postDetails.data.filter((_, i) => i === index)[0]?.image;
              if (imageData) {
                imageData.imageUrl = field.value;
                this.canDownload = false;
              }
            }
          }
        });
        yield this.drawSVG();
        this.canDownload = true;
        this.formData.reset();
      }
    });
  }
  onFileChange(event, fieldName, index) {
    const i = parseInt(index, 10);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        if (fileType === "image/jpeg" || fileType === "image/png" || fileType === "image/gif" || fileType === "image/bmp" || fileType === "image/webp" || fileType === "image/svg+xml" || fileType === "image/tiff") {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageSrc = e.target?.result;
            this.imageCropper.show();
            const imageData = this.postDetails?.data[i].image;
            let h = 320;
            let w = 320;
            let cH = 320;
            let cW = 320;
            console.log(this.postDetails?.data, index);
            if (this.postDetails?.data[i].image) {
              const newWH = this.commonService.calculateWH(imageData);
              w = newWH.w;
              h = newWH.h;
            }
            const cropperElement = document.getElementById("imageToCropped");
            this.cropper = new Cropper(cropperElement, {
              scalable: true,
              viewMode: 3,
              crop: (event2) => {
              },
              autoCropArea: 1,
              // Ensure the initial crop area covers the entire image
              dragMode: "move",
              // Allow dragging to move the image within the container
              responsive: true,
              // Update crop box on resize
              cropBoxResizable: false,
              // Disable resizing the crop box
              minCropBoxWidth: cW,
              minCropBoxHeight: cH,
              minContainerWidth: 320,
              minContainerHeight: 320,
              aspectRatio: w / h
            });
            this.cropper.replace(imageSrc);
            this.selectedImage = fieldName;
          };
          reader.readAsDataURL(file);
        } else {
          this.toastService.show("Please select image type.", { class: "bg-danger", title: "Invalid Image Type" });
        }
      } else {
        this.toastService.show("Please select valid file format.", { class: "bg-danger", title: "Invalid File Format" });
      }
    }
  }
  resetForm() {
    this.canDownload = false;
    this.formData.reset();
  }
  checkDownload(t) {
    return __async(this, null, function* () {
      const baseUrl = `${this.baseUrl}poster?img=${this.postDetails?.id}`;
      const title = this.postDetails?.title.trim();
      const info = this.postDetails?.info.trim();
      switch (t) {
        case "download":
          this.capturePhoto();
          break;
        case "whatsapp":
          const whatsappUrl = `*${baseUrl}*

*${title}*
*_${info}_*

\u0AAA\u0ACB\u0AB8\u0ACD\u0A9F\u0AB0 \u0AAC\u0AA8\u0ABE\u0AB5\u0AB5\u0ABE \u0A89\u0AAA\u0AB0\u0AA8\u0AC0 \u0AB2\u0ABF\u0A82\u0A95 \u0A95\u0ACD\u0AB2\u0ABF\u0A95 \u0A95\u0AB0\u0ACB
\u0A85\u0AA8\u0ACD\u0AAF \u0AB8\u0AAC\u0A82\u0AA7\u0ABF\u0AA4 \u0AB5\u0ACD\u0AAF\u0A95\u0ACD\u0AA4\u0ABF \u0AA8\u0AC7 \u0AAA\u0AA3 \u0AB6\u0AC7\u0AB0 \u0A95\u0AB0\u0ACB.`;
          window.location.href = `whatsapp://send?text=${encodeURIComponent(whatsappUrl)}`;
          break;
        case "facebook":
          const q = this.postDetails?.title + " " + this.postDetails?.info;
          const shareDialogUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl)}&quote=${encodeURIComponent(q)}`;
          window.open(shareDialogUrl, "_blank");
          break;
        default:
          this.capturePhoto();
          break;
      }
      return true;
    });
  }
  capturePhoto(share) {
    return __async(this, null, function* () {
      this.loaderService.show(0);
      const svgElement = this.imageDraw.nativeElement;
      const viewBoxAttr = svgElement.getAttribute("viewBox") || "";
      const viewBoxValues = viewBoxAttr.split(" ").map(Number);
      const viewBoxWidth = viewBoxValues[2];
      const viewBoxHeight = viewBoxValues[3];
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewBoxWidth;
      canvas.height = viewBoxHeight;
      const image = new Image();
      const serializer = new XMLSerializer();
      const fontFamilies = this.getFontStylesFromSVG(svgElement);
      yield this.loadFonts(fontFamilies);
      const svgString = serializer.serializeToString(svgElement);
      image.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
      image.onload = () => __async(this, null, function* () {
        context?.drawImage(image, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/:/g, "-");
        const fileName = `IMG-${timestamp}.png`;
        const link = document.createElement("a");
        link.href = dataURL;
        this.finalImage = dataURL;
        link.download = fileName;
        const textElements = svgElement.querySelectorAll("text");
        context && textElements.forEach((text) => {
          const fontFamily = text.getAttribute("font-family") || "Arial";
          const fontSize = parseFloat(text.getAttribute("font-size") || "16");
          context.font = `${fontSize}px ${fontFamily}`;
        });
        this.downloaded = true;
        !share && link.click();
        !this.downloaded && (yield this.PS.updateDownloadCounter(this.imgParam).subscribe((post) => {
          if (post) {
            const p = JSON.parse(JSON.stringify(post));
            this.postStatus = "Total Download: " + post.download_counter;
          } else {
          }
        }, (error) => {
          this.postStatus = void 0;
          console.error("Error fetching post:", error);
        }));
        this.loaderService.hide();
      });
    });
  }
  getFontStylesFromSVG(svgElement) {
    const textElements = svgElement.querySelectorAll("text");
    const fontStyles = {};
    textElements.forEach((text) => {
      const fontFamily = text.getAttribute("font-family");
      const fontWeight = text.getAttribute("font-weight") || "normal";
      if (fontFamily) {
        const fontFamilyName = fontFamily.split(",")[0].replace(/['"]/g, "").trim();
        if (!fontStyles[fontFamilyName]) {
          fontStyles[fontFamilyName] = /* @__PURE__ */ new Set();
        }
        fontStyles[fontFamilyName].add(fontWeight);
      }
    });
    return fontStyles;
  }
  loadFonts(fontStyles) {
    return __async(this, null, function* () {
      const svg = this.imageDraw.nativeElement;
      let svgDefs = svg.querySelector("defs") || svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "defs"));
      let styleElement = svgDefs.querySelector("style");
      if (!styleElement) {
        styleElement = document.createElementNS("http://www.w3.org/2000/svg", "style");
        svgDefs.appendChild(styleElement);
      }
      const addedRules = /* @__PURE__ */ new Set();
      for (const [fontFamily, fontWeights] of Object.entries(fontStyles)) {
        for (const fontWeight of fontWeights) {
          const fontPath = this.fontService.getFontPath(fontFamily, fontWeight);
          const fontData = yield this.loadFontAsBase64(`assets/fonts/${fontPath}.ttf`);
          const fontFaceRule = `@font-face {
          font-family: '${fontFamily}';
          font-style: normal;
          font-weight: ${fontWeight};
          font-stretch: 100%;
          font-display: swap;
          src: url(data:font/truetype;base64,${fontData}) format('truetype');
        }`;
          if (!addedRules.has(fontFaceRule)) {
            styleElement.textContent += fontFaceRule;
            addedRules.add(fontFaceRule);
          }
        }
      }
    });
  }
  loadFontAsBase64(fontUrl) {
    return __async(this, null, function* () {
      const response = yield fetch(fontUrl);
      const fontData = yield response.arrayBuffer();
      return btoa(new Uint8Array(fontData).reduce((data, byte) => data + String.fromCharCode(byte), ""));
    });
  }
  shareOnFacebook() {
    window.FB.ui({
      method: "feed",
      link: this.pageLink
    });
  }
  onTextSubmit() {
    return __async(this, null, function* () {
      if (this.selectedIndex !== null && this.postDetails?.data) {
        this.postDetails.data = this.postDetails.data.map((item, index) => {
          if (index === this.selectedIndex && item.text) {
            let v = this.inputTextForm.get("text")?.value;
            if (this.selectedID) {
              const elementToChange = this.elementRef.nativeElement.querySelector(`[data-id="${this.selectedID}"]`);
              if (elementToChange) {
                const filteredItems = this.dataset.filter((item2) => item2.id === this.selectedID);
                if (filteredItems[0]) {
                  filteredItems[0].value = v || item.text.text;
                }
              }
            }
            return __spreadProps(__spreadValues({}, item), { text: __spreadProps(__spreadValues({}, item.text), { text: v }) });
          }
          return item;
        });
      }
      yield this.drawSVG();
      this.textModal.hide();
    });
  }
  handleImageInputChange(event) {
    const inputElement = event.target;
    const file = inputElement.files?.[0];
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        if (fileType === "image/jpeg" || fileType === "image/png" || fileType === "image/gif" || fileType === "image/bmp" || fileType === "image/webp" || fileType === "image/svg+xml" || fileType === "image/tiff") {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageSrc = e.target?.result;
            const selectedItem = this.dataset.find((item) => item.id === this.selectedImage);
            let w = 320;
            let h = 320;
            let cW = 320;
            let cH = 320;
            if (selectedItem) {
              const index = parseInt(selectedItem.index, 10);
              if (this.postDetails?.data[index].image) {
                const newWH = this.commonService.calculateWH(this.postDetails?.data[index].image);
                w = newWH.w;
                h = newWH.h;
              }
            }
            this.cropperModal.show();
            const cropperElement = document.getElementById("cropper");
            this.cropper = new Cropper(cropperElement, {
              scalable: true,
              viewMode: 3,
              // Ensure the crop box is always within the container
              crop: (event2) => {
              },
              autoCropArea: 1,
              // Ensure the initial crop area covers the entire image
              dragMode: "move",
              // Allow dragging to move the image within the container
              responsive: true,
              // Update crop box on resize
              cropBoxResizable: false,
              // Disable resizing the crop box
              minCropBoxWidth: cW,
              minCropBoxHeight: cH,
              minContainerWidth: 320,
              minContainerHeight: 320,
              aspectRatio: w / h
            });
            this.cropper.replace(imageSrc);
          };
          reader.readAsDataURL(file);
        } else {
          this.toastService.show("Please select image type.", { class: "bg-danger", title: "Invalid Image Type" });
        }
      } else {
        this.toastService.show("Please select valid file format.", { class: "bg-danger", title: "Invalid File Format" });
      }
    }
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    } else {
    }
  }
  onImageSubmit() {
    return __async(this, null, function* () {
      this.handleCropEvent();
      if (this.selectedIndex !== null && this.postDetails?.data) {
        this.postDetails.data = this.postDetails.data.map((item, index) => {
          if (index === this.selectedIndex && item.image) {
            let v = this.inputImageForm.get("image")?.value;
            if (this.selectedID) {
              const elementToChange = this.elementRef.nativeElement.querySelector(`[data-id="${this.selectedID}"]`);
              if (elementToChange) {
                const filteredItems = this.dataset.filter((item2) => item2.id === this.selectedID);
                if (filteredItems[0]) {
                  filteredItems[0].value = v || item.image.imageUrl;
                }
              }
            }
            return __spreadProps(__spreadValues({}, item), { image: __spreadProps(__spreadValues({}, item.image), { imageUrl: v }) });
          }
          return item;
        });
      }
      yield this.drawSVG();
      this.cropperModal.hide();
    });
  }
  handleCropEvent() {
    if (this.cropper) {
      const selectedItem = this.dataset.find((item) => item.id === this.selectedImage);
      let w = 800;
      let h = 800;
      if (selectedItem) {
        const index = parseInt(selectedItem.index, 10);
        if (this.postDetails?.data[index].image) {
          const newWH = this.commonService.calculateWH(this.postDetails?.data[index].image);
          w = newWH.w;
          h = newWH.h;
        }
      }
      const croppedCanvas = this.cropper.getCroppedCanvas();
      const resizedCanvas = document.createElement("canvas");
      const resizedContext = resizedCanvas.getContext("2d");
      resizedCanvas.width = w;
      resizedCanvas.height = h;
      resizedContext.drawImage(croppedCanvas, 0, 0, w, h);
      const resizedImageData = resizedCanvas.toDataURL("image/png");
      this.inputImageForm.get("image")?.setValue(resizedImageData);
    }
  }
  openImageCropperDialog() {
    const inputElement = this.imageInput.nativeElement;
    if (inputElement) {
      inputElement.click();
      inputElement.value = null;
    }
    this.cropperModal.hide();
  }
  handleSelectedEvent() {
    if (this.cropper) {
      const selectedItem = this.dataset.find((item) => item.id === this.selectedImage);
      let w = 800;
      let h = 800;
      if (selectedItem) {
        const index = parseInt(selectedItem.index, 10);
        if (this.postDetails?.data[index].image) {
          const newWH = this.commonService.calculateWH(this.postDetails?.data[index].image);
          w = newWH.w;
          h = newWH.h;
        }
      }
      const croppedCanvas = this.cropper.getCroppedCanvas();
      const resizedCanvas = document.createElement("canvas");
      const resizedContext = resizedCanvas.getContext("2d");
      resizedCanvas.width = w;
      resizedCanvas.height = h;
      resizedContext.drawImage(croppedCanvas, 0, 0, w, h);
      const resizedImageData = resizedCanvas.toDataURL("image/png");
      if (selectedItem) {
        const index = parseInt(selectedItem.index, 10);
        if (!isNaN(index) && this.postDetails?.data) {
          this.formData.get(this.selectedImage)?.setValue(resizedImageData);
          this.imageCropper.hide();
        }
      }
    }
  }
  static {
    this.\u0275fac = function PosterComponent_Factory(t) {
      return new (t || _PosterComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Title), \u0275\u0275directiveInject(Meta), \u0275\u0275directiveInject(PostDetailService), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(SvgRectService), \u0275\u0275directiveInject(SvgCircleService), \u0275\u0275directiveInject(SvgEllipseService), \u0275\u0275directiveInject(DevelopmentService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PlatformService), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(LoaderService), \u0275\u0275directiveInject(FontService), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(BaseUrlService), \u0275\u0275directiveInject(SEOService), \u0275\u0275directiveInject(PLATFORM_ID));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosterComponent, selectors: [["app-poster"]], viewQuery: function PosterComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
        \u0275\u0275viewQuery(_c2, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.imageDraw = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.textInput = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.imageInput = _t.first);
      }
    }, decls: 101, vars: 17, consts: [["imageDraw", ""], ["textInput", ""], ["imageInput", ""], [1, "h-100-vh", "d-flex", "flex-column"], [4, "ngIf"], [1, "flex-grow-1", "position-relative", "overflow-hidden", "mb-4", "min-h-600-px", "mx-3"], ["id", "canvas-container", 1, "position-absolute", "h-100", "w-100", "text-center", "d-flex", "align-items-center", "justify-content-center", "overflow-auto", "flex-column"], [1, "max-w-100", "max-h-100", "border", 3, "ngClass"], ["class", "max-w-100 max-h-100 rounded-4", "src", "./assets/images/svg/no-post.svg", 4, "ngIf"], ["href", "https://whatsapp.com/channel/0029VaePspU1iUxd0HOsMA1d", "target", "_blank", 1, "btn", "btn-success", "btn-md", "w-auto", "m-3"], [1, "fa", "fa-whatsapp", "me-2"], [1, "container"], ["class", "row g-2", 3, "formGroup", "ngSubmit", 4, "ngIf"], ["class", "position-sticky bottom-0 bg-light border-top px-3", 4, "ngIf"], ["id", "textModal", "tabindex", "-1", "aria-labelledby", "textModalLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-dialog-centered", "modal-dialog-scrollable"], [1, "modal-content"], [1, "modal-header"], ["id", "textModalLabel", 1, "modal-title"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close"], [1, "modal-body", "bg-dark"], [3, "ngSubmit", "formGroup"], ["type", "text", "formControlName", "text", 1, "form-control", "form-control-lg", "fw-bold"], [1, "d-flex", "mt-4"], ["type", "submit", 1, "btn", "btn-primary", "mx-auto", 3, "disabled"], [1, "fa", "fa-save"], ["id", "cropperModal", "tabindex", "-1", "aria-labelledby", "cropperModalLabel", "aria-hidden", "true", 1, "modal", "fade"], ["id", "cropperModalLabel", 1, "modal-title"], [1, "modal-body"], ["id", "cropper", "alt", "Crop", 1, "w-100", 3, "src"], ["type", "file", 2, "display", "none", 3, "change"], ["type", "hidden", "formControlName", "image"], ["type", "button", 1, "btn", "btn-success", "mx-auto", 3, "click"], [1, "fa", "fa-refresh"], [1, "btn", "btn-primary", "mx-auto", 3, "disabled"], ["id", "imageCropper", "tabindex", "-1", "aria-labelledby", "imageCropperLabel", "aria-hidden", "true", 1, "modal", "fade"], ["id", "imageCropperLabel", 1, "modal-title"], ["id", "imageToCropped", "alt", "Crop", 1, "w-100", 3, "src"], [1, "modal-footer"], [1, "btn", "btn-danger", "ms-3", 3, "click"], [1, "fa", "fa-close"], ["type", "button", 1, "btn", "btn-success", "ms-3", 3, "click"], ["id", "myInfo", "tabindex", "-1", "aria-labelledby", "myInfoLabel", "aria-hidden", "true", 1, "modal", "fade"], ["id", "myInfoLabel", 1, "modal-title"], [1, "mb-3"], ["for", "email", 1, "form-label"], ["href", "mailto:hirensojitra007@gmail.com", 1, "form-control", "text-decoration-none", "fw-bold"], ["for", "mobile", 1, "form-label"], ["href", "tel:+919429558759", 1, "form-control", "text-decoration-none", "fw-bold"], ["for", "social", 1, "form-label"], ["href", "http://www.facebook.com/SOJITRAHIREN", "target", "_blank", 1, "btn", "btn-primary", "m-2", "text-decoration-none"], [1, "fa", "fa-facebook", "me-2"], ["href", "http://www.instagram.com/HIREN_SOJITRA", "target", "_blank", 1, "btn", "btn-danger", "m-2", "text-decoration-none"], [1, "fa", "fa-instagram", "me-2"], ["href", "http://www.twitter.com/SOJITRA_HIREN", "target", "_blank", 1, "btn", "btn-dark", "m-2", "text-decoration-none"], [1, "fa", "fa-twitter", "me-2"], ["class", "text-center my-4 fw-b h5", 4, "ngIf"], ["class", "text-center mb-4 lh-base h6", 4, "ngIf"], [1, "text-center", "my-4", "fw-b", "h5"], [1, "text-center", "mb-4", "lh-base", "h6"], [1, "text-center", "mb-4"], ["src", "./assets/images/svg/no-post.svg", 1, "max-w-100", "max-h-100", "rounded-4"], [1, "row", "g-2", 3, "ngSubmit", "formGroup"], ["class", "form-group col-lg-4 offset-lg-4  col-sm-8 offset-sm-2 col-12 offset-0", 4, "ngFor", "ngForOf"], [1, "col-lg-4", "offset-lg-4", "col-sm-8", "offset-sm-2", "col-12", "offset-0"], [1, "my-2"], [1, "col-lg-4", "offset-lg-4", "col-sm-8", "offset-sm-2", "col-12", "offset-0", "d-flex"], ["type", "submit", 1, "btn", "btn-primary", "btn-md", "w-100", "me-2", "text-nowrap"], [1, "fa", "fa-gears", "me-2"], ["type", "button", 1, "btn", "btn-danger", "mx-auto", "btn-md", "text-nowrap", 3, "click"], [1, "col-lg-4", "offset-lg-4", "col-sm-8", "offset-sm-2", "col-12", "offset-0", "d-flex", "justify-content-center", "pb-3"], ["type", "button", 1, "btn", "btn-success", "btn-md", "text-nowrap", "me-1", 3, "click"], [1, "d-none-sm"], ["type", "button", 1, "btn", "btn-primary", "btn-md", "text-nowrap", "ms-1", 3, "click"], [1, "form-group", "col-lg-4", "offset-lg-4", "col-sm-8", "offset-sm-2", "col-12", "offset-0"], [1, "form-label", 3, "for"], ["type", "text", 1, "form-control", 3, "id", "name", "formControlName", "placeholder"], [1, "form-label"], ["type", "hidden", 1, "form-control", 3, "id", "name", "formControlName"], ["type", "file", "accept", "image/*", 1, "form-control", 3, "change", "id", "name", "formControlName"], ["for", "text", 1, "form-label"], ["id", "type", 1, "form-select", 3, "formControlName"], ["value", "", "disabled", "", "selected", ""], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "text-center", "my-2", "text-danger"], [1, "position-sticky", "bottom-0", "bg-light", "border-top", "px-3"], ["class", "w-100 mx-auto py-3 d-flex align-items-center justify-content-center", 4, "ngIf"], ["class", "row g-2", 4, "ngIf"], ["class", "w-auto mx-auto", 4, "ngIf"], [1, "w-100", "mx-auto", "py-3", "d-flex", "align-items-center", "justify-content-center"], ["href", "https://www.facebook.com/SOJITRAHIREN", "target", "_blank", 1, "fw-bold", "btn", "btn-outline-danger", "ms-3", 3, "click"], [1, "row", "g-2"], [1, "d-flex"], [1, "btn", "btn-primary", "btn-md", "me-1", "w-100", 3, "click"], [1, "fa", "fa-download", "me-2"], [1, "btn", "btn-danger", "ms-1", "btn-md", "text-nowrap", 3, "click"], [1, "fa", "fa-refresh", "me-2"], [1, "col-lg-4", "offset-lg-4", "col-sm-8", "offset-sm-2", "col-12", "offset-0", "d-flex", "pb-3"], ["type", "button", 1, "btn", "btn-success", "btn-md", "text-nowrap", "w-100", "me-1", 3, "click"], ["type", "button", 1, "btn", "btn-primary", "btn-md", "text-nowrap", "w-100", "ms-1", 3, "click"], [1, "w-auto", "mx-auto"], [1, "text-danger", "fw-bold", 3, "routerLink"], ["href", "", 1, "text-danger", "fw-bold"], [1, "my-3", "d-flex"], [1, "btn", "btn-md", "btn-danger", "mx-auto", 3, "click"], [1, "fa", "fa-user", "me-2"]], template: function PosterComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 3);
        \u0275\u0275template(1, PosterComponent_ng_container_1_Template, 4, 3, "ng-container", 4);
        \u0275\u0275elementStart(2, "div", 5)(3, "div", 6);
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(4, "svg", 7, 0);
        \u0275\u0275template(6, PosterComponent_img_6_Template, 1, 0, "img", 8)(7, PosterComponent_div_7_Template, 2, 0, "div", 4);
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(8, "a", 9);
        \u0275\u0275element(9, "i", 10);
        \u0275\u0275text(10, "Join Gujarat Info Channel");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(11, "div", 11);
        \u0275\u0275template(12, PosterComponent_form_12_Template, 20, 2, "form", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, PosterComponent_ng_container_13_Template, 4, 0, "ng-container", 4)(14, PosterComponent_div_14_Template, 5, 3, "div", 13)(15, PosterComponent_ng_container_15_Template, 8, 0, "ng-container", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 14)(17, "div", 15)(18, "div", 16)(19, "div", 17)(20, "h5", 18);
        \u0275\u0275text(21);
        \u0275\u0275elementEnd();
        \u0275\u0275element(22, "button", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "div", 20)(24, "form", 21);
        \u0275\u0275listener("ngSubmit", function PosterComponent_Template_form_ngSubmit_24_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onTextSubmit());
        });
        \u0275\u0275element(25, "input", 22, 1);
        \u0275\u0275elementStart(27, "div", 23)(28, "button", 24);
        \u0275\u0275element(29, "i", 25);
        \u0275\u0275text(30, " Save");
        \u0275\u0275elementEnd()()()()()()();
        \u0275\u0275elementStart(31, "div", 26)(32, "div", 15)(33, "div", 16)(34, "div", 17)(35, "h5", 27);
        \u0275\u0275text(36);
        \u0275\u0275elementEnd();
        \u0275\u0275element(37, "button", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "div", 28);
        \u0275\u0275element(39, "img", 29);
        \u0275\u0275elementStart(40, "input", 30, 2);
        \u0275\u0275listener("change", function PosterComponent_Template_input_change_40_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.handleImageInputChange($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "form", 21);
        \u0275\u0275listener("ngSubmit", function PosterComponent_Template_form_ngSubmit_42_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onImageSubmit());
        });
        \u0275\u0275element(43, "input", 31);
        \u0275\u0275elementStart(44, "div", 23)(45, "button", 32);
        \u0275\u0275listener("click", function PosterComponent_Template_button_click_45_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.openImageCropperDialog());
        });
        \u0275\u0275element(46, "i", 33);
        \u0275\u0275text(47, " Change Photo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "button", 34);
        \u0275\u0275element(49, "i", 25);
        \u0275\u0275text(50, " Save");
        \u0275\u0275elementEnd()()()()()()();
        \u0275\u0275elementStart(51, "div", 35)(52, "div", 15)(53, "div", 16)(54, "div", 17)(55, "h5", 36);
        \u0275\u0275text(56, "Crop Photo");
        \u0275\u0275elementEnd();
        \u0275\u0275element(57, "button", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "div", 28);
        \u0275\u0275element(59, "img", 37);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "div", 38)(61, "div", 23)(62, "button", 39);
        \u0275\u0275listener("click", function PosterComponent_Template_button_click_62_listener() {
          let tmp_5_0;
          \u0275\u0275restoreView(_r1);
          ctx.imageCropper.hide();
          return \u0275\u0275resetView((tmp_5_0 = ctx.formData.get(ctx.selectedImage + "-file")) == null ? null : tmp_5_0.reset());
        });
        \u0275\u0275element(63, "i", 40);
        \u0275\u0275text(64, " Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "button", 41);
        \u0275\u0275listener("click", function PosterComponent_Template_button_click_65_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.handleSelectedEvent());
        });
        \u0275\u0275element(66, "i", 25);
        \u0275\u0275text(67, " Save");
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275elementStart(68, "div", 42)(69, "div", 15)(70, "div", 16)(71, "div", 17)(72, "h5", 43);
        \u0275\u0275text(73, "Contact Information");
        \u0275\u0275elementEnd();
        \u0275\u0275element(74, "button", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(75, "div", 28)(76, "h5");
        \u0275\u0275text(77, "Hiren Sojitra");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "div", 44)(79, "label", 45);
        \u0275\u0275text(80, "Email:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(81, "a", 46);
        \u0275\u0275text(82, "hirensojitra007@gmail.com");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(83, "div", 44)(84, "label", 47);
        \u0275\u0275text(85, "Mobile:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(86, "a", 48);
        \u0275\u0275text(87, "+919429558759");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(88, "div", 44)(89, "label", 49);
        \u0275\u0275text(90, "Social Links:");
        \u0275\u0275elementEnd();
        \u0275\u0275element(91, "br");
        \u0275\u0275elementStart(92, "a", 50);
        \u0275\u0275element(93, "i", 51);
        \u0275\u0275text(94, "Facebook");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "a", 52);
        \u0275\u0275element(96, "i", 53);
        \u0275\u0275text(97, "Instagram");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(98, "a", 54);
        \u0275\u0275element(99, "i", 55);
        \u0275\u0275text(100, "Twitter");
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        let tmp_15_0;
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.postDetails);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(15, _c3, !ctx.postStatus && ctx.isDeleted));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.postStatus || ctx.isDeleted);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.postStatus == "loading");
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.canDownload && ctx.dataset.length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.postStatus);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.postStatus && ctx.isDeleted == false);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.postStatus || ctx.isDeleted);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.textModalTitle);
        \u0275\u0275advance(3);
        \u0275\u0275property("formGroup", ctx.inputTextForm);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.inputTextForm.invalid);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.cropperModalTitle);
        \u0275\u0275advance(3);
        \u0275\u0275property("src", (tmp_15_0 = ctx.inputImageForm.get("image")) == null ? null : tmp_15_0.value, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance(3);
        \u0275\u0275property("formGroup", ctx.inputImageForm);
        \u0275\u0275advance(6);
        \u0275\u0275property("disabled", ctx.inputImageForm.invalid);
      }
    }, dependencies: [NgClass, NgForOf, NgIf, RouterLink, AsteriskDirective, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosterComponent, { className: "PosterComponent", filePath: "src\\app\\module\\poster\\poster.component.ts", lineNumber: 49 });
})();

// src/app/module/poster/poster-routing.module.ts
var routes = [{
  path: "",
  component: PosterComponent,
  data: {
    title: "Proposal for Web Application Poster Generation Service | Gujarat Uvach",
    description: "Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material.",
    keywords: "poster generation, campaign posters, election posters, festival posts, promotional activities, customization, Gujarat Uvach, web application",
    robots: "index, follow",
    "og:image": "https://vmi2070714.contaboserver.net/api/v1/img/uploads/wLmyK?quality=30",
    "og:image:alt": "Gujarat Uvach Logo",
    "og:image:type": "image/svg+xml",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:title": "Web Application Poster Generation Service | Gujarat Uvach",
    "og:description": "Generate personalized posters for campaigns and festivals with Gujarat Info\u2019s web application. Easily customize with your photos, names, and contact details."
  }
}];
var PosterRoutingModule = class _PosterRoutingModule {
  static {
    this.\u0275fac = function PosterRoutingModule_Factory(t) {
      return new (t || _PosterRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _PosterRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/poster/poster.module.ts
var PosterModule = class _PosterModule {
  static {
    this.\u0275fac = function PosterModule_Factory(t) {
      return new (t || _PosterModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _PosterModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      PosterRoutingModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule
    ] });
  }
};
export {
  PosterModule
};
//# sourceMappingURL=chunk-BWKJCTPR.js.map
