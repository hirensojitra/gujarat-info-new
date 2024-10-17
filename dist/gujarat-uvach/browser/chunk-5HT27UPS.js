import {
  UserService
} from "./chunk-BM7BGPBE.js";
import {
  DevelopmentService
} from "./chunk-3FGB26MD.js";
import {
  AsteriskDirective,
  DistrictService,
  SelectDropdownDirective,
  SharedModule,
  TalukaService,
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
  VillageService,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-63CLPE7A.js";
import "./chunk-QJMPY6Q2.js";
import "./chunk-UHQMXXXD.js";
import {
  CommonModule,
  JsonPipe,
  NgForOf,
  NgIf,
  RouterLink,
  RouterModule,
  Subject,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-B5FGZX5H.js";

// src/app/module/user-profile/edit-profile/edit-profile.component.ts
function EditProfileComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "label", 17);
    \u0275\u0275text(3, "First Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 18);
    \u0275\u0275elementEnd()();
  }
}
function EditProfileComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "label", 17);
    \u0275\u0275text(3, "Last Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 19);
    \u0275\u0275elementEnd()();
  }
}
function EditProfileComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "label", 17);
    \u0275\u0275text(3, "Phone number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20)(5, "div", 21);
    \u0275\u0275text(6, "+91");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 22);
    \u0275\u0275elementEnd()()();
  }
}
function EditProfileComponent_div_17_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r1 = ctx.$implicit;
    \u0275\u0275property("value", d_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r1.name);
  }
}
function EditProfileComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "label", 23);
    \u0275\u0275text(2, "District");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 24)(4, "option", 25);
    \u0275\u0275text(5, "Select a district");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, EditProfileComponent_div_17_option_6_Template, 2, 2, "option", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r1.districts);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.districts);
  }
}
function EditProfileComponent_div_19_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275property("value", t_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3.name);
  }
}
function EditProfileComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "label", 28);
    \u0275\u0275text(2, "Taluka");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 29)(4, "option", 25);
    \u0275\u0275text(5, "Select a Taluka");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, EditProfileComponent_div_19_option_6_Template, 2, 2, "option", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.talukas);
  }
}
function EditProfileComponent_div_21_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r4 = ctx.$implicit;
    \u0275\u0275property("value", v_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(v_r4.name);
  }
}
function EditProfileComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "label", 30);
    \u0275\u0275text(2, "Village");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 31)(4, "option", 25);
    \u0275\u0275text(5, "Select a Village");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, EditProfileComponent_div_21_option_6_Template, 2, 2, "option", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.villages);
  }
}
var EditProfileComponent = class _EditProfileComponent {
  constructor(fb, userService, districtService, talukaService, villageService, DS, toastService) {
    this.fb = fb;
    this.userService = userService;
    this.districtService = districtService;
    this.talukaService = talukaService;
    this.villageService = villageService;
    this.DS = DS;
    this.toastService = toastService;
    this.districts = [];
    this.talukas = [];
    this.villages = [];
    this.destroy$ = new Subject();
    this.userForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      mobile: ["", Validators.required],
      district_id: [null, Validators.required],
      taluka_id: [null, Validators.required],
      village_id: [null, Validators.required]
    });
    this.userSubscription = this.userService.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        const filteredValue = {
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          mobile: user.mobile || "",
          district_id: user.district_id || "",
          taluka_id: user.taluka_id || "",
          village_id: user.village_id || ""
        };
        this.userForm.setValue(filteredValue);
        this.loadDistricts();
      }
    });
  }
  ngOnInit() {
    this.userForm.get("district_id")?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((districtId) => {
      this.userForm.get("taluka_id")?.markAsUntouched;
      this.userForm.get("village_id")?.markAsUntouched;
      this.selectedDistrict = this.districts.find((district) => district.id === districtId);
      this.talukas = [];
      this.villages = [];
      this.loadTalukas();
      this.userForm.get("taluka_id")?.setValue(null);
    });
    this.userForm.get("taluka_id")?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((talukaId) => {
      this.userForm.get("village_id")?.markAsUntouched;
      this.selectedTaluka = this.talukas.find((taluka) => taluka.id === talukaId);
      this.villages = [];
      this.loadVillages();
      this.userForm.get("village_id")?.setValue(null);
    });
  }
  loadDistricts() {
    this.districtService.getDistrict().pipe(takeUntil(this.destroy$)).subscribe((districts) => {
      this.districts = districts;
      if (districts.length) {
        this.selectedDistrict = districts.find((district) => district.id === this.user?.district_id);
        this.userForm.get("district_id")?.setValue(this.selectedDistrict?.id || null);
      }
    });
  }
  loadTalukas() {
    const districtId = this.userForm.get("district_id")?.value;
    if (districtId) {
      this.talukaService.getTalukaByDistrict(districtId).pipe(takeUntil(this.destroy$)).subscribe((talukas) => {
        this.talukas = talukas;
        if (talukas.length) {
          this.selectedTaluka = talukas.find((taluka) => taluka.id === this.user?.taluka_id);
          this.userForm.get("taluka_id")?.setValue(this.selectedTaluka?.id || null);
        }
      });
    }
  }
  loadVillages() {
    const talukaId = this.userForm.get("taluka_id")?.value;
    const districtId = this.userForm.get("district_id")?.value;
    if (talukaId && districtId) {
      this.villageService.getVillageByTaluka(talukaId).pipe(takeUntil(this.destroy$)).subscribe((villages) => {
        this.villages = villages;
        if (villages.length) {
          this.selectedVillage = villages.find((village) => village.id === this.user?.village_id);
          this.userForm.get("village_id")?.setValue(this.selectedVillage?.id || null);
        }
      });
    }
  }
  saveUser() {
    if (this.userForm.valid) {
      if (this.user) {
        const formValue = this.userForm.value;
        const isUserDataChanged = Object.keys(formValue).some((key) => this.user[key] !== formValue[key]);
        if (!isUserDataChanged) {
          this.toastService.show("User data has not changed. Skipping update.", { class: "bg-danger" });
          return;
        }
        const userid = this.user["id"];
        if (!userid) {
          this.toastService.show("Invalid userid.", { class: "bg-danger" });
          return;
        }
        this.userForm.setValue(formValue);
        const updateUser$ = this.userService.updateUserData(userid, formValue);
        updateUser$.subscribe((response) => {
          this.userService.setUser(response.user);
          this.toastService.show(response.message, { class: "bg-success" });
          this.userForm.setValue(formValue);
        }, (error) => {
          console.error("Error updating user:", error);
          const errorMessage = error && typeof error.message === "string" ? error.message : "Unexpected server response. Please check the network log.";
          this.toastService.show(errorMessage, { class: "bg-danger" });
        });
        ;
      }
    } else {
      this.DS.markFormGroupTouched(this.userForm);
    }
  }
  validateImage(imageUrl) {
    return imageUrl || `https://dummyimage.com/300x300/F4F4F4/000000&text=${this.imageText()}`;
  }
  imageText() {
    if (this.user && this.user.firstname && this.user.lastname) {
      const firstCharFirstName = this.user.firstname.charAt(0);
      const firstCharLastName = this.user.lastname.charAt(0);
      return `${firstCharFirstName}${firstCharLastName}`;
    } else {
      return "USER";
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.userSubscription.unsubscribe();
  }
  static {
    this.\u0275fac = function EditProfileComponent_Factory(t) {
      return new (t || _EditProfileComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(DistrictService), \u0275\u0275directiveInject(TalukaService), \u0275\u0275directiveInject(VillageService), \u0275\u0275directiveInject(DevelopmentService), \u0275\u0275directiveInject(ToastService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditProfileComponent, selectors: [["app-edit-profile"]], decls: 27, vars: 10, consts: [[1, "h-100", "w-100", "position-md-absolute", "overflow-auto", "d-flex", "flex-column"], [1, "card-header", "d-flex", "align-items-center"], [1, "m-0"], ["routerLink", "/user-profile/view", 1, "btn", "btn-danger", "btn-sm", "ms-auto"], [1, "fa", "fa-close", "me-2"], [1, "card-body", "flex-grow-1", "position-relative", "p-0"], [1, "h-100", "w-100", "p-3", "position-md-absolute", "start-0", "top-0", "overflow-auto"], [1, "row", "g-3", 3, "ngSubmit", "formGroup"], ["class", "col-lg-3 col-md-4 col-sm-6", 4, "ngIf"], [1, "col-6", "col-lg-3"], ["class", "form-group mt-1", 4, "ngIf"], [1, "row", "gx-3", "mt-3"], [1, "col-12"], [1, "btn", "btn-success", 3, "click"], [1, "fa", "fa-save", "me-2"], [1, "col-lg-3", "col-md-4", "col-sm-6"], [1, "form-group", "mt-1"], [1, "form-label"], ["type", "text", "placeholder", "", "aria-label", "First name", "formControlName", "firstname", 1, "form-control"], ["type", "text", "placeholder", "", "aria-label", "Last name", "formControlName", "lastname", 1, "form-control"], [1, "input-group"], [1, "input-group-text"], ["type", "text", "placeholder", "", "aria-label", "Phone number", "formControlName", "mobile", 1, "form-control"], ["for", "district_id", 1, "form-label"], ["id", "district_id", "formControlName", "district_id", "selectDropdown", "", 1, "form-select", 3, "options"], ["value", "", "disabled", "", "selected", ""], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["for", "taluka_id", 1, "form-label"], ["id", "taluka_id", "formControlName", "taluka_id", 1, "form-select"], ["for", "village_id", 1, "form-label"], ["id", "village_id", "formControlName", "village_id", 1, "form-select"]], template: function EditProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h5", 2);
        \u0275\u0275text(3, "Edit Profile");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275element(5, "i", 4);
        \u0275\u0275text(6, "Cancel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "form", 7);
        \u0275\u0275listener("ngSubmit", function EditProfileComponent_Template_form_ngSubmit_9_listener() {
          return false;
        });
        \u0275\u0275elementStart(10, "pre");
        \u0275\u0275text(11);
        \u0275\u0275pipe(12, "json");
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, EditProfileComponent_div_13_Template, 5, 0, "div", 8)(14, EditProfileComponent_div_14_Template, 5, 0, "div", 8)(15, EditProfileComponent_div_15_Template, 8, 0, "div", 8);
        \u0275\u0275elementStart(16, "div", 9);
        \u0275\u0275template(17, EditProfileComponent_div_17_Template, 7, 2, "div", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 9);
        \u0275\u0275template(19, EditProfileComponent_div_19_Template, 7, 1, "div", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 9);
        \u0275\u0275template(21, EditProfileComponent_div_21_Template, 7, 1, "div", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 11)(23, "div", 12)(24, "button", 13);
        \u0275\u0275listener("click", function EditProfileComponent_Template_button_click_24_listener() {
          return ctx.saveUser();
        });
        \u0275\u0275element(25, "i", 14);
        \u0275\u0275text(26, "Save");
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275property("formGroup", ctx.userForm);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 8, ctx.user));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.userForm.get("firstname") !== null);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.userForm.get("lastname") !== null);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.userForm.get("mobile") !== null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.userForm.get("district_id"));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.userForm.get("taluka_id"));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.userForm.get("village_id"));
      }
    }, dependencies: [NgForOf, NgIf, RouterLink, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, SelectDropdownDirective, AsteriskDirective, JsonPipe] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditProfileComponent, { className: "EditProfileComponent", filePath: "src\\app\\module\\user-profile\\edit-profile\\edit-profile.component.ts", lineNumber: 18 });
})();

// src/app/module/user-profile/edit-profile/edit-profile-routing.module.ts
var routes = [{
  path: "",
  component: EditProfileComponent,
  data: {
    title: "Edit Profile - Your Website",
    description: "Edit your profile details including name, mobile, and location.",
    keywords: "edit profile, user settings, update user details",
    robots: "index, follow",
    image: "/assets/edit-profile-image.png",
    canonical: "https://gujarat-uvach.netlify.app/edit-profile",
    breadcrumb: "Edit Profile"
  }
}];
var EditProfileRoutingModule = class _EditProfileRoutingModule {
  static {
    this.\u0275fac = function EditProfileRoutingModule_Factory(t) {
      return new (t || _EditProfileRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _EditProfileRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/user-profile/edit-profile/edit-profile.module.ts
var EditProfileModule = class _EditProfileModule {
  static {
    this.\u0275fac = function EditProfileModule_Factory(t) {
      return new (t || _EditProfileModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _EditProfileModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      EditProfileRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      SharedModule
    ] });
  }
};
export {
  EditProfileModule
};
//# sourceMappingURL=chunk-5HT27UPS.js.map
