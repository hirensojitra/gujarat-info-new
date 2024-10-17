import {
  DefaultValueAccessor,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  VillageService,
  ɵNgSelectMultipleOption
} from "./chunk-63CLPE7A.js";
import {
  PlatformService
} from "./chunk-QJMPY6Q2.js";
import {
  environment
} from "./chunk-UHQMXXXD.js";
import {
  BehaviorSubject,
  ChangeDetectorRef,
  CommonModule,
  DOCUMENT,
  ElementRef,
  EventEmitter,
  HttpClient,
  InputFlags,
  NgForOf,
  NgIf,
  Renderer2,
  RendererFactory2,
  Subject,
  Subscription,
  __async,
  __commonJS,
  __spreadValues,
  catchError,
  forwardRef,
  map,
  of,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-B5FGZX5H.js";

// (disabled):fs
var require_fs = __commonJS({
  "(disabled):fs"() {
  }
});

// src/app/common/services/language.service.ts
var LanguageService = class _LanguageService {
  constructor(http) {
    this.http = http;
    this.storageKey = "activeLanguage";
    this.defaultLanguage = "mr";
    this.translations = new BehaviorSubject({});
    const storedValue = localStorage.getItem(this.storageKey);
    const initialLanguage = storedValue !== null ? storedValue : this.defaultLanguage;
    this._languageSubject = new BehaviorSubject(initialLanguage);
    this.language$ = this._languageSubject.asObservable();
    this.loadTranslations(initialLanguage);
  }
  loadTranslations(lang) {
    this.http.get(`./assets/data/lang/${lang}.json`).subscribe((translations) => this.translations.next(translations), (error) => console.error(`Could not load translations for ${lang}:`, error));
  }
  get currentLanguage() {
    return this._languageSubject.value;
  }
  set currentLanguage(language) {
    localStorage.setItem(this.storageKey, language);
    this.loadTranslations(language);
    this._languageSubject.next(language);
  }
  changeLanguage(language) {
    this.currentLanguage = language;
  }
  getTranslation(key) {
    return this.translations.asObservable().pipe(map((translations) => translations[key] || key));
  }
  getTranslationSync(key) {
    const translations = this.translations.getValue();
    return translations[key] || key;
  }
  static {
    this.\u0275fac = function LanguageService_Factory(t) {
      return new (t || _LanguageService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LanguageService, factory: _LanguageService.\u0275fac, providedIn: "root" });
  }
};

// src/app/common/directives/captcha.directive.ts
var CaptchaDirective = class _CaptchaDirective {
  constructor(fb, el, renderer, formGroupDirective, cdr, ls) {
    this.fb = fb;
    this.el = el;
    this.renderer = renderer;
    this.formGroupDirective = formGroupDirective;
    this.cdr = cdr;
    this.ls = ls;
    this.captchaValue = "";
    this.captchaAdded = new EventEmitter();
    this.label = "Captcha";
    this.placeholder = "Enter Captcha";
    this.canvasElement = this.renderer.createElement("canvas");
  }
  onEnterPress(event) {
    event.preventDefault();
  }
  onReset(event) {
    this.formGroup?.get("captcha")?.setValue("", { emitEvent: false });
    this.resetCaptcha();
  }
  ngAfterViewInit() {
    return __async(this, null, function* () {
      this.cValue = this.formGroup.get("captcha")?.value;
      this.languageSubscription = yield this.ls.language$.subscribe((language) => {
        switch (language) {
          case "en":
            this.label = "Captcha";
            this.placeholder = "Enter Captcha";
            break;
          case "mr":
            this.label = "\u0915\u0945\u092A\u094D\u091A\u093E";
            this.placeholder = "\u0915\u0945\u092A\u094D\u091A\u093E \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F \u0915\u0930\u093E";
            break;
          case "fr":
            console.log("French selected");
            break;
          default:
            this.label = "Captcha";
            this.placeholder = "Enter Captcha";
            break;
        }
        if (this.inputLabel) {
          this.inputLabel.textContent = this.label;
          const asteriskSpan2 = this.renderer.createElement("span");
          this.renderer.addClass(asteriskSpan2, "text-danger");
          this.renderer.appendChild(asteriskSpan2, this.renderer.createText(" *"));
          this.renderer.appendChild(this.inputLabel, asteriskSpan2);
        }
        ;
        if (this.inputElement) {
          this.renderer.setAttribute(inputElement, "placeholder", this.placeholder);
        }
        ;
      });
      this.formGroup?.valueChanges.subscribe(() => {
      });
      let formGroup = this.formGroup || this.formGroupDirective.form;
      this.captchaFormControl = new FormControl("", Validators.required);
      formGroup.addControl("captcha", this.captchaFormControl);
      this.generateCaptcha(this.canvasElement);
      const form = this.el.nativeElement;
      form.formGroup = formGroup;
      const captchaContainer = this.renderer.createElement("div");
      captchaContainer.classList.add("mb-3");
      const submitButton = this.el.nativeElement.querySelector('button[type="submit"]');
      let parentForm = submitButton;
      while (parentForm && parentForm.parentElement.tagName !== "FORM") {
        parentForm = parentForm.parentElement;
      }
      this.inputLabel = this.renderer.createElement("label");
      if (this.captchaLabelClasses) {
        const trimmedClasses = this.captchaLabelClasses.trim();
        const classesArray = trimmedClasses.split(" ");
        classesArray.forEach((className) => {
          this.inputLabel.classList.add(className);
        });
      }
      this.inputLabel.textContent = this.label;
      const asteriskSpan = this.renderer.createElement("span");
      this.renderer.addClass(asteriskSpan, "text-danger");
      this.renderer.appendChild(asteriskSpan, this.renderer.createText(" *"));
      this.renderer.appendChild(this.inputLabel, asteriskSpan);
      this.inputElement = this.renderer.createElement("input");
      const inputElement = this.inputElement;
      this.captchaControl = this.inputElement;
      this.renderer.listen(inputElement, "input", (e) => {
        const captchaControl2 = formGroup.get("captcha");
        if (captchaControl2 && inputElement.value !== this.captchaValue) {
          captchaControl2.setErrors({ "invalid": true });
          const validatorFn = (control) => {
            const captchaValue = control.value;
            return captchaValue === this.captchaValue ? null : { "captchaMismatch": true };
          };
          this.captchaFormControl.setValidators([
            Validators.required,
            Validators.minLength(this.character || 5),
            Validators.maxLength(this.character || 5),
            validatorFn
          ]);
          errorMessageDiv.style.display = "block";
          this.renderer.addClass(inputElement, "border-danger");
        } else {
          captchaControl2.updateValueAndValidity();
          captchaControl2.setErrors({ "invalid": false });
          captchaControl2.setErrors({ "required": false });
          errorMessageDiv.style.display = "none";
          this.renderer.removeClass(this.inputLabel, "text-danger");
          this.renderer.removeClass(inputElement, "border-danger");
          delete captchaControl2.errors["invalid"];
          if (Object.keys(captchaControl2.errors).length === 0) {
            captchaControl2.updateValueAndValidity();
          }
        }
      });
      this.renderer.setAttribute(inputElement, "type", "text");
      this.renderer.setAttribute(inputElement, "placeholder", this.placeholder);
      this.renderer.setAttribute(inputElement, "formControlName", "captcha");
      inputElement.classList.add("form-control");
      const errorMessageDiv = this.renderer.createElement("div");
      this.errorLabel = errorMessageDiv;
      errorMessageDiv.style.position = "absolute";
      errorMessageDiv.style.top = "100%";
      errorMessageDiv.classList.add("text-danger");
      errorMessageDiv.innerHTML = "<small>Captcha is not valid</small>";
      errorMessageDiv.style.display = "none";
      inputElement.addEventListener("input", (event) => {
        const input = event.target;
        const newValue = input.value;
        const captchaControl2 = formGroup.get("captcha");
        if (captchaControl2) {
          captchaControl2.setValue(newValue);
        } else {
          captchaControl2.setErrors({ "required": true });
        }
      });
      form.addEventListener("submit", (event) => {
        const captchaControl2 = formGroup.get("captcha");
        if (captchaControl2) {
          const captchaInputValue = captchaControl2.value;
          if (captchaInputValue === this.captchaValue) {
            errorMessageDiv.style.display = "none";
            this.renderer.removeClass(this.inputLabel, "text-danger");
            this.renderer.removeClass(inputElement, "border-danger");
            if (!formGroup.valid) {
              this.resetCaptcha();
            }
          } else {
            captchaControl2.setErrors({ "invalid": true });
            errorMessageDiv.style.display = "block";
            this.resetCaptcha();
          }
        }
        event.preventDefault();
      });
      const canvasElement = this.canvasElement;
      const refreshButton = this.renderer.createElement("button");
      this.renderer.setAttribute(refreshButton, "type", "button");
      refreshButton.classList.add("btn", "btn-secondary");
      const buttonIcon = this.renderer.createElement("i");
      buttonIcon.classList.add("fa", "fa-refresh");
      this.renderer.appendChild(refreshButton, buttonIcon);
      this.renderer.listen(refreshButton, "click", (event) => {
        event.preventDefault();
        this.resetCaptcha();
      });
      const captchaControl = this.renderer.createElement("div");
      captchaControl.classList.add("d-flex", "align-items-center", "justify-content-center");
      let captchaInputElement = form.querySelector(".captcha-input");
      let captchaLabelElement = form.querySelector(".captcha-label");
      if (this.captchaStyle === "floating") {
        const formFloatingDiv = this.renderer.createElement("div");
        formFloatingDiv.classList.add("form-floating");
        this.renderer.appendChild(formFloatingDiv, inputElement);
        this.renderer.appendChild(formFloatingDiv, this.inputLabel);
        this.renderer.appendChild(captchaContainer, formFloatingDiv);
      } else {
        if (captchaLabelElement) {
          this.renderer.appendChild(captchaLabelElement, this.inputLabel);
        } else {
          this.renderer.appendChild(captchaContainer, this.inputLabel);
        }
        if (captchaInputElement) {
          this.renderer.appendChild(captchaInputElement, captchaControl);
          this.renderer.appendChild(captchaControl, inputElement);
          this.renderer.appendChild(captchaControl, canvasElement);
          this.renderer.addClass(canvasElement, "mx-3");
          this.renderer.addClass(canvasElement, "border-dark");
          this.renderer.addClass(canvasElement, "rounded");
          this.renderer.appendChild(captchaControl, refreshButton);
        } else {
          this.renderer.appendChild(captchaControl, canvasElement);
          this.renderer.appendChild(captchaControl, refreshButton);
          this.renderer.appendChild(captchaContainer, captchaControl);
          this.renderer.appendChild(captchaContainer, inputElement);
        }
      }
      if (captchaInputElement) {
        this.renderer.appendChild(captchaInputElement, errorMessageDiv);
        this.renderer.addClass(errorMessageDiv, "position-absolute");
        this.renderer.addClass(errorMessageDiv, "top-100");
      } else {
        this.renderer.appendChild(captchaContainer, errorMessageDiv);
        this.renderer.appendChild(form, captchaContainer);
      }
      if (parentForm) {
        this.renderer.insertBefore(form, captchaContainer, parentForm);
      } else {
        this.renderer.appendChild(form, captchaContainer);
      }
      this.captchaAdded.emit();
    });
  }
  ngOnInit() {
  }
  generateCaptcha(canvas) {
    if (this.inputLabel) {
      this.renderer.removeClass(this.inputLabel, "text-danger");
    }
    if (this.inputElement) {
      this.renderer.removeClass(this.inputElement, "border-danger");
    }
    if (this.errorLabel) {
      this.errorLabel.style.display = "none";
    }
    const character = this.character || 5;
    canvas.height = 35;
    canvas.width = character * 23;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz@#$";
      let captchaText = "";
      const angleMin = -45;
      const angleMax = 45;
      const angleRange = angleMax - angleMin;
      const fontSizeMin = 15;
      const fontSizeMax = 20;
      const fontSizeRange = fontSizeMax - fontSizeMin;
      for (let i = 0; i < character; i++) {
        const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        captchaText += randomChar;
        context.font = `${fontSizeMin + Math.random() * fontSizeRange}px Arial`;
        context.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        const angle = angleMin + Math.random() * angleRange;
        context.translate(20 + i * 20, canvas.height / 2);
        context.rotate(angle * (Math.PI / 180));
        context.fillText(randomChar, 0, 0);
        context.rotate(-angle * (Math.PI / 180));
        context.translate(-(20 + i * 20), -canvas.height / 2);
        context.shadowColor = "transparent";
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
      }
      this.captchaValue = captchaText;
      sessionStorage.setItem("captchaCode", this.captchaValue);
    }
  }
  resetCaptcha() {
    let formGroup = this.formGroupDirective.form;
    this.inputElement.value = "";
    const captchaControl = formGroup.get("captcha");
    this.captchaFormControl.setValue("", { emitEvent: false });
    const validatorFn = (control) => {
      const captchaValue = control.value;
      return captchaValue === this.captchaValue ? null : { "captchaMismatch": true };
    };
    this.captchaFormControl.setValidators([
      Validators.required,
      Validators.minLength(this.character || 5),
      Validators.maxLength(this.character || 5),
      validatorFn
    ]);
    captchaControl.updateValueAndValidity();
    this.generateCaptcha(this.canvasElement);
    this.cdr.detectChanges();
  }
  static {
    this.\u0275fac = function CaptchaDirective_Factory(t) {
      return new (t || _CaptchaDirective)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(FormGroupDirective), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(LanguageService));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _CaptchaDirective, selectors: [["", "captcha", ""]], hostBindings: function CaptchaDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown.enter", function CaptchaDirective_keydown_enter_HostBindingHandler($event) {
          return ctx.onEnterPress($event);
        })("reset", function CaptchaDirective_reset_HostBindingHandler($event) {
          return ctx.onReset($event);
        });
      }
    }, inputs: { character: "character", captchaStyle: "captchaStyle", captchaLabelClasses: "captchaLabelClasses", formGroup: "formGroup" }, outputs: { captchaAdded: "captchaAdded" }, features: [\u0275\u0275ProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _CaptchaDirective),
      multi: true
    }])] });
  }
};

// src/app/common/directives/toggle-password.directive.ts
var TogglePasswordDirective = class _TogglePasswordDirective {
  constructor(el, renderer) {
    this.el = el;
    this.renderer = renderer;
  }
  ngAfterViewInit() {
    this.type = "password";
    const container = this.renderer.createElement("div");
    this.renderer.addClass(container, "input-group");
    const inputElement = this.el.nativeElement;
    this.renderer.setAttribute(inputElement, "type", this.type);
    this.renderer.insertBefore(inputElement.parentElement, container, inputElement);
    this.renderer.appendChild(container, inputElement);
    const buttonElement = this.renderer.createElement("button");
    this.renderer.setAttribute(buttonElement, "type", "button");
    this.renderer.addClass(buttonElement, "btn");
    this.renderer.addClass(buttonElement, "btn-outline-secondary");
    const iconElement = this.renderer.createElement("i");
    this.renderer.addClass(iconElement, "fa");
    this.renderer.addClass(iconElement, "fa-eye-slash");
    this.renderer.appendChild(buttonElement, iconElement);
    this.renderer.appendChild(container, buttonElement);
    buttonElement.addEventListener("click", () => {
      if (iconElement.classList.contains("fa-eye-slash")) {
        iconElement.classList.remove("fa-eye-slash");
        iconElement.classList.add("fa-eye");
        inputElement.type = "text";
      } else {
        iconElement.classList.remove("fa-eye");
        iconElement.classList.add("fa-eye-slash");
        inputElement.type = "password";
      }
    });
    const parentElement = container.parentElement;
    if (parentElement.classList.contains("form-floating")) {
      parentElement.classList.remove("form-floating");
      container.classList.add("form-floating");
      container.classList.add("mb-3");
      const labelElement = parentElement.querySelector("label");
      if (labelElement) {
        container.appendChild(labelElement);
        inputElement.classList.add("bg-transparent");
      }
      parentElement.parentNode.insertBefore(container, parentElement.nextSibling);
      parentElement.parentNode.removeChild(parentElement);
    }
  }
  static {
    this.\u0275fac = function TogglePasswordDirective_Factory(t) {
      return new (t || _TogglePasswordDirective)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _TogglePasswordDirective, selectors: [["", "togglePassword", ""]], inputs: { type: "type" } });
  }
};

// src/app/common/directives/accordion-active.directive.ts
var AccordionActiveDirective = class _AccordionActiveDirective {
  constructor(el, renderer) {
    this.el = el;
    this.renderer = renderer;
  }
  onClick() {
    const parentAccordion = this.el.nativeElement.closest(".accordion");
    const parentItem = this.el.nativeElement.closest(".accordion-item");
    if (parentAccordion && parentItem) {
      const allButtons = parentAccordion.querySelectorAll(".accordion-button");
      allButtons.forEach((button) => {
        if (button !== this.el.nativeElement) {
          this.renderer.setProperty(button, "disabled", false);
        }
      });
      const allAccordionItem = parentAccordion.querySelectorAll(".accordion-item");
      allAccordionItem.forEach((accordionItem) => {
        if (accordionItem) {
          accordionItem.classList.remove("flex-grow-1");
          accordionItem.classList.remove("d-flex");
          accordionItem.classList.remove("flex-column");
        }
      });
      if (this.el.nativeElement.classList.contains("collapsed")) {
        this.renderer.removeClass(parentItem, "flex-grow-1");
        this.renderer.removeClass(parentItem, "d-flex");
        this.renderer.removeClass(parentItem, "flex-column");
        this.renderer.setProperty(this.el.nativeElement, "disabled", false);
      } else {
        this.renderer.addClass(parentItem, "flex-grow-1");
        this.renderer.addClass(parentItem, "d-flex");
        this.renderer.addClass(parentItem, "flex-column");
        this.renderer.setProperty(this.el.nativeElement, "disabled", true);
      }
    }
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const accordion = this.el.nativeElement.closest(".accordion");
      if (!accordion)
        return;
      for (const button of accordion.querySelectorAll(".accordion-button")) {
        this.renderer.setProperty(button, "disabled", false);
        button.closest(".accordion-item")?.classList.remove("flex-grow-1");
        button.closest(".accordion-item")?.classList.remove("d-flex");
        button.closest(".accordion-item")?.classList.remove("flex-column");
      }
      yield new Promise((resolve) => setTimeout(resolve, 100));
      if (!this.el.nativeElement.classList.contains("collapsed")) {
        const parentItem = this.el.nativeElement.closest(".accordion-item");
        if (parentItem) {
          this.renderer.addClass(parentItem, "flex-grow-1");
          this.renderer.addClass(parentItem, "d-flex");
          this.renderer.addClass(parentItem, "flex-column");
          this.renderer.setProperty(this.el.nativeElement, "disabled", true);
        }
      }
    });
  }
  static {
    this.\u0275fac = function AccordionActiveDirective_Factory(t) {
      return new (t || _AccordionActiveDirective)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _AccordionActiveDirective, selectors: [["", 8, "accordion-button"]], hostBindings: function AccordionActiveDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function AccordionActiveDirective_click_HostBindingHandler() {
          return ctx.onClick();
        });
      }
    } });
  }
};

// src/app/common/directives/select-dropdown.directive.ts
var SelectDropdownDirective = class _SelectDropdownDirective {
  set options(value) {
    value && this.optionsSubject.next(value);
  }
  constructor(el, renderer, ngControl) {
    this.el = el;
    this.renderer = renderer;
    this.ngControl = ngControl;
    this.multiple = false;
    this.controlName = "";
    this.label = "";
    this.defaultOptionText = "Select";
    this.loadingText = "Loading...";
    this.btn = void 0;
    this.dropdownItemArray = [];
    this.isFocusInProgress = false;
    this.lastPressedKey = null;
    this.lastFocusedItem = null;
    this.focusedItem = null;
    this.optionsSubject = new Subject();
    this.handleDropdownKeyPress = (event) => {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        const key = event.key.toLowerCase();
        if (/^[a-z]$/.test(key)) {
          if (key === this.lastPressedKey) {
            const currentIndex = this.lastFocusedItem ? this.dropdownItemArray.indexOf(this.lastFocusedItem) : -1;
            let nextMatchingItem = this.dropdownItemArray.slice(currentIndex + 1).find((item) => (item.textContent?.trim().charAt(0) || "").toLowerCase() === key);
            if (!nextMatchingItem) {
              nextMatchingItem = this.dropdownItemArray.find((item) => (item.textContent?.trim().charAt(0) || "").toLowerCase() === key);
            }
            if (nextMatchingItem) {
              this.lastFocusedItem = nextMatchingItem;
              nextMatchingItem.setAttribute("tabindex", "0");
              nextMatchingItem.focus();
            }
          } else {
            const matchingItem = this.dropdownItemArray.find((item) => {
              const firstLetter = (item.textContent?.trim().charAt(0) || "").toLowerCase();
              return firstLetter === key;
            });
            if (matchingItem) {
              this.lastFocusedItem = matchingItem;
              matchingItem.setAttribute("tabindex", "0");
              matchingItem.focus();
            }
          }
          this.lastPressedKey = key;
        }
      } else if (event.key == "Enter" && this.focusedItem) {
        this.focusedItem.click();
      }
    };
    this.optionsSubject.subscribe((options) => {
      options = Array.isArray(options) ? options : [];
      options.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      new Promise((resolve) => {
        this.createDropdown(options);
        resolve();
      }).then(() => {
        this.checkActive(this.dropdownItemArray);
      });
    });
  }
  ngOnInit() {
  }
  onBlur() {
    if (this.controlName && this.ngControl.control) {
      this.ngControl.control.markAsTouched();
    }
  }
  ngAfterViewInit() {
  }
  checkActive(dropdownItemArray) {
    const controlValue = this.ngControl?.control?.value;
    let buttonText = "Select Option";
    let isExist = false;
    if (Array.isArray(controlValue)) {
      let selected = [];
      dropdownItemArray.forEach((dropdownItem) => {
        const optionId = dropdownItem.getAttribute("data-option-id");
        const optionName = dropdownItem.getAttribute("data-option-name");
        const isActive = controlValue.includes(optionId);
        isActive ? (isExist = true, this.renderer.addClass(dropdownItem, "active"), selected.push(optionName?.toString() || "")) : this.renderer.removeClass(dropdownItem, "active");
      });
      if (!isExist) {
        this.ngControl?.control?.setValue("");
        buttonText = "Select Option";
      }
      selected.sort((a, b) => a.localeCompare(b));
      this.renderer.setProperty(this.btn, "textContent", selected.join(", ") || buttonText);
    } else {
      let buttonText2 = "Select Option";
      dropdownItemArray.forEach((dropdownItem) => {
        const optionId = dropdownItem.getAttribute("data-option-id")?.toString();
        const isActive = controlValue?.toString() === optionId;
        isActive ? (isExist = true, this.renderer.addClass(dropdownItem, "active"), buttonText2 = dropdownItem.getAttribute("data-option-name")) : this.renderer.removeClass(dropdownItem, "active");
      });
      if (!isExist) {
        this.ngControl?.control?.setValue("");
        buttonText2 = "Select Option";
      }
      this.renderer.setProperty(this.btn, "textContent", buttonText2);
    }
  }
  ngOnChanges(changes) {
  }
  generateRandomNumericString() {
    return Math.floor(1e3 + Math.random() * 9e3).toString();
  }
  getButtonText(selectedValues, options) {
    options.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    const selectedOptions = options.filter((option) => selectedValues.includes(option.id.toString()));
    return selectedOptions.map((option) => option.name || "").join(", ");
  }
  applyClasses(element, classes) {
    classes.forEach((className) => this.renderer.addClass(element, className));
  }
  setAttributes(element, attributes) {
    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        this.renderer.setAttribute(element, key, attributes[key]);
      }
    }
  }
  createDropdown(options) {
    if (Array.isArray(this.ngControl?.control?.value) && !this.multiple) {
      this.ngControl.control?.setValue("");
    } else if (!Array.isArray(this.ngControl?.control?.value) && this.multiple) {
      this.ngControl.control?.setValue([]);
    }
    const parent = this.renderer.parentNode(this.el.nativeElement);
    this.renderer.addClass(this.el.nativeElement, "d-none");
    const childDropdown = parent.querySelector(".dropdown");
    const formGroup = parent && parent.classList.contains("form-group");
    if (childDropdown) {
      this.renderer.removeChild(parent, childDropdown);
    }
    const selectId = this.generateRandomNumericString();
    const dropdown = this.renderer.createElement("div");
    this.applyClasses(dropdown, ["dropdown", "position-relative"]);
    this.btn = this.renderer.createElement("button");
    this.applyClasses(this.btn, ["form-select", "text-start", "text-truncate", "pe-5"]);
    const btnAttributes = {
      "type": "button",
      "id": `${selectId}-dropdown`,
      "data-bs-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false",
      "tabindex": "0"
    };
    this.setAttributes(this.btn, btnAttributes);
    this.renderer.appendChild(this.btn, this.renderer.createText("Select"));
    const dropdownContainer = this.renderer.createElement("div");
    this.applyClasses(dropdownContainer, ["dropdown-menu", "w-100", "max-h-200-px", "overflow-auto"]);
    this.renderer.setAttribute(dropdownContainer, "aria-labelledby", `${selectId}-dropdown`);
    const option = this.renderer.createElement("option");
    this.renderer.setAttribute(option, "value", "");
    this.renderer.setProperty(option, "textContent", "Select Option");
    this.renderer.appendChild(this.el.nativeElement, option);
    const v = this.ngControl.control?.value;
    this.ngControl.control?.markAsUntouched;
    if (options.length) {
      this.dropdownItemArray = options.map((o, index) => {
        const dropdownItem = this.renderer.createElement("a");
        const option2 = this.renderer.createElement("option");
        this.renderer.setAttribute(option2, "value", o.id);
        this.renderer.setProperty(option2, "textContent", o.name);
        this.renderer.appendChild(this.el.nativeElement, option2);
        this.renderer.addClass(dropdownItem, "dropdown-item");
        this.renderer.addClass(dropdownItem, "mb-1");
        const liAttributes = {
          "aria-disabled": "true",
          "data-option-id": o.id,
          "data-option-name": o.name || ""
        };
        this.setAttributes(dropdownItem, liAttributes);
        this.renderer.appendChild(dropdownItem, this.renderer.createText(o.name || `Select ${index}`));
        const isSelected = this.multiple ? Array.isArray(this.ngControl.control?.value) && this.ngControl.control?.value.includes(o.id.toString()) : this.ngControl.control?.value == o.id.toString();
        if (isSelected) {
          this.renderer.addClass(dropdownItem, "active");
          this.renderer.setProperty(this.btn, "textContent", o.name);
        }
        this.renderer.listen(dropdownItem, "click", () => {
          if (this.multiple) {
            const currentValue = Array.isArray(this.ngControl.control.value) ? this.ngControl.control.value : [];
            const indexToRemove = currentValue.indexOf(o.id.toString());
            if (indexToRemove !== -1) {
              currentValue.splice(indexToRemove, 1);
              this.renderer.removeClass(dropdownItem, "active");
            } else {
              currentValue.push(o.id.toString());
              this.renderer.addClass(dropdownItem, "active");
            }
            currentValue.map((num) => num.toString());
            currentValue.sort((a, b) => a.localeCompare(b));
            this.ngControl.control?.setValue(currentValue);
            const buttonText = currentValue.length ? this.getButtonText(currentValue, options) : "Select Option";
            this.renderer.setProperty(this.btn, "textContent", buttonText);
            this.renderer.removeClass(this.el.nativeElement, "d-none");
            this.el.nativeElement.focus();
            this.renderer.addClass(this.el.nativeElement, "d-none");
          } else {
            this.dropdownItemArray.forEach((otherLi) => this.renderer.removeClass(otherLi, "active"));
            this.renderer.addClass(dropdownItem, "active");
            this.ngControl.control?.setValue(o.id.toString());
            this.renderer.setProperty(this.btn, "textContent", o.name);
            this.renderer.removeClass(this.el.nativeElement, "d-none");
            this.el.nativeElement.focus();
            this.renderer.addClass(this.el.nativeElement, "d-none");
          }
          this.btn?.focus();
        });
        return dropdownItem;
      });
      this.dropdownItemArray.forEach((dropdownItem) => this.renderer.appendChild(dropdownContainer, dropdownItem));
    } else {
      const dropdownItem = this.renderer.createElement("a");
      this.applyClasses(dropdownItem, ["dropdown-item", "disabled", "text-dark"]);
      this.renderer.setAttribute(dropdownItem, "aria-disabled", "true");
      this.renderer.appendChild(dropdownItem, this.renderer.createText("Data Not Found"));
      this.renderer.appendChild(dropdownContainer, dropdownItem);
    }
    this.renderer.appendChild(dropdown, this.btn);
    this.renderer.appendChild(dropdown, dropdownContainer);
    this.renderer.insertBefore(this.el.nativeElement.parentElement, dropdown, this.el.nativeElement.nextSibling);
    this.dropdownItemArray.forEach((v2) => {
      v2.addEventListener("focus", () => {
        this.focusedItem = v2;
      });
    });
    this.renderer.listen(this.btn, "show.bs.dropdown", () => {
      this.dropdownItemArray.forEach((v2) => {
        let ele = v2;
        this.renderer.setAttribute(ele, "tabindex", "0");
        if (ele.classList.contains("active")) {
          ele.focus();
        }
      });
      document.addEventListener("keydown", this.handleDropdownKeyPress, false);
    });
    this.renderer.listen(this.btn, "hide.bs.dropdown", () => {
      this.renderer.selectRootElement(this.el.nativeElement).blur();
      document.removeEventListener("keydown", this.handleDropdownKeyPress);
      this.ngControl.control?.markAsTouched();
      this.renderer.removeClass(this.el.nativeElement, "d-none");
      this.el.nativeElement.focus();
      this.renderer.addClass(this.el.nativeElement, "d-none");
    });
  }
  static {
    this.\u0275fac = function SelectDropdownDirective_Factory(t) {
      return new (t || _SelectDropdownDirective)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(NgControl, 2));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _SelectDropdownDirective, selectors: [["", "selectDropdown", ""]], hostBindings: function SelectDropdownDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("blur", function SelectDropdownDirective_blur_HostBindingHandler() {
          return ctx.onBlur();
        });
      }
    }, inputs: { multiple: "multiple", options: "options", controlName: "controlName", label: "label", defaultOptionText: "defaultOptionText", loadingText: "loadingText" }, features: [\u0275\u0275NgOnChangesFeature] });
  }
};

// src/app/common/directives/asterisk.directive.ts
var AsteriskDirective = class _AsteriskDirective {
  constructor(el, renderer, ngControl) {
    this.el = el;
    this.renderer = renderer;
    this.ngControl = ngControl;
    this.blured = false;
    this.isTouched = false;
    const readonlyAttribute = this.el.nativeElement.getAttribute("readonly");
    this.renderer.setAttribute(this.el.nativeElement, "tabindex", readonlyAttribute !== null ? "-1" : "0");
  }
  ngOnInit() {
    this.subscribeToValueChanges();
  }
  ngOnChanges(changes) {
    if (changes["formControlName"]) {
      this.addAsterisk();
    }
  }
  onBlur() {
    if (this.formControlName && this.ngControl?.control) {
      this.ngControl?.control.markAsTouched();
      this.isTouched = this.ngControl.control?.touched;
      this.addAsterisk();
    }
  }
  subscribeToValueChanges() {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
    if (this.ngControl?.valueChanges) {
      this.valueChangesSubscription = this.ngControl.valueChanges.subscribe((value) => {
        this.isTouched = this.ngControl?.touched;
        this.addAsterisk();
      });
    }
  }
  addAsterisk() {
    const formGroup = this.el.nativeElement.closest(".form-group, td, th, .form-floating");
    if (!formGroup)
      return;
    const controlElements = formGroup.querySelectorAll(".form-control, .form-select, .form-label");
    controlElements?.forEach((element) => {
      this.renderer.removeClass(element, "border-danger");
      this.renderer.removeClass(element, "text-danger");
    });
    const inputGroupText = formGroup.querySelectorAll(".input-group-text");
    inputGroupText?.forEach((element) => {
      this.renderer.removeClass(element, "border-danger");
      this.renderer.removeClass(element, "bg-danger");
      this.renderer.removeClass(element, "text-white");
    });
    formGroup.querySelector(".error")?.remove();
    formGroup.querySelector("span.text-danger")?.remove();
    const formLabel = formGroup.querySelector(".form-label");
    const labelText = formLabel?.textContent.trim() || this.label || "This";
    const control = this.getFormControl();
    if (formLabel && control) {
      if (this.isControlRequired(this.getFormControl())) {
        const asteriskSpan = this.renderer.createElement("span");
        this.renderer.addClass(asteriskSpan, "text-danger");
        this.renderer.appendChild(asteriskSpan, this.renderer.createText(" *"));
        this.renderer.appendChild(formLabel, asteriskSpan);
      }
      if (this.isTouched && !control.valid) {
        const errorKey = Object.keys(control.errors || {})[0];
        const errorDetails = errorKey ? this.getErrorDetails(errorKey, control.errors[errorKey], labelText) : "";
        const requiredError = this.renderer.createElement("small");
        this.renderer.addClass(requiredError, "error");
        this.renderer.addClass(requiredError, "text-danger");
        if (formGroup.classList.contains("row")) {
          this.renderer.addClass(requiredError, "col-12");
          this.renderer.addClass(requiredError, "text-end");
        } else {
          this.renderer.addClass(requiredError, "position-absolute");
        }
        ;
        requiredError.textContent = errorDetails;
        this.renderer.appendChild(formGroup, requiredError);
        controlElements?.forEach((element) => {
          this.renderer.addClass(element, "border-danger");
          this.renderer.addClass(element, "text-danger");
        });
        inputGroupText?.forEach((element) => {
          this.renderer.addClass(element, "border-danger");
          this.renderer.addClass(element, "bg-danger");
          this.renderer.addClass(element, "text-white");
        });
      }
    }
    if (!formGroup.classList.contains("form-group")) {
      if (this.isTouched && control && !control.valid) {
        const errorKey = Object.keys(control.errors || {})[0];
        const errorDetails = errorKey ? this.getErrorDetails(errorKey, control.errors[errorKey], labelText) : "";
        const requiredError = this.renderer.createElement("small");
        this.renderer.addClass(requiredError, "error");
        this.renderer.addClass(requiredError, "text-danger");
        requiredError.textContent = errorDetails;
        this.renderer.appendChild(formGroup, requiredError);
        controlElements?.forEach((element) => this.renderer.addClass(element, "border-danger"));
        inputGroupText?.forEach((element) => {
          this.renderer.addClass(element, "border-danger");
          this.renderer.addClass(element, "bg-danger");
          this.renderer.addClass(element, "text-white");
        });
      }
    }
    const inputType = this.el.nativeElement.type;
    const placeholderValue = this.el.nativeElement.getAttribute("placeholder");
    const isTextInput = ["text", "email", "number", "textarea"].includes(inputType);
    if (!placeholderValue && isTextInput) {
      const selector = ".form-control, .form-select";
      this.renderer.setAttribute(formGroup.querySelector(selector), "placeholder", `Enter ${labelText}`);
    }
  }
  getFormControl() {
    return this.ngControl?.control;
  }
  isControlRequired(control) {
    const validators = control?.validator ? control.validator({}) : null;
    return validators ? validators["required"] : false;
  }
  getErrorDetails(key, value, label) {
    let l = label ? label : this.label ? this.label : "This";
    switch (key) {
      case "required":
        return l + " is required";
      case "minlength":
        return l + ` requires mini length is ${value.requiredLength}`;
      case "maxlength":
        return l + ` requires max length is ${value.requiredLength}`;
      case "min":
        return l + ` must be at least ${value.min}`;
      case "max":
        return l + ` must not exceed ${value.max}`;
      case "email":
        return "Invalid email address";
      case "usernameTaken":
        l = l == "This" ? l : "This " + l;
        return l + " is not available";
      case "emailTaken":
        l = l == "This" ? l : "This " + l;
        return l + " is already used";
      case "districtNameTaken":
        l = l == "This" ? l : "This " + l;
        return l + " is already used";
      case "districtIdTaken":
        l = l == "This" ? l : "This " + l;
        return l + " is already used";
      case "pattern":
        return l + "is not valid";
      default:
        return `Validation failed: ${key}`;
    }
  }
  ngOnDestroy() {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }
  static {
    this.\u0275fac = function AsteriskDirective_Factory(t) {
      return new (t || _AsteriskDirective)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(NgControl));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _AsteriskDirective, selectors: [["", "formControlName", ""]], hostBindings: function AsteriskDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("blur", function AsteriskDirective_blur_HostBindingHandler() {
          return ctx.onBlur();
        });
      }
    }, inputs: { formControlName: "formControlName", label: "label" }, features: [\u0275\u0275NgOnChangesFeature] });
  }
};

// src/app/common/services/district.service.ts
var DistrictService = class _DistrictService {
  constructor(http) {
    this.http = http;
    this.apiUrl = environment.MasterApi + "/district";
  }
  /**********************************************/
  /***************** District *******************/
  /**********************************************/
  getDistrict() {
    return this.http.get(`${this.apiUrl}/`);
  }
  getDistrictById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  deleteDistrict(id) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  addDistrict(districtData) {
    return this.http.post(this.apiUrl, districtData);
  }
  updateDistrict(districtId, districtData) {
    const updateUrl = `${this.apiUrl}/${districtId}`;
    return this.http.put(updateUrl, districtData);
  }
  checkDistrictNameAvailability(name) {
    return this.http.post(`${this.apiUrl}/district-name`, { name });
  }
  checkDistrictNameAvailabilityValidator() {
    return (control) => {
      const name = control.value;
      return this.checkDistrictNameAvailability(name).pipe(map((response) => response.isTaken ? { districtNameTaken: true } : null), catchError(() => of(null)));
    };
  }
  checkDistrictIdAvailability(id) {
    return this.http.post(`${this.apiUrl}/district-id/`, { id });
  }
  checkDistrictIdAvailabilityValidator() {
    return (control) => {
      const id = control.value;
      return this.checkDistrictIdAvailability(id).pipe(map((response) => response.isTaken ? { districtIdTaken: true } : null), catchError(() => of(null)));
    };
  }
  getDeletedDistrictLength() {
    return this.http.get(`${this.apiUrl}/deleted/count`);
  }
  getDeletedDistrict() {
    return this.http.get(`${this.apiUrl}/deleted`);
  }
  toggleDistrictActive(id) {
    return this.http.delete(`${this.apiUrl}/restore/${id}`);
  }
  static {
    this.\u0275fac = function DistrictService_Factory(t) {
      return new (t || _DistrictService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DistrictService, factory: _DistrictService.\u0275fac, providedIn: "root" });
  }
};

// src/app/common/services/taluka.service.ts
var TalukaService = class _TalukaService {
  constructor(http) {
    this.http = http;
    this.apiUrl = environment.MasterApi + "/taluka";
  }
  /**********************************************/
  /***************** Taluka *******************/
  /**********************************************/
  getTaluka() {
    return this.http.get(`${this.apiUrl}`);
  }
  getTalukaByDistrict(districtId) {
    return this.http.get(this.apiUrl + `/district/${districtId}`);
  }
  getTalukaById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  deleteTaluka(id) {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.put(url, {});
  }
  addTaluka(newTaluka) {
    return this.http.post(`${this.apiUrl}`, newTaluka);
  }
  updateTaluka(talukaId, talukaData) {
    const url = `${this.apiUrl}/${talukaId}`;
    return this.http.put(url, talukaData);
  }
  checkTalukaNameAvailability(name) {
    return this.http.post(`${this.apiUrl}taluka-name/`, { name });
  }
  checkTalukaNameAvailabilityValidator() {
    return (control) => {
      const name = control.value;
      return this.checkTalukaNameAvailability(name).pipe(map((response) => response.isTaken ? { talukaNameTaken: true } : null), catchError(() => of(null)));
    };
  }
  checkTalukaIdAvailability(id) {
    return this.http.post(`${this.apiUrl}taluka-id/`, { id });
  }
  checkTalukaIdAvailabilityValidator() {
    return (control) => {
      const id = control.value;
      return this.checkTalukaIdAvailability(id).pipe(map((response) => response.isTaken ? { talukaIdTaken: true } : null), catchError(() => of(null)));
    };
  }
  getDeletedTalukaLength(districtId) {
    return this.http.get(`${this.apiUrl}/deleted/${districtId}`);
  }
  getDeletedTaluka(districtId) {
    return this.http.get(this.apiUrl + `/deleted-by-district/${districtId}`);
  }
  toggleTalukaActive(talukaId) {
    return this.http.put(`${this.apiUrl}/restore/${talukaId}`, {});
  }
  static {
    this.\u0275fac = function TalukaService_Factory(t) {
      return new (t || _TalukaService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TalukaService, factory: _TalukaService.\u0275fac, providedIn: "root" });
  }
};

// src/app/common/controllers/locality-selector/locality-selector.component.ts
function LocalitySelectorComponent_ng_container_0_div_1_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const district_r1 = ctx.$implicit;
    \u0275\u0275property("value", district_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(district_r1.name);
  }
}
function LocalitySelectorComponent_ng_container_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "label", 3);
    \u0275\u0275text(2, "District");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 4)(4, "option", 5);
    \u0275\u0275text(5, "Select a district");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, LocalitySelectorComponent_ng_container_0_div_1_option_6_Template, 2, 2, "option", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.districts);
  }
}
function LocalitySelectorComponent_ng_container_0_div_2_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const taluka_r3 = ctx.$implicit;
    \u0275\u0275property("value", taluka_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(taluka_r3.name);
  }
}
function LocalitySelectorComponent_ng_container_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "label", 8);
    \u0275\u0275text(2, "Taluka");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 9)(4, "option", 5);
    \u0275\u0275text(5, "Select a Taluka");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, LocalitySelectorComponent_ng_container_0_div_2_option_6_Template, 2, 2, "option", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.talukas);
  }
}
function LocalitySelectorComponent_ng_container_0_div_3_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const village_r4 = ctx.$implicit;
    \u0275\u0275property("value", village_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(village_r4.name);
  }
}
function LocalitySelectorComponent_ng_container_0_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "label", 10);
    \u0275\u0275text(2, "Select Village");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 11)(4, "option", 5);
    \u0275\u0275text(5, "Select a Village");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, LocalitySelectorComponent_ng_container_0_div_3_option_6_Template, 2, 2, "option", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.villages);
  }
}
function LocalitySelectorComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, LocalitySelectorComponent_ng_container_0_div_1_Template, 7, 1, "div", 1)(2, LocalitySelectorComponent_ng_container_0_div_2_Template, 7, 1, "div", 1)(3, LocalitySelectorComponent_ng_container_0_div_3_Template, 7, 1, "div", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.parentForm.get("district"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.parentForm.get("taluka"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.parentForm.get("village"));
  }
}
var LocalitySelectorComponent = class _LocalitySelectorComponent {
  constructor(fb, districtService, talukaService, villageService) {
    this.fb = fb;
    this.districtService = districtService;
    this.talukaService = talukaService;
    this.villageService = villageService;
    this.localityChange = new EventEmitter();
  }
  ngOnInit() {
    if (this.parentForm) {
      this.parentForm.addControl("locality", this.fb.group({
        district: ["", Validators.required],
        taluka: ["", Validators.required],
        village: ["", Validators.required]
      }));
      this.loadDistricts();
      this.parentForm.get("locality.district")?.valueChanges.subscribe(() => {
        this.loadTalukas();
        this.localityChange.emit(this.parentForm.get("locality")?.value);
      });
      this.parentForm.get("locality.taluka")?.valueChanges.subscribe(() => {
        this.loadVillages();
        this.localityChange.emit(this.parentForm.get("locality")?.value);
      });
    }
  }
  loadDistricts() {
    this.districtService.getDistrict().subscribe((data) => {
      this.districts = data;
    });
  }
  loadTalukas() {
    const districtId = this.parentForm.get("locality.district")?.value;
    this.talukaService.getTalukaByDistrict(districtId).subscribe((data) => {
      this.talukas = data;
    });
  }
  loadVillages() {
    const talukaId = this.parentForm.get("locality.taluka")?.value;
    const districtId = this.parentForm.get("locality.district")?.value;
    this.villageService.getVillageByTaluka(talukaId).subscribe((data) => {
      this.villages = data;
    });
  }
  static {
    this.\u0275fac = function LocalitySelectorComponent_Factory(t) {
      return new (t || _LocalitySelectorComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(DistrictService), \u0275\u0275directiveInject(TalukaService), \u0275\u0275directiveInject(VillageService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LocalitySelectorComponent, selectors: [["app-locality-selector"]], inputs: { parentForm: "parentForm" }, outputs: { localityChange: "localityChange" }, decls: 1, vars: 1, consts: [[4, "ngIf"], ["class", "form-group", 4, "ngIf"], [1, "form-group"], ["for", "district", 1, "form-label"], ["id", "district", "formControlName", "district", 1, "form-select"], ["value", "", "disabled", ""], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["for", "taluka", 1, "form-label"], ["id", "taluka", "formControlName", "taluka", 1, "form-select"], ["for", "village", 1, "form-label"], ["id", "village", "formControlName", "village", 1, "form-select"]], template: function LocalitySelectorComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, LocalitySelectorComponent_ng_container_0_Template, 4, 3, "ng-container", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.parentForm);
      }
    }, dependencies: [NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, FormControlName, NgForOf, NgIf, AsteriskDirective] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LocalitySelectorComponent, { className: "LocalitySelectorComponent", filePath: "src\\app\\common\\controllers\\locality-selector\\locality-selector.component.ts", lineNumber: 13 });
})();

// src/app/common/directives/draggable.directive.ts
var DraggableDirective = class _DraggableDirective {
  constructor(el, renderer) {
    this.el = el;
    this.renderer = renderer;
    this.isDragging = false;
  }
  onMouseDown(event) {
    event.preventDefault();
    this.isDragging = true;
    this.renderer.addClass(this.el.nativeElement, "dragging");
  }
  onMouseMove(event) {
    if (this.isDragging) {
      this.renderer.setStyle(this.el.nativeElement, "left", event.clientX - 25 + "px");
      this.renderer.setStyle(this.el.nativeElement, "top", event.clientY - 25 + "px");
    }
  }
  onMouseUp() {
    this.isDragging = false;
    this.renderer.removeClass(this.el.nativeElement, "dragging");
  }
  static {
    this.\u0275fac = function DraggableDirective_Factory(t) {
      return new (t || _DraggableDirective)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _DraggableDirective, selectors: [["", "appDraggable", ""]], hostBindings: function DraggableDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("mousedown", function DraggableDirective_mousedown_HostBindingHandler($event) {
          return ctx.onMouseDown($event);
        })("mousemove", function DraggableDirective_mousemove_HostBindingHandler($event) {
          return ctx.onMouseMove($event);
        }, false, \u0275\u0275resolveDocument)("mouseup", function DraggableDirective_mouseup_HostBindingHandler() {
          return ctx.onMouseUp();
        }, false, \u0275\u0275resolveDocument);
      }
    }, inputs: { dragData: "dragData" } });
  }
};

// src/app/common/pipes/keys.pipe.ts
var KeysPipe = class _KeysPipe {
  transform(value) {
    return Object.keys(value);
  }
  static {
    this.\u0275fac = function KeysPipe_Factory(t) {
      return new (t || _KeysPipe)();
    };
  }
  static {
    this.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "keys", type: _KeysPipe, pure: true });
  }
};

// node_modules/opentype.js/dist/opentype.module.js
if (!String.prototype.codePointAt) {
  (function() {
    var defineProperty = function() {
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch (error) {
      }
      return result;
    }();
    var codePointAt = function(position) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      var size = string.length;
      var index = position ? Number(position) : 0;
      if (index != index) {
        index = 0;
      }
      if (index < 0 || index >= size) {
        return void 0;
      }
      var first = string.charCodeAt(index);
      var second;
      if (
        // check if it’s the start of a surrogate pair
        first >= 55296 && first <= 56319 && // high surrogate
        size > index + 1
      ) {
        second = string.charCodeAt(index + 1);
        if (second >= 56320 && second <= 57343) {
          return (first - 55296) * 1024 + second - 56320 + 65536;
        }
      }
      return first;
    };
    if (defineProperty) {
      defineProperty(String.prototype, "codePointAt", {
        "value": codePointAt,
        "configurable": true,
        "writable": true
      });
    } else {
      String.prototype.codePointAt = codePointAt;
    }
  })();
}
var TINF_OK = 0;
var TINF_DATA_ERROR = -3;
function Tree() {
  this.table = new Uint16Array(16);
  this.trans = new Uint16Array(288);
}
function Data(source, dest) {
  this.source = source;
  this.sourceIndex = 0;
  this.tag = 0;
  this.bitcount = 0;
  this.dest = dest;
  this.destLen = 0;
  this.ltree = new Tree();
  this.dtree = new Tree();
}
var sltree = new Tree();
var sdtree = new Tree();
var length_bits = new Uint8Array(30);
var length_base = new Uint16Array(30);
var dist_bits = new Uint8Array(30);
var dist_base = new Uint16Array(30);
var clcidx = new Uint8Array([
  16,
  17,
  18,
  0,
  8,
  7,
  9,
  6,
  10,
  5,
  11,
  4,
  12,
  3,
  13,
  2,
  14,
  1,
  15
]);
var code_tree = new Tree();
var lengths = new Uint8Array(288 + 32);
function tinf_build_bits_base(bits, base, delta, first) {
  var i, sum;
  for (i = 0; i < delta; ++i) {
    bits[i] = 0;
  }
  for (i = 0; i < 30 - delta; ++i) {
    bits[i + delta] = i / delta | 0;
  }
  for (sum = first, i = 0; i < 30; ++i) {
    base[i] = sum;
    sum += 1 << bits[i];
  }
}
function tinf_build_fixed_trees(lt, dt) {
  var i;
  for (i = 0; i < 7; ++i) {
    lt.table[i] = 0;
  }
  lt.table[7] = 24;
  lt.table[8] = 152;
  lt.table[9] = 112;
  for (i = 0; i < 24; ++i) {
    lt.trans[i] = 256 + i;
  }
  for (i = 0; i < 144; ++i) {
    lt.trans[24 + i] = i;
  }
  for (i = 0; i < 8; ++i) {
    lt.trans[24 + 144 + i] = 280 + i;
  }
  for (i = 0; i < 112; ++i) {
    lt.trans[24 + 144 + 8 + i] = 144 + i;
  }
  for (i = 0; i < 5; ++i) {
    dt.table[i] = 0;
  }
  dt.table[5] = 32;
  for (i = 0; i < 32; ++i) {
    dt.trans[i] = i;
  }
}
var offs = new Uint16Array(16);
function tinf_build_tree(t, lengths2, off, num) {
  var i, sum;
  for (i = 0; i < 16; ++i) {
    t.table[i] = 0;
  }
  for (i = 0; i < num; ++i) {
    t.table[lengths2[off + i]]++;
  }
  t.table[0] = 0;
  for (sum = 0, i = 0; i < 16; ++i) {
    offs[i] = sum;
    sum += t.table[i];
  }
  for (i = 0; i < num; ++i) {
    if (lengths2[off + i]) {
      t.trans[offs[lengths2[off + i]]++] = i;
    }
  }
}
function tinf_getbit(d) {
  if (!d.bitcount--) {
    d.tag = d.source[d.sourceIndex++];
    d.bitcount = 7;
  }
  var bit = d.tag & 1;
  d.tag >>>= 1;
  return bit;
}
function tinf_read_bits(d, num, base) {
  if (!num) {
    return base;
  }
  while (d.bitcount < 24) {
    d.tag |= d.source[d.sourceIndex++] << d.bitcount;
    d.bitcount += 8;
  }
  var val = d.tag & 65535 >>> 16 - num;
  d.tag >>>= num;
  d.bitcount -= num;
  return val + base;
}
function tinf_decode_symbol(d, t) {
  while (d.bitcount < 24) {
    d.tag |= d.source[d.sourceIndex++] << d.bitcount;
    d.bitcount += 8;
  }
  var sum = 0, cur = 0, len = 0;
  var tag = d.tag;
  do {
    cur = 2 * cur + (tag & 1);
    tag >>>= 1;
    ++len;
    sum += t.table[len];
    cur -= t.table[len];
  } while (cur >= 0);
  d.tag = tag;
  d.bitcount -= len;
  return t.trans[sum + cur];
}
function tinf_decode_trees(d, lt, dt) {
  var hlit, hdist, hclen;
  var i, num, length;
  hlit = tinf_read_bits(d, 5, 257);
  hdist = tinf_read_bits(d, 5, 1);
  hclen = tinf_read_bits(d, 4, 4);
  for (i = 0; i < 19; ++i) {
    lengths[i] = 0;
  }
  for (i = 0; i < hclen; ++i) {
    var clen = tinf_read_bits(d, 3, 0);
    lengths[clcidx[i]] = clen;
  }
  tinf_build_tree(code_tree, lengths, 0, 19);
  for (num = 0; num < hlit + hdist; ) {
    var sym = tinf_decode_symbol(d, code_tree);
    switch (sym) {
      case 16:
        var prev = lengths[num - 1];
        for (length = tinf_read_bits(d, 2, 3); length; --length) {
          lengths[num++] = prev;
        }
        break;
      case 17:
        for (length = tinf_read_bits(d, 3, 3); length; --length) {
          lengths[num++] = 0;
        }
        break;
      case 18:
        for (length = tinf_read_bits(d, 7, 11); length; --length) {
          lengths[num++] = 0;
        }
        break;
      default:
        lengths[num++] = sym;
        break;
    }
  }
  tinf_build_tree(lt, lengths, 0, hlit);
  tinf_build_tree(dt, lengths, hlit, hdist);
}
function tinf_inflate_block_data(d, lt, dt) {
  while (1) {
    var sym = tinf_decode_symbol(d, lt);
    if (sym === 256) {
      return TINF_OK;
    }
    if (sym < 256) {
      d.dest[d.destLen++] = sym;
    } else {
      var length, dist, offs2;
      var i;
      sym -= 257;
      length = tinf_read_bits(d, length_bits[sym], length_base[sym]);
      dist = tinf_decode_symbol(d, dt);
      offs2 = d.destLen - tinf_read_bits(d, dist_bits[dist], dist_base[dist]);
      for (i = offs2; i < offs2 + length; ++i) {
        d.dest[d.destLen++] = d.dest[i];
      }
    }
  }
}
function tinf_inflate_uncompressed_block(d) {
  var length, invlength;
  var i;
  while (d.bitcount > 8) {
    d.sourceIndex--;
    d.bitcount -= 8;
  }
  length = d.source[d.sourceIndex + 1];
  length = 256 * length + d.source[d.sourceIndex];
  invlength = d.source[d.sourceIndex + 3];
  invlength = 256 * invlength + d.source[d.sourceIndex + 2];
  if (length !== (~invlength & 65535)) {
    return TINF_DATA_ERROR;
  }
  d.sourceIndex += 4;
  for (i = length; i; --i) {
    d.dest[d.destLen++] = d.source[d.sourceIndex++];
  }
  d.bitcount = 0;
  return TINF_OK;
}
function tinf_uncompress(source, dest) {
  var d = new Data(source, dest);
  var bfinal, btype, res;
  do {
    bfinal = tinf_getbit(d);
    btype = tinf_read_bits(d, 2, 0);
    switch (btype) {
      case 0:
        res = tinf_inflate_uncompressed_block(d);
        break;
      case 1:
        res = tinf_inflate_block_data(d, sltree, sdtree);
        break;
      case 2:
        tinf_decode_trees(d, d.ltree, d.dtree);
        res = tinf_inflate_block_data(d, d.ltree, d.dtree);
        break;
      default:
        res = TINF_DATA_ERROR;
    }
    if (res !== TINF_OK) {
      throw new Error("Data error");
    }
  } while (!bfinal);
  if (d.destLen < d.dest.length) {
    if (typeof d.dest.slice === "function") {
      return d.dest.slice(0, d.destLen);
    } else {
      return d.dest.subarray(0, d.destLen);
    }
  }
  return d.dest;
}
tinf_build_fixed_trees(sltree, sdtree);
tinf_build_bits_base(length_bits, length_base, 4, 3);
tinf_build_bits_base(dist_bits, dist_base, 2, 1);
length_bits[28] = 0;
length_base[28] = 258;
var tinyInflate = tinf_uncompress;
function derive(v0, v1, v2, v3, t) {
  return Math.pow(1 - t, 3) * v0 + 3 * Math.pow(1 - t, 2) * t * v1 + 3 * (1 - t) * Math.pow(t, 2) * v2 + Math.pow(t, 3) * v3;
}
function BoundingBox() {
  this.x1 = Number.NaN;
  this.y1 = Number.NaN;
  this.x2 = Number.NaN;
  this.y2 = Number.NaN;
}
BoundingBox.prototype.isEmpty = function() {
  return isNaN(this.x1) || isNaN(this.y1) || isNaN(this.x2) || isNaN(this.y2);
};
BoundingBox.prototype.addPoint = function(x, y) {
  if (typeof x === "number") {
    if (isNaN(this.x1) || isNaN(this.x2)) {
      this.x1 = x;
      this.x2 = x;
    }
    if (x < this.x1) {
      this.x1 = x;
    }
    if (x > this.x2) {
      this.x2 = x;
    }
  }
  if (typeof y === "number") {
    if (isNaN(this.y1) || isNaN(this.y2)) {
      this.y1 = y;
      this.y2 = y;
    }
    if (y < this.y1) {
      this.y1 = y;
    }
    if (y > this.y2) {
      this.y2 = y;
    }
  }
};
BoundingBox.prototype.addX = function(x) {
  this.addPoint(x, null);
};
BoundingBox.prototype.addY = function(y) {
  this.addPoint(null, y);
};
BoundingBox.prototype.addBezier = function(x0, y0, x1, y1, x2, y2, x, y) {
  var p0 = [x0, y0];
  var p1 = [x1, y1];
  var p2 = [x2, y2];
  var p3 = [x, y];
  this.addPoint(x0, y0);
  this.addPoint(x, y);
  for (var i = 0; i <= 1; i++) {
    var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
    var a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
    var c = 3 * p1[i] - 3 * p0[i];
    if (a === 0) {
      if (b === 0) {
        continue;
      }
      var t = -c / b;
      if (0 < t && t < 1) {
        if (i === 0) {
          this.addX(derive(p0[i], p1[i], p2[i], p3[i], t));
        }
        if (i === 1) {
          this.addY(derive(p0[i], p1[i], p2[i], p3[i], t));
        }
      }
      continue;
    }
    var b2ac = Math.pow(b, 2) - 4 * c * a;
    if (b2ac < 0) {
      continue;
    }
    var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
    if (0 < t1 && t1 < 1) {
      if (i === 0) {
        this.addX(derive(p0[i], p1[i], p2[i], p3[i], t1));
      }
      if (i === 1) {
        this.addY(derive(p0[i], p1[i], p2[i], p3[i], t1));
      }
    }
    var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
    if (0 < t2 && t2 < 1) {
      if (i === 0) {
        this.addX(derive(p0[i], p1[i], p2[i], p3[i], t2));
      }
      if (i === 1) {
        this.addY(derive(p0[i], p1[i], p2[i], p3[i], t2));
      }
    }
  }
};
BoundingBox.prototype.addQuad = function(x0, y0, x1, y1, x, y) {
  var cp1x = x0 + 2 / 3 * (x1 - x0);
  var cp1y = y0 + 2 / 3 * (y1 - y0);
  var cp2x = cp1x + 1 / 3 * (x - x0);
  var cp2y = cp1y + 1 / 3 * (y - y0);
  this.addBezier(x0, y0, cp1x, cp1y, cp2x, cp2y, x, y);
};
function Path() {
  this.commands = [];
  this.fill = "black";
  this.stroke = null;
  this.strokeWidth = 1;
}
Path.prototype.moveTo = function(x, y) {
  this.commands.push({
    type: "M",
    x,
    y
  });
};
Path.prototype.lineTo = function(x, y) {
  this.commands.push({
    type: "L",
    x,
    y
  });
};
Path.prototype.curveTo = Path.prototype.bezierCurveTo = function(x1, y1, x2, y2, x, y) {
  this.commands.push({
    type: "C",
    x1,
    y1,
    x2,
    y2,
    x,
    y
  });
};
Path.prototype.quadTo = Path.prototype.quadraticCurveTo = function(x1, y1, x, y) {
  this.commands.push({
    type: "Q",
    x1,
    y1,
    x,
    y
  });
};
Path.prototype.close = Path.prototype.closePath = function() {
  this.commands.push({
    type: "Z"
  });
};
Path.prototype.extend = function(pathOrCommands) {
  if (pathOrCommands.commands) {
    pathOrCommands = pathOrCommands.commands;
  } else if (pathOrCommands instanceof BoundingBox) {
    var box = pathOrCommands;
    this.moveTo(box.x1, box.y1);
    this.lineTo(box.x2, box.y1);
    this.lineTo(box.x2, box.y2);
    this.lineTo(box.x1, box.y2);
    this.close();
    return;
  }
  Array.prototype.push.apply(this.commands, pathOrCommands);
};
Path.prototype.getBoundingBox = function() {
  var box = new BoundingBox();
  var startX = 0;
  var startY = 0;
  var prevX = 0;
  var prevY = 0;
  for (var i = 0; i < this.commands.length; i++) {
    var cmd = this.commands[i];
    switch (cmd.type) {
      case "M":
        box.addPoint(cmd.x, cmd.y);
        startX = prevX = cmd.x;
        startY = prevY = cmd.y;
        break;
      case "L":
        box.addPoint(cmd.x, cmd.y);
        prevX = cmd.x;
        prevY = cmd.y;
        break;
      case "Q":
        box.addQuad(prevX, prevY, cmd.x1, cmd.y1, cmd.x, cmd.y);
        prevX = cmd.x;
        prevY = cmd.y;
        break;
      case "C":
        box.addBezier(prevX, prevY, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        prevX = cmd.x;
        prevY = cmd.y;
        break;
      case "Z":
        prevX = startX;
        prevY = startY;
        break;
      default:
        throw new Error("Unexpected path command " + cmd.type);
    }
  }
  if (box.isEmpty()) {
    box.addPoint(0, 0);
  }
  return box;
};
Path.prototype.draw = function(ctx) {
  ctx.beginPath();
  for (var i = 0; i < this.commands.length; i += 1) {
    var cmd = this.commands[i];
    if (cmd.type === "M") {
      ctx.moveTo(cmd.x, cmd.y);
    } else if (cmd.type === "L") {
      ctx.lineTo(cmd.x, cmd.y);
    } else if (cmd.type === "C") {
      ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
    } else if (cmd.type === "Q") {
      ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
    } else if (cmd.type === "Z") {
      ctx.closePath();
    }
  }
  if (this.fill) {
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
  if (this.stroke) {
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.strokeWidth;
    ctx.stroke();
  }
};
Path.prototype.toPathData = function(decimalPlaces) {
  decimalPlaces = decimalPlaces !== void 0 ? decimalPlaces : 2;
  function floatToString(v) {
    if (Math.round(v) === v) {
      return "" + Math.round(v);
    } else {
      return v.toFixed(decimalPlaces);
    }
  }
  function packValues() {
    var arguments$1 = arguments;
    var s = "";
    for (var i2 = 0; i2 < arguments.length; i2 += 1) {
      var v = arguments$1[i2];
      if (v >= 0 && i2 > 0) {
        s += " ";
      }
      s += floatToString(v);
    }
    return s;
  }
  var d = "";
  for (var i = 0; i < this.commands.length; i += 1) {
    var cmd = this.commands[i];
    if (cmd.type === "M") {
      d += "M" + packValues(cmd.x, cmd.y);
    } else if (cmd.type === "L") {
      d += "L" + packValues(cmd.x, cmd.y);
    } else if (cmd.type === "C") {
      d += "C" + packValues(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
    } else if (cmd.type === "Q") {
      d += "Q" + packValues(cmd.x1, cmd.y1, cmd.x, cmd.y);
    } else if (cmd.type === "Z") {
      d += "Z";
    }
  }
  return d;
};
Path.prototype.toSVG = function(decimalPlaces) {
  var svg = '<path d="';
  svg += this.toPathData(decimalPlaces);
  svg += '"';
  if (this.fill && this.fill !== "black") {
    if (this.fill === null) {
      svg += ' fill="none"';
    } else {
      svg += ' fill="' + this.fill + '"';
    }
  }
  if (this.stroke) {
    svg += ' stroke="' + this.stroke + '" stroke-width="' + this.strokeWidth + '"';
  }
  svg += "/>";
  return svg;
};
Path.prototype.toDOMElement = function(decimalPlaces) {
  var temporaryPath = this.toPathData(decimalPlaces);
  var newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  newPath.setAttribute("d", temporaryPath);
  return newPath;
};
function fail(message) {
  throw new Error(message);
}
function argument(predicate, message) {
  if (!predicate) {
    fail(message);
  }
}
var check = { fail, argument, assert: argument };
var LIMIT16 = 32768;
var LIMIT32 = 2147483648;
var decode = {};
var encode = {};
var sizeOf = {};
function constant(v) {
  return function() {
    return v;
  };
}
encode.BYTE = function(v) {
  check.argument(v >= 0 && v <= 255, "Byte value should be between 0 and 255.");
  return [v];
};
sizeOf.BYTE = constant(1);
encode.CHAR = function(v) {
  return [v.charCodeAt(0)];
};
sizeOf.CHAR = constant(1);
encode.CHARARRAY = function(v) {
  if (typeof v === "undefined") {
    v = "";
    console.warn("Undefined CHARARRAY encountered and treated as an empty string. This is probably caused by a missing glyph name.");
  }
  var b = [];
  for (var i = 0; i < v.length; i += 1) {
    b[i] = v.charCodeAt(i);
  }
  return b;
};
sizeOf.CHARARRAY = function(v) {
  if (typeof v === "undefined") {
    return 0;
  }
  return v.length;
};
encode.USHORT = function(v) {
  return [v >> 8 & 255, v & 255];
};
sizeOf.USHORT = constant(2);
encode.SHORT = function(v) {
  if (v >= LIMIT16) {
    v = -(2 * LIMIT16 - v);
  }
  return [v >> 8 & 255, v & 255];
};
sizeOf.SHORT = constant(2);
encode.UINT24 = function(v) {
  return [v >> 16 & 255, v >> 8 & 255, v & 255];
};
sizeOf.UINT24 = constant(3);
encode.ULONG = function(v) {
  return [v >> 24 & 255, v >> 16 & 255, v >> 8 & 255, v & 255];
};
sizeOf.ULONG = constant(4);
encode.LONG = function(v) {
  if (v >= LIMIT32) {
    v = -(2 * LIMIT32 - v);
  }
  return [v >> 24 & 255, v >> 16 & 255, v >> 8 & 255, v & 255];
};
sizeOf.LONG = constant(4);
encode.FIXED = encode.ULONG;
sizeOf.FIXED = sizeOf.ULONG;
encode.FWORD = encode.SHORT;
sizeOf.FWORD = sizeOf.SHORT;
encode.UFWORD = encode.USHORT;
sizeOf.UFWORD = sizeOf.USHORT;
encode.LONGDATETIME = function(v) {
  return [0, 0, 0, 0, v >> 24 & 255, v >> 16 & 255, v >> 8 & 255, v & 255];
};
sizeOf.LONGDATETIME = constant(8);
encode.TAG = function(v) {
  check.argument(v.length === 4, "Tag should be exactly 4 ASCII characters.");
  return [
    v.charCodeAt(0),
    v.charCodeAt(1),
    v.charCodeAt(2),
    v.charCodeAt(3)
  ];
};
sizeOf.TAG = constant(4);
encode.Card8 = encode.BYTE;
sizeOf.Card8 = sizeOf.BYTE;
encode.Card16 = encode.USHORT;
sizeOf.Card16 = sizeOf.USHORT;
encode.OffSize = encode.BYTE;
sizeOf.OffSize = sizeOf.BYTE;
encode.SID = encode.USHORT;
sizeOf.SID = sizeOf.USHORT;
encode.NUMBER = function(v) {
  if (v >= -107 && v <= 107) {
    return [v + 139];
  } else if (v >= 108 && v <= 1131) {
    v = v - 108;
    return [(v >> 8) + 247, v & 255];
  } else if (v >= -1131 && v <= -108) {
    v = -v - 108;
    return [(v >> 8) + 251, v & 255];
  } else if (v >= -32768 && v <= 32767) {
    return encode.NUMBER16(v);
  } else {
    return encode.NUMBER32(v);
  }
};
sizeOf.NUMBER = function(v) {
  return encode.NUMBER(v).length;
};
encode.NUMBER16 = function(v) {
  return [28, v >> 8 & 255, v & 255];
};
sizeOf.NUMBER16 = constant(3);
encode.NUMBER32 = function(v) {
  return [29, v >> 24 & 255, v >> 16 & 255, v >> 8 & 255, v & 255];
};
sizeOf.NUMBER32 = constant(5);
encode.REAL = function(v) {
  var value = v.toString();
  var m = /\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(value);
  if (m) {
    var epsilon = parseFloat("1e" + ((m[2] ? +m[2] : 0) + m[1].length));
    value = (Math.round(v * epsilon) / epsilon).toString();
  }
  var nibbles = "";
  for (var i = 0, ii = value.length; i < ii; i += 1) {
    var c = value[i];
    if (c === "e") {
      nibbles += value[++i] === "-" ? "c" : "b";
    } else if (c === ".") {
      nibbles += "a";
    } else if (c === "-") {
      nibbles += "e";
    } else {
      nibbles += c;
    }
  }
  nibbles += nibbles.length & 1 ? "f" : "ff";
  var out = [30];
  for (var i$1 = 0, ii$1 = nibbles.length; i$1 < ii$1; i$1 += 2) {
    out.push(parseInt(nibbles.substr(i$1, 2), 16));
  }
  return out;
};
sizeOf.REAL = function(v) {
  return encode.REAL(v).length;
};
encode.NAME = encode.CHARARRAY;
sizeOf.NAME = sizeOf.CHARARRAY;
encode.STRING = encode.CHARARRAY;
sizeOf.STRING = sizeOf.CHARARRAY;
decode.UTF8 = function(data, offset, numBytes) {
  var codePoints = [];
  var numChars = numBytes;
  for (var j = 0; j < numChars; j++, offset += 1) {
    codePoints[j] = data.getUint8(offset);
  }
  return String.fromCharCode.apply(null, codePoints);
};
decode.UTF16 = function(data, offset, numBytes) {
  var codePoints = [];
  var numChars = numBytes / 2;
  for (var j = 0; j < numChars; j++, offset += 2) {
    codePoints[j] = data.getUint16(offset);
  }
  return String.fromCharCode.apply(null, codePoints);
};
encode.UTF16 = function(v) {
  var b = [];
  for (var i = 0; i < v.length; i += 1) {
    var codepoint = v.charCodeAt(i);
    b[b.length] = codepoint >> 8 & 255;
    b[b.length] = codepoint & 255;
  }
  return b;
};
sizeOf.UTF16 = function(v) {
  return v.length * 2;
};
var eightBitMacEncodings = {
  "x-mac-croatian": (
    // Python: 'mac_croatian'
    "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\u0160\u2122\xB4\xA8\u2260\u017D\xD8\u221E\xB1\u2264\u2265\u2206\xB5\u2202\u2211\u220F\u0161\u222B\xAA\xBA\u03A9\u017E\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u0106\xAB\u010C\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u0110\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\uF8FF\xA9\u2044\u20AC\u2039\u203A\xC6\xBB\u2013\xB7\u201A\u201E\u2030\xC2\u0107\xC1\u010D\xC8\xCD\xCE\xCF\xCC\xD3\xD4\u0111\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u03C0\xCB\u02DA\xB8\xCA\xE6\u02C7"
  ),
  "x-mac-cyrillic": (
    // Python: 'mac_cyrillic'
    "\u0410\u0411\u0412\u0413\u0414\u0415\u0416\u0417\u0418\u0419\u041A\u041B\u041C\u041D\u041E\u041F\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042A\u042B\u042C\u042D\u042E\u042F\u2020\xB0\u0490\xA3\xA7\u2022\xB6\u0406\xAE\xA9\u2122\u0402\u0452\u2260\u0403\u0453\u221E\xB1\u2264\u2265\u0456\xB5\u0491\u0408\u0404\u0454\u0407\u0457\u0409\u0459\u040A\u045A\u0458\u0405\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\u040B\u045B\u040C\u045C\u0455\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u201E\u040E\u045E\u040F\u045F\u2116\u0401\u0451\u044F\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0438\u0439\u043A\u043B\u043C\u043D\u043E\u043F\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044A\u044B\u044C\u044D\u044E"
  ),
  "x-mac-gaelic": (
    // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/GAELIC.TXT
    "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u1E02\xB1\u2264\u2265\u1E03\u010A\u010B\u1E0A\u1E0B\u1E1E\u1E1F\u0120\u0121\u1E40\xE6\xF8\u1E41\u1E56\u1E57\u027C\u0192\u017F\u1E60\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\u1E61\u1E9B\xFF\u0178\u1E6A\u20AC\u2039\u203A\u0176\u0177\u1E6B\xB7\u1EF2\u1EF3\u204A\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\u2663\xD2\xDA\xDB\xD9\u0131\xDD\xFD\u0174\u0175\u1E84\u1E85\u1E80\u1E81\u1E82\u1E83"
  ),
  "x-mac-greek": (
    // Python: 'mac_greek'
    "\xC4\xB9\xB2\xC9\xB3\xD6\xDC\u0385\xE0\xE2\xE4\u0384\xA8\xE7\xE9\xE8\xEA\xEB\xA3\u2122\xEE\xEF\u2022\xBD\u2030\xF4\xF6\xA6\u20AC\xF9\xFB\xFC\u2020\u0393\u0394\u0398\u039B\u039E\u03A0\xDF\xAE\xA9\u03A3\u03AA\xA7\u2260\xB0\xB7\u0391\xB1\u2264\u2265\xA5\u0392\u0395\u0396\u0397\u0399\u039A\u039C\u03A6\u03AB\u03A8\u03A9\u03AC\u039D\xAC\u039F\u03A1\u2248\u03A4\xAB\xBB\u2026\xA0\u03A5\u03A7\u0386\u0388\u0153\u2013\u2015\u201C\u201D\u2018\u2019\xF7\u0389\u038A\u038C\u038E\u03AD\u03AE\u03AF\u03CC\u038F\u03CD\u03B1\u03B2\u03C8\u03B4\u03B5\u03C6\u03B3\u03B7\u03B9\u03BE\u03BA\u03BB\u03BC\u03BD\u03BF\u03C0\u03CE\u03C1\u03C3\u03C4\u03B8\u03C9\u03C2\u03C7\u03C5\u03B6\u03CA\u03CB\u0390\u03B0\xAD"
  ),
  "x-mac-icelandic": (
    // Python: 'mac_iceland'
    "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\xDD\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\xD0\xF0\xDE\xFE\xFD\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7"
  ),
  "x-mac-inuit": (
    // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/INUIT.TXT
    "\u1403\u1404\u1405\u1406\u140A\u140B\u1431\u1432\u1433\u1434\u1438\u1439\u1449\u144E\u144F\u1450\u1451\u1455\u1456\u1466\u146D\u146E\u146F\u1470\u1472\u1473\u1483\u148B\u148C\u148D\u148E\u1490\u1491\xB0\u14A1\u14A5\u14A6\u2022\xB6\u14A7\xAE\xA9\u2122\u14A8\u14AA\u14AB\u14BB\u14C2\u14C3\u14C4\u14C5\u14C7\u14C8\u14D0\u14EF\u14F0\u14F1\u14F2\u14F4\u14F5\u1505\u14D5\u14D6\u14D7\u14D8\u14DA\u14DB\u14EA\u1528\u1529\u152A\u152B\u152D\u2026\xA0\u152E\u153E\u1555\u1556\u1557\u2013\u2014\u201C\u201D\u2018\u2019\u1558\u1559\u155A\u155D\u1546\u1547\u1548\u1549\u154B\u154C\u1550\u157F\u1580\u1581\u1582\u1583\u1584\u1585\u158F\u1590\u1591\u1592\u1593\u1594\u1595\u1671\u1672\u1673\u1674\u1675\u1676\u1596\u15A0\u15A1\u15A2\u15A3\u15A4\u15A5\u15A6\u157C\u0141\u0142"
  ),
  "x-mac-ce": (
    // Python: 'mac_latin2'
    "\xC4\u0100\u0101\xC9\u0104\xD6\xDC\xE1\u0105\u010C\xE4\u010D\u0106\u0107\xE9\u0179\u017A\u010E\xED\u010F\u0112\u0113\u0116\xF3\u0117\xF4\xF6\xF5\xFA\u011A\u011B\xFC\u2020\xB0\u0118\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\u0119\xA8\u2260\u0123\u012E\u012F\u012A\u2264\u2265\u012B\u0136\u2202\u2211\u0142\u013B\u013C\u013D\u013E\u0139\u013A\u0145\u0146\u0143\xAC\u221A\u0144\u0147\u2206\xAB\xBB\u2026\xA0\u0148\u0150\xD5\u0151\u014C\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\u014D\u0154\u0155\u0158\u2039\u203A\u0159\u0156\u0157\u0160\u201A\u201E\u0161\u015A\u015B\xC1\u0164\u0165\xCD\u017D\u017E\u016A\xD3\xD4\u016B\u016E\xDA\u016F\u0170\u0171\u0172\u0173\xDD\xFD\u0137\u017B\u0141\u017C\u0122\u02C7"
  ),
  macintosh: (
    // Python: 'mac_roman'
    "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\u2039\u203A\uFB01\uFB02\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7"
  ),
  "x-mac-romanian": (
    // Python: 'mac_romanian'
    "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\u0102\u0218\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\u0103\u0219\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\u2039\u203A\u021A\u021B\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7"
  ),
  "x-mac-turkish": (
    // Python: 'mac_turkish'
    "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u011E\u011F\u0130\u0131\u015E\u015F\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\uF8A0\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7"
  )
};
decode.MACSTRING = function(dataView, offset, dataLength, encoding) {
  var table2 = eightBitMacEncodings[encoding];
  if (table2 === void 0) {
    return void 0;
  }
  var result = "";
  for (var i = 0; i < dataLength; i++) {
    var c = dataView.getUint8(offset + i);
    if (c <= 127) {
      result += String.fromCharCode(c);
    } else {
      result += table2[c & 127];
    }
  }
  return result;
};
var macEncodingTableCache = typeof WeakMap === "function" && /* @__PURE__ */ new WeakMap();
var macEncodingCacheKeys;
var getMacEncodingTable = function(encoding) {
  if (!macEncodingCacheKeys) {
    macEncodingCacheKeys = {};
    for (var e in eightBitMacEncodings) {
      macEncodingCacheKeys[e] = new String(e);
    }
  }
  var cacheKey = macEncodingCacheKeys[encoding];
  if (cacheKey === void 0) {
    return void 0;
  }
  if (macEncodingTableCache) {
    var cachedTable = macEncodingTableCache.get(cacheKey);
    if (cachedTable !== void 0) {
      return cachedTable;
    }
  }
  var decodingTable = eightBitMacEncodings[encoding];
  if (decodingTable === void 0) {
    return void 0;
  }
  var encodingTable = {};
  for (var i = 0; i < decodingTable.length; i++) {
    encodingTable[decodingTable.charCodeAt(i)] = i + 128;
  }
  if (macEncodingTableCache) {
    macEncodingTableCache.set(cacheKey, encodingTable);
  }
  return encodingTable;
};
encode.MACSTRING = function(str, encoding) {
  var table2 = getMacEncodingTable(encoding);
  if (table2 === void 0) {
    return void 0;
  }
  var result = [];
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c >= 128) {
      c = table2[c];
      if (c === void 0) {
        return void 0;
      }
    }
    result[i] = c;
  }
  return result;
};
sizeOf.MACSTRING = function(str, encoding) {
  var b = encode.MACSTRING(str, encoding);
  if (b !== void 0) {
    return b.length;
  } else {
    return 0;
  }
};
function isByteEncodable(value) {
  return value >= -128 && value <= 127;
}
function encodeVarDeltaRunAsZeroes(deltas, pos, result) {
  var runLength = 0;
  var numDeltas = deltas.length;
  while (pos < numDeltas && runLength < 64 && deltas[pos] === 0) {
    ++pos;
    ++runLength;
  }
  result.push(128 | runLength - 1);
  return pos;
}
function encodeVarDeltaRunAsBytes(deltas, offset, result) {
  var runLength = 0;
  var numDeltas = deltas.length;
  var pos = offset;
  while (pos < numDeltas && runLength < 64) {
    var value = deltas[pos];
    if (!isByteEncodable(value)) {
      break;
    }
    if (value === 0 && pos + 1 < numDeltas && deltas[pos + 1] === 0) {
      break;
    }
    ++pos;
    ++runLength;
  }
  result.push(runLength - 1);
  for (var i = offset; i < pos; ++i) {
    result.push(deltas[i] + 256 & 255);
  }
  return pos;
}
function encodeVarDeltaRunAsWords(deltas, offset, result) {
  var runLength = 0;
  var numDeltas = deltas.length;
  var pos = offset;
  while (pos < numDeltas && runLength < 64) {
    var value = deltas[pos];
    if (value === 0) {
      break;
    }
    if (isByteEncodable(value) && pos + 1 < numDeltas && isByteEncodable(deltas[pos + 1])) {
      break;
    }
    ++pos;
    ++runLength;
  }
  result.push(64 | runLength - 1);
  for (var i = offset; i < pos; ++i) {
    var val = deltas[i];
    result.push(val + 65536 >> 8 & 255, val + 256 & 255);
  }
  return pos;
}
encode.VARDELTAS = function(deltas) {
  var pos = 0;
  var result = [];
  while (pos < deltas.length) {
    var value = deltas[pos];
    if (value === 0) {
      pos = encodeVarDeltaRunAsZeroes(deltas, pos, result);
    } else if (value >= -128 && value <= 127) {
      pos = encodeVarDeltaRunAsBytes(deltas, pos, result);
    } else {
      pos = encodeVarDeltaRunAsWords(deltas, pos, result);
    }
  }
  return result;
};
encode.INDEX = function(l) {
  var offset = 1;
  var offsets = [offset];
  var data = [];
  for (var i = 0; i < l.length; i += 1) {
    var v = encode.OBJECT(l[i]);
    Array.prototype.push.apply(data, v);
    offset += v.length;
    offsets.push(offset);
  }
  if (data.length === 0) {
    return [0, 0];
  }
  var encodedOffsets = [];
  var offSize = 1 + Math.floor(Math.log(offset) / Math.log(2)) / 8 | 0;
  var offsetEncoder = [void 0, encode.BYTE, encode.USHORT, encode.UINT24, encode.ULONG][offSize];
  for (var i$1 = 0; i$1 < offsets.length; i$1 += 1) {
    var encodedOffset = offsetEncoder(offsets[i$1]);
    Array.prototype.push.apply(encodedOffsets, encodedOffset);
  }
  return Array.prototype.concat(
    encode.Card16(l.length),
    encode.OffSize(offSize),
    encodedOffsets,
    data
  );
};
sizeOf.INDEX = function(v) {
  return encode.INDEX(v).length;
};
encode.DICT = function(m) {
  var d = [];
  var keys = Object.keys(m);
  var length = keys.length;
  for (var i = 0; i < length; i += 1) {
    var k = parseInt(keys[i], 0);
    var v = m[k];
    d = d.concat(encode.OPERAND(v.value, v.type));
    d = d.concat(encode.OPERATOR(k));
  }
  return d;
};
sizeOf.DICT = function(m) {
  return encode.DICT(m).length;
};
encode.OPERATOR = function(v) {
  if (v < 1200) {
    return [v];
  } else {
    return [12, v - 1200];
  }
};
encode.OPERAND = function(v, type) {
  var d = [];
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i += 1) {
      check.argument(v.length === type.length, "Not enough arguments given for type" + type);
      d = d.concat(encode.OPERAND(v[i], type[i]));
    }
  } else {
    if (type === "SID") {
      d = d.concat(encode.NUMBER(v));
    } else if (type === "offset") {
      d = d.concat(encode.NUMBER32(v));
    } else if (type === "number") {
      d = d.concat(encode.NUMBER(v));
    } else if (type === "real") {
      d = d.concat(encode.REAL(v));
    } else {
      throw new Error("Unknown operand type " + type);
    }
  }
  return d;
};
encode.OP = encode.BYTE;
sizeOf.OP = sizeOf.BYTE;
var wmm = typeof WeakMap === "function" && /* @__PURE__ */ new WeakMap();
encode.CHARSTRING = function(ops) {
  if (wmm) {
    var cachedValue = wmm.get(ops);
    if (cachedValue !== void 0) {
      return cachedValue;
    }
  }
  var d = [];
  var length = ops.length;
  for (var i = 0; i < length; i += 1) {
    var op = ops[i];
    d = d.concat(encode[op.type](op.value));
  }
  if (wmm) {
    wmm.set(ops, d);
  }
  return d;
};
sizeOf.CHARSTRING = function(ops) {
  return encode.CHARSTRING(ops).length;
};
encode.OBJECT = function(v) {
  var encodingFunction = encode[v.type];
  check.argument(encodingFunction !== void 0, "No encoding function for type " + v.type);
  return encodingFunction(v.value);
};
sizeOf.OBJECT = function(v) {
  var sizeOfFunction = sizeOf[v.type];
  check.argument(sizeOfFunction !== void 0, "No sizeOf function for type " + v.type);
  return sizeOfFunction(v.value);
};
encode.TABLE = function(table2) {
  var d = [];
  var length = table2.fields.length;
  var subtables = [];
  var subtableOffsets = [];
  for (var i = 0; i < length; i += 1) {
    var field = table2.fields[i];
    var encodingFunction = encode[field.type];
    check.argument(encodingFunction !== void 0, "No encoding function for field type " + field.type + " (" + field.name + ")");
    var value = table2[field.name];
    if (value === void 0) {
      value = field.value;
    }
    var bytes = encodingFunction(value);
    if (field.type === "TABLE") {
      subtableOffsets.push(d.length);
      d = d.concat([0, 0]);
      subtables.push(bytes);
    } else {
      d = d.concat(bytes);
    }
  }
  for (var i$1 = 0; i$1 < subtables.length; i$1 += 1) {
    var o = subtableOffsets[i$1];
    var offset = d.length;
    check.argument(offset < 65536, "Table " + table2.tableName + " too big.");
    d[o] = offset >> 8;
    d[o + 1] = offset & 255;
    d = d.concat(subtables[i$1]);
  }
  return d;
};
sizeOf.TABLE = function(table2) {
  var numBytes = 0;
  var length = table2.fields.length;
  for (var i = 0; i < length; i += 1) {
    var field = table2.fields[i];
    var sizeOfFunction = sizeOf[field.type];
    check.argument(sizeOfFunction !== void 0, "No sizeOf function for field type " + field.type + " (" + field.name + ")");
    var value = table2[field.name];
    if (value === void 0) {
      value = field.value;
    }
    numBytes += sizeOfFunction(value);
    if (field.type === "TABLE") {
      numBytes += 2;
    }
  }
  return numBytes;
};
encode.RECORD = encode.TABLE;
sizeOf.RECORD = sizeOf.TABLE;
encode.LITERAL = function(v) {
  return v;
};
sizeOf.LITERAL = function(v) {
  return v.length;
};
function Table(tableName, fields, options) {
  if (fields.length && (fields[0].name !== "coverageFormat" || fields[0].value === 1)) {
    for (var i = 0; i < fields.length; i += 1) {
      var field = fields[i];
      this[field.name] = field.value;
    }
  }
  this.tableName = tableName;
  this.fields = fields;
  if (options) {
    var optionKeys = Object.keys(options);
    for (var i$1 = 0; i$1 < optionKeys.length; i$1 += 1) {
      var k = optionKeys[i$1];
      var v = options[k];
      if (this[k] !== void 0) {
        this[k] = v;
      }
    }
  }
}
Table.prototype.encode = function() {
  return encode.TABLE(this);
};
Table.prototype.sizeOf = function() {
  return sizeOf.TABLE(this);
};
function ushortList(itemName, list, count) {
  if (count === void 0) {
    count = list.length;
  }
  var fields = new Array(list.length + 1);
  fields[0] = { name: itemName + "Count", type: "USHORT", value: count };
  for (var i = 0; i < list.length; i++) {
    fields[i + 1] = { name: itemName + i, type: "USHORT", value: list[i] };
  }
  return fields;
}
function tableList(itemName, records, itemCallback) {
  var count = records.length;
  var fields = new Array(count + 1);
  fields[0] = { name: itemName + "Count", type: "USHORT", value: count };
  for (var i = 0; i < count; i++) {
    fields[i + 1] = { name: itemName + i, type: "TABLE", value: itemCallback(records[i], i) };
  }
  return fields;
}
function recordList(itemName, records, itemCallback) {
  var count = records.length;
  var fields = [];
  fields[0] = { name: itemName + "Count", type: "USHORT", value: count };
  for (var i = 0; i < count; i++) {
    fields = fields.concat(itemCallback(records[i], i));
  }
  return fields;
}
function Coverage(coverageTable) {
  if (coverageTable.format === 1) {
    Table.call(
      this,
      "coverageTable",
      [{ name: "coverageFormat", type: "USHORT", value: 1 }].concat(ushortList("glyph", coverageTable.glyphs))
    );
  } else if (coverageTable.format === 2) {
    Table.call(
      this,
      "coverageTable",
      [{ name: "coverageFormat", type: "USHORT", value: 2 }].concat(recordList("rangeRecord", coverageTable.ranges, function(RangeRecord) {
        return [
          { name: "startGlyphID", type: "USHORT", value: RangeRecord.start },
          { name: "endGlyphID", type: "USHORT", value: RangeRecord.end },
          { name: "startCoverageIndex", type: "USHORT", value: RangeRecord.index }
        ];
      }))
    );
  } else {
    check.assert(false, "Coverage format must be 1 or 2.");
  }
}
Coverage.prototype = Object.create(Table.prototype);
Coverage.prototype.constructor = Coverage;
function ScriptList(scriptListTable) {
  Table.call(
    this,
    "scriptListTable",
    recordList("scriptRecord", scriptListTable, function(scriptRecord, i) {
      var script = scriptRecord.script;
      var defaultLangSys = script.defaultLangSys;
      check.assert(!!defaultLangSys, "Unable to write GSUB: script " + scriptRecord.tag + " has no default language system.");
      return [
        { name: "scriptTag" + i, type: "TAG", value: scriptRecord.tag },
        { name: "script" + i, type: "TABLE", value: new Table("scriptTable", [
          { name: "defaultLangSys", type: "TABLE", value: new Table("defaultLangSys", [
            { name: "lookupOrder", type: "USHORT", value: 0 },
            { name: "reqFeatureIndex", type: "USHORT", value: defaultLangSys.reqFeatureIndex }
          ].concat(ushortList("featureIndex", defaultLangSys.featureIndexes))) }
        ].concat(recordList("langSys", script.langSysRecords, function(langSysRecord, i2) {
          var langSys = langSysRecord.langSys;
          return [
            { name: "langSysTag" + i2, type: "TAG", value: langSysRecord.tag },
            { name: "langSys" + i2, type: "TABLE", value: new Table("langSys", [
              { name: "lookupOrder", type: "USHORT", value: 0 },
              { name: "reqFeatureIndex", type: "USHORT", value: langSys.reqFeatureIndex }
            ].concat(ushortList("featureIndex", langSys.featureIndexes))) }
          ];
        }))) }
      ];
    })
  );
}
ScriptList.prototype = Object.create(Table.prototype);
ScriptList.prototype.constructor = ScriptList;
function FeatureList(featureListTable) {
  Table.call(
    this,
    "featureListTable",
    recordList("featureRecord", featureListTable, function(featureRecord, i) {
      var feature = featureRecord.feature;
      return [
        { name: "featureTag" + i, type: "TAG", value: featureRecord.tag },
        { name: "feature" + i, type: "TABLE", value: new Table("featureTable", [
          { name: "featureParams", type: "USHORT", value: feature.featureParams }
        ].concat(ushortList("lookupListIndex", feature.lookupListIndexes))) }
      ];
    })
  );
}
FeatureList.prototype = Object.create(Table.prototype);
FeatureList.prototype.constructor = FeatureList;
function LookupList(lookupListTable, subtableMakers2) {
  Table.call(this, "lookupListTable", tableList("lookup", lookupListTable, function(lookupTable) {
    var subtableCallback = subtableMakers2[lookupTable.lookupType];
    check.assert(!!subtableCallback, "Unable to write GSUB lookup type " + lookupTable.lookupType + " tables.");
    return new Table("lookupTable", [
      { name: "lookupType", type: "USHORT", value: lookupTable.lookupType },
      { name: "lookupFlag", type: "USHORT", value: lookupTable.lookupFlag }
    ].concat(tableList("subtable", lookupTable.subtables, subtableCallback)));
  }));
}
LookupList.prototype = Object.create(Table.prototype);
LookupList.prototype.constructor = LookupList;
var table = {
  Table,
  Record: Table,
  Coverage,
  ScriptList,
  FeatureList,
  LookupList,
  ushortList,
  tableList,
  recordList
};
function getByte(dataView, offset) {
  return dataView.getUint8(offset);
}
function getUShort(dataView, offset) {
  return dataView.getUint16(offset, false);
}
function getShort(dataView, offset) {
  return dataView.getInt16(offset, false);
}
function getULong(dataView, offset) {
  return dataView.getUint32(offset, false);
}
function getFixed(dataView, offset) {
  var decimal = dataView.getInt16(offset, false);
  var fraction = dataView.getUint16(offset + 2, false);
  return decimal + fraction / 65535;
}
function getTag(dataView, offset) {
  var tag = "";
  for (var i = offset; i < offset + 4; i += 1) {
    tag += String.fromCharCode(dataView.getInt8(i));
  }
  return tag;
}
function getOffset(dataView, offset, offSize) {
  var v = 0;
  for (var i = 0; i < offSize; i += 1) {
    v <<= 8;
    v += dataView.getUint8(offset + i);
  }
  return v;
}
function getBytes(dataView, startOffset, endOffset) {
  var bytes = [];
  for (var i = startOffset; i < endOffset; i += 1) {
    bytes.push(dataView.getUint8(i));
  }
  return bytes;
}
function bytesToString(bytes) {
  var s = "";
  for (var i = 0; i < bytes.length; i += 1) {
    s += String.fromCharCode(bytes[i]);
  }
  return s;
}
var typeOffsets = {
  byte: 1,
  uShort: 2,
  short: 2,
  uLong: 4,
  fixed: 4,
  longDateTime: 8,
  tag: 4
};
function Parser(data, offset) {
  this.data = data;
  this.offset = offset;
  this.relativeOffset = 0;
}
Parser.prototype.parseByte = function() {
  var v = this.data.getUint8(this.offset + this.relativeOffset);
  this.relativeOffset += 1;
  return v;
};
Parser.prototype.parseChar = function() {
  var v = this.data.getInt8(this.offset + this.relativeOffset);
  this.relativeOffset += 1;
  return v;
};
Parser.prototype.parseCard8 = Parser.prototype.parseByte;
Parser.prototype.parseUShort = function() {
  var v = this.data.getUint16(this.offset + this.relativeOffset);
  this.relativeOffset += 2;
  return v;
};
Parser.prototype.parseCard16 = Parser.prototype.parseUShort;
Parser.prototype.parseSID = Parser.prototype.parseUShort;
Parser.prototype.parseOffset16 = Parser.prototype.parseUShort;
Parser.prototype.parseShort = function() {
  var v = this.data.getInt16(this.offset + this.relativeOffset);
  this.relativeOffset += 2;
  return v;
};
Parser.prototype.parseF2Dot14 = function() {
  var v = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
  this.relativeOffset += 2;
  return v;
};
Parser.prototype.parseULong = function() {
  var v = getULong(this.data, this.offset + this.relativeOffset);
  this.relativeOffset += 4;
  return v;
};
Parser.prototype.parseOffset32 = Parser.prototype.parseULong;
Parser.prototype.parseFixed = function() {
  var v = getFixed(this.data, this.offset + this.relativeOffset);
  this.relativeOffset += 4;
  return v;
};
Parser.prototype.parseString = function(length) {
  var dataView = this.data;
  var offset = this.offset + this.relativeOffset;
  var string = "";
  this.relativeOffset += length;
  for (var i = 0; i < length; i++) {
    string += String.fromCharCode(dataView.getUint8(offset + i));
  }
  return string;
};
Parser.prototype.parseTag = function() {
  return this.parseString(4);
};
Parser.prototype.parseLongDateTime = function() {
  var v = getULong(this.data, this.offset + this.relativeOffset + 4);
  v -= 2082844800;
  this.relativeOffset += 8;
  return v;
};
Parser.prototype.parseVersion = function(minorBase) {
  var major = getUShort(this.data, this.offset + this.relativeOffset);
  var minor = getUShort(this.data, this.offset + this.relativeOffset + 2);
  this.relativeOffset += 4;
  if (minorBase === void 0) {
    minorBase = 4096;
  }
  return major + minor / minorBase / 10;
};
Parser.prototype.skip = function(type, amount) {
  if (amount === void 0) {
    amount = 1;
  }
  this.relativeOffset += typeOffsets[type] * amount;
};
Parser.prototype.parseULongList = function(count) {
  if (count === void 0) {
    count = this.parseULong();
  }
  var offsets = new Array(count);
  var dataView = this.data;
  var offset = this.offset + this.relativeOffset;
  for (var i = 0; i < count; i++) {
    offsets[i] = dataView.getUint32(offset);
    offset += 4;
  }
  this.relativeOffset += count * 4;
  return offsets;
};
Parser.prototype.parseOffset16List = Parser.prototype.parseUShortList = function(count) {
  if (count === void 0) {
    count = this.parseUShort();
  }
  var offsets = new Array(count);
  var dataView = this.data;
  var offset = this.offset + this.relativeOffset;
  for (var i = 0; i < count; i++) {
    offsets[i] = dataView.getUint16(offset);
    offset += 2;
  }
  this.relativeOffset += count * 2;
  return offsets;
};
Parser.prototype.parseShortList = function(count) {
  var list = new Array(count);
  var dataView = this.data;
  var offset = this.offset + this.relativeOffset;
  for (var i = 0; i < count; i++) {
    list[i] = dataView.getInt16(offset);
    offset += 2;
  }
  this.relativeOffset += count * 2;
  return list;
};
Parser.prototype.parseByteList = function(count) {
  var list = new Array(count);
  var dataView = this.data;
  var offset = this.offset + this.relativeOffset;
  for (var i = 0; i < count; i++) {
    list[i] = dataView.getUint8(offset++);
  }
  this.relativeOffset += count;
  return list;
};
Parser.prototype.parseList = function(count, itemCallback) {
  if (!itemCallback) {
    itemCallback = count;
    count = this.parseUShort();
  }
  var list = new Array(count);
  for (var i = 0; i < count; i++) {
    list[i] = itemCallback.call(this);
  }
  return list;
};
Parser.prototype.parseList32 = function(count, itemCallback) {
  if (!itemCallback) {
    itemCallback = count;
    count = this.parseULong();
  }
  var list = new Array(count);
  for (var i = 0; i < count; i++) {
    list[i] = itemCallback.call(this);
  }
  return list;
};
Parser.prototype.parseRecordList = function(count, recordDescription) {
  if (!recordDescription) {
    recordDescription = count;
    count = this.parseUShort();
  }
  var records = new Array(count);
  var fields = Object.keys(recordDescription);
  for (var i = 0; i < count; i++) {
    var rec = {};
    for (var j = 0; j < fields.length; j++) {
      var fieldName = fields[j];
      var fieldType = recordDescription[fieldName];
      rec[fieldName] = fieldType.call(this);
    }
    records[i] = rec;
  }
  return records;
};
Parser.prototype.parseRecordList32 = function(count, recordDescription) {
  if (!recordDescription) {
    recordDescription = count;
    count = this.parseULong();
  }
  var records = new Array(count);
  var fields = Object.keys(recordDescription);
  for (var i = 0; i < count; i++) {
    var rec = {};
    for (var j = 0; j < fields.length; j++) {
      var fieldName = fields[j];
      var fieldType = recordDescription[fieldName];
      rec[fieldName] = fieldType.call(this);
    }
    records[i] = rec;
  }
  return records;
};
Parser.prototype.parseStruct = function(description) {
  if (typeof description === "function") {
    return description.call(this);
  } else {
    var fields = Object.keys(description);
    var struct = {};
    for (var j = 0; j < fields.length; j++) {
      var fieldName = fields[j];
      var fieldType = description[fieldName];
      struct[fieldName] = fieldType.call(this);
    }
    return struct;
  }
};
Parser.prototype.parseValueRecord = function(valueFormat) {
  if (valueFormat === void 0) {
    valueFormat = this.parseUShort();
  }
  if (valueFormat === 0) {
    return;
  }
  var valueRecord = {};
  if (valueFormat & 1) {
    valueRecord.xPlacement = this.parseShort();
  }
  if (valueFormat & 2) {
    valueRecord.yPlacement = this.parseShort();
  }
  if (valueFormat & 4) {
    valueRecord.xAdvance = this.parseShort();
  }
  if (valueFormat & 8) {
    valueRecord.yAdvance = this.parseShort();
  }
  if (valueFormat & 16) {
    valueRecord.xPlaDevice = void 0;
    this.parseShort();
  }
  if (valueFormat & 32) {
    valueRecord.yPlaDevice = void 0;
    this.parseShort();
  }
  if (valueFormat & 64) {
    valueRecord.xAdvDevice = void 0;
    this.parseShort();
  }
  if (valueFormat & 128) {
    valueRecord.yAdvDevice = void 0;
    this.parseShort();
  }
  return valueRecord;
};
Parser.prototype.parseValueRecordList = function() {
  var valueFormat = this.parseUShort();
  var valueCount = this.parseUShort();
  var values = new Array(valueCount);
  for (var i = 0; i < valueCount; i++) {
    values[i] = this.parseValueRecord(valueFormat);
  }
  return values;
};
Parser.prototype.parsePointer = function(description) {
  var structOffset = this.parseOffset16();
  if (structOffset > 0) {
    return new Parser(this.data, this.offset + structOffset).parseStruct(description);
  }
  return void 0;
};
Parser.prototype.parsePointer32 = function(description) {
  var structOffset = this.parseOffset32();
  if (structOffset > 0) {
    return new Parser(this.data, this.offset + structOffset).parseStruct(description);
  }
  return void 0;
};
Parser.prototype.parseListOfLists = function(itemCallback) {
  var offsets = this.parseOffset16List();
  var count = offsets.length;
  var relativeOffset = this.relativeOffset;
  var list = new Array(count);
  for (var i = 0; i < count; i++) {
    var start = offsets[i];
    if (start === 0) {
      list[i] = void 0;
      continue;
    }
    this.relativeOffset = start;
    if (itemCallback) {
      var subOffsets = this.parseOffset16List();
      var subList = new Array(subOffsets.length);
      for (var j = 0; j < subOffsets.length; j++) {
        this.relativeOffset = start + subOffsets[j];
        subList[j] = itemCallback.call(this);
      }
      list[i] = subList;
    } else {
      list[i] = this.parseUShortList();
    }
  }
  this.relativeOffset = relativeOffset;
  return list;
};
Parser.prototype.parseCoverage = function() {
  var startOffset = this.offset + this.relativeOffset;
  var format = this.parseUShort();
  var count = this.parseUShort();
  if (format === 1) {
    return {
      format: 1,
      glyphs: this.parseUShortList(count)
    };
  } else if (format === 2) {
    var ranges = new Array(count);
    for (var i = 0; i < count; i++) {
      ranges[i] = {
        start: this.parseUShort(),
        end: this.parseUShort(),
        index: this.parseUShort()
      };
    }
    return {
      format: 2,
      ranges
    };
  }
  throw new Error("0x" + startOffset.toString(16) + ": Coverage format must be 1 or 2.");
};
Parser.prototype.parseClassDef = function() {
  var startOffset = this.offset + this.relativeOffset;
  var format = this.parseUShort();
  if (format === 1) {
    return {
      format: 1,
      startGlyph: this.parseUShort(),
      classes: this.parseUShortList()
    };
  } else if (format === 2) {
    return {
      format: 2,
      ranges: this.parseRecordList({
        start: Parser.uShort,
        end: Parser.uShort,
        classId: Parser.uShort
      })
    };
  }
  throw new Error("0x" + startOffset.toString(16) + ": ClassDef format must be 1 or 2.");
};
Parser.list = function(count, itemCallback) {
  return function() {
    return this.parseList(count, itemCallback);
  };
};
Parser.list32 = function(count, itemCallback) {
  return function() {
    return this.parseList32(count, itemCallback);
  };
};
Parser.recordList = function(count, recordDescription) {
  return function() {
    return this.parseRecordList(count, recordDescription);
  };
};
Parser.recordList32 = function(count, recordDescription) {
  return function() {
    return this.parseRecordList32(count, recordDescription);
  };
};
Parser.pointer = function(description) {
  return function() {
    return this.parsePointer(description);
  };
};
Parser.pointer32 = function(description) {
  return function() {
    return this.parsePointer32(description);
  };
};
Parser.tag = Parser.prototype.parseTag;
Parser.byte = Parser.prototype.parseByte;
Parser.uShort = Parser.offset16 = Parser.prototype.parseUShort;
Parser.uShortList = Parser.prototype.parseUShortList;
Parser.uLong = Parser.offset32 = Parser.prototype.parseULong;
Parser.uLongList = Parser.prototype.parseULongList;
Parser.struct = Parser.prototype.parseStruct;
Parser.coverage = Parser.prototype.parseCoverage;
Parser.classDef = Parser.prototype.parseClassDef;
var langSysTable = {
  reserved: Parser.uShort,
  reqFeatureIndex: Parser.uShort,
  featureIndexes: Parser.uShortList
};
Parser.prototype.parseScriptList = function() {
  return this.parsePointer(Parser.recordList({
    tag: Parser.tag,
    script: Parser.pointer({
      defaultLangSys: Parser.pointer(langSysTable),
      langSysRecords: Parser.recordList({
        tag: Parser.tag,
        langSys: Parser.pointer(langSysTable)
      })
    })
  })) || [];
};
Parser.prototype.parseFeatureList = function() {
  return this.parsePointer(Parser.recordList({
    tag: Parser.tag,
    feature: Parser.pointer({
      featureParams: Parser.offset16,
      lookupListIndexes: Parser.uShortList
    })
  })) || [];
};
Parser.prototype.parseLookupList = function(lookupTableParsers) {
  return this.parsePointer(Parser.list(Parser.pointer(function() {
    var lookupType = this.parseUShort();
    check.argument(1 <= lookupType && lookupType <= 9, "GPOS/GSUB lookup type " + lookupType + " unknown.");
    var lookupFlag = this.parseUShort();
    var useMarkFilteringSet = lookupFlag & 16;
    return {
      lookupType,
      lookupFlag,
      subtables: this.parseList(Parser.pointer(lookupTableParsers[lookupType])),
      markFilteringSet: useMarkFilteringSet ? this.parseUShort() : void 0
    };
  }))) || [];
};
Parser.prototype.parseFeatureVariationsList = function() {
  return this.parsePointer32(function() {
    var majorVersion = this.parseUShort();
    var minorVersion = this.parseUShort();
    check.argument(majorVersion === 1 && minorVersion < 1, "GPOS/GSUB feature variations table unknown.");
    var featureVariations = this.parseRecordList32({
      conditionSetOffset: Parser.offset32,
      featureTableSubstitutionOffset: Parser.offset32
    });
    return featureVariations;
  }) || [];
};
var parse = {
  getByte,
  getCard8: getByte,
  getUShort,
  getCard16: getUShort,
  getShort,
  getULong,
  getFixed,
  getTag,
  getOffset,
  getBytes,
  bytesToString,
  Parser
};
function parseCmapTableFormat12(cmap2, p) {
  p.parseUShort();
  cmap2.length = p.parseULong();
  cmap2.language = p.parseULong();
  var groupCount;
  cmap2.groupCount = groupCount = p.parseULong();
  cmap2.glyphIndexMap = {};
  for (var i = 0; i < groupCount; i += 1) {
    var startCharCode = p.parseULong();
    var endCharCode = p.parseULong();
    var startGlyphId = p.parseULong();
    for (var c = startCharCode; c <= endCharCode; c += 1) {
      cmap2.glyphIndexMap[c] = startGlyphId;
      startGlyphId++;
    }
  }
}
function parseCmapTableFormat4(cmap2, p, data, start, offset) {
  cmap2.length = p.parseUShort();
  cmap2.language = p.parseUShort();
  var segCount;
  cmap2.segCount = segCount = p.parseUShort() >> 1;
  p.skip("uShort", 3);
  cmap2.glyphIndexMap = {};
  var endCountParser = new parse.Parser(data, start + offset + 14);
  var startCountParser = new parse.Parser(data, start + offset + 16 + segCount * 2);
  var idDeltaParser = new parse.Parser(data, start + offset + 16 + segCount * 4);
  var idRangeOffsetParser = new parse.Parser(data, start + offset + 16 + segCount * 6);
  var glyphIndexOffset = start + offset + 16 + segCount * 8;
  for (var i = 0; i < segCount - 1; i += 1) {
    var glyphIndex = void 0;
    var endCount = endCountParser.parseUShort();
    var startCount = startCountParser.parseUShort();
    var idDelta = idDeltaParser.parseShort();
    var idRangeOffset = idRangeOffsetParser.parseUShort();
    for (var c = startCount; c <= endCount; c += 1) {
      if (idRangeOffset !== 0) {
        glyphIndexOffset = idRangeOffsetParser.offset + idRangeOffsetParser.relativeOffset - 2;
        glyphIndexOffset += idRangeOffset;
        glyphIndexOffset += (c - startCount) * 2;
        glyphIndex = parse.getUShort(data, glyphIndexOffset);
        if (glyphIndex !== 0) {
          glyphIndex = glyphIndex + idDelta & 65535;
        }
      } else {
        glyphIndex = c + idDelta & 65535;
      }
      cmap2.glyphIndexMap[c] = glyphIndex;
    }
  }
}
function parseCmapTable(data, start) {
  var cmap2 = {};
  cmap2.version = parse.getUShort(data, start);
  check.argument(cmap2.version === 0, "cmap table version should be 0.");
  cmap2.numTables = parse.getUShort(data, start + 2);
  var offset = -1;
  for (var i = cmap2.numTables - 1; i >= 0; i -= 1) {
    var platformId = parse.getUShort(data, start + 4 + i * 8);
    var encodingId = parse.getUShort(data, start + 4 + i * 8 + 2);
    if (platformId === 3 && (encodingId === 0 || encodingId === 1 || encodingId === 10) || platformId === 0 && (encodingId === 0 || encodingId === 1 || encodingId === 2 || encodingId === 3 || encodingId === 4)) {
      offset = parse.getULong(data, start + 4 + i * 8 + 4);
      break;
    }
  }
  if (offset === -1) {
    throw new Error("No valid cmap sub-tables found.");
  }
  var p = new parse.Parser(data, start + offset);
  cmap2.format = p.parseUShort();
  if (cmap2.format === 12) {
    parseCmapTableFormat12(cmap2, p);
  } else if (cmap2.format === 4) {
    parseCmapTableFormat4(cmap2, p, data, start, offset);
  } else {
    throw new Error("Only format 4 and 12 cmap tables are supported (found format " + cmap2.format + ").");
  }
  return cmap2;
}
function addSegment(t, code, glyphIndex) {
  t.segments.push({
    end: code,
    start: code,
    delta: -(code - glyphIndex),
    offset: 0,
    glyphIndex
  });
}
function addTerminatorSegment(t) {
  t.segments.push({
    end: 65535,
    start: 65535,
    delta: 1,
    offset: 0
  });
}
function makeCmapTable(glyphs) {
  var isPlan0Only = true;
  var i;
  for (i = glyphs.length - 1; i > 0; i -= 1) {
    var g = glyphs.get(i);
    if (g.unicode > 65535) {
      console.log("Adding CMAP format 12 (needed!)");
      isPlan0Only = false;
      break;
    }
  }
  var cmapTable = [
    { name: "version", type: "USHORT", value: 0 },
    { name: "numTables", type: "USHORT", value: isPlan0Only ? 1 : 2 },
    // CMAP 4 header
    { name: "platformID", type: "USHORT", value: 3 },
    { name: "encodingID", type: "USHORT", value: 1 },
    { name: "offset", type: "ULONG", value: isPlan0Only ? 12 : 12 + 8 }
  ];
  if (!isPlan0Only) {
    cmapTable = cmapTable.concat([
      // CMAP 12 header
      { name: "cmap12PlatformID", type: "USHORT", value: 3 },
      // We encode only for PlatformID = 3 (Windows) because it is supported everywhere
      { name: "cmap12EncodingID", type: "USHORT", value: 10 },
      { name: "cmap12Offset", type: "ULONG", value: 0 }
    ]);
  }
  cmapTable = cmapTable.concat([
    // CMAP 4 Subtable
    { name: "format", type: "USHORT", value: 4 },
    { name: "cmap4Length", type: "USHORT", value: 0 },
    { name: "language", type: "USHORT", value: 0 },
    { name: "segCountX2", type: "USHORT", value: 0 },
    { name: "searchRange", type: "USHORT", value: 0 },
    { name: "entrySelector", type: "USHORT", value: 0 },
    { name: "rangeShift", type: "USHORT", value: 0 }
  ]);
  var t = new table.Table("cmap", cmapTable);
  t.segments = [];
  for (i = 0; i < glyphs.length; i += 1) {
    var glyph = glyphs.get(i);
    for (var j = 0; j < glyph.unicodes.length; j += 1) {
      addSegment(t, glyph.unicodes[j], i);
    }
    t.segments = t.segments.sort(function(a, b) {
      return a.start - b.start;
    });
  }
  addTerminatorSegment(t);
  var segCount = t.segments.length;
  var segCountToRemove = 0;
  var endCounts = [];
  var startCounts = [];
  var idDeltas = [];
  var idRangeOffsets = [];
  var glyphIds = [];
  var cmap12Groups = [];
  for (i = 0; i < segCount; i += 1) {
    var segment = t.segments[i];
    if (segment.end <= 65535 && segment.start <= 65535) {
      endCounts = endCounts.concat({ name: "end_" + i, type: "USHORT", value: segment.end });
      startCounts = startCounts.concat({ name: "start_" + i, type: "USHORT", value: segment.start });
      idDeltas = idDeltas.concat({ name: "idDelta_" + i, type: "SHORT", value: segment.delta });
      idRangeOffsets = idRangeOffsets.concat({ name: "idRangeOffset_" + i, type: "USHORT", value: segment.offset });
      if (segment.glyphId !== void 0) {
        glyphIds = glyphIds.concat({ name: "glyph_" + i, type: "USHORT", value: segment.glyphId });
      }
    } else {
      segCountToRemove += 1;
    }
    if (!isPlan0Only && segment.glyphIndex !== void 0) {
      cmap12Groups = cmap12Groups.concat({ name: "cmap12Start_" + i, type: "ULONG", value: segment.start });
      cmap12Groups = cmap12Groups.concat({ name: "cmap12End_" + i, type: "ULONG", value: segment.end });
      cmap12Groups = cmap12Groups.concat({ name: "cmap12Glyph_" + i, type: "ULONG", value: segment.glyphIndex });
    }
  }
  t.segCountX2 = (segCount - segCountToRemove) * 2;
  t.searchRange = Math.pow(2, Math.floor(Math.log(segCount - segCountToRemove) / Math.log(2))) * 2;
  t.entrySelector = Math.log(t.searchRange / 2) / Math.log(2);
  t.rangeShift = t.segCountX2 - t.searchRange;
  t.fields = t.fields.concat(endCounts);
  t.fields.push({ name: "reservedPad", type: "USHORT", value: 0 });
  t.fields = t.fields.concat(startCounts);
  t.fields = t.fields.concat(idDeltas);
  t.fields = t.fields.concat(idRangeOffsets);
  t.fields = t.fields.concat(glyphIds);
  t.cmap4Length = 14 + // Subtable header
  endCounts.length * 2 + 2 + // reservedPad
  startCounts.length * 2 + idDeltas.length * 2 + idRangeOffsets.length * 2 + glyphIds.length * 2;
  if (!isPlan0Only) {
    var cmap12Length = 16 + // Subtable header
    cmap12Groups.length * 4;
    t.cmap12Offset = 12 + 2 * 2 + 4 + t.cmap4Length;
    t.fields = t.fields.concat([
      { name: "cmap12Format", type: "USHORT", value: 12 },
      { name: "cmap12Reserved", type: "USHORT", value: 0 },
      { name: "cmap12Length", type: "ULONG", value: cmap12Length },
      { name: "cmap12Language", type: "ULONG", value: 0 },
      { name: "cmap12nGroups", type: "ULONG", value: cmap12Groups.length / 3 }
    ]);
    t.fields = t.fields.concat(cmap12Groups);
  }
  return t;
}
var cmap = { parse: parseCmapTable, make: makeCmapTable };
var cffStandardStrings = [
  ".notdef",
  "space",
  "exclam",
  "quotedbl",
  "numbersign",
  "dollar",
  "percent",
  "ampersand",
  "quoteright",
  "parenleft",
  "parenright",
  "asterisk",
  "plus",
  "comma",
  "hyphen",
  "period",
  "slash",
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "colon",
  "semicolon",
  "less",
  "equal",
  "greater",
  "question",
  "at",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "bracketleft",
  "backslash",
  "bracketright",
  "asciicircum",
  "underscore",
  "quoteleft",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "braceleft",
  "bar",
  "braceright",
  "asciitilde",
  "exclamdown",
  "cent",
  "sterling",
  "fraction",
  "yen",
  "florin",
  "section",
  "currency",
  "quotesingle",
  "quotedblleft",
  "guillemotleft",
  "guilsinglleft",
  "guilsinglright",
  "fi",
  "fl",
  "endash",
  "dagger",
  "daggerdbl",
  "periodcentered",
  "paragraph",
  "bullet",
  "quotesinglbase",
  "quotedblbase",
  "quotedblright",
  "guillemotright",
  "ellipsis",
  "perthousand",
  "questiondown",
  "grave",
  "acute",
  "circumflex",
  "tilde",
  "macron",
  "breve",
  "dotaccent",
  "dieresis",
  "ring",
  "cedilla",
  "hungarumlaut",
  "ogonek",
  "caron",
  "emdash",
  "AE",
  "ordfeminine",
  "Lslash",
  "Oslash",
  "OE",
  "ordmasculine",
  "ae",
  "dotlessi",
  "lslash",
  "oslash",
  "oe",
  "germandbls",
  "onesuperior",
  "logicalnot",
  "mu",
  "trademark",
  "Eth",
  "onehalf",
  "plusminus",
  "Thorn",
  "onequarter",
  "divide",
  "brokenbar",
  "degree",
  "thorn",
  "threequarters",
  "twosuperior",
  "registered",
  "minus",
  "eth",
  "multiply",
  "threesuperior",
  "copyright",
  "Aacute",
  "Acircumflex",
  "Adieresis",
  "Agrave",
  "Aring",
  "Atilde",
  "Ccedilla",
  "Eacute",
  "Ecircumflex",
  "Edieresis",
  "Egrave",
  "Iacute",
  "Icircumflex",
  "Idieresis",
  "Igrave",
  "Ntilde",
  "Oacute",
  "Ocircumflex",
  "Odieresis",
  "Ograve",
  "Otilde",
  "Scaron",
  "Uacute",
  "Ucircumflex",
  "Udieresis",
  "Ugrave",
  "Yacute",
  "Ydieresis",
  "Zcaron",
  "aacute",
  "acircumflex",
  "adieresis",
  "agrave",
  "aring",
  "atilde",
  "ccedilla",
  "eacute",
  "ecircumflex",
  "edieresis",
  "egrave",
  "iacute",
  "icircumflex",
  "idieresis",
  "igrave",
  "ntilde",
  "oacute",
  "ocircumflex",
  "odieresis",
  "ograve",
  "otilde",
  "scaron",
  "uacute",
  "ucircumflex",
  "udieresis",
  "ugrave",
  "yacute",
  "ydieresis",
  "zcaron",
  "exclamsmall",
  "Hungarumlautsmall",
  "dollaroldstyle",
  "dollarsuperior",
  "ampersandsmall",
  "Acutesmall",
  "parenleftsuperior",
  "parenrightsuperior",
  "266 ff",
  "onedotenleader",
  "zerooldstyle",
  "oneoldstyle",
  "twooldstyle",
  "threeoldstyle",
  "fouroldstyle",
  "fiveoldstyle",
  "sixoldstyle",
  "sevenoldstyle",
  "eightoldstyle",
  "nineoldstyle",
  "commasuperior",
  "threequartersemdash",
  "periodsuperior",
  "questionsmall",
  "asuperior",
  "bsuperior",
  "centsuperior",
  "dsuperior",
  "esuperior",
  "isuperior",
  "lsuperior",
  "msuperior",
  "nsuperior",
  "osuperior",
  "rsuperior",
  "ssuperior",
  "tsuperior",
  "ff",
  "ffi",
  "ffl",
  "parenleftinferior",
  "parenrightinferior",
  "Circumflexsmall",
  "hyphensuperior",
  "Gravesmall",
  "Asmall",
  "Bsmall",
  "Csmall",
  "Dsmall",
  "Esmall",
  "Fsmall",
  "Gsmall",
  "Hsmall",
  "Ismall",
  "Jsmall",
  "Ksmall",
  "Lsmall",
  "Msmall",
  "Nsmall",
  "Osmall",
  "Psmall",
  "Qsmall",
  "Rsmall",
  "Ssmall",
  "Tsmall",
  "Usmall",
  "Vsmall",
  "Wsmall",
  "Xsmall",
  "Ysmall",
  "Zsmall",
  "colonmonetary",
  "onefitted",
  "rupiah",
  "Tildesmall",
  "exclamdownsmall",
  "centoldstyle",
  "Lslashsmall",
  "Scaronsmall",
  "Zcaronsmall",
  "Dieresissmall",
  "Brevesmall",
  "Caronsmall",
  "Dotaccentsmall",
  "Macronsmall",
  "figuredash",
  "hypheninferior",
  "Ogoneksmall",
  "Ringsmall",
  "Cedillasmall",
  "questiondownsmall",
  "oneeighth",
  "threeeighths",
  "fiveeighths",
  "seveneighths",
  "onethird",
  "twothirds",
  "zerosuperior",
  "foursuperior",
  "fivesuperior",
  "sixsuperior",
  "sevensuperior",
  "eightsuperior",
  "ninesuperior",
  "zeroinferior",
  "oneinferior",
  "twoinferior",
  "threeinferior",
  "fourinferior",
  "fiveinferior",
  "sixinferior",
  "seveninferior",
  "eightinferior",
  "nineinferior",
  "centinferior",
  "dollarinferior",
  "periodinferior",
  "commainferior",
  "Agravesmall",
  "Aacutesmall",
  "Acircumflexsmall",
  "Atildesmall",
  "Adieresissmall",
  "Aringsmall",
  "AEsmall",
  "Ccedillasmall",
  "Egravesmall",
  "Eacutesmall",
  "Ecircumflexsmall",
  "Edieresissmall",
  "Igravesmall",
  "Iacutesmall",
  "Icircumflexsmall",
  "Idieresissmall",
  "Ethsmall",
  "Ntildesmall",
  "Ogravesmall",
  "Oacutesmall",
  "Ocircumflexsmall",
  "Otildesmall",
  "Odieresissmall",
  "OEsmall",
  "Oslashsmall",
  "Ugravesmall",
  "Uacutesmall",
  "Ucircumflexsmall",
  "Udieresissmall",
  "Yacutesmall",
  "Thornsmall",
  "Ydieresissmall",
  "001.000",
  "001.001",
  "001.002",
  "001.003",
  "Black",
  "Bold",
  "Book",
  "Light",
  "Medium",
  "Regular",
  "Roman",
  "Semibold"
];
var cffStandardEncoding = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "space",
  "exclam",
  "quotedbl",
  "numbersign",
  "dollar",
  "percent",
  "ampersand",
  "quoteright",
  "parenleft",
  "parenright",
  "asterisk",
  "plus",
  "comma",
  "hyphen",
  "period",
  "slash",
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "colon",
  "semicolon",
  "less",
  "equal",
  "greater",
  "question",
  "at",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "bracketleft",
  "backslash",
  "bracketright",
  "asciicircum",
  "underscore",
  "quoteleft",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "braceleft",
  "bar",
  "braceright",
  "asciitilde",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "exclamdown",
  "cent",
  "sterling",
  "fraction",
  "yen",
  "florin",
  "section",
  "currency",
  "quotesingle",
  "quotedblleft",
  "guillemotleft",
  "guilsinglleft",
  "guilsinglright",
  "fi",
  "fl",
  "",
  "endash",
  "dagger",
  "daggerdbl",
  "periodcentered",
  "",
  "paragraph",
  "bullet",
  "quotesinglbase",
  "quotedblbase",
  "quotedblright",
  "guillemotright",
  "ellipsis",
  "perthousand",
  "",
  "questiondown",
  "",
  "grave",
  "acute",
  "circumflex",
  "tilde",
  "macron",
  "breve",
  "dotaccent",
  "dieresis",
  "",
  "ring",
  "cedilla",
  "",
  "hungarumlaut",
  "ogonek",
  "caron",
  "emdash",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "AE",
  "",
  "ordfeminine",
  "",
  "",
  "",
  "",
  "Lslash",
  "Oslash",
  "OE",
  "ordmasculine",
  "",
  "",
  "",
  "",
  "",
  "ae",
  "",
  "",
  "",
  "dotlessi",
  "",
  "",
  "lslash",
  "oslash",
  "oe",
  "germandbls"
];
var cffExpertEncoding = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "space",
  "exclamsmall",
  "Hungarumlautsmall",
  "",
  "dollaroldstyle",
  "dollarsuperior",
  "ampersandsmall",
  "Acutesmall",
  "parenleftsuperior",
  "parenrightsuperior",
  "twodotenleader",
  "onedotenleader",
  "comma",
  "hyphen",
  "period",
  "fraction",
  "zerooldstyle",
  "oneoldstyle",
  "twooldstyle",
  "threeoldstyle",
  "fouroldstyle",
  "fiveoldstyle",
  "sixoldstyle",
  "sevenoldstyle",
  "eightoldstyle",
  "nineoldstyle",
  "colon",
  "semicolon",
  "commasuperior",
  "threequartersemdash",
  "periodsuperior",
  "questionsmall",
  "",
  "asuperior",
  "bsuperior",
  "centsuperior",
  "dsuperior",
  "esuperior",
  "",
  "",
  "isuperior",
  "",
  "",
  "lsuperior",
  "msuperior",
  "nsuperior",
  "osuperior",
  "",
  "",
  "rsuperior",
  "ssuperior",
  "tsuperior",
  "",
  "ff",
  "fi",
  "fl",
  "ffi",
  "ffl",
  "parenleftinferior",
  "",
  "parenrightinferior",
  "Circumflexsmall",
  "hyphensuperior",
  "Gravesmall",
  "Asmall",
  "Bsmall",
  "Csmall",
  "Dsmall",
  "Esmall",
  "Fsmall",
  "Gsmall",
  "Hsmall",
  "Ismall",
  "Jsmall",
  "Ksmall",
  "Lsmall",
  "Msmall",
  "Nsmall",
  "Osmall",
  "Psmall",
  "Qsmall",
  "Rsmall",
  "Ssmall",
  "Tsmall",
  "Usmall",
  "Vsmall",
  "Wsmall",
  "Xsmall",
  "Ysmall",
  "Zsmall",
  "colonmonetary",
  "onefitted",
  "rupiah",
  "Tildesmall",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "exclamdownsmall",
  "centoldstyle",
  "Lslashsmall",
  "",
  "",
  "Scaronsmall",
  "Zcaronsmall",
  "Dieresissmall",
  "Brevesmall",
  "Caronsmall",
  "",
  "Dotaccentsmall",
  "",
  "",
  "Macronsmall",
  "",
  "",
  "figuredash",
  "hypheninferior",
  "",
  "",
  "Ogoneksmall",
  "Ringsmall",
  "Cedillasmall",
  "",
  "",
  "",
  "onequarter",
  "onehalf",
  "threequarters",
  "questiondownsmall",
  "oneeighth",
  "threeeighths",
  "fiveeighths",
  "seveneighths",
  "onethird",
  "twothirds",
  "",
  "",
  "zerosuperior",
  "onesuperior",
  "twosuperior",
  "threesuperior",
  "foursuperior",
  "fivesuperior",
  "sixsuperior",
  "sevensuperior",
  "eightsuperior",
  "ninesuperior",
  "zeroinferior",
  "oneinferior",
  "twoinferior",
  "threeinferior",
  "fourinferior",
  "fiveinferior",
  "sixinferior",
  "seveninferior",
  "eightinferior",
  "nineinferior",
  "centinferior",
  "dollarinferior",
  "periodinferior",
  "commainferior",
  "Agravesmall",
  "Aacutesmall",
  "Acircumflexsmall",
  "Atildesmall",
  "Adieresissmall",
  "Aringsmall",
  "AEsmall",
  "Ccedillasmall",
  "Egravesmall",
  "Eacutesmall",
  "Ecircumflexsmall",
  "Edieresissmall",
  "Igravesmall",
  "Iacutesmall",
  "Icircumflexsmall",
  "Idieresissmall",
  "Ethsmall",
  "Ntildesmall",
  "Ogravesmall",
  "Oacutesmall",
  "Ocircumflexsmall",
  "Otildesmall",
  "Odieresissmall",
  "OEsmall",
  "Oslashsmall",
  "Ugravesmall",
  "Uacutesmall",
  "Ucircumflexsmall",
  "Udieresissmall",
  "Yacutesmall",
  "Thornsmall",
  "Ydieresissmall"
];
var standardNames = [
  ".notdef",
  ".null",
  "nonmarkingreturn",
  "space",
  "exclam",
  "quotedbl",
  "numbersign",
  "dollar",
  "percent",
  "ampersand",
  "quotesingle",
  "parenleft",
  "parenright",
  "asterisk",
  "plus",
  "comma",
  "hyphen",
  "period",
  "slash",
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "colon",
  "semicolon",
  "less",
  "equal",
  "greater",
  "question",
  "at",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "bracketleft",
  "backslash",
  "bracketright",
  "asciicircum",
  "underscore",
  "grave",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "braceleft",
  "bar",
  "braceright",
  "asciitilde",
  "Adieresis",
  "Aring",
  "Ccedilla",
  "Eacute",
  "Ntilde",
  "Odieresis",
  "Udieresis",
  "aacute",
  "agrave",
  "acircumflex",
  "adieresis",
  "atilde",
  "aring",
  "ccedilla",
  "eacute",
  "egrave",
  "ecircumflex",
  "edieresis",
  "iacute",
  "igrave",
  "icircumflex",
  "idieresis",
  "ntilde",
  "oacute",
  "ograve",
  "ocircumflex",
  "odieresis",
  "otilde",
  "uacute",
  "ugrave",
  "ucircumflex",
  "udieresis",
  "dagger",
  "degree",
  "cent",
  "sterling",
  "section",
  "bullet",
  "paragraph",
  "germandbls",
  "registered",
  "copyright",
  "trademark",
  "acute",
  "dieresis",
  "notequal",
  "AE",
  "Oslash",
  "infinity",
  "plusminus",
  "lessequal",
  "greaterequal",
  "yen",
  "mu",
  "partialdiff",
  "summation",
  "product",
  "pi",
  "integral",
  "ordfeminine",
  "ordmasculine",
  "Omega",
  "ae",
  "oslash",
  "questiondown",
  "exclamdown",
  "logicalnot",
  "radical",
  "florin",
  "approxequal",
  "Delta",
  "guillemotleft",
  "guillemotright",
  "ellipsis",
  "nonbreakingspace",
  "Agrave",
  "Atilde",
  "Otilde",
  "OE",
  "oe",
  "endash",
  "emdash",
  "quotedblleft",
  "quotedblright",
  "quoteleft",
  "quoteright",
  "divide",
  "lozenge",
  "ydieresis",
  "Ydieresis",
  "fraction",
  "currency",
  "guilsinglleft",
  "guilsinglright",
  "fi",
  "fl",
  "daggerdbl",
  "periodcentered",
  "quotesinglbase",
  "quotedblbase",
  "perthousand",
  "Acircumflex",
  "Ecircumflex",
  "Aacute",
  "Edieresis",
  "Egrave",
  "Iacute",
  "Icircumflex",
  "Idieresis",
  "Igrave",
  "Oacute",
  "Ocircumflex",
  "apple",
  "Ograve",
  "Uacute",
  "Ucircumflex",
  "Ugrave",
  "dotlessi",
  "circumflex",
  "tilde",
  "macron",
  "breve",
  "dotaccent",
  "ring",
  "cedilla",
  "hungarumlaut",
  "ogonek",
  "caron",
  "Lslash",
  "lslash",
  "Scaron",
  "scaron",
  "Zcaron",
  "zcaron",
  "brokenbar",
  "Eth",
  "eth",
  "Yacute",
  "yacute",
  "Thorn",
  "thorn",
  "minus",
  "multiply",
  "onesuperior",
  "twosuperior",
  "threesuperior",
  "onehalf",
  "onequarter",
  "threequarters",
  "franc",
  "Gbreve",
  "gbreve",
  "Idotaccent",
  "Scedilla",
  "scedilla",
  "Cacute",
  "cacute",
  "Ccaron",
  "ccaron",
  "dcroat"
];
function DefaultEncoding(font) {
  this.font = font;
}
DefaultEncoding.prototype.charToGlyphIndex = function(c) {
  var code = c.codePointAt(0);
  var glyphs = this.font.glyphs;
  if (glyphs) {
    for (var i = 0; i < glyphs.length; i += 1) {
      var glyph = glyphs.get(i);
      for (var j = 0; j < glyph.unicodes.length; j += 1) {
        if (glyph.unicodes[j] === code) {
          return i;
        }
      }
    }
  }
  return null;
};
function CmapEncoding(cmap2) {
  this.cmap = cmap2;
}
CmapEncoding.prototype.charToGlyphIndex = function(c) {
  return this.cmap.glyphIndexMap[c.codePointAt(0)] || 0;
};
function CffEncoding(encoding, charset) {
  this.encoding = encoding;
  this.charset = charset;
}
CffEncoding.prototype.charToGlyphIndex = function(s) {
  var code = s.codePointAt(0);
  var charName = this.encoding[code];
  return this.charset.indexOf(charName);
};
function GlyphNames(post2) {
  switch (post2.version) {
    case 1:
      this.names = standardNames.slice();
      break;
    case 2:
      this.names = new Array(post2.numberOfGlyphs);
      for (var i = 0; i < post2.numberOfGlyphs; i++) {
        if (post2.glyphNameIndex[i] < standardNames.length) {
          this.names[i] = standardNames[post2.glyphNameIndex[i]];
        } else {
          this.names[i] = post2.names[post2.glyphNameIndex[i] - standardNames.length];
        }
      }
      break;
    case 2.5:
      this.names = new Array(post2.numberOfGlyphs);
      for (var i$1 = 0; i$1 < post2.numberOfGlyphs; i$1++) {
        this.names[i$1] = standardNames[i$1 + post2.glyphNameIndex[i$1]];
      }
      break;
    case 3:
      this.names = [];
      break;
    default:
      this.names = [];
      break;
  }
}
GlyphNames.prototype.nameToGlyphIndex = function(name) {
  return this.names.indexOf(name);
};
GlyphNames.prototype.glyphIndexToName = function(gid) {
  return this.names[gid];
};
function addGlyphNamesAll(font) {
  var glyph;
  var glyphIndexMap = font.tables.cmap.glyphIndexMap;
  var charCodes = Object.keys(glyphIndexMap);
  for (var i = 0; i < charCodes.length; i += 1) {
    var c = charCodes[i];
    var glyphIndex = glyphIndexMap[c];
    glyph = font.glyphs.get(glyphIndex);
    glyph.addUnicode(parseInt(c));
  }
  for (var i$1 = 0; i$1 < font.glyphs.length; i$1 += 1) {
    glyph = font.glyphs.get(i$1);
    if (font.cffEncoding) {
      if (font.isCIDFont) {
        glyph.name = "gid" + i$1;
      } else {
        glyph.name = font.cffEncoding.charset[i$1];
      }
    } else if (font.glyphNames.names) {
      glyph.name = font.glyphNames.glyphIndexToName(i$1);
    }
  }
}
function addGlyphNamesToUnicodeMap(font) {
  font._IndexToUnicodeMap = {};
  var glyphIndexMap = font.tables.cmap.glyphIndexMap;
  var charCodes = Object.keys(glyphIndexMap);
  for (var i = 0; i < charCodes.length; i += 1) {
    var c = charCodes[i];
    var glyphIndex = glyphIndexMap[c];
    if (font._IndexToUnicodeMap[glyphIndex] === void 0) {
      font._IndexToUnicodeMap[glyphIndex] = {
        unicodes: [parseInt(c)]
      };
    } else {
      font._IndexToUnicodeMap[glyphIndex].unicodes.push(parseInt(c));
    }
  }
}
function addGlyphNames(font, opt) {
  if (opt.lowMemory) {
    addGlyphNamesToUnicodeMap(font);
  } else {
    addGlyphNamesAll(font);
  }
}
function line(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
var draw = { line };
function getPathDefinition(glyph, path) {
  var _path = path || new Path();
  return {
    configurable: true,
    get: function() {
      if (typeof _path === "function") {
        _path = _path();
      }
      return _path;
    },
    set: function(p) {
      _path = p;
    }
  };
}
function Glyph(options) {
  this.bindConstructorValues(options);
}
Glyph.prototype.bindConstructorValues = function(options) {
  this.index = options.index || 0;
  this.name = options.name || null;
  this.unicode = options.unicode || void 0;
  this.unicodes = options.unicodes || options.unicode !== void 0 ? [options.unicode] : [];
  if ("xMin" in options) {
    this.xMin = options.xMin;
  }
  if ("yMin" in options) {
    this.yMin = options.yMin;
  }
  if ("xMax" in options) {
    this.xMax = options.xMax;
  }
  if ("yMax" in options) {
    this.yMax = options.yMax;
  }
  if ("advanceWidth" in options) {
    this.advanceWidth = options.advanceWidth;
  }
  Object.defineProperty(this, "path", getPathDefinition(this, options.path));
};
Glyph.prototype.addUnicode = function(unicode) {
  if (this.unicodes.length === 0) {
    this.unicode = unicode;
  }
  this.unicodes.push(unicode);
};
Glyph.prototype.getBoundingBox = function() {
  return this.path.getBoundingBox();
};
Glyph.prototype.getPath = function(x, y, fontSize, options, font) {
  x = x !== void 0 ? x : 0;
  y = y !== void 0 ? y : 0;
  fontSize = fontSize !== void 0 ? fontSize : 72;
  var commands;
  var hPoints;
  if (!options) {
    options = {};
  }
  var xScale = options.xScale;
  var yScale = options.yScale;
  if (options.hinting && font && font.hinting) {
    hPoints = this.path && font.hinting.exec(this, fontSize);
  }
  if (hPoints) {
    commands = font.hinting.getCommands(hPoints);
    x = Math.round(x);
    y = Math.round(y);
    xScale = yScale = 1;
  } else {
    commands = this.path.commands;
    var scale = 1 / (this.path.unitsPerEm || 1e3) * fontSize;
    if (xScale === void 0) {
      xScale = scale;
    }
    if (yScale === void 0) {
      yScale = scale;
    }
  }
  var p = new Path();
  for (var i = 0; i < commands.length; i += 1) {
    var cmd = commands[i];
    if (cmd.type === "M") {
      p.moveTo(x + cmd.x * xScale, y + -cmd.y * yScale);
    } else if (cmd.type === "L") {
      p.lineTo(x + cmd.x * xScale, y + -cmd.y * yScale);
    } else if (cmd.type === "Q") {
      p.quadraticCurveTo(
        x + cmd.x1 * xScale,
        y + -cmd.y1 * yScale,
        x + cmd.x * xScale,
        y + -cmd.y * yScale
      );
    } else if (cmd.type === "C") {
      p.curveTo(
        x + cmd.x1 * xScale,
        y + -cmd.y1 * yScale,
        x + cmd.x2 * xScale,
        y + -cmd.y2 * yScale,
        x + cmd.x * xScale,
        y + -cmd.y * yScale
      );
    } else if (cmd.type === "Z") {
      p.closePath();
    }
  }
  return p;
};
Glyph.prototype.getContours = function() {
  if (this.points === void 0) {
    return [];
  }
  var contours = [];
  var currentContour = [];
  for (var i = 0; i < this.points.length; i += 1) {
    var pt = this.points[i];
    currentContour.push(pt);
    if (pt.lastPointOfContour) {
      contours.push(currentContour);
      currentContour = [];
    }
  }
  check.argument(currentContour.length === 0, "There are still points left in the current contour.");
  return contours;
};
Glyph.prototype.getMetrics = function() {
  var commands = this.path.commands;
  var xCoords = [];
  var yCoords = [];
  for (var i = 0; i < commands.length; i += 1) {
    var cmd = commands[i];
    if (cmd.type !== "Z") {
      xCoords.push(cmd.x);
      yCoords.push(cmd.y);
    }
    if (cmd.type === "Q" || cmd.type === "C") {
      xCoords.push(cmd.x1);
      yCoords.push(cmd.y1);
    }
    if (cmd.type === "C") {
      xCoords.push(cmd.x2);
      yCoords.push(cmd.y2);
    }
  }
  var metrics = {
    xMin: Math.min.apply(null, xCoords),
    yMin: Math.min.apply(null, yCoords),
    xMax: Math.max.apply(null, xCoords),
    yMax: Math.max.apply(null, yCoords),
    leftSideBearing: this.leftSideBearing
  };
  if (!isFinite(metrics.xMin)) {
    metrics.xMin = 0;
  }
  if (!isFinite(metrics.xMax)) {
    metrics.xMax = this.advanceWidth;
  }
  if (!isFinite(metrics.yMin)) {
    metrics.yMin = 0;
  }
  if (!isFinite(metrics.yMax)) {
    metrics.yMax = 0;
  }
  metrics.rightSideBearing = this.advanceWidth - metrics.leftSideBearing - (metrics.xMax - metrics.xMin);
  return metrics;
};
Glyph.prototype.draw = function(ctx, x, y, fontSize, options) {
  this.getPath(x, y, fontSize, options).draw(ctx);
};
Glyph.prototype.drawPoints = function(ctx, x, y, fontSize) {
  function drawCircles(l, x2, y2, scale2) {
    ctx.beginPath();
    for (var j = 0; j < l.length; j += 1) {
      ctx.moveTo(x2 + l[j].x * scale2, y2 + l[j].y * scale2);
      ctx.arc(x2 + l[j].x * scale2, y2 + l[j].y * scale2, 2, 0, Math.PI * 2, false);
    }
    ctx.closePath();
    ctx.fill();
  }
  x = x !== void 0 ? x : 0;
  y = y !== void 0 ? y : 0;
  fontSize = fontSize !== void 0 ? fontSize : 24;
  var scale = 1 / this.path.unitsPerEm * fontSize;
  var blueCircles = [];
  var redCircles = [];
  var path = this.path;
  for (var i = 0; i < path.commands.length; i += 1) {
    var cmd = path.commands[i];
    if (cmd.x !== void 0) {
      blueCircles.push({ x: cmd.x, y: -cmd.y });
    }
    if (cmd.x1 !== void 0) {
      redCircles.push({ x: cmd.x1, y: -cmd.y1 });
    }
    if (cmd.x2 !== void 0) {
      redCircles.push({ x: cmd.x2, y: -cmd.y2 });
    }
  }
  ctx.fillStyle = "blue";
  drawCircles(blueCircles, x, y, scale);
  ctx.fillStyle = "red";
  drawCircles(redCircles, x, y, scale);
};
Glyph.prototype.drawMetrics = function(ctx, x, y, fontSize) {
  var scale;
  x = x !== void 0 ? x : 0;
  y = y !== void 0 ? y : 0;
  fontSize = fontSize !== void 0 ? fontSize : 24;
  scale = 1 / this.path.unitsPerEm * fontSize;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  draw.line(ctx, x, -1e4, x, 1e4);
  draw.line(ctx, -1e4, y, 1e4, y);
  var xMin = this.xMin || 0;
  var yMin = this.yMin || 0;
  var xMax = this.xMax || 0;
  var yMax = this.yMax || 0;
  var advanceWidth = this.advanceWidth || 0;
  ctx.strokeStyle = "blue";
  draw.line(ctx, x + xMin * scale, -1e4, x + xMin * scale, 1e4);
  draw.line(ctx, x + xMax * scale, -1e4, x + xMax * scale, 1e4);
  draw.line(ctx, -1e4, y + -yMin * scale, 1e4, y + -yMin * scale);
  draw.line(ctx, -1e4, y + -yMax * scale, 1e4, y + -yMax * scale);
  ctx.strokeStyle = "green";
  draw.line(ctx, x + advanceWidth * scale, -1e4, x + advanceWidth * scale, 1e4);
};
function defineDependentProperty(glyph, externalName, internalName) {
  Object.defineProperty(glyph, externalName, {
    get: function() {
      glyph.path;
      return glyph[internalName];
    },
    set: function(newValue) {
      glyph[internalName] = newValue;
    },
    enumerable: true,
    configurable: true
  });
}
function GlyphSet(font, glyphs) {
  this.font = font;
  this.glyphs = {};
  if (Array.isArray(glyphs)) {
    for (var i = 0; i < glyphs.length; i++) {
      var glyph = glyphs[i];
      glyph.path.unitsPerEm = font.unitsPerEm;
      this.glyphs[i] = glyph;
    }
  }
  this.length = glyphs && glyphs.length || 0;
}
GlyphSet.prototype.get = function(index) {
  if (this.glyphs[index] === void 0) {
    this.font._push(index);
    if (typeof this.glyphs[index] === "function") {
      this.glyphs[index] = this.glyphs[index]();
    }
    var glyph = this.glyphs[index];
    var unicodeObj = this.font._IndexToUnicodeMap[index];
    if (unicodeObj) {
      for (var j = 0; j < unicodeObj.unicodes.length; j++) {
        glyph.addUnicode(unicodeObj.unicodes[j]);
      }
    }
    if (this.font.cffEncoding) {
      if (this.font.isCIDFont) {
        glyph.name = "gid" + index;
      } else {
        glyph.name = this.font.cffEncoding.charset[index];
      }
    } else if (this.font.glyphNames.names) {
      glyph.name = this.font.glyphNames.glyphIndexToName(index);
    }
    this.glyphs[index].advanceWidth = this.font._hmtxTableData[index].advanceWidth;
    this.glyphs[index].leftSideBearing = this.font._hmtxTableData[index].leftSideBearing;
  } else {
    if (typeof this.glyphs[index] === "function") {
      this.glyphs[index] = this.glyphs[index]();
    }
  }
  return this.glyphs[index];
};
GlyphSet.prototype.push = function(index, loader) {
  this.glyphs[index] = loader;
  this.length++;
};
function glyphLoader(font, index) {
  return new Glyph({ index, font });
}
function ttfGlyphLoader(font, index, parseGlyph2, data, position, buildPath2) {
  return function() {
    var glyph = new Glyph({ index, font });
    glyph.path = function() {
      parseGlyph2(glyph, data, position);
      var path = buildPath2(font.glyphs, glyph);
      path.unitsPerEm = font.unitsPerEm;
      return path;
    };
    defineDependentProperty(glyph, "xMin", "_xMin");
    defineDependentProperty(glyph, "xMax", "_xMax");
    defineDependentProperty(glyph, "yMin", "_yMin");
    defineDependentProperty(glyph, "yMax", "_yMax");
    return glyph;
  };
}
function cffGlyphLoader(font, index, parseCFFCharstring2, charstring) {
  return function() {
    var glyph = new Glyph({ index, font });
    glyph.path = function() {
      var path = parseCFFCharstring2(font, glyph, charstring);
      path.unitsPerEm = font.unitsPerEm;
      return path;
    };
    return glyph;
  };
}
var glyphset = { GlyphSet, glyphLoader, ttfGlyphLoader, cffGlyphLoader };
function equals(a, b) {
  if (a === b) {
    return true;
  } else if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (var i = 0; i < a.length; i += 1) {
      if (!equals(a[i], b[i])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
function calcCFFSubroutineBias(subrs) {
  var bias;
  if (subrs.length < 1240) {
    bias = 107;
  } else if (subrs.length < 33900) {
    bias = 1131;
  } else {
    bias = 32768;
  }
  return bias;
}
function parseCFFIndex(data, start, conversionFn) {
  var offsets = [];
  var objects = [];
  var count = parse.getCard16(data, start);
  var objectOffset;
  var endOffset;
  if (count !== 0) {
    var offsetSize = parse.getByte(data, start + 2);
    objectOffset = start + (count + 1) * offsetSize + 2;
    var pos = start + 3;
    for (var i = 0; i < count + 1; i += 1) {
      offsets.push(parse.getOffset(data, pos, offsetSize));
      pos += offsetSize;
    }
    endOffset = objectOffset + offsets[count];
  } else {
    endOffset = start + 2;
  }
  for (var i$1 = 0; i$1 < offsets.length - 1; i$1 += 1) {
    var value = parse.getBytes(data, objectOffset + offsets[i$1], objectOffset + offsets[i$1 + 1]);
    if (conversionFn) {
      value = conversionFn(value);
    }
    objects.push(value);
  }
  return { objects, startOffset: start, endOffset };
}
function parseCFFIndexLowMemory(data, start) {
  var offsets = [];
  var count = parse.getCard16(data, start);
  var objectOffset;
  var endOffset;
  if (count !== 0) {
    var offsetSize = parse.getByte(data, start + 2);
    objectOffset = start + (count + 1) * offsetSize + 2;
    var pos = start + 3;
    for (var i = 0; i < count + 1; i += 1) {
      offsets.push(parse.getOffset(data, pos, offsetSize));
      pos += offsetSize;
    }
    endOffset = objectOffset + offsets[count];
  } else {
    endOffset = start + 2;
  }
  return { offsets, startOffset: start, endOffset };
}
function getCffIndexObject(i, offsets, data, start, conversionFn) {
  var count = parse.getCard16(data, start);
  var objectOffset = 0;
  if (count !== 0) {
    var offsetSize = parse.getByte(data, start + 2);
    objectOffset = start + (count + 1) * offsetSize + 2;
  }
  var value = parse.getBytes(data, objectOffset + offsets[i], objectOffset + offsets[i + 1]);
  if (conversionFn) {
    value = conversionFn(value);
  }
  return value;
}
function parseFloatOperand(parser) {
  var s = "";
  var eof = 15;
  var lookup = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "E", "E-", null, "-"];
  while (true) {
    var b = parser.parseByte();
    var n1 = b >> 4;
    var n2 = b & 15;
    if (n1 === eof) {
      break;
    }
    s += lookup[n1];
    if (n2 === eof) {
      break;
    }
    s += lookup[n2];
  }
  return parseFloat(s);
}
function parseOperand(parser, b0) {
  var b1;
  var b2;
  var b3;
  var b4;
  if (b0 === 28) {
    b1 = parser.parseByte();
    b2 = parser.parseByte();
    return b1 << 8 | b2;
  }
  if (b0 === 29) {
    b1 = parser.parseByte();
    b2 = parser.parseByte();
    b3 = parser.parseByte();
    b4 = parser.parseByte();
    return b1 << 24 | b2 << 16 | b3 << 8 | b4;
  }
  if (b0 === 30) {
    return parseFloatOperand(parser);
  }
  if (b0 >= 32 && b0 <= 246) {
    return b0 - 139;
  }
  if (b0 >= 247 && b0 <= 250) {
    b1 = parser.parseByte();
    return (b0 - 247) * 256 + b1 + 108;
  }
  if (b0 >= 251 && b0 <= 254) {
    b1 = parser.parseByte();
    return -(b0 - 251) * 256 - b1 - 108;
  }
  throw new Error("Invalid b0 " + b0);
}
function entriesToObject(entries) {
  var o = {};
  for (var i = 0; i < entries.length; i += 1) {
    var key = entries[i][0];
    var values = entries[i][1];
    var value = void 0;
    if (values.length === 1) {
      value = values[0];
    } else {
      value = values;
    }
    if (o.hasOwnProperty(key) && !isNaN(o[key])) {
      throw new Error("Object " + o + " already has key " + key);
    }
    o[key] = value;
  }
  return o;
}
function parseCFFDict(data, start, size) {
  start = start !== void 0 ? start : 0;
  var parser = new parse.Parser(data, start);
  var entries = [];
  var operands = [];
  size = size !== void 0 ? size : data.length;
  while (parser.relativeOffset < size) {
    var op = parser.parseByte();
    if (op <= 21) {
      if (op === 12) {
        op = 1200 + parser.parseByte();
      }
      entries.push([op, operands]);
      operands = [];
    } else {
      operands.push(parseOperand(parser, op));
    }
  }
  return entriesToObject(entries);
}
function getCFFString(strings, index) {
  if (index <= 390) {
    index = cffStandardStrings[index];
  } else {
    index = strings[index - 391];
  }
  return index;
}
function interpretDict(dict, meta2, strings) {
  var newDict = {};
  var value;
  for (var i = 0; i < meta2.length; i += 1) {
    var m = meta2[i];
    if (Array.isArray(m.type)) {
      var values = [];
      values.length = m.type.length;
      for (var j = 0; j < m.type.length; j++) {
        value = dict[m.op] !== void 0 ? dict[m.op][j] : void 0;
        if (value === void 0) {
          value = m.value !== void 0 && m.value[j] !== void 0 ? m.value[j] : null;
        }
        if (m.type[j] === "SID") {
          value = getCFFString(strings, value);
        }
        values[j] = value;
      }
      newDict[m.name] = values;
    } else {
      value = dict[m.op];
      if (value === void 0) {
        value = m.value !== void 0 ? m.value : null;
      }
      if (m.type === "SID") {
        value = getCFFString(strings, value);
      }
      newDict[m.name] = value;
    }
  }
  return newDict;
}
function parseCFFHeader(data, start) {
  var header = {};
  header.formatMajor = parse.getCard8(data, start);
  header.formatMinor = parse.getCard8(data, start + 1);
  header.size = parse.getCard8(data, start + 2);
  header.offsetSize = parse.getCard8(data, start + 3);
  header.startOffset = start;
  header.endOffset = start + 4;
  return header;
}
var TOP_DICT_META = [
  { name: "version", op: 0, type: "SID" },
  { name: "notice", op: 1, type: "SID" },
  { name: "copyright", op: 1200, type: "SID" },
  { name: "fullName", op: 2, type: "SID" },
  { name: "familyName", op: 3, type: "SID" },
  { name: "weight", op: 4, type: "SID" },
  { name: "isFixedPitch", op: 1201, type: "number", value: 0 },
  { name: "italicAngle", op: 1202, type: "number", value: 0 },
  { name: "underlinePosition", op: 1203, type: "number", value: -100 },
  { name: "underlineThickness", op: 1204, type: "number", value: 50 },
  { name: "paintType", op: 1205, type: "number", value: 0 },
  { name: "charstringType", op: 1206, type: "number", value: 2 },
  {
    name: "fontMatrix",
    op: 1207,
    type: ["real", "real", "real", "real", "real", "real"],
    value: [1e-3, 0, 0, 1e-3, 0, 0]
  },
  { name: "uniqueId", op: 13, type: "number" },
  { name: "fontBBox", op: 5, type: ["number", "number", "number", "number"], value: [0, 0, 0, 0] },
  { name: "strokeWidth", op: 1208, type: "number", value: 0 },
  { name: "xuid", op: 14, type: [], value: null },
  { name: "charset", op: 15, type: "offset", value: 0 },
  { name: "encoding", op: 16, type: "offset", value: 0 },
  { name: "charStrings", op: 17, type: "offset", value: 0 },
  { name: "private", op: 18, type: ["number", "offset"], value: [0, 0] },
  { name: "ros", op: 1230, type: ["SID", "SID", "number"] },
  { name: "cidFontVersion", op: 1231, type: "number", value: 0 },
  { name: "cidFontRevision", op: 1232, type: "number", value: 0 },
  { name: "cidFontType", op: 1233, type: "number", value: 0 },
  { name: "cidCount", op: 1234, type: "number", value: 8720 },
  { name: "uidBase", op: 1235, type: "number" },
  { name: "fdArray", op: 1236, type: "offset" },
  { name: "fdSelect", op: 1237, type: "offset" },
  { name: "fontName", op: 1238, type: "SID" }
];
var PRIVATE_DICT_META = [
  { name: "subrs", op: 19, type: "offset", value: 0 },
  { name: "defaultWidthX", op: 20, type: "number", value: 0 },
  { name: "nominalWidthX", op: 21, type: "number", value: 0 }
];
function parseCFFTopDict(data, strings) {
  var dict = parseCFFDict(data, 0, data.byteLength);
  return interpretDict(dict, TOP_DICT_META, strings);
}
function parseCFFPrivateDict(data, start, size, strings) {
  var dict = parseCFFDict(data, start, size);
  return interpretDict(dict, PRIVATE_DICT_META, strings);
}
function gatherCFFTopDicts(data, start, cffIndex, strings) {
  var topDictArray = [];
  for (var iTopDict = 0; iTopDict < cffIndex.length; iTopDict += 1) {
    var topDictData = new DataView(new Uint8Array(cffIndex[iTopDict]).buffer);
    var topDict = parseCFFTopDict(topDictData, strings);
    topDict._subrs = [];
    topDict._subrsBias = 0;
    topDict._defaultWidthX = 0;
    topDict._nominalWidthX = 0;
    var privateSize = topDict.private[0];
    var privateOffset = topDict.private[1];
    if (privateSize !== 0 && privateOffset !== 0) {
      var privateDict = parseCFFPrivateDict(data, privateOffset + start, privateSize, strings);
      topDict._defaultWidthX = privateDict.defaultWidthX;
      topDict._nominalWidthX = privateDict.nominalWidthX;
      if (privateDict.subrs !== 0) {
        var subrOffset = privateOffset + privateDict.subrs;
        var subrIndex = parseCFFIndex(data, subrOffset + start);
        topDict._subrs = subrIndex.objects;
        topDict._subrsBias = calcCFFSubroutineBias(topDict._subrs);
      }
      topDict._privateDict = privateDict;
    }
    topDictArray.push(topDict);
  }
  return topDictArray;
}
function parseCFFCharset(data, start, nGlyphs, strings) {
  var sid;
  var count;
  var parser = new parse.Parser(data, start);
  nGlyphs -= 1;
  var charset = [".notdef"];
  var format = parser.parseCard8();
  if (format === 0) {
    for (var i = 0; i < nGlyphs; i += 1) {
      sid = parser.parseSID();
      charset.push(getCFFString(strings, sid));
    }
  } else if (format === 1) {
    while (charset.length <= nGlyphs) {
      sid = parser.parseSID();
      count = parser.parseCard8();
      for (var i$1 = 0; i$1 <= count; i$1 += 1) {
        charset.push(getCFFString(strings, sid));
        sid += 1;
      }
    }
  } else if (format === 2) {
    while (charset.length <= nGlyphs) {
      sid = parser.parseSID();
      count = parser.parseCard16();
      for (var i$2 = 0; i$2 <= count; i$2 += 1) {
        charset.push(getCFFString(strings, sid));
        sid += 1;
      }
    }
  } else {
    throw new Error("Unknown charset format " + format);
  }
  return charset;
}
function parseCFFEncoding(data, start, charset) {
  var code;
  var enc = {};
  var parser = new parse.Parser(data, start);
  var format = parser.parseCard8();
  if (format === 0) {
    var nCodes = parser.parseCard8();
    for (var i = 0; i < nCodes; i += 1) {
      code = parser.parseCard8();
      enc[code] = i;
    }
  } else if (format === 1) {
    var nRanges = parser.parseCard8();
    code = 1;
    for (var i$1 = 0; i$1 < nRanges; i$1 += 1) {
      var first = parser.parseCard8();
      var nLeft = parser.parseCard8();
      for (var j = first; j <= first + nLeft; j += 1) {
        enc[j] = code;
        code += 1;
      }
    }
  } else {
    throw new Error("Unknown encoding format " + format);
  }
  return new CffEncoding(enc, charset);
}
function parseCFFCharstring(font, glyph, code) {
  var c1x;
  var c1y;
  var c2x;
  var c2y;
  var p = new Path();
  var stack = [];
  var nStems = 0;
  var haveWidth = false;
  var open = false;
  var x = 0;
  var y = 0;
  var subrs;
  var subrsBias;
  var defaultWidthX;
  var nominalWidthX;
  if (font.isCIDFont) {
    var fdIndex = font.tables.cff.topDict._fdSelect[glyph.index];
    var fdDict = font.tables.cff.topDict._fdArray[fdIndex];
    subrs = fdDict._subrs;
    subrsBias = fdDict._subrsBias;
    defaultWidthX = fdDict._defaultWidthX;
    nominalWidthX = fdDict._nominalWidthX;
  } else {
    subrs = font.tables.cff.topDict._subrs;
    subrsBias = font.tables.cff.topDict._subrsBias;
    defaultWidthX = font.tables.cff.topDict._defaultWidthX;
    nominalWidthX = font.tables.cff.topDict._nominalWidthX;
  }
  var width = defaultWidthX;
  function newContour(x2, y2) {
    if (open) {
      p.closePath();
    }
    p.moveTo(x2, y2);
    open = true;
  }
  function parseStems() {
    var hasWidthArg;
    hasWidthArg = stack.length % 2 !== 0;
    if (hasWidthArg && !haveWidth) {
      width = stack.shift() + nominalWidthX;
    }
    nStems += stack.length >> 1;
    stack.length = 0;
    haveWidth = true;
  }
  function parse2(code2) {
    var b1;
    var b2;
    var b3;
    var b4;
    var codeIndex;
    var subrCode;
    var jpx;
    var jpy;
    var c3x;
    var c3y;
    var c4x;
    var c4y;
    var i = 0;
    while (i < code2.length) {
      var v = code2[i];
      i += 1;
      switch (v) {
        case 1:
          parseStems();
          break;
        case 3:
          parseStems();
          break;
        case 4:
          if (stack.length > 1 && !haveWidth) {
            width = stack.shift() + nominalWidthX;
            haveWidth = true;
          }
          y += stack.pop();
          newContour(x, y);
          break;
        case 5:
          while (stack.length > 0) {
            x += stack.shift();
            y += stack.shift();
            p.lineTo(x, y);
          }
          break;
        case 6:
          while (stack.length > 0) {
            x += stack.shift();
            p.lineTo(x, y);
            if (stack.length === 0) {
              break;
            }
            y += stack.shift();
            p.lineTo(x, y);
          }
          break;
        case 7:
          while (stack.length > 0) {
            y += stack.shift();
            p.lineTo(x, y);
            if (stack.length === 0) {
              break;
            }
            x += stack.shift();
            p.lineTo(x, y);
          }
          break;
        case 8:
          while (stack.length > 0) {
            c1x = x + stack.shift();
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x = c2x + stack.shift();
            y = c2y + stack.shift();
            p.curveTo(c1x, c1y, c2x, c2y, x, y);
          }
          break;
        case 10:
          codeIndex = stack.pop() + subrsBias;
          subrCode = subrs[codeIndex];
          if (subrCode) {
            parse2(subrCode);
          }
          break;
        case 11:
          return;
        case 12:
          v = code2[i];
          i += 1;
          switch (v) {
            case 35:
              c1x = x + stack.shift();
              c1y = y + stack.shift();
              c2x = c1x + stack.shift();
              c2y = c1y + stack.shift();
              jpx = c2x + stack.shift();
              jpy = c2y + stack.shift();
              c3x = jpx + stack.shift();
              c3y = jpy + stack.shift();
              c4x = c3x + stack.shift();
              c4y = c3y + stack.shift();
              x = c4x + stack.shift();
              y = c4y + stack.shift();
              stack.shift();
              p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
              p.curveTo(c3x, c3y, c4x, c4y, x, y);
              break;
            case 34:
              c1x = x + stack.shift();
              c1y = y;
              c2x = c1x + stack.shift();
              c2y = c1y + stack.shift();
              jpx = c2x + stack.shift();
              jpy = c2y;
              c3x = jpx + stack.shift();
              c3y = c2y;
              c4x = c3x + stack.shift();
              c4y = y;
              x = c4x + stack.shift();
              p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
              p.curveTo(c3x, c3y, c4x, c4y, x, y);
              break;
            case 36:
              c1x = x + stack.shift();
              c1y = y + stack.shift();
              c2x = c1x + stack.shift();
              c2y = c1y + stack.shift();
              jpx = c2x + stack.shift();
              jpy = c2y;
              c3x = jpx + stack.shift();
              c3y = c2y;
              c4x = c3x + stack.shift();
              c4y = c3y + stack.shift();
              x = c4x + stack.shift();
              p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
              p.curveTo(c3x, c3y, c4x, c4y, x, y);
              break;
            case 37:
              c1x = x + stack.shift();
              c1y = y + stack.shift();
              c2x = c1x + stack.shift();
              c2y = c1y + stack.shift();
              jpx = c2x + stack.shift();
              jpy = c2y + stack.shift();
              c3x = jpx + stack.shift();
              c3y = jpy + stack.shift();
              c4x = c3x + stack.shift();
              c4y = c3y + stack.shift();
              if (Math.abs(c4x - x) > Math.abs(c4y - y)) {
                x = c4x + stack.shift();
              } else {
                y = c4y + stack.shift();
              }
              p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
              p.curveTo(c3x, c3y, c4x, c4y, x, y);
              break;
            default:
              console.log("Glyph " + glyph.index + ": unknown operator 1200" + v);
              stack.length = 0;
          }
          break;
        case 14:
          if (stack.length > 0 && !haveWidth) {
            width = stack.shift() + nominalWidthX;
            haveWidth = true;
          }
          if (open) {
            p.closePath();
            open = false;
          }
          break;
        case 18:
          parseStems();
          break;
        case 19:
        case 20:
          parseStems();
          i += nStems + 7 >> 3;
          break;
        case 21:
          if (stack.length > 2 && !haveWidth) {
            width = stack.shift() + nominalWidthX;
            haveWidth = true;
          }
          y += stack.pop();
          x += stack.pop();
          newContour(x, y);
          break;
        case 22:
          if (stack.length > 1 && !haveWidth) {
            width = stack.shift() + nominalWidthX;
            haveWidth = true;
          }
          x += stack.pop();
          newContour(x, y);
          break;
        case 23:
          parseStems();
          break;
        case 24:
          while (stack.length > 2) {
            c1x = x + stack.shift();
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x = c2x + stack.shift();
            y = c2y + stack.shift();
            p.curveTo(c1x, c1y, c2x, c2y, x, y);
          }
          x += stack.shift();
          y += stack.shift();
          p.lineTo(x, y);
          break;
        case 25:
          while (stack.length > 6) {
            x += stack.shift();
            y += stack.shift();
            p.lineTo(x, y);
          }
          c1x = x + stack.shift();
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          x = c2x + stack.shift();
          y = c2y + stack.shift();
          p.curveTo(c1x, c1y, c2x, c2y, x, y);
          break;
        case 26:
          if (stack.length % 2) {
            x += stack.shift();
          }
          while (stack.length > 0) {
            c1x = x;
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x = c2x;
            y = c2y + stack.shift();
            p.curveTo(c1x, c1y, c2x, c2y, x, y);
          }
          break;
        case 27:
          if (stack.length % 2) {
            y += stack.shift();
          }
          while (stack.length > 0) {
            c1x = x + stack.shift();
            c1y = y;
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x = c2x + stack.shift();
            y = c2y;
            p.curveTo(c1x, c1y, c2x, c2y, x, y);
          }
          break;
        case 28:
          b1 = code2[i];
          b2 = code2[i + 1];
          stack.push((b1 << 24 | b2 << 16) >> 16);
          i += 2;
          break;
        case 29:
          codeIndex = stack.pop() + font.gsubrsBias;
          subrCode = font.gsubrs[codeIndex];
          if (subrCode) {
            parse2(subrCode);
          }
          break;
        case 30:
          while (stack.length > 0) {
            c1x = x;
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x = c2x + stack.shift();
            y = c2y + (stack.length === 1 ? stack.shift() : 0);
            p.curveTo(c1x, c1y, c2x, c2y, x, y);
            if (stack.length === 0) {
              break;
            }
            c1x = x + stack.shift();
            c1y = y;
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            y = c2y + stack.shift();
            x = c2x + (stack.length === 1 ? stack.shift() : 0);
            p.curveTo(c1x, c1y, c2x, c2y, x, y);
          }
          break;
        case 31:
          while (stack.length > 0) {
            c1x = x + stack.shift();
            c1y = y;
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            y = c2y + stack.shift();
            x = c2x + (stack.length === 1 ? stack.shift() : 0);
            p.curveTo(c1x, c1y, c2x, c2y, x, y);
            if (stack.length === 0) {
              break;
            }
            c1x = x;
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x = c2x + stack.shift();
            y = c2y + (stack.length === 1 ? stack.shift() : 0);
            p.curveTo(c1x, c1y, c2x, c2y, x, y);
          }
          break;
        default:
          if (v < 32) {
            console.log("Glyph " + glyph.index + ": unknown operator " + v);
          } else if (v < 247) {
            stack.push(v - 139);
          } else if (v < 251) {
            b1 = code2[i];
            i += 1;
            stack.push((v - 247) * 256 + b1 + 108);
          } else if (v < 255) {
            b1 = code2[i];
            i += 1;
            stack.push(-(v - 251) * 256 - b1 - 108);
          } else {
            b1 = code2[i];
            b2 = code2[i + 1];
            b3 = code2[i + 2];
            b4 = code2[i + 3];
            i += 4;
            stack.push((b1 << 24 | b2 << 16 | b3 << 8 | b4) / 65536);
          }
      }
    }
  }
  parse2(code);
  glyph.advanceWidth = width;
  return p;
}
function parseCFFFDSelect(data, start, nGlyphs, fdArrayCount) {
  var fdSelect = [];
  var fdIndex;
  var parser = new parse.Parser(data, start);
  var format = parser.parseCard8();
  if (format === 0) {
    for (var iGid = 0; iGid < nGlyphs; iGid++) {
      fdIndex = parser.parseCard8();
      if (fdIndex >= fdArrayCount) {
        throw new Error("CFF table CID Font FDSelect has bad FD index value " + fdIndex + " (FD count " + fdArrayCount + ")");
      }
      fdSelect.push(fdIndex);
    }
  } else if (format === 3) {
    var nRanges = parser.parseCard16();
    var first = parser.parseCard16();
    if (first !== 0) {
      throw new Error("CFF Table CID Font FDSelect format 3 range has bad initial GID " + first);
    }
    var next;
    for (var iRange = 0; iRange < nRanges; iRange++) {
      fdIndex = parser.parseCard8();
      next = parser.parseCard16();
      if (fdIndex >= fdArrayCount) {
        throw new Error("CFF table CID Font FDSelect has bad FD index value " + fdIndex + " (FD count " + fdArrayCount + ")");
      }
      if (next > nGlyphs) {
        throw new Error("CFF Table CID Font FDSelect format 3 range has bad GID " + next);
      }
      for (; first < next; first++) {
        fdSelect.push(fdIndex);
      }
      first = next;
    }
    if (next !== nGlyphs) {
      throw new Error("CFF Table CID Font FDSelect format 3 range has bad final GID " + next);
    }
  } else {
    throw new Error("CFF Table CID Font FDSelect table has unsupported format " + format);
  }
  return fdSelect;
}
function parseCFFTable(data, start, font, opt) {
  font.tables.cff = {};
  var header = parseCFFHeader(data, start);
  var nameIndex = parseCFFIndex(data, header.endOffset, parse.bytesToString);
  var topDictIndex = parseCFFIndex(data, nameIndex.endOffset);
  var stringIndex = parseCFFIndex(data, topDictIndex.endOffset, parse.bytesToString);
  var globalSubrIndex = parseCFFIndex(data, stringIndex.endOffset);
  font.gsubrs = globalSubrIndex.objects;
  font.gsubrsBias = calcCFFSubroutineBias(font.gsubrs);
  var topDictArray = gatherCFFTopDicts(data, start, topDictIndex.objects, stringIndex.objects);
  if (topDictArray.length !== 1) {
    throw new Error("CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = " + topDictArray.length);
  }
  var topDict = topDictArray[0];
  font.tables.cff.topDict = topDict;
  if (topDict._privateDict) {
    font.defaultWidthX = topDict._privateDict.defaultWidthX;
    font.nominalWidthX = topDict._privateDict.nominalWidthX;
  }
  if (topDict.ros[0] !== void 0 && topDict.ros[1] !== void 0) {
    font.isCIDFont = true;
  }
  if (font.isCIDFont) {
    var fdArrayOffset = topDict.fdArray;
    var fdSelectOffset = topDict.fdSelect;
    if (fdArrayOffset === 0 || fdSelectOffset === 0) {
      throw new Error("Font is marked as a CID font, but FDArray and/or FDSelect information is missing");
    }
    fdArrayOffset += start;
    var fdArrayIndex = parseCFFIndex(data, fdArrayOffset);
    var fdArray = gatherCFFTopDicts(data, start, fdArrayIndex.objects, stringIndex.objects);
    topDict._fdArray = fdArray;
    fdSelectOffset += start;
    topDict._fdSelect = parseCFFFDSelect(data, fdSelectOffset, font.numGlyphs, fdArray.length);
  }
  var privateDictOffset = start + topDict.private[1];
  var privateDict = parseCFFPrivateDict(data, privateDictOffset, topDict.private[0], stringIndex.objects);
  font.defaultWidthX = privateDict.defaultWidthX;
  font.nominalWidthX = privateDict.nominalWidthX;
  if (privateDict.subrs !== 0) {
    var subrOffset = privateDictOffset + privateDict.subrs;
    var subrIndex = parseCFFIndex(data, subrOffset);
    font.subrs = subrIndex.objects;
    font.subrsBias = calcCFFSubroutineBias(font.subrs);
  } else {
    font.subrs = [];
    font.subrsBias = 0;
  }
  var charStringsIndex;
  if (opt.lowMemory) {
    charStringsIndex = parseCFFIndexLowMemory(data, start + topDict.charStrings);
    font.nGlyphs = charStringsIndex.offsets.length;
  } else {
    charStringsIndex = parseCFFIndex(data, start + topDict.charStrings);
    font.nGlyphs = charStringsIndex.objects.length;
  }
  var charset = parseCFFCharset(data, start + topDict.charset, font.nGlyphs, stringIndex.objects);
  if (topDict.encoding === 0) {
    font.cffEncoding = new CffEncoding(cffStandardEncoding, charset);
  } else if (topDict.encoding === 1) {
    font.cffEncoding = new CffEncoding(cffExpertEncoding, charset);
  } else {
    font.cffEncoding = parseCFFEncoding(data, start + topDict.encoding, charset);
  }
  font.encoding = font.encoding || font.cffEncoding;
  font.glyphs = new glyphset.GlyphSet(font);
  if (opt.lowMemory) {
    font._push = function(i2) {
      var charString2 = getCffIndexObject(i2, charStringsIndex.offsets, data, start + topDict.charStrings);
      font.glyphs.push(i2, glyphset.cffGlyphLoader(font, i2, parseCFFCharstring, charString2));
    };
  } else {
    for (var i = 0; i < font.nGlyphs; i += 1) {
      var charString = charStringsIndex.objects[i];
      font.glyphs.push(i, glyphset.cffGlyphLoader(font, i, parseCFFCharstring, charString));
    }
  }
}
function encodeString(s, strings) {
  var sid;
  var i = cffStandardStrings.indexOf(s);
  if (i >= 0) {
    sid = i;
  }
  i = strings.indexOf(s);
  if (i >= 0) {
    sid = i + cffStandardStrings.length;
  } else {
    sid = cffStandardStrings.length + strings.length;
    strings.push(s);
  }
  return sid;
}
function makeHeader() {
  return new table.Record("Header", [
    { name: "major", type: "Card8", value: 1 },
    { name: "minor", type: "Card8", value: 0 },
    { name: "hdrSize", type: "Card8", value: 4 },
    { name: "major", type: "Card8", value: 1 }
  ]);
}
function makeNameIndex(fontNames) {
  var t = new table.Record("Name INDEX", [
    { name: "names", type: "INDEX", value: [] }
  ]);
  t.names = [];
  for (var i = 0; i < fontNames.length; i += 1) {
    t.names.push({ name: "name_" + i, type: "NAME", value: fontNames[i] });
  }
  return t;
}
function makeDict(meta2, attrs, strings) {
  var m = {};
  for (var i = 0; i < meta2.length; i += 1) {
    var entry = meta2[i];
    var value = attrs[entry.name];
    if (value !== void 0 && !equals(value, entry.value)) {
      if (entry.type === "SID") {
        value = encodeString(value, strings);
      }
      m[entry.op] = { name: entry.name, type: entry.type, value };
    }
  }
  return m;
}
function makeTopDict(attrs, strings) {
  var t = new table.Record("Top DICT", [
    { name: "dict", type: "DICT", value: {} }
  ]);
  t.dict = makeDict(TOP_DICT_META, attrs, strings);
  return t;
}
function makeTopDictIndex(topDict) {
  var t = new table.Record("Top DICT INDEX", [
    { name: "topDicts", type: "INDEX", value: [] }
  ]);
  t.topDicts = [{ name: "topDict_0", type: "TABLE", value: topDict }];
  return t;
}
function makeStringIndex(strings) {
  var t = new table.Record("String INDEX", [
    { name: "strings", type: "INDEX", value: [] }
  ]);
  t.strings = [];
  for (var i = 0; i < strings.length; i += 1) {
    t.strings.push({ name: "string_" + i, type: "STRING", value: strings[i] });
  }
  return t;
}
function makeGlobalSubrIndex() {
  return new table.Record("Global Subr INDEX", [
    { name: "subrs", type: "INDEX", value: [] }
  ]);
}
function makeCharsets(glyphNames, strings) {
  var t = new table.Record("Charsets", [
    { name: "format", type: "Card8", value: 0 }
  ]);
  for (var i = 0; i < glyphNames.length; i += 1) {
    var glyphName = glyphNames[i];
    var glyphSID = encodeString(glyphName, strings);
    t.fields.push({ name: "glyph_" + i, type: "SID", value: glyphSID });
  }
  return t;
}
function glyphToOps(glyph) {
  var ops = [];
  var path = glyph.path;
  ops.push({ name: "width", type: "NUMBER", value: glyph.advanceWidth });
  var x = 0;
  var y = 0;
  for (var i = 0; i < path.commands.length; i += 1) {
    var dx = void 0;
    var dy = void 0;
    var cmd = path.commands[i];
    if (cmd.type === "Q") {
      var _13 = 1 / 3;
      var _23 = 2 / 3;
      cmd = {
        type: "C",
        x: cmd.x,
        y: cmd.y,
        x1: Math.round(_13 * x + _23 * cmd.x1),
        y1: Math.round(_13 * y + _23 * cmd.y1),
        x2: Math.round(_13 * cmd.x + _23 * cmd.x1),
        y2: Math.round(_13 * cmd.y + _23 * cmd.y1)
      };
    }
    if (cmd.type === "M") {
      dx = Math.round(cmd.x - x);
      dy = Math.round(cmd.y - y);
      ops.push({ name: "dx", type: "NUMBER", value: dx });
      ops.push({ name: "dy", type: "NUMBER", value: dy });
      ops.push({ name: "rmoveto", type: "OP", value: 21 });
      x = Math.round(cmd.x);
      y = Math.round(cmd.y);
    } else if (cmd.type === "L") {
      dx = Math.round(cmd.x - x);
      dy = Math.round(cmd.y - y);
      ops.push({ name: "dx", type: "NUMBER", value: dx });
      ops.push({ name: "dy", type: "NUMBER", value: dy });
      ops.push({ name: "rlineto", type: "OP", value: 5 });
      x = Math.round(cmd.x);
      y = Math.round(cmd.y);
    } else if (cmd.type === "C") {
      var dx1 = Math.round(cmd.x1 - x);
      var dy1 = Math.round(cmd.y1 - y);
      var dx2 = Math.round(cmd.x2 - cmd.x1);
      var dy2 = Math.round(cmd.y2 - cmd.y1);
      dx = Math.round(cmd.x - cmd.x2);
      dy = Math.round(cmd.y - cmd.y2);
      ops.push({ name: "dx1", type: "NUMBER", value: dx1 });
      ops.push({ name: "dy1", type: "NUMBER", value: dy1 });
      ops.push({ name: "dx2", type: "NUMBER", value: dx2 });
      ops.push({ name: "dy2", type: "NUMBER", value: dy2 });
      ops.push({ name: "dx", type: "NUMBER", value: dx });
      ops.push({ name: "dy", type: "NUMBER", value: dy });
      ops.push({ name: "rrcurveto", type: "OP", value: 8 });
      x = Math.round(cmd.x);
      y = Math.round(cmd.y);
    }
  }
  ops.push({ name: "endchar", type: "OP", value: 14 });
  return ops;
}
function makeCharStringsIndex(glyphs) {
  var t = new table.Record("CharStrings INDEX", [
    { name: "charStrings", type: "INDEX", value: [] }
  ]);
  for (var i = 0; i < glyphs.length; i += 1) {
    var glyph = glyphs.get(i);
    var ops = glyphToOps(glyph);
    t.charStrings.push({ name: glyph.name, type: "CHARSTRING", value: ops });
  }
  return t;
}
function makePrivateDict(attrs, strings) {
  var t = new table.Record("Private DICT", [
    { name: "dict", type: "DICT", value: {} }
  ]);
  t.dict = makeDict(PRIVATE_DICT_META, attrs, strings);
  return t;
}
function makeCFFTable(glyphs, options) {
  var t = new table.Table("CFF ", [
    { name: "header", type: "RECORD" },
    { name: "nameIndex", type: "RECORD" },
    { name: "topDictIndex", type: "RECORD" },
    { name: "stringIndex", type: "RECORD" },
    { name: "globalSubrIndex", type: "RECORD" },
    { name: "charsets", type: "RECORD" },
    { name: "charStringsIndex", type: "RECORD" },
    { name: "privateDict", type: "RECORD" }
  ]);
  var fontScale = 1 / options.unitsPerEm;
  var attrs = {
    version: options.version,
    fullName: options.fullName,
    familyName: options.familyName,
    weight: options.weightName,
    fontBBox: options.fontBBox || [0, 0, 0, 0],
    fontMatrix: [fontScale, 0, 0, fontScale, 0, 0],
    charset: 999,
    encoding: 0,
    charStrings: 999,
    private: [0, 999]
  };
  var privateAttrs = {};
  var glyphNames = [];
  var glyph;
  for (var i = 1; i < glyphs.length; i += 1) {
    glyph = glyphs.get(i);
    glyphNames.push(glyph.name);
  }
  var strings = [];
  t.header = makeHeader();
  t.nameIndex = makeNameIndex([options.postScriptName]);
  var topDict = makeTopDict(attrs, strings);
  t.topDictIndex = makeTopDictIndex(topDict);
  t.globalSubrIndex = makeGlobalSubrIndex();
  t.charsets = makeCharsets(glyphNames, strings);
  t.charStringsIndex = makeCharStringsIndex(glyphs);
  t.privateDict = makePrivateDict(privateAttrs, strings);
  t.stringIndex = makeStringIndex(strings);
  var startOffset = t.header.sizeOf() + t.nameIndex.sizeOf() + t.topDictIndex.sizeOf() + t.stringIndex.sizeOf() + t.globalSubrIndex.sizeOf();
  attrs.charset = startOffset;
  attrs.encoding = 0;
  attrs.charStrings = attrs.charset + t.charsets.sizeOf();
  attrs.private[1] = attrs.charStrings + t.charStringsIndex.sizeOf();
  topDict = makeTopDict(attrs, strings);
  t.topDictIndex = makeTopDictIndex(topDict);
  return t;
}
var cff = { parse: parseCFFTable, make: makeCFFTable };
function parseHeadTable(data, start) {
  var head2 = {};
  var p = new parse.Parser(data, start);
  head2.version = p.parseVersion();
  head2.fontRevision = Math.round(p.parseFixed() * 1e3) / 1e3;
  head2.checkSumAdjustment = p.parseULong();
  head2.magicNumber = p.parseULong();
  check.argument(head2.magicNumber === 1594834165, "Font header has wrong magic number.");
  head2.flags = p.parseUShort();
  head2.unitsPerEm = p.parseUShort();
  head2.created = p.parseLongDateTime();
  head2.modified = p.parseLongDateTime();
  head2.xMin = p.parseShort();
  head2.yMin = p.parseShort();
  head2.xMax = p.parseShort();
  head2.yMax = p.parseShort();
  head2.macStyle = p.parseUShort();
  head2.lowestRecPPEM = p.parseUShort();
  head2.fontDirectionHint = p.parseShort();
  head2.indexToLocFormat = p.parseShort();
  head2.glyphDataFormat = p.parseShort();
  return head2;
}
function makeHeadTable(options) {
  var timestamp = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3) + 2082844800;
  var createdTimestamp = timestamp;
  if (options.createdTimestamp) {
    createdTimestamp = options.createdTimestamp + 2082844800;
  }
  return new table.Table("head", [
    { name: "version", type: "FIXED", value: 65536 },
    { name: "fontRevision", type: "FIXED", value: 65536 },
    { name: "checkSumAdjustment", type: "ULONG", value: 0 },
    { name: "magicNumber", type: "ULONG", value: 1594834165 },
    { name: "flags", type: "USHORT", value: 0 },
    { name: "unitsPerEm", type: "USHORT", value: 1e3 },
    { name: "created", type: "LONGDATETIME", value: createdTimestamp },
    { name: "modified", type: "LONGDATETIME", value: timestamp },
    { name: "xMin", type: "SHORT", value: 0 },
    { name: "yMin", type: "SHORT", value: 0 },
    { name: "xMax", type: "SHORT", value: 0 },
    { name: "yMax", type: "SHORT", value: 0 },
    { name: "macStyle", type: "USHORT", value: 0 },
    { name: "lowestRecPPEM", type: "USHORT", value: 0 },
    { name: "fontDirectionHint", type: "SHORT", value: 2 },
    { name: "indexToLocFormat", type: "SHORT", value: 0 },
    { name: "glyphDataFormat", type: "SHORT", value: 0 }
  ], options);
}
var head = { parse: parseHeadTable, make: makeHeadTable };
function parseHheaTable(data, start) {
  var hhea2 = {};
  var p = new parse.Parser(data, start);
  hhea2.version = p.parseVersion();
  hhea2.ascender = p.parseShort();
  hhea2.descender = p.parseShort();
  hhea2.lineGap = p.parseShort();
  hhea2.advanceWidthMax = p.parseUShort();
  hhea2.minLeftSideBearing = p.parseShort();
  hhea2.minRightSideBearing = p.parseShort();
  hhea2.xMaxExtent = p.parseShort();
  hhea2.caretSlopeRise = p.parseShort();
  hhea2.caretSlopeRun = p.parseShort();
  hhea2.caretOffset = p.parseShort();
  p.relativeOffset += 8;
  hhea2.metricDataFormat = p.parseShort();
  hhea2.numberOfHMetrics = p.parseUShort();
  return hhea2;
}
function makeHheaTable(options) {
  return new table.Table("hhea", [
    { name: "version", type: "FIXED", value: 65536 },
    { name: "ascender", type: "FWORD", value: 0 },
    { name: "descender", type: "FWORD", value: 0 },
    { name: "lineGap", type: "FWORD", value: 0 },
    { name: "advanceWidthMax", type: "UFWORD", value: 0 },
    { name: "minLeftSideBearing", type: "FWORD", value: 0 },
    { name: "minRightSideBearing", type: "FWORD", value: 0 },
    { name: "xMaxExtent", type: "FWORD", value: 0 },
    { name: "caretSlopeRise", type: "SHORT", value: 1 },
    { name: "caretSlopeRun", type: "SHORT", value: 0 },
    { name: "caretOffset", type: "SHORT", value: 0 },
    { name: "reserved1", type: "SHORT", value: 0 },
    { name: "reserved2", type: "SHORT", value: 0 },
    { name: "reserved3", type: "SHORT", value: 0 },
    { name: "reserved4", type: "SHORT", value: 0 },
    { name: "metricDataFormat", type: "SHORT", value: 0 },
    { name: "numberOfHMetrics", type: "USHORT", value: 0 }
  ], options);
}
var hhea = { parse: parseHheaTable, make: makeHheaTable };
function parseHmtxTableAll(data, start, numMetrics, numGlyphs, glyphs) {
  var advanceWidth;
  var leftSideBearing;
  var p = new parse.Parser(data, start);
  for (var i = 0; i < numGlyphs; i += 1) {
    if (i < numMetrics) {
      advanceWidth = p.parseUShort();
      leftSideBearing = p.parseShort();
    }
    var glyph = glyphs.get(i);
    glyph.advanceWidth = advanceWidth;
    glyph.leftSideBearing = leftSideBearing;
  }
}
function parseHmtxTableOnLowMemory(font, data, start, numMetrics, numGlyphs) {
  font._hmtxTableData = {};
  var advanceWidth;
  var leftSideBearing;
  var p = new parse.Parser(data, start);
  for (var i = 0; i < numGlyphs; i += 1) {
    if (i < numMetrics) {
      advanceWidth = p.parseUShort();
      leftSideBearing = p.parseShort();
    }
    font._hmtxTableData[i] = {
      advanceWidth,
      leftSideBearing
    };
  }
}
function parseHmtxTable(font, data, start, numMetrics, numGlyphs, glyphs, opt) {
  if (opt.lowMemory) {
    parseHmtxTableOnLowMemory(font, data, start, numMetrics, numGlyphs);
  } else {
    parseHmtxTableAll(data, start, numMetrics, numGlyphs, glyphs);
  }
}
function makeHmtxTable(glyphs) {
  var t = new table.Table("hmtx", []);
  for (var i = 0; i < glyphs.length; i += 1) {
    var glyph = glyphs.get(i);
    var advanceWidth = glyph.advanceWidth || 0;
    var leftSideBearing = glyph.leftSideBearing || 0;
    t.fields.push({ name: "advanceWidth_" + i, type: "USHORT", value: advanceWidth });
    t.fields.push({ name: "leftSideBearing_" + i, type: "SHORT", value: leftSideBearing });
  }
  return t;
}
var hmtx = { parse: parseHmtxTable, make: makeHmtxTable };
function makeLtagTable(tags) {
  var result = new table.Table("ltag", [
    { name: "version", type: "ULONG", value: 1 },
    { name: "flags", type: "ULONG", value: 0 },
    { name: "numTags", type: "ULONG", value: tags.length }
  ]);
  var stringPool = "";
  var stringPoolOffset = 12 + tags.length * 4;
  for (var i = 0; i < tags.length; ++i) {
    var pos = stringPool.indexOf(tags[i]);
    if (pos < 0) {
      pos = stringPool.length;
      stringPool += tags[i];
    }
    result.fields.push({ name: "offset " + i, type: "USHORT", value: stringPoolOffset + pos });
    result.fields.push({ name: "length " + i, type: "USHORT", value: tags[i].length });
  }
  result.fields.push({ name: "stringPool", type: "CHARARRAY", value: stringPool });
  return result;
}
function parseLtagTable(data, start) {
  var p = new parse.Parser(data, start);
  var tableVersion = p.parseULong();
  check.argument(tableVersion === 1, "Unsupported ltag table version.");
  p.skip("uLong", 1);
  var numTags = p.parseULong();
  var tags = [];
  for (var i = 0; i < numTags; i++) {
    var tag = "";
    var offset = start + p.parseUShort();
    var length = p.parseUShort();
    for (var j = offset; j < offset + length; ++j) {
      tag += String.fromCharCode(data.getInt8(j));
    }
    tags.push(tag);
  }
  return tags;
}
var ltag = { make: makeLtagTable, parse: parseLtagTable };
function parseMaxpTable(data, start) {
  var maxp2 = {};
  var p = new parse.Parser(data, start);
  maxp2.version = p.parseVersion();
  maxp2.numGlyphs = p.parseUShort();
  if (maxp2.version === 1) {
    maxp2.maxPoints = p.parseUShort();
    maxp2.maxContours = p.parseUShort();
    maxp2.maxCompositePoints = p.parseUShort();
    maxp2.maxCompositeContours = p.parseUShort();
    maxp2.maxZones = p.parseUShort();
    maxp2.maxTwilightPoints = p.parseUShort();
    maxp2.maxStorage = p.parseUShort();
    maxp2.maxFunctionDefs = p.parseUShort();
    maxp2.maxInstructionDefs = p.parseUShort();
    maxp2.maxStackElements = p.parseUShort();
    maxp2.maxSizeOfInstructions = p.parseUShort();
    maxp2.maxComponentElements = p.parseUShort();
    maxp2.maxComponentDepth = p.parseUShort();
  }
  return maxp2;
}
function makeMaxpTable(numGlyphs) {
  return new table.Table("maxp", [
    { name: "version", type: "FIXED", value: 20480 },
    { name: "numGlyphs", type: "USHORT", value: numGlyphs }
  ]);
}
var maxp = { parse: parseMaxpTable, make: makeMaxpTable };
var nameTableNames = [
  "copyright",
  // 0
  "fontFamily",
  // 1
  "fontSubfamily",
  // 2
  "uniqueID",
  // 3
  "fullName",
  // 4
  "version",
  // 5
  "postScriptName",
  // 6
  "trademark",
  // 7
  "manufacturer",
  // 8
  "designer",
  // 9
  "description",
  // 10
  "manufacturerURL",
  // 11
  "designerURL",
  // 12
  "license",
  // 13
  "licenseURL",
  // 14
  "reserved",
  // 15
  "preferredFamily",
  // 16
  "preferredSubfamily",
  // 17
  "compatibleFullName",
  // 18
  "sampleText",
  // 19
  "postScriptFindFontName",
  // 20
  "wwsFamily",
  // 21
  "wwsSubfamily"
  // 22
];
var macLanguages = {
  0: "en",
  1: "fr",
  2: "de",
  3: "it",
  4: "nl",
  5: "sv",
  6: "es",
  7: "da",
  8: "pt",
  9: "no",
  10: "he",
  11: "ja",
  12: "ar",
  13: "fi",
  14: "el",
  15: "is",
  16: "mt",
  17: "tr",
  18: "hr",
  19: "zh-Hant",
  20: "ur",
  21: "hi",
  22: "th",
  23: "ko",
  24: "lt",
  25: "pl",
  26: "hu",
  27: "es",
  28: "lv",
  29: "se",
  30: "fo",
  31: "fa",
  32: "ru",
  33: "zh",
  34: "nl-BE",
  35: "ga",
  36: "sq",
  37: "ro",
  38: "cz",
  39: "sk",
  40: "si",
  41: "yi",
  42: "sr",
  43: "mk",
  44: "bg",
  45: "uk",
  46: "be",
  47: "uz",
  48: "kk",
  49: "az-Cyrl",
  50: "az-Arab",
  51: "hy",
  52: "ka",
  53: "mo",
  54: "ky",
  55: "tg",
  56: "tk",
  57: "mn-CN",
  58: "mn",
  59: "ps",
  60: "ks",
  61: "ku",
  62: "sd",
  63: "bo",
  64: "ne",
  65: "sa",
  66: "mr",
  67: "bn",
  68: "as",
  69: "gu",
  70: "pa",
  71: "or",
  72: "ml",
  73: "kn",
  74: "ta",
  75: "te",
  76: "si",
  77: "my",
  78: "km",
  79: "lo",
  80: "vi",
  81: "id",
  82: "tl",
  83: "ms",
  84: "ms-Arab",
  85: "am",
  86: "ti",
  87: "om",
  88: "so",
  89: "sw",
  90: "rw",
  91: "rn",
  92: "ny",
  93: "mg",
  94: "eo",
  128: "cy",
  129: "eu",
  130: "ca",
  131: "la",
  132: "qu",
  133: "gn",
  134: "ay",
  135: "tt",
  136: "ug",
  137: "dz",
  138: "jv",
  139: "su",
  140: "gl",
  141: "af",
  142: "br",
  143: "iu",
  144: "gd",
  145: "gv",
  146: "ga",
  147: "to",
  148: "el-polyton",
  149: "kl",
  150: "az",
  151: "nn"
};
var macLanguageToScript = {
  0: 0,
  // langEnglish → smRoman
  1: 0,
  // langFrench → smRoman
  2: 0,
  // langGerman → smRoman
  3: 0,
  // langItalian → smRoman
  4: 0,
  // langDutch → smRoman
  5: 0,
  // langSwedish → smRoman
  6: 0,
  // langSpanish → smRoman
  7: 0,
  // langDanish → smRoman
  8: 0,
  // langPortuguese → smRoman
  9: 0,
  // langNorwegian → smRoman
  10: 5,
  // langHebrew → smHebrew
  11: 1,
  // langJapanese → smJapanese
  12: 4,
  // langArabic → smArabic
  13: 0,
  // langFinnish → smRoman
  14: 6,
  // langGreek → smGreek
  15: 0,
  // langIcelandic → smRoman (modified)
  16: 0,
  // langMaltese → smRoman
  17: 0,
  // langTurkish → smRoman (modified)
  18: 0,
  // langCroatian → smRoman (modified)
  19: 2,
  // langTradChinese → smTradChinese
  20: 4,
  // langUrdu → smArabic
  21: 9,
  // langHindi → smDevanagari
  22: 21,
  // langThai → smThai
  23: 3,
  // langKorean → smKorean
  24: 29,
  // langLithuanian → smCentralEuroRoman
  25: 29,
  // langPolish → smCentralEuroRoman
  26: 29,
  // langHungarian → smCentralEuroRoman
  27: 29,
  // langEstonian → smCentralEuroRoman
  28: 29,
  // langLatvian → smCentralEuroRoman
  29: 0,
  // langSami → smRoman
  30: 0,
  // langFaroese → smRoman (modified)
  31: 4,
  // langFarsi → smArabic (modified)
  32: 7,
  // langRussian → smCyrillic
  33: 25,
  // langSimpChinese → smSimpChinese
  34: 0,
  // langFlemish → smRoman
  35: 0,
  // langIrishGaelic → smRoman (modified)
  36: 0,
  // langAlbanian → smRoman
  37: 0,
  // langRomanian → smRoman (modified)
  38: 29,
  // langCzech → smCentralEuroRoman
  39: 29,
  // langSlovak → smCentralEuroRoman
  40: 0,
  // langSlovenian → smRoman (modified)
  41: 5,
  // langYiddish → smHebrew
  42: 7,
  // langSerbian → smCyrillic
  43: 7,
  // langMacedonian → smCyrillic
  44: 7,
  // langBulgarian → smCyrillic
  45: 7,
  // langUkrainian → smCyrillic (modified)
  46: 7,
  // langByelorussian → smCyrillic
  47: 7,
  // langUzbek → smCyrillic
  48: 7,
  // langKazakh → smCyrillic
  49: 7,
  // langAzerbaijani → smCyrillic
  50: 4,
  // langAzerbaijanAr → smArabic
  51: 24,
  // langArmenian → smArmenian
  52: 23,
  // langGeorgian → smGeorgian
  53: 7,
  // langMoldavian → smCyrillic
  54: 7,
  // langKirghiz → smCyrillic
  55: 7,
  // langTajiki → smCyrillic
  56: 7,
  // langTurkmen → smCyrillic
  57: 27,
  // langMongolian → smMongolian
  58: 7,
  // langMongolianCyr → smCyrillic
  59: 4,
  // langPashto → smArabic
  60: 4,
  // langKurdish → smArabic
  61: 4,
  // langKashmiri → smArabic
  62: 4,
  // langSindhi → smArabic
  63: 26,
  // langTibetan → smTibetan
  64: 9,
  // langNepali → smDevanagari
  65: 9,
  // langSanskrit → smDevanagari
  66: 9,
  // langMarathi → smDevanagari
  67: 13,
  // langBengali → smBengali
  68: 13,
  // langAssamese → smBengali
  69: 11,
  // langGujarati → smGujarati
  70: 10,
  // langPunjabi → smGurmukhi
  71: 12,
  // langOriya → smOriya
  72: 17,
  // langMalayalam → smMalayalam
  73: 16,
  // langKannada → smKannada
  74: 14,
  // langTamil → smTamil
  75: 15,
  // langTelugu → smTelugu
  76: 18,
  // langSinhalese → smSinhalese
  77: 19,
  // langBurmese → smBurmese
  78: 20,
  // langKhmer → smKhmer
  79: 22,
  // langLao → smLao
  80: 30,
  // langVietnamese → smVietnamese
  81: 0,
  // langIndonesian → smRoman
  82: 0,
  // langTagalog → smRoman
  83: 0,
  // langMalayRoman → smRoman
  84: 4,
  // langMalayArabic → smArabic
  85: 28,
  // langAmharic → smEthiopic
  86: 28,
  // langTigrinya → smEthiopic
  87: 28,
  // langOromo → smEthiopic
  88: 0,
  // langSomali → smRoman
  89: 0,
  // langSwahili → smRoman
  90: 0,
  // langKinyarwanda → smRoman
  91: 0,
  // langRundi → smRoman
  92: 0,
  // langNyanja → smRoman
  93: 0,
  // langMalagasy → smRoman
  94: 0,
  // langEsperanto → smRoman
  128: 0,
  // langWelsh → smRoman (modified)
  129: 0,
  // langBasque → smRoman
  130: 0,
  // langCatalan → smRoman
  131: 0,
  // langLatin → smRoman
  132: 0,
  // langQuechua → smRoman
  133: 0,
  // langGuarani → smRoman
  134: 0,
  // langAymara → smRoman
  135: 7,
  // langTatar → smCyrillic
  136: 4,
  // langUighur → smArabic
  137: 26,
  // langDzongkha → smTibetan
  138: 0,
  // langJavaneseRom → smRoman
  139: 0,
  // langSundaneseRom → smRoman
  140: 0,
  // langGalician → smRoman
  141: 0,
  // langAfrikaans → smRoman
  142: 0,
  // langBreton → smRoman (modified)
  143: 28,
  // langInuktitut → smEthiopic (modified)
  144: 0,
  // langScottishGaelic → smRoman (modified)
  145: 0,
  // langManxGaelic → smRoman (modified)
  146: 0,
  // langIrishGaelicScript → smRoman (modified)
  147: 0,
  // langTongan → smRoman
  148: 6,
  // langGreekAncient → smRoman
  149: 0,
  // langGreenlandic → smRoman
  150: 0,
  // langAzerbaijanRoman → smRoman
  151: 0
  // langNynorsk → smRoman
};
var windowsLanguages = {
  1078: "af",
  1052: "sq",
  1156: "gsw",
  1118: "am",
  5121: "ar-DZ",
  15361: "ar-BH",
  3073: "ar",
  2049: "ar-IQ",
  11265: "ar-JO",
  13313: "ar-KW",
  12289: "ar-LB",
  4097: "ar-LY",
  6145: "ary",
  8193: "ar-OM",
  16385: "ar-QA",
  1025: "ar-SA",
  10241: "ar-SY",
  7169: "aeb",
  14337: "ar-AE",
  9217: "ar-YE",
  1067: "hy",
  1101: "as",
  2092: "az-Cyrl",
  1068: "az",
  1133: "ba",
  1069: "eu",
  1059: "be",
  2117: "bn",
  1093: "bn-IN",
  8218: "bs-Cyrl",
  5146: "bs",
  1150: "br",
  1026: "bg",
  1027: "ca",
  3076: "zh-HK",
  5124: "zh-MO",
  2052: "zh",
  4100: "zh-SG",
  1028: "zh-TW",
  1155: "co",
  1050: "hr",
  4122: "hr-BA",
  1029: "cs",
  1030: "da",
  1164: "prs",
  1125: "dv",
  2067: "nl-BE",
  1043: "nl",
  3081: "en-AU",
  10249: "en-BZ",
  4105: "en-CA",
  9225: "en-029",
  16393: "en-IN",
  6153: "en-IE",
  8201: "en-JM",
  17417: "en-MY",
  5129: "en-NZ",
  13321: "en-PH",
  18441: "en-SG",
  7177: "en-ZA",
  11273: "en-TT",
  2057: "en-GB",
  1033: "en",
  12297: "en-ZW",
  1061: "et",
  1080: "fo",
  1124: "fil",
  1035: "fi",
  2060: "fr-BE",
  3084: "fr-CA",
  1036: "fr",
  5132: "fr-LU",
  6156: "fr-MC",
  4108: "fr-CH",
  1122: "fy",
  1110: "gl",
  1079: "ka",
  3079: "de-AT",
  1031: "de",
  5127: "de-LI",
  4103: "de-LU",
  2055: "de-CH",
  1032: "el",
  1135: "kl",
  1095: "gu",
  1128: "ha",
  1037: "he",
  1081: "hi",
  1038: "hu",
  1039: "is",
  1136: "ig",
  1057: "id",
  1117: "iu",
  2141: "iu-Latn",
  2108: "ga",
  1076: "xh",
  1077: "zu",
  1040: "it",
  2064: "it-CH",
  1041: "ja",
  1099: "kn",
  1087: "kk",
  1107: "km",
  1158: "quc",
  1159: "rw",
  1089: "sw",
  1111: "kok",
  1042: "ko",
  1088: "ky",
  1108: "lo",
  1062: "lv",
  1063: "lt",
  2094: "dsb",
  1134: "lb",
  1071: "mk",
  2110: "ms-BN",
  1086: "ms",
  1100: "ml",
  1082: "mt",
  1153: "mi",
  1146: "arn",
  1102: "mr",
  1148: "moh",
  1104: "mn",
  2128: "mn-CN",
  1121: "ne",
  1044: "nb",
  2068: "nn",
  1154: "oc",
  1096: "or",
  1123: "ps",
  1045: "pl",
  1046: "pt",
  2070: "pt-PT",
  1094: "pa",
  1131: "qu-BO",
  2155: "qu-EC",
  3179: "qu",
  1048: "ro",
  1047: "rm",
  1049: "ru",
  9275: "smn",
  4155: "smj-NO",
  5179: "smj",
  3131: "se-FI",
  1083: "se",
  2107: "se-SE",
  8251: "sms",
  6203: "sma-NO",
  7227: "sms",
  1103: "sa",
  7194: "sr-Cyrl-BA",
  3098: "sr",
  6170: "sr-Latn-BA",
  2074: "sr-Latn",
  1132: "nso",
  1074: "tn",
  1115: "si",
  1051: "sk",
  1060: "sl",
  11274: "es-AR",
  16394: "es-BO",
  13322: "es-CL",
  9226: "es-CO",
  5130: "es-CR",
  7178: "es-DO",
  12298: "es-EC",
  17418: "es-SV",
  4106: "es-GT",
  18442: "es-HN",
  2058: "es-MX",
  19466: "es-NI",
  6154: "es-PA",
  15370: "es-PY",
  10250: "es-PE",
  20490: "es-PR",
  // Microsoft has defined two different language codes for
  // “Spanish with modern sorting” and “Spanish with traditional
  // sorting”. This makes sense for collation APIs, and it would be
  // possible to express this in BCP 47 language tags via Unicode
  // extensions (eg., es-u-co-trad is Spanish with traditional
  // sorting). However, for storing names in fonts, the distinction
  // does not make sense, so we give “es” in both cases.
  3082: "es",
  1034: "es",
  21514: "es-US",
  14346: "es-UY",
  8202: "es-VE",
  2077: "sv-FI",
  1053: "sv",
  1114: "syr",
  1064: "tg",
  2143: "tzm",
  1097: "ta",
  1092: "tt",
  1098: "te",
  1054: "th",
  1105: "bo",
  1055: "tr",
  1090: "tk",
  1152: "ug",
  1058: "uk",
  1070: "hsb",
  1056: "ur",
  2115: "uz-Cyrl",
  1091: "uz",
  1066: "vi",
  1106: "cy",
  1160: "wo",
  1157: "sah",
  1144: "ii",
  1130: "yo"
};
function getLanguageCode(platformID, languageID, ltag2) {
  switch (platformID) {
    case 0:
      if (languageID === 65535) {
        return "und";
      } else if (ltag2) {
        return ltag2[languageID];
      }
      break;
    case 1:
      return macLanguages[languageID];
    case 3:
      return windowsLanguages[languageID];
  }
  return void 0;
}
var utf16 = "utf-16";
var macScriptEncodings = {
  0: "macintosh",
  // smRoman
  1: "x-mac-japanese",
  // smJapanese
  2: "x-mac-chinesetrad",
  // smTradChinese
  3: "x-mac-korean",
  // smKorean
  6: "x-mac-greek",
  // smGreek
  7: "x-mac-cyrillic",
  // smCyrillic
  9: "x-mac-devanagai",
  // smDevanagari
  10: "x-mac-gurmukhi",
  // smGurmukhi
  11: "x-mac-gujarati",
  // smGujarati
  12: "x-mac-oriya",
  // smOriya
  13: "x-mac-bengali",
  // smBengali
  14: "x-mac-tamil",
  // smTamil
  15: "x-mac-telugu",
  // smTelugu
  16: "x-mac-kannada",
  // smKannada
  17: "x-mac-malayalam",
  // smMalayalam
  18: "x-mac-sinhalese",
  // smSinhalese
  19: "x-mac-burmese",
  // smBurmese
  20: "x-mac-khmer",
  // smKhmer
  21: "x-mac-thai",
  // smThai
  22: "x-mac-lao",
  // smLao
  23: "x-mac-georgian",
  // smGeorgian
  24: "x-mac-armenian",
  // smArmenian
  25: "x-mac-chinesesimp",
  // smSimpChinese
  26: "x-mac-tibetan",
  // smTibetan
  27: "x-mac-mongolian",
  // smMongolian
  28: "x-mac-ethiopic",
  // smEthiopic
  29: "x-mac-ce",
  // smCentralEuroRoman
  30: "x-mac-vietnamese",
  // smVietnamese
  31: "x-mac-extarabic"
  // smExtArabic
};
var macLanguageEncodings = {
  15: "x-mac-icelandic",
  // langIcelandic
  17: "x-mac-turkish",
  // langTurkish
  18: "x-mac-croatian",
  // langCroatian
  24: "x-mac-ce",
  // langLithuanian
  25: "x-mac-ce",
  // langPolish
  26: "x-mac-ce",
  // langHungarian
  27: "x-mac-ce",
  // langEstonian
  28: "x-mac-ce",
  // langLatvian
  30: "x-mac-icelandic",
  // langFaroese
  37: "x-mac-romanian",
  // langRomanian
  38: "x-mac-ce",
  // langCzech
  39: "x-mac-ce",
  // langSlovak
  40: "x-mac-ce",
  // langSlovenian
  143: "x-mac-inuit",
  // langInuktitut
  146: "x-mac-gaelic"
  // langIrishGaelicScript
};
function getEncoding(platformID, encodingID, languageID) {
  switch (platformID) {
    case 0:
      return utf16;
    case 1:
      return macLanguageEncodings[languageID] || macScriptEncodings[encodingID];
    case 3:
      if (encodingID === 1 || encodingID === 10) {
        return utf16;
      }
      break;
  }
  return void 0;
}
function parseNameTable(data, start, ltag2) {
  var name = {};
  var p = new parse.Parser(data, start);
  var format = p.parseUShort();
  var count = p.parseUShort();
  var stringOffset = p.offset + p.parseUShort();
  for (var i = 0; i < count; i++) {
    var platformID = p.parseUShort();
    var encodingID = p.parseUShort();
    var languageID = p.parseUShort();
    var nameID = p.parseUShort();
    var property = nameTableNames[nameID] || nameID;
    var byteLength = p.parseUShort();
    var offset = p.parseUShort();
    var language = getLanguageCode(platformID, languageID, ltag2);
    var encoding = getEncoding(platformID, encodingID, languageID);
    if (encoding !== void 0 && language !== void 0) {
      var text = void 0;
      if (encoding === utf16) {
        text = decode.UTF16(data, stringOffset + offset, byteLength);
      } else {
        text = decode.MACSTRING(data, stringOffset + offset, byteLength, encoding);
      }
      if (text) {
        var translations = name[property];
        if (translations === void 0) {
          translations = name[property] = {};
        }
        translations[language] = text;
      }
    }
  }
  var langTagCount = 0;
  if (format === 1) {
    langTagCount = p.parseUShort();
  }
  return name;
}
function reverseDict(dict) {
  var result = {};
  for (var key in dict) {
    result[dict[key]] = parseInt(key);
  }
  return result;
}
function makeNameRecord(platformID, encodingID, languageID, nameID, length, offset) {
  return new table.Record("NameRecord", [
    { name: "platformID", type: "USHORT", value: platformID },
    { name: "encodingID", type: "USHORT", value: encodingID },
    { name: "languageID", type: "USHORT", value: languageID },
    { name: "nameID", type: "USHORT", value: nameID },
    { name: "length", type: "USHORT", value: length },
    { name: "offset", type: "USHORT", value: offset }
  ]);
}
function findSubArray(needle, haystack) {
  var needleLength = needle.length;
  var limit = haystack.length - needleLength + 1;
  loop:
    for (var pos = 0; pos < limit; pos++) {
      for (; pos < limit; pos++) {
        for (var k = 0; k < needleLength; k++) {
          if (haystack[pos + k] !== needle[k]) {
            continue loop;
          }
        }
        return pos;
      }
    }
  return -1;
}
function addStringToPool(s, pool) {
  var offset = findSubArray(s, pool);
  if (offset < 0) {
    offset = pool.length;
    var i = 0;
    var len = s.length;
    for (; i < len; ++i) {
      pool.push(s[i]);
    }
  }
  return offset;
}
function makeNameTable(names, ltag2) {
  var nameID;
  var nameIDs = [];
  var namesWithNumericKeys = {};
  var nameTableIds = reverseDict(nameTableNames);
  for (var key in names) {
    var id = nameTableIds[key];
    if (id === void 0) {
      id = key;
    }
    nameID = parseInt(id);
    if (isNaN(nameID)) {
      throw new Error('Name table entry "' + key + '" does not exist, see nameTableNames for complete list.');
    }
    namesWithNumericKeys[nameID] = names[key];
    nameIDs.push(nameID);
  }
  var macLanguageIds = reverseDict(macLanguages);
  var windowsLanguageIds = reverseDict(windowsLanguages);
  var nameRecords = [];
  var stringPool = [];
  for (var i = 0; i < nameIDs.length; i++) {
    nameID = nameIDs[i];
    var translations = namesWithNumericKeys[nameID];
    for (var lang in translations) {
      var text = translations[lang];
      var macPlatform = 1;
      var macLanguage = macLanguageIds[lang];
      var macScript = macLanguageToScript[macLanguage];
      var macEncoding = getEncoding(macPlatform, macScript, macLanguage);
      var macName = encode.MACSTRING(text, macEncoding);
      if (macName === void 0) {
        macPlatform = 0;
        macLanguage = ltag2.indexOf(lang);
        if (macLanguage < 0) {
          macLanguage = ltag2.length;
          ltag2.push(lang);
        }
        macScript = 4;
        macName = encode.UTF16(text);
      }
      var macNameOffset = addStringToPool(macName, stringPool);
      nameRecords.push(makeNameRecord(
        macPlatform,
        macScript,
        macLanguage,
        nameID,
        macName.length,
        macNameOffset
      ));
      var winLanguage = windowsLanguageIds[lang];
      if (winLanguage !== void 0) {
        var winName = encode.UTF16(text);
        var winNameOffset = addStringToPool(winName, stringPool);
        nameRecords.push(makeNameRecord(
          3,
          1,
          winLanguage,
          nameID,
          winName.length,
          winNameOffset
        ));
      }
    }
  }
  nameRecords.sort(function(a, b) {
    return a.platformID - b.platformID || a.encodingID - b.encodingID || a.languageID - b.languageID || a.nameID - b.nameID;
  });
  var t = new table.Table("name", [
    { name: "format", type: "USHORT", value: 0 },
    { name: "count", type: "USHORT", value: nameRecords.length },
    { name: "stringOffset", type: "USHORT", value: 6 + nameRecords.length * 12 }
  ]);
  for (var r = 0; r < nameRecords.length; r++) {
    t.fields.push({ name: "record_" + r, type: "RECORD", value: nameRecords[r] });
  }
  t.fields.push({ name: "strings", type: "LITERAL", value: stringPool });
  return t;
}
var _name = { parse: parseNameTable, make: makeNameTable };
var unicodeRanges = [
  { begin: 0, end: 127 },
  // Basic Latin
  { begin: 128, end: 255 },
  // Latin-1 Supplement
  { begin: 256, end: 383 },
  // Latin Extended-A
  { begin: 384, end: 591 },
  // Latin Extended-B
  { begin: 592, end: 687 },
  // IPA Extensions
  { begin: 688, end: 767 },
  // Spacing Modifier Letters
  { begin: 768, end: 879 },
  // Combining Diacritical Marks
  { begin: 880, end: 1023 },
  // Greek and Coptic
  { begin: 11392, end: 11519 },
  // Coptic
  { begin: 1024, end: 1279 },
  // Cyrillic
  { begin: 1328, end: 1423 },
  // Armenian
  { begin: 1424, end: 1535 },
  // Hebrew
  { begin: 42240, end: 42559 },
  // Vai
  { begin: 1536, end: 1791 },
  // Arabic
  { begin: 1984, end: 2047 },
  // NKo
  { begin: 2304, end: 2431 },
  // Devanagari
  { begin: 2432, end: 2559 },
  // Bengali
  { begin: 2560, end: 2687 },
  // Gurmukhi
  { begin: 2688, end: 2815 },
  // Gujarati
  { begin: 2816, end: 2943 },
  // Oriya
  { begin: 2944, end: 3071 },
  // Tamil
  { begin: 3072, end: 3199 },
  // Telugu
  { begin: 3200, end: 3327 },
  // Kannada
  { begin: 3328, end: 3455 },
  // Malayalam
  { begin: 3584, end: 3711 },
  // Thai
  { begin: 3712, end: 3839 },
  // Lao
  { begin: 4256, end: 4351 },
  // Georgian
  { begin: 6912, end: 7039 },
  // Balinese
  { begin: 4352, end: 4607 },
  // Hangul Jamo
  { begin: 7680, end: 7935 },
  // Latin Extended Additional
  { begin: 7936, end: 8191 },
  // Greek Extended
  { begin: 8192, end: 8303 },
  // General Punctuation
  { begin: 8304, end: 8351 },
  // Superscripts And Subscripts
  { begin: 8352, end: 8399 },
  // Currency Symbol
  { begin: 8400, end: 8447 },
  // Combining Diacritical Marks For Symbols
  { begin: 8448, end: 8527 },
  // Letterlike Symbols
  { begin: 8528, end: 8591 },
  // Number Forms
  { begin: 8592, end: 8703 },
  // Arrows
  { begin: 8704, end: 8959 },
  // Mathematical Operators
  { begin: 8960, end: 9215 },
  // Miscellaneous Technical
  { begin: 9216, end: 9279 },
  // Control Pictures
  { begin: 9280, end: 9311 },
  // Optical Character Recognition
  { begin: 9312, end: 9471 },
  // Enclosed Alphanumerics
  { begin: 9472, end: 9599 },
  // Box Drawing
  { begin: 9600, end: 9631 },
  // Block Elements
  { begin: 9632, end: 9727 },
  // Geometric Shapes
  { begin: 9728, end: 9983 },
  // Miscellaneous Symbols
  { begin: 9984, end: 10175 },
  // Dingbats
  { begin: 12288, end: 12351 },
  // CJK Symbols And Punctuation
  { begin: 12352, end: 12447 },
  // Hiragana
  { begin: 12448, end: 12543 },
  // Katakana
  { begin: 12544, end: 12591 },
  // Bopomofo
  { begin: 12592, end: 12687 },
  // Hangul Compatibility Jamo
  { begin: 43072, end: 43135 },
  // Phags-pa
  { begin: 12800, end: 13055 },
  // Enclosed CJK Letters And Months
  { begin: 13056, end: 13311 },
  // CJK Compatibility
  { begin: 44032, end: 55215 },
  // Hangul Syllables
  { begin: 55296, end: 57343 },
  // Non-Plane 0 *
  { begin: 67840, end: 67871 },
  // Phoenicia
  { begin: 19968, end: 40959 },
  // CJK Unified Ideographs
  { begin: 57344, end: 63743 },
  // Private Use Area (plane 0)
  { begin: 12736, end: 12783 },
  // CJK Strokes
  { begin: 64256, end: 64335 },
  // Alphabetic Presentation Forms
  { begin: 64336, end: 65023 },
  // Arabic Presentation Forms-A
  { begin: 65056, end: 65071 },
  // Combining Half Marks
  { begin: 65040, end: 65055 },
  // Vertical Forms
  { begin: 65104, end: 65135 },
  // Small Form Variants
  { begin: 65136, end: 65279 },
  // Arabic Presentation Forms-B
  { begin: 65280, end: 65519 },
  // Halfwidth And Fullwidth Forms
  { begin: 65520, end: 65535 },
  // Specials
  { begin: 3840, end: 4095 },
  // Tibetan
  { begin: 1792, end: 1871 },
  // Syriac
  { begin: 1920, end: 1983 },
  // Thaana
  { begin: 3456, end: 3583 },
  // Sinhala
  { begin: 4096, end: 4255 },
  // Myanmar
  { begin: 4608, end: 4991 },
  // Ethiopic
  { begin: 5024, end: 5119 },
  // Cherokee
  { begin: 5120, end: 5759 },
  // Unified Canadian Aboriginal Syllabics
  { begin: 5760, end: 5791 },
  // Ogham
  { begin: 5792, end: 5887 },
  // Runic
  { begin: 6016, end: 6143 },
  // Khmer
  { begin: 6144, end: 6319 },
  // Mongolian
  { begin: 10240, end: 10495 },
  // Braille Patterns
  { begin: 40960, end: 42127 },
  // Yi Syllables
  { begin: 5888, end: 5919 },
  // Tagalog
  { begin: 66304, end: 66351 },
  // Old Italic
  { begin: 66352, end: 66383 },
  // Gothic
  { begin: 66560, end: 66639 },
  // Deseret
  { begin: 118784, end: 119039 },
  // Byzantine Musical Symbols
  { begin: 119808, end: 120831 },
  // Mathematical Alphanumeric Symbols
  { begin: 1044480, end: 1048573 },
  // Private Use (plane 15)
  { begin: 65024, end: 65039 },
  // Variation Selectors
  { begin: 917504, end: 917631 },
  // Tags
  { begin: 6400, end: 6479 },
  // Limbu
  { begin: 6480, end: 6527 },
  // Tai Le
  { begin: 6528, end: 6623 },
  // New Tai Lue
  { begin: 6656, end: 6687 },
  // Buginese
  { begin: 11264, end: 11359 },
  // Glagolitic
  { begin: 11568, end: 11647 },
  // Tifinagh
  { begin: 19904, end: 19967 },
  // Yijing Hexagram Symbols
  { begin: 43008, end: 43055 },
  // Syloti Nagri
  { begin: 65536, end: 65663 },
  // Linear B Syllabary
  { begin: 65856, end: 65935 },
  // Ancient Greek Numbers
  { begin: 66432, end: 66463 },
  // Ugaritic
  { begin: 66464, end: 66527 },
  // Old Persian
  { begin: 66640, end: 66687 },
  // Shavian
  { begin: 66688, end: 66735 },
  // Osmanya
  { begin: 67584, end: 67647 },
  // Cypriot Syllabary
  { begin: 68096, end: 68191 },
  // Kharoshthi
  { begin: 119552, end: 119647 },
  // Tai Xuan Jing Symbols
  { begin: 73728, end: 74751 },
  // Cuneiform
  { begin: 119648, end: 119679 },
  // Counting Rod Numerals
  { begin: 7040, end: 7103 },
  // Sundanese
  { begin: 7168, end: 7247 },
  // Lepcha
  { begin: 7248, end: 7295 },
  // Ol Chiki
  { begin: 43136, end: 43231 },
  // Saurashtra
  { begin: 43264, end: 43311 },
  // Kayah Li
  { begin: 43312, end: 43359 },
  // Rejang
  { begin: 43520, end: 43615 },
  // Cham
  { begin: 65936, end: 65999 },
  // Ancient Symbols
  { begin: 66e3, end: 66047 },
  // Phaistos Disc
  { begin: 66208, end: 66271 },
  // Carian
  { begin: 127024, end: 127135 }
  // Domino Tiles
];
function getUnicodeRange(unicode) {
  for (var i = 0; i < unicodeRanges.length; i += 1) {
    var range = unicodeRanges[i];
    if (unicode >= range.begin && unicode < range.end) {
      return i;
    }
  }
  return -1;
}
function parseOS2Table(data, start) {
  var os22 = {};
  var p = new parse.Parser(data, start);
  os22.version = p.parseUShort();
  os22.xAvgCharWidth = p.parseShort();
  os22.usWeightClass = p.parseUShort();
  os22.usWidthClass = p.parseUShort();
  os22.fsType = p.parseUShort();
  os22.ySubscriptXSize = p.parseShort();
  os22.ySubscriptYSize = p.parseShort();
  os22.ySubscriptXOffset = p.parseShort();
  os22.ySubscriptYOffset = p.parseShort();
  os22.ySuperscriptXSize = p.parseShort();
  os22.ySuperscriptYSize = p.parseShort();
  os22.ySuperscriptXOffset = p.parseShort();
  os22.ySuperscriptYOffset = p.parseShort();
  os22.yStrikeoutSize = p.parseShort();
  os22.yStrikeoutPosition = p.parseShort();
  os22.sFamilyClass = p.parseShort();
  os22.panose = [];
  for (var i = 0; i < 10; i++) {
    os22.panose[i] = p.parseByte();
  }
  os22.ulUnicodeRange1 = p.parseULong();
  os22.ulUnicodeRange2 = p.parseULong();
  os22.ulUnicodeRange3 = p.parseULong();
  os22.ulUnicodeRange4 = p.parseULong();
  os22.achVendID = String.fromCharCode(p.parseByte(), p.parseByte(), p.parseByte(), p.parseByte());
  os22.fsSelection = p.parseUShort();
  os22.usFirstCharIndex = p.parseUShort();
  os22.usLastCharIndex = p.parseUShort();
  os22.sTypoAscender = p.parseShort();
  os22.sTypoDescender = p.parseShort();
  os22.sTypoLineGap = p.parseShort();
  os22.usWinAscent = p.parseUShort();
  os22.usWinDescent = p.parseUShort();
  if (os22.version >= 1) {
    os22.ulCodePageRange1 = p.parseULong();
    os22.ulCodePageRange2 = p.parseULong();
  }
  if (os22.version >= 2) {
    os22.sxHeight = p.parseShort();
    os22.sCapHeight = p.parseShort();
    os22.usDefaultChar = p.parseUShort();
    os22.usBreakChar = p.parseUShort();
    os22.usMaxContent = p.parseUShort();
  }
  return os22;
}
function makeOS2Table(options) {
  return new table.Table("OS/2", [
    { name: "version", type: "USHORT", value: 3 },
    { name: "xAvgCharWidth", type: "SHORT", value: 0 },
    { name: "usWeightClass", type: "USHORT", value: 0 },
    { name: "usWidthClass", type: "USHORT", value: 0 },
    { name: "fsType", type: "USHORT", value: 0 },
    { name: "ySubscriptXSize", type: "SHORT", value: 650 },
    { name: "ySubscriptYSize", type: "SHORT", value: 699 },
    { name: "ySubscriptXOffset", type: "SHORT", value: 0 },
    { name: "ySubscriptYOffset", type: "SHORT", value: 140 },
    { name: "ySuperscriptXSize", type: "SHORT", value: 650 },
    { name: "ySuperscriptYSize", type: "SHORT", value: 699 },
    { name: "ySuperscriptXOffset", type: "SHORT", value: 0 },
    { name: "ySuperscriptYOffset", type: "SHORT", value: 479 },
    { name: "yStrikeoutSize", type: "SHORT", value: 49 },
    { name: "yStrikeoutPosition", type: "SHORT", value: 258 },
    { name: "sFamilyClass", type: "SHORT", value: 0 },
    { name: "bFamilyType", type: "BYTE", value: 0 },
    { name: "bSerifStyle", type: "BYTE", value: 0 },
    { name: "bWeight", type: "BYTE", value: 0 },
    { name: "bProportion", type: "BYTE", value: 0 },
    { name: "bContrast", type: "BYTE", value: 0 },
    { name: "bStrokeVariation", type: "BYTE", value: 0 },
    { name: "bArmStyle", type: "BYTE", value: 0 },
    { name: "bLetterform", type: "BYTE", value: 0 },
    { name: "bMidline", type: "BYTE", value: 0 },
    { name: "bXHeight", type: "BYTE", value: 0 },
    { name: "ulUnicodeRange1", type: "ULONG", value: 0 },
    { name: "ulUnicodeRange2", type: "ULONG", value: 0 },
    { name: "ulUnicodeRange3", type: "ULONG", value: 0 },
    { name: "ulUnicodeRange4", type: "ULONG", value: 0 },
    { name: "achVendID", type: "CHARARRAY", value: "XXXX" },
    { name: "fsSelection", type: "USHORT", value: 0 },
    { name: "usFirstCharIndex", type: "USHORT", value: 0 },
    { name: "usLastCharIndex", type: "USHORT", value: 0 },
    { name: "sTypoAscender", type: "SHORT", value: 0 },
    { name: "sTypoDescender", type: "SHORT", value: 0 },
    { name: "sTypoLineGap", type: "SHORT", value: 0 },
    { name: "usWinAscent", type: "USHORT", value: 0 },
    { name: "usWinDescent", type: "USHORT", value: 0 },
    { name: "ulCodePageRange1", type: "ULONG", value: 0 },
    { name: "ulCodePageRange2", type: "ULONG", value: 0 },
    { name: "sxHeight", type: "SHORT", value: 0 },
    { name: "sCapHeight", type: "SHORT", value: 0 },
    { name: "usDefaultChar", type: "USHORT", value: 0 },
    { name: "usBreakChar", type: "USHORT", value: 0 },
    { name: "usMaxContext", type: "USHORT", value: 0 }
  ], options);
}
var os2 = { parse: parseOS2Table, make: makeOS2Table, unicodeRanges, getUnicodeRange };
function parsePostTable(data, start) {
  var post2 = {};
  var p = new parse.Parser(data, start);
  post2.version = p.parseVersion();
  post2.italicAngle = p.parseFixed();
  post2.underlinePosition = p.parseShort();
  post2.underlineThickness = p.parseShort();
  post2.isFixedPitch = p.parseULong();
  post2.minMemType42 = p.parseULong();
  post2.maxMemType42 = p.parseULong();
  post2.minMemType1 = p.parseULong();
  post2.maxMemType1 = p.parseULong();
  switch (post2.version) {
    case 1:
      post2.names = standardNames.slice();
      break;
    case 2:
      post2.numberOfGlyphs = p.parseUShort();
      post2.glyphNameIndex = new Array(post2.numberOfGlyphs);
      for (var i = 0; i < post2.numberOfGlyphs; i++) {
        post2.glyphNameIndex[i] = p.parseUShort();
      }
      post2.names = [];
      for (var i$1 = 0; i$1 < post2.numberOfGlyphs; i$1++) {
        if (post2.glyphNameIndex[i$1] >= standardNames.length) {
          var nameLength = p.parseChar();
          post2.names.push(p.parseString(nameLength));
        }
      }
      break;
    case 2.5:
      post2.numberOfGlyphs = p.parseUShort();
      post2.offset = new Array(post2.numberOfGlyphs);
      for (var i$2 = 0; i$2 < post2.numberOfGlyphs; i$2++) {
        post2.offset[i$2] = p.parseChar();
      }
      break;
  }
  return post2;
}
function makePostTable() {
  return new table.Table("post", [
    { name: "version", type: "FIXED", value: 196608 },
    { name: "italicAngle", type: "FIXED", value: 0 },
    { name: "underlinePosition", type: "FWORD", value: 0 },
    { name: "underlineThickness", type: "FWORD", value: 0 },
    { name: "isFixedPitch", type: "ULONG", value: 0 },
    { name: "minMemType42", type: "ULONG", value: 0 },
    { name: "maxMemType42", type: "ULONG", value: 0 },
    { name: "minMemType1", type: "ULONG", value: 0 },
    { name: "maxMemType1", type: "ULONG", value: 0 }
  ]);
}
var post = { parse: parsePostTable, make: makePostTable };
var subtableParsers = new Array(9);
subtableParsers[1] = function parseLookup1() {
  var start = this.offset + this.relativeOffset;
  var substFormat = this.parseUShort();
  if (substFormat === 1) {
    return {
      substFormat: 1,
      coverage: this.parsePointer(Parser.coverage),
      deltaGlyphId: this.parseUShort()
    };
  } else if (substFormat === 2) {
    return {
      substFormat: 2,
      coverage: this.parsePointer(Parser.coverage),
      substitute: this.parseOffset16List()
    };
  }
  check.assert(false, "0x" + start.toString(16) + ": lookup type 1 format must be 1 or 2.");
};
subtableParsers[2] = function parseLookup2() {
  var substFormat = this.parseUShort();
  check.argument(substFormat === 1, "GSUB Multiple Substitution Subtable identifier-format must be 1");
  return {
    substFormat,
    coverage: this.parsePointer(Parser.coverage),
    sequences: this.parseListOfLists()
  };
};
subtableParsers[3] = function parseLookup3() {
  var substFormat = this.parseUShort();
  check.argument(substFormat === 1, "GSUB Alternate Substitution Subtable identifier-format must be 1");
  return {
    substFormat,
    coverage: this.parsePointer(Parser.coverage),
    alternateSets: this.parseListOfLists()
  };
};
subtableParsers[4] = function parseLookup4() {
  var substFormat = this.parseUShort();
  check.argument(substFormat === 1, "GSUB ligature table identifier-format must be 1");
  return {
    substFormat,
    coverage: this.parsePointer(Parser.coverage),
    ligatureSets: this.parseListOfLists(function() {
      return {
        ligGlyph: this.parseUShort(),
        components: this.parseUShortList(this.parseUShort() - 1)
      };
    })
  };
};
var lookupRecordDesc = {
  sequenceIndex: Parser.uShort,
  lookupListIndex: Parser.uShort
};
subtableParsers[5] = function parseLookup5() {
  var start = this.offset + this.relativeOffset;
  var substFormat = this.parseUShort();
  if (substFormat === 1) {
    return {
      substFormat,
      coverage: this.parsePointer(Parser.coverage),
      ruleSets: this.parseListOfLists(function() {
        var glyphCount2 = this.parseUShort();
        var substCount2 = this.parseUShort();
        return {
          input: this.parseUShortList(glyphCount2 - 1),
          lookupRecords: this.parseRecordList(substCount2, lookupRecordDesc)
        };
      })
    };
  } else if (substFormat === 2) {
    return {
      substFormat,
      coverage: this.parsePointer(Parser.coverage),
      classDef: this.parsePointer(Parser.classDef),
      classSets: this.parseListOfLists(function() {
        var glyphCount2 = this.parseUShort();
        var substCount2 = this.parseUShort();
        return {
          classes: this.parseUShortList(glyphCount2 - 1),
          lookupRecords: this.parseRecordList(substCount2, lookupRecordDesc)
        };
      })
    };
  } else if (substFormat === 3) {
    var glyphCount = this.parseUShort();
    var substCount = this.parseUShort();
    return {
      substFormat,
      coverages: this.parseList(glyphCount, Parser.pointer(Parser.coverage)),
      lookupRecords: this.parseRecordList(substCount, lookupRecordDesc)
    };
  }
  check.assert(false, "0x" + start.toString(16) + ": lookup type 5 format must be 1, 2 or 3.");
};
subtableParsers[6] = function parseLookup6() {
  var start = this.offset + this.relativeOffset;
  var substFormat = this.parseUShort();
  if (substFormat === 1) {
    return {
      substFormat: 1,
      coverage: this.parsePointer(Parser.coverage),
      chainRuleSets: this.parseListOfLists(function() {
        return {
          backtrack: this.parseUShortList(),
          input: this.parseUShortList(this.parseShort() - 1),
          lookahead: this.parseUShortList(),
          lookupRecords: this.parseRecordList(lookupRecordDesc)
        };
      })
    };
  } else if (substFormat === 2) {
    return {
      substFormat: 2,
      coverage: this.parsePointer(Parser.coverage),
      backtrackClassDef: this.parsePointer(Parser.classDef),
      inputClassDef: this.parsePointer(Parser.classDef),
      lookaheadClassDef: this.parsePointer(Parser.classDef),
      chainClassSet: this.parseListOfLists(function() {
        return {
          backtrack: this.parseUShortList(),
          input: this.parseUShortList(this.parseShort() - 1),
          lookahead: this.parseUShortList(),
          lookupRecords: this.parseRecordList(lookupRecordDesc)
        };
      })
    };
  } else if (substFormat === 3) {
    return {
      substFormat: 3,
      backtrackCoverage: this.parseList(Parser.pointer(Parser.coverage)),
      inputCoverage: this.parseList(Parser.pointer(Parser.coverage)),
      lookaheadCoverage: this.parseList(Parser.pointer(Parser.coverage)),
      lookupRecords: this.parseRecordList(lookupRecordDesc)
    };
  }
  check.assert(false, "0x" + start.toString(16) + ": lookup type 6 format must be 1, 2 or 3.");
};
subtableParsers[7] = function parseLookup7() {
  var substFormat = this.parseUShort();
  check.argument(substFormat === 1, "GSUB Extension Substitution subtable identifier-format must be 1");
  var extensionLookupType = this.parseUShort();
  var extensionParser = new Parser(this.data, this.offset + this.parseULong());
  return {
    substFormat: 1,
    lookupType: extensionLookupType,
    extension: subtableParsers[extensionLookupType].call(extensionParser)
  };
};
subtableParsers[8] = function parseLookup8() {
  var substFormat = this.parseUShort();
  check.argument(substFormat === 1, "GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1");
  return {
    substFormat,
    coverage: this.parsePointer(Parser.coverage),
    backtrackCoverage: this.parseList(Parser.pointer(Parser.coverage)),
    lookaheadCoverage: this.parseList(Parser.pointer(Parser.coverage)),
    substitutes: this.parseUShortList()
  };
};
function parseGsubTable(data, start) {
  start = start || 0;
  var p = new Parser(data, start);
  var tableVersion = p.parseVersion(1);
  check.argument(tableVersion === 1 || tableVersion === 1.1, "Unsupported GSUB table version.");
  if (tableVersion === 1) {
    return {
      version: tableVersion,
      scripts: p.parseScriptList(),
      features: p.parseFeatureList(),
      lookups: p.parseLookupList(subtableParsers)
    };
  } else {
    return {
      version: tableVersion,
      scripts: p.parseScriptList(),
      features: p.parseFeatureList(),
      lookups: p.parseLookupList(subtableParsers),
      variations: p.parseFeatureVariationsList()
    };
  }
}
var subtableMakers = new Array(9);
subtableMakers[1] = function makeLookup1(subtable) {
  if (subtable.substFormat === 1) {
    return new table.Table("substitutionTable", [
      { name: "substFormat", type: "USHORT", value: 1 },
      { name: "coverage", type: "TABLE", value: new table.Coverage(subtable.coverage) },
      { name: "deltaGlyphID", type: "USHORT", value: subtable.deltaGlyphId }
    ]);
  } else {
    return new table.Table("substitutionTable", [
      { name: "substFormat", type: "USHORT", value: 2 },
      { name: "coverage", type: "TABLE", value: new table.Coverage(subtable.coverage) }
    ].concat(table.ushortList("substitute", subtable.substitute)));
  }
};
subtableMakers[2] = function makeLookup2(subtable) {
  check.assert(subtable.substFormat === 1, "Lookup type 2 substFormat must be 1.");
  return new table.Table("substitutionTable", [
    { name: "substFormat", type: "USHORT", value: 1 },
    { name: "coverage", type: "TABLE", value: new table.Coverage(subtable.coverage) }
  ].concat(table.tableList("seqSet", subtable.sequences, function(sequenceSet) {
    return new table.Table("sequenceSetTable", table.ushortList("sequence", sequenceSet));
  })));
};
subtableMakers[3] = function makeLookup3(subtable) {
  check.assert(subtable.substFormat === 1, "Lookup type 3 substFormat must be 1.");
  return new table.Table("substitutionTable", [
    { name: "substFormat", type: "USHORT", value: 1 },
    { name: "coverage", type: "TABLE", value: new table.Coverage(subtable.coverage) }
  ].concat(table.tableList("altSet", subtable.alternateSets, function(alternateSet) {
    return new table.Table("alternateSetTable", table.ushortList("alternate", alternateSet));
  })));
};
subtableMakers[4] = function makeLookup4(subtable) {
  check.assert(subtable.substFormat === 1, "Lookup type 4 substFormat must be 1.");
  return new table.Table("substitutionTable", [
    { name: "substFormat", type: "USHORT", value: 1 },
    { name: "coverage", type: "TABLE", value: new table.Coverage(subtable.coverage) }
  ].concat(table.tableList("ligSet", subtable.ligatureSets, function(ligatureSet) {
    return new table.Table("ligatureSetTable", table.tableList("ligature", ligatureSet, function(ligature) {
      return new table.Table(
        "ligatureTable",
        [{ name: "ligGlyph", type: "USHORT", value: ligature.ligGlyph }].concat(table.ushortList("component", ligature.components, ligature.components.length + 1))
      );
    }));
  })));
};
subtableMakers[6] = function makeLookup6(subtable) {
  if (subtable.substFormat === 1) {
    var returnTable = new table.Table("chainContextTable", [
      { name: "substFormat", type: "USHORT", value: subtable.substFormat },
      { name: "coverage", type: "TABLE", value: new table.Coverage(subtable.coverage) }
    ].concat(table.tableList("chainRuleSet", subtable.chainRuleSets, function(chainRuleSet) {
      return new table.Table("chainRuleSetTable", table.tableList("chainRule", chainRuleSet, function(chainRule) {
        var tableData2 = table.ushortList("backtrackGlyph", chainRule.backtrack, chainRule.backtrack.length).concat(table.ushortList("inputGlyph", chainRule.input, chainRule.input.length + 1)).concat(table.ushortList("lookaheadGlyph", chainRule.lookahead, chainRule.lookahead.length)).concat(table.ushortList("substitution", [], chainRule.lookupRecords.length));
        chainRule.lookupRecords.forEach(function(record, i) {
          tableData2 = tableData2.concat({ name: "sequenceIndex" + i, type: "USHORT", value: record.sequenceIndex }).concat({ name: "lookupListIndex" + i, type: "USHORT", value: record.lookupListIndex });
        });
        return new table.Table("chainRuleTable", tableData2);
      }));
    })));
    return returnTable;
  } else if (subtable.substFormat === 2) {
    check.assert(false, "lookup type 6 format 2 is not yet supported.");
  } else if (subtable.substFormat === 3) {
    var tableData = [
      { name: "substFormat", type: "USHORT", value: subtable.substFormat }
    ];
    tableData.push({ name: "backtrackGlyphCount", type: "USHORT", value: subtable.backtrackCoverage.length });
    subtable.backtrackCoverage.forEach(function(coverage, i) {
      tableData.push({ name: "backtrackCoverage" + i, type: "TABLE", value: new table.Coverage(coverage) });
    });
    tableData.push({ name: "inputGlyphCount", type: "USHORT", value: subtable.inputCoverage.length });
    subtable.inputCoverage.forEach(function(coverage, i) {
      tableData.push({ name: "inputCoverage" + i, type: "TABLE", value: new table.Coverage(coverage) });
    });
    tableData.push({ name: "lookaheadGlyphCount", type: "USHORT", value: subtable.lookaheadCoverage.length });
    subtable.lookaheadCoverage.forEach(function(coverage, i) {
      tableData.push({ name: "lookaheadCoverage" + i, type: "TABLE", value: new table.Coverage(coverage) });
    });
    tableData.push({ name: "substitutionCount", type: "USHORT", value: subtable.lookupRecords.length });
    subtable.lookupRecords.forEach(function(record, i) {
      tableData = tableData.concat({ name: "sequenceIndex" + i, type: "USHORT", value: record.sequenceIndex }).concat({ name: "lookupListIndex" + i, type: "USHORT", value: record.lookupListIndex });
    });
    var returnTable$1 = new table.Table("chainContextTable", tableData);
    return returnTable$1;
  }
  check.assert(false, "lookup type 6 format must be 1, 2 or 3.");
};
function makeGsubTable(gsub2) {
  return new table.Table("GSUB", [
    { name: "version", type: "ULONG", value: 65536 },
    { name: "scripts", type: "TABLE", value: new table.ScriptList(gsub2.scripts) },
    { name: "features", type: "TABLE", value: new table.FeatureList(gsub2.features) },
    { name: "lookups", type: "TABLE", value: new table.LookupList(gsub2.lookups, subtableMakers) }
  ]);
}
var gsub = { parse: parseGsubTable, make: makeGsubTable };
function parseMetaTable(data, start) {
  var p = new parse.Parser(data, start);
  var tableVersion = p.parseULong();
  check.argument(tableVersion === 1, "Unsupported META table version.");
  p.parseULong();
  p.parseULong();
  var numDataMaps = p.parseULong();
  var tags = {};
  for (var i = 0; i < numDataMaps; i++) {
    var tag = p.parseTag();
    var dataOffset = p.parseULong();
    var dataLength = p.parseULong();
    var text = decode.UTF8(data, start + dataOffset, dataLength);
    tags[tag] = text;
  }
  return tags;
}
function makeMetaTable(tags) {
  var numTags = Object.keys(tags).length;
  var stringPool = "";
  var stringPoolOffset = 16 + numTags * 12;
  var result = new table.Table("meta", [
    { name: "version", type: "ULONG", value: 1 },
    { name: "flags", type: "ULONG", value: 0 },
    { name: "offset", type: "ULONG", value: stringPoolOffset },
    { name: "numTags", type: "ULONG", value: numTags }
  ]);
  for (var tag in tags) {
    var pos = stringPool.length;
    stringPool += tags[tag];
    result.fields.push({ name: "tag " + tag, type: "TAG", value: tag });
    result.fields.push({ name: "offset " + tag, type: "ULONG", value: stringPoolOffset + pos });
    result.fields.push({ name: "length " + tag, type: "ULONG", value: tags[tag].length });
  }
  result.fields.push({ name: "stringPool", type: "CHARARRAY", value: stringPool });
  return result;
}
var meta = { parse: parseMetaTable, make: makeMetaTable };
function log2(v) {
  return Math.log(v) / Math.log(2) | 0;
}
function computeCheckSum(bytes) {
  while (bytes.length % 4 !== 0) {
    bytes.push(0);
  }
  var sum = 0;
  for (var i = 0; i < bytes.length; i += 4) {
    sum += (bytes[i] << 24) + (bytes[i + 1] << 16) + (bytes[i + 2] << 8) + bytes[i + 3];
  }
  sum %= Math.pow(2, 32);
  return sum;
}
function makeTableRecord(tag, checkSum, offset, length) {
  return new table.Record("Table Record", [
    { name: "tag", type: "TAG", value: tag !== void 0 ? tag : "" },
    { name: "checkSum", type: "ULONG", value: checkSum !== void 0 ? checkSum : 0 },
    { name: "offset", type: "ULONG", value: offset !== void 0 ? offset : 0 },
    { name: "length", type: "ULONG", value: length !== void 0 ? length : 0 }
  ]);
}
function makeSfntTable(tables) {
  var sfnt2 = new table.Table("sfnt", [
    { name: "version", type: "TAG", value: "OTTO" },
    { name: "numTables", type: "USHORT", value: 0 },
    { name: "searchRange", type: "USHORT", value: 0 },
    { name: "entrySelector", type: "USHORT", value: 0 },
    { name: "rangeShift", type: "USHORT", value: 0 }
  ]);
  sfnt2.tables = tables;
  sfnt2.numTables = tables.length;
  var highestPowerOf2 = Math.pow(2, log2(sfnt2.numTables));
  sfnt2.searchRange = 16 * highestPowerOf2;
  sfnt2.entrySelector = log2(highestPowerOf2);
  sfnt2.rangeShift = sfnt2.numTables * 16 - sfnt2.searchRange;
  var recordFields = [];
  var tableFields = [];
  var offset = sfnt2.sizeOf() + makeTableRecord().sizeOf() * sfnt2.numTables;
  while (offset % 4 !== 0) {
    offset += 1;
    tableFields.push({ name: "padding", type: "BYTE", value: 0 });
  }
  for (var i = 0; i < tables.length; i += 1) {
    var t = tables[i];
    check.argument(t.tableName.length === 4, "Table name" + t.tableName + " is invalid.");
    var tableLength = t.sizeOf();
    var tableRecord = makeTableRecord(t.tableName, computeCheckSum(t.encode()), offset, tableLength);
    recordFields.push({ name: tableRecord.tag + " Table Record", type: "RECORD", value: tableRecord });
    tableFields.push({ name: t.tableName + " table", type: "RECORD", value: t });
    offset += tableLength;
    check.argument(!isNaN(offset), "Something went wrong calculating the offset.");
    while (offset % 4 !== 0) {
      offset += 1;
      tableFields.push({ name: "padding", type: "BYTE", value: 0 });
    }
  }
  recordFields.sort(function(r1, r2) {
    if (r1.value.tag > r2.value.tag) {
      return 1;
    } else {
      return -1;
    }
  });
  sfnt2.fields = sfnt2.fields.concat(recordFields);
  sfnt2.fields = sfnt2.fields.concat(tableFields);
  return sfnt2;
}
function metricsForChar(font, chars, notFoundMetrics) {
  for (var i = 0; i < chars.length; i += 1) {
    var glyphIndex = font.charToGlyphIndex(chars[i]);
    if (glyphIndex > 0) {
      var glyph = font.glyphs.get(glyphIndex);
      return glyph.getMetrics();
    }
  }
  return notFoundMetrics;
}
function average(vs) {
  var sum = 0;
  for (var i = 0; i < vs.length; i += 1) {
    sum += vs[i];
  }
  return sum / vs.length;
}
function fontToSfntTable(font) {
  var xMins = [];
  var yMins = [];
  var xMaxs = [];
  var yMaxs = [];
  var advanceWidths = [];
  var leftSideBearings = [];
  var rightSideBearings = [];
  var firstCharIndex;
  var lastCharIndex = 0;
  var ulUnicodeRange1 = 0;
  var ulUnicodeRange2 = 0;
  var ulUnicodeRange3 = 0;
  var ulUnicodeRange4 = 0;
  for (var i = 0; i < font.glyphs.length; i += 1) {
    var glyph = font.glyphs.get(i);
    var unicode = glyph.unicode | 0;
    if (isNaN(glyph.advanceWidth)) {
      throw new Error("Glyph " + glyph.name + " (" + i + "): advanceWidth is not a number.");
    }
    if (firstCharIndex > unicode || firstCharIndex === void 0) {
      if (unicode > 0) {
        firstCharIndex = unicode;
      }
    }
    if (lastCharIndex < unicode) {
      lastCharIndex = unicode;
    }
    var position = os2.getUnicodeRange(unicode);
    if (position < 32) {
      ulUnicodeRange1 |= 1 << position;
    } else if (position < 64) {
      ulUnicodeRange2 |= 1 << position - 32;
    } else if (position < 96) {
      ulUnicodeRange3 |= 1 << position - 64;
    } else if (position < 123) {
      ulUnicodeRange4 |= 1 << position - 96;
    } else {
      throw new Error("Unicode ranges bits > 123 are reserved for internal usage");
    }
    if (glyph.name === ".notdef") {
      continue;
    }
    var metrics = glyph.getMetrics();
    xMins.push(metrics.xMin);
    yMins.push(metrics.yMin);
    xMaxs.push(metrics.xMax);
    yMaxs.push(metrics.yMax);
    leftSideBearings.push(metrics.leftSideBearing);
    rightSideBearings.push(metrics.rightSideBearing);
    advanceWidths.push(glyph.advanceWidth);
  }
  var globals = {
    xMin: Math.min.apply(null, xMins),
    yMin: Math.min.apply(null, yMins),
    xMax: Math.max.apply(null, xMaxs),
    yMax: Math.max.apply(null, yMaxs),
    advanceWidthMax: Math.max.apply(null, advanceWidths),
    advanceWidthAvg: average(advanceWidths),
    minLeftSideBearing: Math.min.apply(null, leftSideBearings),
    maxLeftSideBearing: Math.max.apply(null, leftSideBearings),
    minRightSideBearing: Math.min.apply(null, rightSideBearings)
  };
  globals.ascender = font.ascender;
  globals.descender = font.descender;
  var headTable = head.make({
    flags: 3,
    // 00000011 (baseline for font at y=0; left sidebearing point at x=0)
    unitsPerEm: font.unitsPerEm,
    xMin: globals.xMin,
    yMin: globals.yMin,
    xMax: globals.xMax,
    yMax: globals.yMax,
    lowestRecPPEM: 3,
    createdTimestamp: font.createdTimestamp
  });
  var hheaTable = hhea.make({
    ascender: globals.ascender,
    descender: globals.descender,
    advanceWidthMax: globals.advanceWidthMax,
    minLeftSideBearing: globals.minLeftSideBearing,
    minRightSideBearing: globals.minRightSideBearing,
    xMaxExtent: globals.maxLeftSideBearing + (globals.xMax - globals.xMin),
    numberOfHMetrics: font.glyphs.length
  });
  var maxpTable = maxp.make(font.glyphs.length);
  var os2Table = os2.make(Object.assign({
    xAvgCharWidth: Math.round(globals.advanceWidthAvg),
    usFirstCharIndex: firstCharIndex,
    usLastCharIndex: lastCharIndex,
    ulUnicodeRange1,
    ulUnicodeRange2,
    ulUnicodeRange3,
    ulUnicodeRange4,
    // See http://typophile.com/node/13081 for more info on vertical metrics.
    // We get metrics for typical characters (such as "x" for xHeight).
    // We provide some fallback characters if characters are unavailable: their
    // ordering was chosen experimentally.
    sTypoAscender: globals.ascender,
    sTypoDescender: globals.descender,
    sTypoLineGap: 0,
    usWinAscent: globals.yMax,
    usWinDescent: Math.abs(globals.yMin),
    ulCodePageRange1: 1,
    // FIXME: hard-code Latin 1 support for now
    sxHeight: metricsForChar(font, "xyvw", { yMax: Math.round(globals.ascender / 2) }).yMax,
    sCapHeight: metricsForChar(font, "HIKLEFJMNTZBDPRAGOQSUVWXY", globals).yMax,
    usDefaultChar: font.hasChar(" ") ? 32 : 0,
    // Use space as the default character, if available.
    usBreakChar: font.hasChar(" ") ? 32 : 0
    // Use space as the break character, if available.
  }, font.tables.os2));
  var hmtxTable = hmtx.make(font.glyphs);
  var cmapTable = cmap.make(font.glyphs);
  var englishFamilyName = font.getEnglishName("fontFamily");
  var englishStyleName = font.getEnglishName("fontSubfamily");
  var englishFullName = englishFamilyName + " " + englishStyleName;
  var postScriptName = font.getEnglishName("postScriptName");
  if (!postScriptName) {
    postScriptName = englishFamilyName.replace(/\s/g, "") + "-" + englishStyleName;
  }
  var names = {};
  for (var n in font.names) {
    names[n] = font.names[n];
  }
  if (!names.uniqueID) {
    names.uniqueID = { en: font.getEnglishName("manufacturer") + ":" + englishFullName };
  }
  if (!names.postScriptName) {
    names.postScriptName = { en: postScriptName };
  }
  if (!names.preferredFamily) {
    names.preferredFamily = font.names.fontFamily;
  }
  if (!names.preferredSubfamily) {
    names.preferredSubfamily = font.names.fontSubfamily;
  }
  var languageTags = [];
  var nameTable = _name.make(names, languageTags);
  var ltagTable = languageTags.length > 0 ? ltag.make(languageTags) : void 0;
  var postTable = post.make();
  var cffTable = cff.make(font.glyphs, {
    version: font.getEnglishName("version"),
    fullName: englishFullName,
    familyName: englishFamilyName,
    weightName: englishStyleName,
    postScriptName,
    unitsPerEm: font.unitsPerEm,
    fontBBox: [0, globals.yMin, globals.ascender, globals.advanceWidthMax]
  });
  var metaTable = font.metas && Object.keys(font.metas).length > 0 ? meta.make(font.metas) : void 0;
  var tables = [headTable, hheaTable, maxpTable, os2Table, nameTable, cmapTable, postTable, cffTable, hmtxTable];
  if (ltagTable) {
    tables.push(ltagTable);
  }
  if (font.tables.gsub) {
    tables.push(gsub.make(font.tables.gsub));
  }
  if (metaTable) {
    tables.push(metaTable);
  }
  var sfntTable = makeSfntTable(tables);
  var bytes = sfntTable.encode();
  var checkSum = computeCheckSum(bytes);
  var tableFields = sfntTable.fields;
  var checkSumAdjusted = false;
  for (var i$1 = 0; i$1 < tableFields.length; i$1 += 1) {
    if (tableFields[i$1].name === "head table") {
      tableFields[i$1].value.checkSumAdjustment = 2981146554 - checkSum;
      checkSumAdjusted = true;
      break;
    }
  }
  if (!checkSumAdjusted) {
    throw new Error("Could not find head table with checkSum to adjust.");
  }
  return sfntTable;
}
var sfnt = { make: makeSfntTable, fontToTable: fontToSfntTable, computeCheckSum };
function searchTag(arr, tag) {
  var imin = 0;
  var imax = arr.length - 1;
  while (imin <= imax) {
    var imid = imin + imax >>> 1;
    var val = arr[imid].tag;
    if (val === tag) {
      return imid;
    } else if (val < tag) {
      imin = imid + 1;
    } else {
      imax = imid - 1;
    }
  }
  return -imin - 1;
}
function binSearch(arr, value) {
  var imin = 0;
  var imax = arr.length - 1;
  while (imin <= imax) {
    var imid = imin + imax >>> 1;
    var val = arr[imid];
    if (val === value) {
      return imid;
    } else if (val < value) {
      imin = imid + 1;
    } else {
      imax = imid - 1;
    }
  }
  return -imin - 1;
}
function searchRange(ranges, value) {
  var range;
  var imin = 0;
  var imax = ranges.length - 1;
  while (imin <= imax) {
    var imid = imin + imax >>> 1;
    range = ranges[imid];
    var start = range.start;
    if (start === value) {
      return range;
    } else if (start < value) {
      imin = imid + 1;
    } else {
      imax = imid - 1;
    }
  }
  if (imin > 0) {
    range = ranges[imin - 1];
    if (value > range.end) {
      return 0;
    }
    return range;
  }
}
function Layout(font, tableName) {
  this.font = font;
  this.tableName = tableName;
}
Layout.prototype = {
  /**
   * Binary search an object by "tag" property
   * @instance
   * @function searchTag
   * @memberof opentype.Layout
   * @param  {Array} arr
   * @param  {string} tag
   * @return {number}
   */
  searchTag,
  /**
   * Binary search in a list of numbers
   * @instance
   * @function binSearch
   * @memberof opentype.Layout
   * @param  {Array} arr
   * @param  {number} value
   * @return {number}
   */
  binSearch,
  /**
   * Get or create the Layout table (GSUB, GPOS etc).
   * @param  {boolean} create - Whether to create a new one.
   * @return {Object} The GSUB or GPOS table.
   */
  getTable: function(create) {
    var layout = this.font.tables[this.tableName];
    if (!layout && create) {
      layout = this.font.tables[this.tableName] = this.createDefaultTable();
    }
    return layout;
  },
  /**
   * Returns all scripts in the substitution table.
   * @instance
   * @return {Array}
   */
  getScriptNames: function() {
    var layout = this.getTable();
    if (!layout) {
      return [];
    }
    return layout.scripts.map(function(script) {
      return script.tag;
    });
  },
  /**
   * Returns the best bet for a script name.
   * Returns 'DFLT' if it exists.
   * If not, returns 'latn' if it exists.
   * If neither exist, returns undefined.
   */
  getDefaultScriptName: function() {
    var layout = this.getTable();
    if (!layout) {
      return;
    }
    var hasLatn = false;
    for (var i = 0; i < layout.scripts.length; i++) {
      var name = layout.scripts[i].tag;
      if (name === "DFLT") {
        return name;
      }
      if (name === "latn") {
        hasLatn = true;
      }
    }
    if (hasLatn) {
      return "latn";
    }
  },
  /**
   * Returns all LangSysRecords in the given script.
   * @instance
   * @param {string} [script='DFLT']
   * @param {boolean} create - forces the creation of this script table if it doesn't exist.
   * @return {Object} An object with tag and script properties.
   */
  getScriptTable: function(script, create) {
    var layout = this.getTable(create);
    if (layout) {
      script = script || "DFLT";
      var scripts = layout.scripts;
      var pos = searchTag(layout.scripts, script);
      if (pos >= 0) {
        return scripts[pos].script;
      } else if (create) {
        var scr = {
          tag: script,
          script: {
            defaultLangSys: { reserved: 0, reqFeatureIndex: 65535, featureIndexes: [] },
            langSysRecords: []
          }
        };
        scripts.splice(-1 - pos, 0, scr);
        return scr.script;
      }
    }
  },
  /**
   * Returns a language system table
   * @instance
   * @param {string} [script='DFLT']
   * @param {string} [language='dlft']
   * @param {boolean} create - forces the creation of this langSysTable if it doesn't exist.
   * @return {Object}
   */
  getLangSysTable: function(script, language, create) {
    var scriptTable = this.getScriptTable(script, create);
    if (scriptTable) {
      if (!language || language === "dflt" || language === "DFLT") {
        return scriptTable.defaultLangSys;
      }
      var pos = searchTag(scriptTable.langSysRecords, language);
      if (pos >= 0) {
        return scriptTable.langSysRecords[pos].langSys;
      } else if (create) {
        var langSysRecord = {
          tag: language,
          langSys: { reserved: 0, reqFeatureIndex: 65535, featureIndexes: [] }
        };
        scriptTable.langSysRecords.splice(-1 - pos, 0, langSysRecord);
        return langSysRecord.langSys;
      }
    }
  },
  /**
   * Get a specific feature table.
   * @instance
   * @param {string} [script='DFLT']
   * @param {string} [language='dlft']
   * @param {string} feature - One of the codes listed at https://www.microsoft.com/typography/OTSPEC/featurelist.htm
   * @param {boolean} create - forces the creation of the feature table if it doesn't exist.
   * @return {Object}
   */
  getFeatureTable: function(script, language, feature, create) {
    var langSysTable2 = this.getLangSysTable(script, language, create);
    if (langSysTable2) {
      var featureRecord;
      var featIndexes = langSysTable2.featureIndexes;
      var allFeatures = this.font.tables[this.tableName].features;
      for (var i = 0; i < featIndexes.length; i++) {
        featureRecord = allFeatures[featIndexes[i]];
        if (featureRecord.tag === feature) {
          return featureRecord.feature;
        }
      }
      if (create) {
        var index = allFeatures.length;
        check.assert(index === 0 || feature >= allFeatures[index - 1].tag, "Features must be added in alphabetical order.");
        featureRecord = {
          tag: feature,
          feature: { params: 0, lookupListIndexes: [] }
        };
        allFeatures.push(featureRecord);
        featIndexes.push(index);
        return featureRecord.feature;
      }
    }
  },
  /**
   * Get the lookup tables of a given type for a script/language/feature.
   * @instance
   * @param {string} [script='DFLT']
   * @param {string} [language='dlft']
   * @param {string} feature - 4-letter feature code
   * @param {number} lookupType - 1 to 9
   * @param {boolean} create - forces the creation of the lookup table if it doesn't exist, with no subtables.
   * @return {Object[]}
   */
  getLookupTables: function(script, language, feature, lookupType, create) {
    var featureTable = this.getFeatureTable(script, language, feature, create);
    var tables = [];
    if (featureTable) {
      var lookupTable;
      var lookupListIndexes = featureTable.lookupListIndexes;
      var allLookups = this.font.tables[this.tableName].lookups;
      for (var i = 0; i < lookupListIndexes.length; i++) {
        lookupTable = allLookups[lookupListIndexes[i]];
        if (lookupTable.lookupType === lookupType) {
          tables.push(lookupTable);
        }
      }
      if (tables.length === 0 && create) {
        lookupTable = {
          lookupType,
          lookupFlag: 0,
          subtables: [],
          markFilteringSet: void 0
        };
        var index = allLookups.length;
        allLookups.push(lookupTable);
        lookupListIndexes.push(index);
        return [lookupTable];
      }
    }
    return tables;
  },
  /**
   * Find a glyph in a class definition table
   * https://docs.microsoft.com/en-us/typography/opentype/spec/chapter2#class-definition-table
   * @param {object} classDefTable - an OpenType Layout class definition table
   * @param {number} glyphIndex - the index of the glyph to find
   * @returns {number} -1 if not found
   */
  getGlyphClass: function(classDefTable, glyphIndex) {
    switch (classDefTable.format) {
      case 1:
        if (classDefTable.startGlyph <= glyphIndex && glyphIndex < classDefTable.startGlyph + classDefTable.classes.length) {
          return classDefTable.classes[glyphIndex - classDefTable.startGlyph];
        }
        return 0;
      case 2:
        var range = searchRange(classDefTable.ranges, glyphIndex);
        return range ? range.classId : 0;
    }
  },
  /**
   * Find a glyph in a coverage table
   * https://docs.microsoft.com/en-us/typography/opentype/spec/chapter2#coverage-table
   * @param {object} coverageTable - an OpenType Layout coverage table
   * @param {number} glyphIndex - the index of the glyph to find
   * @returns {number} -1 if not found
   */
  getCoverageIndex: function(coverageTable, glyphIndex) {
    switch (coverageTable.format) {
      case 1:
        var index = binSearch(coverageTable.glyphs, glyphIndex);
        return index >= 0 ? index : -1;
      case 2:
        var range = searchRange(coverageTable.ranges, glyphIndex);
        return range ? range.index + glyphIndex - range.start : -1;
    }
  },
  /**
   * Returns the list of glyph indexes of a coverage table.
   * Format 1: the list is stored raw
   * Format 2: compact list as range records.
   * @instance
   * @param  {Object} coverageTable
   * @return {Array}
   */
  expandCoverage: function(coverageTable) {
    if (coverageTable.format === 1) {
      return coverageTable.glyphs;
    } else {
      var glyphs = [];
      var ranges = coverageTable.ranges;
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        var start = range.start;
        var end = range.end;
        for (var j = start; j <= end; j++) {
          glyphs.push(j);
        }
      }
      return glyphs;
    }
  }
};
function Position(font) {
  Layout.call(this, font, "gpos");
}
Position.prototype = Layout.prototype;
Position.prototype.init = function() {
  var script = this.getDefaultScriptName();
  this.defaultKerningTables = this.getKerningTables(script);
};
Position.prototype.getKerningValue = function(kerningLookups, leftIndex, rightIndex) {
  for (var i = 0; i < kerningLookups.length; i++) {
    var subtables = kerningLookups[i].subtables;
    for (var j = 0; j < subtables.length; j++) {
      var subtable = subtables[j];
      var covIndex = this.getCoverageIndex(subtable.coverage, leftIndex);
      if (covIndex < 0) {
        continue;
      }
      switch (subtable.posFormat) {
        case 1:
          var pairSet = subtable.pairSets[covIndex];
          for (var k = 0; k < pairSet.length; k++) {
            var pair = pairSet[k];
            if (pair.secondGlyph === rightIndex) {
              return pair.value1 && pair.value1.xAdvance || 0;
            }
          }
          break;
        case 2:
          var class1 = this.getGlyphClass(subtable.classDef1, leftIndex);
          var class2 = this.getGlyphClass(subtable.classDef2, rightIndex);
          var pair$1 = subtable.classRecords[class1][class2];
          return pair$1.value1 && pair$1.value1.xAdvance || 0;
      }
    }
  }
  return 0;
};
Position.prototype.getKerningTables = function(script, language) {
  if (this.font.tables.gpos) {
    return this.getLookupTables(script, language, "kern", 2);
  }
};
function Substitution(font) {
  Layout.call(this, font, "gsub");
}
function arraysEqual(ar1, ar2) {
  var n = ar1.length;
  if (n !== ar2.length) {
    return false;
  }
  for (var i = 0; i < n; i++) {
    if (ar1[i] !== ar2[i]) {
      return false;
    }
  }
  return true;
}
function getSubstFormat(lookupTable, format, defaultSubtable) {
  var subtables = lookupTable.subtables;
  for (var i = 0; i < subtables.length; i++) {
    var subtable = subtables[i];
    if (subtable.substFormat === format) {
      return subtable;
    }
  }
  if (defaultSubtable) {
    subtables.push(defaultSubtable);
    return defaultSubtable;
  }
  return void 0;
}
Substitution.prototype = Layout.prototype;
Substitution.prototype.createDefaultTable = function() {
  return {
    version: 1,
    scripts: [{
      tag: "DFLT",
      script: {
        defaultLangSys: { reserved: 0, reqFeatureIndex: 65535, featureIndexes: [] },
        langSysRecords: []
      }
    }],
    features: [],
    lookups: []
  };
};
Substitution.prototype.getSingle = function(feature, script, language) {
  var substitutions = [];
  var lookupTables = this.getLookupTables(script, language, feature, 1);
  for (var idx = 0; idx < lookupTables.length; idx++) {
    var subtables = lookupTables[idx].subtables;
    for (var i = 0; i < subtables.length; i++) {
      var subtable = subtables[i];
      var glyphs = this.expandCoverage(subtable.coverage);
      var j = void 0;
      if (subtable.substFormat === 1) {
        var delta = subtable.deltaGlyphId;
        for (j = 0; j < glyphs.length; j++) {
          var glyph = glyphs[j];
          substitutions.push({ sub: glyph, by: glyph + delta });
        }
      } else {
        var substitute = subtable.substitute;
        for (j = 0; j < glyphs.length; j++) {
          substitutions.push({ sub: glyphs[j], by: substitute[j] });
        }
      }
    }
  }
  return substitutions;
};
Substitution.prototype.getMultiple = function(feature, script, language) {
  var substitutions = [];
  var lookupTables = this.getLookupTables(script, language, feature, 2);
  for (var idx = 0; idx < lookupTables.length; idx++) {
    var subtables = lookupTables[idx].subtables;
    for (var i = 0; i < subtables.length; i++) {
      var subtable = subtables[i];
      var glyphs = this.expandCoverage(subtable.coverage);
      var j = void 0;
      for (j = 0; j < glyphs.length; j++) {
        var glyph = glyphs[j];
        var replacements = subtable.sequences[j];
        substitutions.push({ sub: glyph, by: replacements });
      }
    }
  }
  return substitutions;
};
Substitution.prototype.getAlternates = function(feature, script, language) {
  var alternates = [];
  var lookupTables = this.getLookupTables(script, language, feature, 3);
  for (var idx = 0; idx < lookupTables.length; idx++) {
    var subtables = lookupTables[idx].subtables;
    for (var i = 0; i < subtables.length; i++) {
      var subtable = subtables[i];
      var glyphs = this.expandCoverage(subtable.coverage);
      var alternateSets = subtable.alternateSets;
      for (var j = 0; j < glyphs.length; j++) {
        alternates.push({ sub: glyphs[j], by: alternateSets[j] });
      }
    }
  }
  return alternates;
};
Substitution.prototype.getLigatures = function(feature, script, language) {
  var ligatures = [];
  var lookupTables = this.getLookupTables(script, language, feature, 4);
  for (var idx = 0; idx < lookupTables.length; idx++) {
    var subtables = lookupTables[idx].subtables;
    for (var i = 0; i < subtables.length; i++) {
      var subtable = subtables[i];
      var glyphs = this.expandCoverage(subtable.coverage);
      var ligatureSets = subtable.ligatureSets;
      for (var j = 0; j < glyphs.length; j++) {
        var startGlyph = glyphs[j];
        var ligSet = ligatureSets[j];
        for (var k = 0; k < ligSet.length; k++) {
          var lig = ligSet[k];
          ligatures.push({
            sub: [startGlyph].concat(lig.components),
            by: lig.ligGlyph
          });
        }
      }
    }
  }
  return ligatures;
};
Substitution.prototype.addSingle = function(feature, substitution, script, language) {
  var lookupTable = this.getLookupTables(script, language, feature, 1, true)[0];
  var subtable = getSubstFormat(lookupTable, 2, {
    // lookup type 1 subtable, format 2, coverage format 1
    substFormat: 2,
    coverage: { format: 1, glyphs: [] },
    substitute: []
  });
  check.assert(subtable.coverage.format === 1, "Single: unable to modify coverage table format " + subtable.coverage.format);
  var coverageGlyph = substitution.sub;
  var pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
  if (pos < 0) {
    pos = -1 - pos;
    subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
    subtable.substitute.splice(pos, 0, 0);
  }
  subtable.substitute[pos] = substitution.by;
};
Substitution.prototype.addMultiple = function(feature, substitution, script, language) {
  check.assert(substitution.by instanceof Array && substitution.by.length > 1, 'Multiple: "by" must be an array of two or more ids');
  var lookupTable = this.getLookupTables(script, language, feature, 2, true)[0];
  var subtable = getSubstFormat(lookupTable, 1, {
    // lookup type 2 subtable, format 1, coverage format 1
    substFormat: 1,
    coverage: { format: 1, glyphs: [] },
    sequences: []
  });
  check.assert(subtable.coverage.format === 1, "Multiple: unable to modify coverage table format " + subtable.coverage.format);
  var coverageGlyph = substitution.sub;
  var pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
  if (pos < 0) {
    pos = -1 - pos;
    subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
    subtable.sequences.splice(pos, 0, 0);
  }
  subtable.sequences[pos] = substitution.by;
};
Substitution.prototype.addAlternate = function(feature, substitution, script, language) {
  var lookupTable = this.getLookupTables(script, language, feature, 3, true)[0];
  var subtable = getSubstFormat(lookupTable, 1, {
    // lookup type 3 subtable, format 1, coverage format 1
    substFormat: 1,
    coverage: { format: 1, glyphs: [] },
    alternateSets: []
  });
  check.assert(subtable.coverage.format === 1, "Alternate: unable to modify coverage table format " + subtable.coverage.format);
  var coverageGlyph = substitution.sub;
  var pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
  if (pos < 0) {
    pos = -1 - pos;
    subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
    subtable.alternateSets.splice(pos, 0, 0);
  }
  subtable.alternateSets[pos] = substitution.by;
};
Substitution.prototype.addLigature = function(feature, ligature, script, language) {
  var lookupTable = this.getLookupTables(script, language, feature, 4, true)[0];
  var subtable = lookupTable.subtables[0];
  if (!subtable) {
    subtable = {
      // lookup type 4 subtable, format 1, coverage format 1
      substFormat: 1,
      coverage: { format: 1, glyphs: [] },
      ligatureSets: []
    };
    lookupTable.subtables[0] = subtable;
  }
  check.assert(subtable.coverage.format === 1, "Ligature: unable to modify coverage table format " + subtable.coverage.format);
  var coverageGlyph = ligature.sub[0];
  var ligComponents = ligature.sub.slice(1);
  var ligatureTable = {
    ligGlyph: ligature.by,
    components: ligComponents
  };
  var pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
  if (pos >= 0) {
    var ligatureSet = subtable.ligatureSets[pos];
    for (var i = 0; i < ligatureSet.length; i++) {
      if (arraysEqual(ligatureSet[i].components, ligComponents)) {
        return;
      }
    }
    ligatureSet.push(ligatureTable);
  } else {
    pos = -1 - pos;
    subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
    subtable.ligatureSets.splice(pos, 0, [ligatureTable]);
  }
};
Substitution.prototype.getFeature = function(feature, script, language) {
  if (/ss\d\d/.test(feature)) {
    return this.getSingle(feature, script, language);
  }
  switch (feature) {
    case "aalt":
    case "salt":
      return this.getSingle(feature, script, language).concat(this.getAlternates(feature, script, language));
    case "dlig":
    case "liga":
    case "rlig":
      return this.getLigatures(feature, script, language);
    case "ccmp":
      return this.getMultiple(feature, script, language).concat(this.getLigatures(feature, script, language));
    case "stch":
      return this.getMultiple(feature, script, language);
  }
  return void 0;
};
Substitution.prototype.add = function(feature, sub, script, language) {
  if (/ss\d\d/.test(feature)) {
    return this.addSingle(feature, sub, script, language);
  }
  switch (feature) {
    case "aalt":
    case "salt":
      if (typeof sub.by === "number") {
        return this.addSingle(feature, sub, script, language);
      }
      return this.addAlternate(feature, sub, script, language);
    case "dlig":
    case "liga":
    case "rlig":
      return this.addLigature(feature, sub, script, language);
    case "ccmp":
      if (sub.by instanceof Array) {
        return this.addMultiple(feature, sub, script, language);
      }
      return this.addLigature(feature, sub, script, language);
  }
  return void 0;
};
function isBrowser() {
  return typeof window !== "undefined";
}
function nodeBufferToArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}
function arrayBufferToNodeBuffer(ab) {
  var buffer = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}
function checkArgument(expression, message) {
  if (!expression) {
    throw message;
  }
}
function parseGlyphCoordinate(p, flag, previousValue, shortVectorBitMask, sameBitMask) {
  var v;
  if ((flag & shortVectorBitMask) > 0) {
    v = p.parseByte();
    if ((flag & sameBitMask) === 0) {
      v = -v;
    }
    v = previousValue + v;
  } else {
    if ((flag & sameBitMask) > 0) {
      v = previousValue;
    } else {
      v = previousValue + p.parseShort();
    }
  }
  return v;
}
function parseGlyph(glyph, data, start) {
  var p = new parse.Parser(data, start);
  glyph.numberOfContours = p.parseShort();
  glyph._xMin = p.parseShort();
  glyph._yMin = p.parseShort();
  glyph._xMax = p.parseShort();
  glyph._yMax = p.parseShort();
  var flags;
  var flag;
  if (glyph.numberOfContours > 0) {
    var endPointIndices = glyph.endPointIndices = [];
    for (var i = 0; i < glyph.numberOfContours; i += 1) {
      endPointIndices.push(p.parseUShort());
    }
    glyph.instructionLength = p.parseUShort();
    glyph.instructions = [];
    for (var i$1 = 0; i$1 < glyph.instructionLength; i$1 += 1) {
      glyph.instructions.push(p.parseByte());
    }
    var numberOfCoordinates = endPointIndices[endPointIndices.length - 1] + 1;
    flags = [];
    for (var i$2 = 0; i$2 < numberOfCoordinates; i$2 += 1) {
      flag = p.parseByte();
      flags.push(flag);
      if ((flag & 8) > 0) {
        var repeatCount = p.parseByte();
        for (var j = 0; j < repeatCount; j += 1) {
          flags.push(flag);
          i$2 += 1;
        }
      }
    }
    check.argument(flags.length === numberOfCoordinates, "Bad flags.");
    if (endPointIndices.length > 0) {
      var points = [];
      var point;
      if (numberOfCoordinates > 0) {
        for (var i$3 = 0; i$3 < numberOfCoordinates; i$3 += 1) {
          flag = flags[i$3];
          point = {};
          point.onCurve = !!(flag & 1);
          point.lastPointOfContour = endPointIndices.indexOf(i$3) >= 0;
          points.push(point);
        }
        var px = 0;
        for (var i$4 = 0; i$4 < numberOfCoordinates; i$4 += 1) {
          flag = flags[i$4];
          point = points[i$4];
          point.x = parseGlyphCoordinate(p, flag, px, 2, 16);
          px = point.x;
        }
        var py = 0;
        for (var i$5 = 0; i$5 < numberOfCoordinates; i$5 += 1) {
          flag = flags[i$5];
          point = points[i$5];
          point.y = parseGlyphCoordinate(p, flag, py, 4, 32);
          py = point.y;
        }
      }
      glyph.points = points;
    } else {
      glyph.points = [];
    }
  } else if (glyph.numberOfContours === 0) {
    glyph.points = [];
  } else {
    glyph.isComposite = true;
    glyph.points = [];
    glyph.components = [];
    var moreComponents = true;
    while (moreComponents) {
      flags = p.parseUShort();
      var component = {
        glyphIndex: p.parseUShort(),
        xScale: 1,
        scale01: 0,
        scale10: 0,
        yScale: 1,
        dx: 0,
        dy: 0
      };
      if ((flags & 1) > 0) {
        if ((flags & 2) > 0) {
          component.dx = p.parseShort();
          component.dy = p.parseShort();
        } else {
          component.matchedPoints = [p.parseUShort(), p.parseUShort()];
        }
      } else {
        if ((flags & 2) > 0) {
          component.dx = p.parseChar();
          component.dy = p.parseChar();
        } else {
          component.matchedPoints = [p.parseByte(), p.parseByte()];
        }
      }
      if ((flags & 8) > 0) {
        component.xScale = component.yScale = p.parseF2Dot14();
      } else if ((flags & 64) > 0) {
        component.xScale = p.parseF2Dot14();
        component.yScale = p.parseF2Dot14();
      } else if ((flags & 128) > 0) {
        component.xScale = p.parseF2Dot14();
        component.scale01 = p.parseF2Dot14();
        component.scale10 = p.parseF2Dot14();
        component.yScale = p.parseF2Dot14();
      }
      glyph.components.push(component);
      moreComponents = !!(flags & 32);
    }
    if (flags & 256) {
      glyph.instructionLength = p.parseUShort();
      glyph.instructions = [];
      for (var i$6 = 0; i$6 < glyph.instructionLength; i$6 += 1) {
        glyph.instructions.push(p.parseByte());
      }
    }
  }
}
function transformPoints(points, transform) {
  var newPoints = [];
  for (var i = 0; i < points.length; i += 1) {
    var pt = points[i];
    var newPt = {
      x: transform.xScale * pt.x + transform.scale01 * pt.y + transform.dx,
      y: transform.scale10 * pt.x + transform.yScale * pt.y + transform.dy,
      onCurve: pt.onCurve,
      lastPointOfContour: pt.lastPointOfContour
    };
    newPoints.push(newPt);
  }
  return newPoints;
}
function getContours(points) {
  var contours = [];
  var currentContour = [];
  for (var i = 0; i < points.length; i += 1) {
    var pt = points[i];
    currentContour.push(pt);
    if (pt.lastPointOfContour) {
      contours.push(currentContour);
      currentContour = [];
    }
  }
  check.argument(currentContour.length === 0, "There are still points left in the current contour.");
  return contours;
}
function getPath(points) {
  var p = new Path();
  if (!points) {
    return p;
  }
  var contours = getContours(points);
  for (var contourIndex = 0; contourIndex < contours.length; ++contourIndex) {
    var contour = contours[contourIndex];
    var prev = null;
    var curr = contour[contour.length - 1];
    var next = contour[0];
    if (curr.onCurve) {
      p.moveTo(curr.x, curr.y);
    } else {
      if (next.onCurve) {
        p.moveTo(next.x, next.y);
      } else {
        var start = { x: (curr.x + next.x) * 0.5, y: (curr.y + next.y) * 0.5 };
        p.moveTo(start.x, start.y);
      }
    }
    for (var i = 0; i < contour.length; ++i) {
      prev = curr;
      curr = next;
      next = contour[(i + 1) % contour.length];
      if (curr.onCurve) {
        p.lineTo(curr.x, curr.y);
      } else {
        var prev2 = prev;
        var next2 = next;
        if (!prev.onCurve) {
          prev2 = { x: (curr.x + prev.x) * 0.5, y: (curr.y + prev.y) * 0.5 };
        }
        if (!next.onCurve) {
          next2 = { x: (curr.x + next.x) * 0.5, y: (curr.y + next.y) * 0.5 };
        }
        p.quadraticCurveTo(curr.x, curr.y, next2.x, next2.y);
      }
    }
    p.closePath();
  }
  return p;
}
function buildPath(glyphs, glyph) {
  if (glyph.isComposite) {
    for (var j = 0; j < glyph.components.length; j += 1) {
      var component = glyph.components[j];
      var componentGlyph = glyphs.get(component.glyphIndex);
      componentGlyph.getPath();
      if (componentGlyph.points) {
        var transformedPoints = void 0;
        if (component.matchedPoints === void 0) {
          transformedPoints = transformPoints(componentGlyph.points, component);
        } else {
          if (component.matchedPoints[0] > glyph.points.length - 1 || component.matchedPoints[1] > componentGlyph.points.length - 1) {
            throw Error("Matched points out of range in " + glyph.name);
          }
          var firstPt = glyph.points[component.matchedPoints[0]];
          var secondPt = componentGlyph.points[component.matchedPoints[1]];
          var transform = {
            xScale: component.xScale,
            scale01: component.scale01,
            scale10: component.scale10,
            yScale: component.yScale,
            dx: 0,
            dy: 0
          };
          secondPt = transformPoints([secondPt], transform)[0];
          transform.dx = firstPt.x - secondPt.x;
          transform.dy = firstPt.y - secondPt.y;
          transformedPoints = transformPoints(componentGlyph.points, transform);
        }
        glyph.points = glyph.points.concat(transformedPoints);
      }
    }
  }
  return getPath(glyph.points);
}
function parseGlyfTableAll(data, start, loca2, font) {
  var glyphs = new glyphset.GlyphSet(font);
  for (var i = 0; i < loca2.length - 1; i += 1) {
    var offset = loca2[i];
    var nextOffset = loca2[i + 1];
    if (offset !== nextOffset) {
      glyphs.push(i, glyphset.ttfGlyphLoader(font, i, parseGlyph, data, start + offset, buildPath));
    } else {
      glyphs.push(i, glyphset.glyphLoader(font, i));
    }
  }
  return glyphs;
}
function parseGlyfTableOnLowMemory(data, start, loca2, font) {
  var glyphs = new glyphset.GlyphSet(font);
  font._push = function(i) {
    var offset = loca2[i];
    var nextOffset = loca2[i + 1];
    if (offset !== nextOffset) {
      glyphs.push(i, glyphset.ttfGlyphLoader(font, i, parseGlyph, data, start + offset, buildPath));
    } else {
      glyphs.push(i, glyphset.glyphLoader(font, i));
    }
  };
  return glyphs;
}
function parseGlyfTable(data, start, loca2, font, opt) {
  if (opt.lowMemory) {
    return parseGlyfTableOnLowMemory(data, start, loca2, font);
  } else {
    return parseGlyfTableAll(data, start, loca2, font);
  }
}
var glyf = { getPath, parse: parseGlyfTable };
var instructionTable;
var exec;
var execGlyph;
var execComponent;
function Hinting(font) {
  this.font = font;
  this.getCommands = function(hPoints) {
    return glyf.getPath(hPoints).commands;
  };
  this._fpgmState = this._prepState = void 0;
  this._errorState = 0;
}
function roundOff(v) {
  return v;
}
function roundToGrid(v) {
  return Math.sign(v) * Math.round(Math.abs(v));
}
function roundToDoubleGrid(v) {
  return Math.sign(v) * Math.round(Math.abs(v * 2)) / 2;
}
function roundToHalfGrid(v) {
  return Math.sign(v) * (Math.round(Math.abs(v) + 0.5) - 0.5);
}
function roundUpToGrid(v) {
  return Math.sign(v) * Math.ceil(Math.abs(v));
}
function roundDownToGrid(v) {
  return Math.sign(v) * Math.floor(Math.abs(v));
}
var roundSuper = function(v) {
  var period = this.srPeriod;
  var phase = this.srPhase;
  var threshold = this.srThreshold;
  var sign = 1;
  if (v < 0) {
    v = -v;
    sign = -1;
  }
  v += threshold - phase;
  v = Math.trunc(v / period) * period;
  v += phase;
  if (v < 0) {
    return phase * sign;
  }
  return v * sign;
};
var xUnitVector = {
  x: 1,
  y: 0,
  axis: "x",
  // Gets the projected distance between two points.
  // o1/o2 ... if true, respective original position is used.
  distance: function(p1, p2, o1, o2) {
    return (o1 ? p1.xo : p1.x) - (o2 ? p2.xo : p2.x);
  },
  // Moves point p so the moved position has the same relative
  // position to the moved positions of rp1 and rp2 than the
  // original positions had.
  //
  // See APPENDIX on INTERPOLATE at the bottom of this file.
  interpolate: function(p, rp1, rp2, pv) {
    var do1;
    var do2;
    var doa1;
    var doa2;
    var dm1;
    var dm2;
    var dt;
    if (!pv || pv === this) {
      do1 = p.xo - rp1.xo;
      do2 = p.xo - rp2.xo;
      dm1 = rp1.x - rp1.xo;
      dm2 = rp2.x - rp2.xo;
      doa1 = Math.abs(do1);
      doa2 = Math.abs(do2);
      dt = doa1 + doa2;
      if (dt === 0) {
        p.x = p.xo + (dm1 + dm2) / 2;
        return;
      }
      p.x = p.xo + (dm1 * doa2 + dm2 * doa1) / dt;
      return;
    }
    do1 = pv.distance(p, rp1, true, true);
    do2 = pv.distance(p, rp2, true, true);
    dm1 = pv.distance(rp1, rp1, false, true);
    dm2 = pv.distance(rp2, rp2, false, true);
    doa1 = Math.abs(do1);
    doa2 = Math.abs(do2);
    dt = doa1 + doa2;
    if (dt === 0) {
      xUnitVector.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
      return;
    }
    xUnitVector.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
  },
  // Slope of line normal to this
  normalSlope: Number.NEGATIVE_INFINITY,
  // Sets the point 'p' relative to point 'rp'
  // by the distance 'd'.
  //
  // See APPENDIX on SETRELATIVE at the bottom of this file.
  //
  // p   ... point to set
  // rp  ... reference point
  // d   ... distance on projection vector
  // pv  ... projection vector (undefined = this)
  // org ... if true, uses the original position of rp as reference.
  setRelative: function(p, rp, d, pv, org) {
    if (!pv || pv === this) {
      p.x = (org ? rp.xo : rp.x) + d;
      return;
    }
    var rpx = org ? rp.xo : rp.x;
    var rpy = org ? rp.yo : rp.y;
    var rpdx = rpx + d * pv.x;
    var rpdy = rpy + d * pv.y;
    p.x = rpdx + (p.y - rpdy) / pv.normalSlope;
  },
  // Slope of vector line.
  slope: 0,
  // Touches the point p.
  touch: function(p) {
    p.xTouched = true;
  },
  // Tests if a point p is touched.
  touched: function(p) {
    return p.xTouched;
  },
  // Untouches the point p.
  untouch: function(p) {
    p.xTouched = false;
  }
};
var yUnitVector = {
  x: 0,
  y: 1,
  axis: "y",
  // Gets the projected distance between two points.
  // o1/o2 ... if true, respective original position is used.
  distance: function(p1, p2, o1, o2) {
    return (o1 ? p1.yo : p1.y) - (o2 ? p2.yo : p2.y);
  },
  // Moves point p so the moved position has the same relative
  // position to the moved positions of rp1 and rp2 than the
  // original positions had.
  //
  // See APPENDIX on INTERPOLATE at the bottom of this file.
  interpolate: function(p, rp1, rp2, pv) {
    var do1;
    var do2;
    var doa1;
    var doa2;
    var dm1;
    var dm2;
    var dt;
    if (!pv || pv === this) {
      do1 = p.yo - rp1.yo;
      do2 = p.yo - rp2.yo;
      dm1 = rp1.y - rp1.yo;
      dm2 = rp2.y - rp2.yo;
      doa1 = Math.abs(do1);
      doa2 = Math.abs(do2);
      dt = doa1 + doa2;
      if (dt === 0) {
        p.y = p.yo + (dm1 + dm2) / 2;
        return;
      }
      p.y = p.yo + (dm1 * doa2 + dm2 * doa1) / dt;
      return;
    }
    do1 = pv.distance(p, rp1, true, true);
    do2 = pv.distance(p, rp2, true, true);
    dm1 = pv.distance(rp1, rp1, false, true);
    dm2 = pv.distance(rp2, rp2, false, true);
    doa1 = Math.abs(do1);
    doa2 = Math.abs(do2);
    dt = doa1 + doa2;
    if (dt === 0) {
      yUnitVector.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
      return;
    }
    yUnitVector.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
  },
  // Slope of line normal to this.
  normalSlope: 0,
  // Sets the point 'p' relative to point 'rp'
  // by the distance 'd'
  //
  // See APPENDIX on SETRELATIVE at the bottom of this file.
  //
  // p   ... point to set
  // rp  ... reference point
  // d   ... distance on projection vector
  // pv  ... projection vector (undefined = this)
  // org ... if true, uses the original position of rp as reference.
  setRelative: function(p, rp, d, pv, org) {
    if (!pv || pv === this) {
      p.y = (org ? rp.yo : rp.y) + d;
      return;
    }
    var rpx = org ? rp.xo : rp.x;
    var rpy = org ? rp.yo : rp.y;
    var rpdx = rpx + d * pv.x;
    var rpdy = rpy + d * pv.y;
    p.y = rpdy + pv.normalSlope * (p.x - rpdx);
  },
  // Slope of vector line.
  slope: Number.POSITIVE_INFINITY,
  // Touches the point p.
  touch: function(p) {
    p.yTouched = true;
  },
  // Tests if a point p is touched.
  touched: function(p) {
    return p.yTouched;
  },
  // Untouches the point p.
  untouch: function(p) {
    p.yTouched = false;
  }
};
Object.freeze(xUnitVector);
Object.freeze(yUnitVector);
function UnitVector(x, y) {
  this.x = x;
  this.y = y;
  this.axis = void 0;
  this.slope = y / x;
  this.normalSlope = -x / y;
  Object.freeze(this);
}
UnitVector.prototype.distance = function(p1, p2, o1, o2) {
  return this.x * xUnitVector.distance(p1, p2, o1, o2) + this.y * yUnitVector.distance(p1, p2, o1, o2);
};
UnitVector.prototype.interpolate = function(p, rp1, rp2, pv) {
  var dm1;
  var dm2;
  var do1;
  var do2;
  var doa1;
  var doa2;
  var dt;
  do1 = pv.distance(p, rp1, true, true);
  do2 = pv.distance(p, rp2, true, true);
  dm1 = pv.distance(rp1, rp1, false, true);
  dm2 = pv.distance(rp2, rp2, false, true);
  doa1 = Math.abs(do1);
  doa2 = Math.abs(do2);
  dt = doa1 + doa2;
  if (dt === 0) {
    this.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
    return;
  }
  this.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
};
UnitVector.prototype.setRelative = function(p, rp, d, pv, org) {
  pv = pv || this;
  var rpx = org ? rp.xo : rp.x;
  var rpy = org ? rp.yo : rp.y;
  var rpdx = rpx + d * pv.x;
  var rpdy = rpy + d * pv.y;
  var pvns = pv.normalSlope;
  var fvs = this.slope;
  var px = p.x;
  var py = p.y;
  p.x = (fvs * px - pvns * rpdx + rpdy - py) / (fvs - pvns);
  p.y = fvs * (p.x - px) + py;
};
UnitVector.prototype.touch = function(p) {
  p.xTouched = true;
  p.yTouched = true;
};
function getUnitVector(x, y) {
  var d = Math.sqrt(x * x + y * y);
  x /= d;
  y /= d;
  if (x === 1 && y === 0) {
    return xUnitVector;
  } else if (x === 0 && y === 1) {
    return yUnitVector;
  } else {
    return new UnitVector(x, y);
  }
}
function HPoint(x, y, lastPointOfContour, onCurve) {
  this.x = this.xo = Math.round(x * 64) / 64;
  this.y = this.yo = Math.round(y * 64) / 64;
  this.lastPointOfContour = lastPointOfContour;
  this.onCurve = onCurve;
  this.prevPointOnContour = void 0;
  this.nextPointOnContour = void 0;
  this.xTouched = false;
  this.yTouched = false;
  Object.preventExtensions(this);
}
HPoint.prototype.nextTouched = function(v) {
  var p = this.nextPointOnContour;
  while (!v.touched(p) && p !== this) {
    p = p.nextPointOnContour;
  }
  return p;
};
HPoint.prototype.prevTouched = function(v) {
  var p = this.prevPointOnContour;
  while (!v.touched(p) && p !== this) {
    p = p.prevPointOnContour;
  }
  return p;
};
var HPZero = Object.freeze(new HPoint(0, 0));
var defaultState = {
  cvCutIn: 17 / 16,
  // control value cut in
  deltaBase: 9,
  deltaShift: 0.125,
  loop: 1,
  // loops some instructions
  minDis: 1,
  // minimum distance
  autoFlip: true
};
function State(env, prog) {
  this.env = env;
  this.stack = [];
  this.prog = prog;
  switch (env) {
    case "glyf":
      this.zp0 = this.zp1 = this.zp2 = 1;
      this.rp0 = this.rp1 = this.rp2 = 0;
    case "prep":
      this.fv = this.pv = this.dpv = xUnitVector;
      this.round = roundToGrid;
  }
}
Hinting.prototype.exec = function(glyph, ppem) {
  if (typeof ppem !== "number") {
    throw new Error("Point size is not a number!");
  }
  if (this._errorState > 2) {
    return;
  }
  var font = this.font;
  var prepState = this._prepState;
  if (!prepState || prepState.ppem !== ppem) {
    var fpgmState = this._fpgmState;
    if (!fpgmState) {
      State.prototype = defaultState;
      fpgmState = this._fpgmState = new State("fpgm", font.tables.fpgm);
      fpgmState.funcs = [];
      fpgmState.font = font;
      if (exports.DEBUG) {
        console.log("---EXEC FPGM---");
        fpgmState.step = -1;
      }
      try {
        exec(fpgmState);
      } catch (e) {
        console.log("Hinting error in FPGM:" + e);
        this._errorState = 3;
        return;
      }
    }
    State.prototype = fpgmState;
    prepState = this._prepState = new State("prep", font.tables.prep);
    prepState.ppem = ppem;
    var oCvt = font.tables.cvt;
    if (oCvt) {
      var cvt = prepState.cvt = new Array(oCvt.length);
      var scale = ppem / font.unitsPerEm;
      for (var c = 0; c < oCvt.length; c++) {
        cvt[c] = oCvt[c] * scale;
      }
    } else {
      prepState.cvt = [];
    }
    if (exports.DEBUG) {
      console.log("---EXEC PREP---");
      prepState.step = -1;
    }
    try {
      exec(prepState);
    } catch (e) {
      if (this._errorState < 2) {
        console.log("Hinting error in PREP:" + e);
      }
      this._errorState = 2;
    }
  }
  if (this._errorState > 1) {
    return;
  }
  try {
    return execGlyph(glyph, prepState);
  } catch (e) {
    if (this._errorState < 1) {
      console.log("Hinting error:" + e);
      console.log("Note: further hinting errors are silenced");
    }
    this._errorState = 1;
    return void 0;
  }
};
execGlyph = function(glyph, prepState) {
  var xScale = prepState.ppem / prepState.font.unitsPerEm;
  var yScale = xScale;
  var components = glyph.components;
  var contours;
  var gZone;
  var state;
  State.prototype = prepState;
  if (!components) {
    state = new State("glyf", glyph.instructions);
    if (exports.DEBUG) {
      console.log("---EXEC GLYPH---");
      state.step = -1;
    }
    execComponent(glyph, state, xScale, yScale);
    gZone = state.gZone;
  } else {
    var font = prepState.font;
    gZone = [];
    contours = [];
    for (var i = 0; i < components.length; i++) {
      var c = components[i];
      var cg = font.glyphs.get(c.glyphIndex);
      state = new State("glyf", cg.instructions);
      if (exports.DEBUG) {
        console.log("---EXEC COMP " + i + "---");
        state.step = -1;
      }
      execComponent(cg, state, xScale, yScale);
      var dx = Math.round(c.dx * xScale);
      var dy = Math.round(c.dy * yScale);
      var gz = state.gZone;
      var cc = state.contours;
      for (var pi = 0; pi < gz.length; pi++) {
        var p = gz[pi];
        p.xTouched = p.yTouched = false;
        p.xo = p.x = p.x + dx;
        p.yo = p.y = p.y + dy;
      }
      var gLen = gZone.length;
      gZone.push.apply(gZone, gz);
      for (var j = 0; j < cc.length; j++) {
        contours.push(cc[j] + gLen);
      }
    }
    if (glyph.instructions && !state.inhibitGridFit) {
      state = new State("glyf", glyph.instructions);
      state.gZone = state.z0 = state.z1 = state.z2 = gZone;
      state.contours = contours;
      gZone.push(
        new HPoint(0, 0),
        new HPoint(Math.round(glyph.advanceWidth * xScale), 0)
      );
      if (exports.DEBUG) {
        console.log("---EXEC COMPOSITE---");
        state.step = -1;
      }
      exec(state);
      gZone.length -= 2;
    }
  }
  return gZone;
};
execComponent = function(glyph, state, xScale, yScale) {
  var points = glyph.points || [];
  var pLen = points.length;
  var gZone = state.gZone = state.z0 = state.z1 = state.z2 = [];
  var contours = state.contours = [];
  var cp;
  for (var i = 0; i < pLen; i++) {
    cp = points[i];
    gZone[i] = new HPoint(
      cp.x * xScale,
      cp.y * yScale,
      cp.lastPointOfContour,
      cp.onCurve
    );
  }
  var sp;
  var np;
  for (var i$1 = 0; i$1 < pLen; i$1++) {
    cp = gZone[i$1];
    if (!sp) {
      sp = cp;
      contours.push(i$1);
    }
    if (cp.lastPointOfContour) {
      cp.nextPointOnContour = sp;
      sp.prevPointOnContour = cp;
      sp = void 0;
    } else {
      np = gZone[i$1 + 1];
      cp.nextPointOnContour = np;
      np.prevPointOnContour = cp;
    }
  }
  if (state.inhibitGridFit) {
    return;
  }
  if (exports.DEBUG) {
    console.log("PROCESSING GLYPH", state.stack);
    for (var i$2 = 0; i$2 < pLen; i$2++) {
      console.log(i$2, gZone[i$2].x, gZone[i$2].y);
    }
  }
  gZone.push(
    new HPoint(0, 0),
    new HPoint(Math.round(glyph.advanceWidth * xScale), 0)
  );
  exec(state);
  gZone.length -= 2;
  if (exports.DEBUG) {
    console.log("FINISHED GLYPH", state.stack);
    for (var i$3 = 0; i$3 < pLen; i$3++) {
      console.log(i$3, gZone[i$3].x, gZone[i$3].y);
    }
  }
};
exec = function(state) {
  var prog = state.prog;
  if (!prog) {
    return;
  }
  var pLen = prog.length;
  var ins;
  for (state.ip = 0; state.ip < pLen; state.ip++) {
    if (exports.DEBUG) {
      state.step++;
    }
    ins = instructionTable[prog[state.ip]];
    if (!ins) {
      throw new Error(
        "unknown instruction: 0x" + Number(prog[state.ip]).toString(16)
      );
    }
    ins(state);
  }
};
function initTZone(state) {
  var tZone = state.tZone = new Array(state.gZone.length);
  for (var i = 0; i < tZone.length; i++) {
    tZone[i] = new HPoint(0, 0);
  }
}
function skip(state, handleElse) {
  var prog = state.prog;
  var ip = state.ip;
  var nesting = 1;
  var ins;
  do {
    ins = prog[++ip];
    if (ins === 88) {
      nesting++;
    } else if (ins === 89) {
      nesting--;
    } else if (ins === 64) {
      ip += prog[ip + 1] + 1;
    } else if (ins === 65) {
      ip += 2 * prog[ip + 1] + 1;
    } else if (ins >= 176 && ins <= 183) {
      ip += ins - 176 + 1;
    } else if (ins >= 184 && ins <= 191) {
      ip += (ins - 184 + 1) * 2;
    } else if (handleElse && nesting === 1 && ins === 27) {
      break;
    }
  } while (nesting > 0);
  state.ip = ip;
}
function SVTCA(v, state) {
  if (exports.DEBUG) {
    console.log(state.step, "SVTCA[" + v.axis + "]");
  }
  state.fv = state.pv = state.dpv = v;
}
function SPVTCA(v, state) {
  if (exports.DEBUG) {
    console.log(state.step, "SPVTCA[" + v.axis + "]");
  }
  state.pv = state.dpv = v;
}
function SFVTCA(v, state) {
  if (exports.DEBUG) {
    console.log(state.step, "SFVTCA[" + v.axis + "]");
  }
  state.fv = v;
}
function SPVTL(a, state) {
  var stack = state.stack;
  var p2i = stack.pop();
  var p1i = stack.pop();
  var p2 = state.z2[p2i];
  var p1 = state.z1[p1i];
  if (exports.DEBUG) {
    console.log("SPVTL[" + a + "]", p2i, p1i);
  }
  var dx;
  var dy;
  if (!a) {
    dx = p1.x - p2.x;
    dy = p1.y - p2.y;
  } else {
    dx = p2.y - p1.y;
    dy = p1.x - p2.x;
  }
  state.pv = state.dpv = getUnitVector(dx, dy);
}
function SFVTL(a, state) {
  var stack = state.stack;
  var p2i = stack.pop();
  var p1i = stack.pop();
  var p2 = state.z2[p2i];
  var p1 = state.z1[p1i];
  if (exports.DEBUG) {
    console.log("SFVTL[" + a + "]", p2i, p1i);
  }
  var dx;
  var dy;
  if (!a) {
    dx = p1.x - p2.x;
    dy = p1.y - p2.y;
  } else {
    dx = p2.y - p1.y;
    dy = p1.x - p2.x;
  }
  state.fv = getUnitVector(dx, dy);
}
function SPVFS(state) {
  var stack = state.stack;
  var y = stack.pop();
  var x = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SPVFS[]", y, x);
  }
  state.pv = state.dpv = getUnitVector(x, y);
}
function SFVFS(state) {
  var stack = state.stack;
  var y = stack.pop();
  var x = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SPVFS[]", y, x);
  }
  state.fv = getUnitVector(x, y);
}
function GPV(state) {
  var stack = state.stack;
  var pv = state.pv;
  if (exports.DEBUG) {
    console.log(state.step, "GPV[]");
  }
  stack.push(pv.x * 16384);
  stack.push(pv.y * 16384);
}
function GFV(state) {
  var stack = state.stack;
  var fv = state.fv;
  if (exports.DEBUG) {
    console.log(state.step, "GFV[]");
  }
  stack.push(fv.x * 16384);
  stack.push(fv.y * 16384);
}
function SFVTPV(state) {
  state.fv = state.pv;
  if (exports.DEBUG) {
    console.log(state.step, "SFVTPV[]");
  }
}
function ISECT(state) {
  var stack = state.stack;
  var pa0i = stack.pop();
  var pa1i = stack.pop();
  var pb0i = stack.pop();
  var pb1i = stack.pop();
  var pi = stack.pop();
  var z0 = state.z0;
  var z1 = state.z1;
  var pa0 = z0[pa0i];
  var pa1 = z0[pa1i];
  var pb0 = z1[pb0i];
  var pb1 = z1[pb1i];
  var p = state.z2[pi];
  if (exports.DEBUG) {
    console.log("ISECT[], ", pa0i, pa1i, pb0i, pb1i, pi);
  }
  var x1 = pa0.x;
  var y1 = pa0.y;
  var x2 = pa1.x;
  var y2 = pa1.y;
  var x3 = pb0.x;
  var y3 = pb0.y;
  var x4 = pb1.x;
  var y4 = pb1.y;
  var div = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  var f1 = x1 * y2 - y1 * x2;
  var f2 = x3 * y4 - y3 * x4;
  p.x = (f1 * (x3 - x4) - f2 * (x1 - x2)) / div;
  p.y = (f1 * (y3 - y4) - f2 * (y1 - y2)) / div;
}
function SRP0(state) {
  state.rp0 = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SRP0[]", state.rp0);
  }
}
function SRP1(state) {
  state.rp1 = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SRP1[]", state.rp1);
  }
}
function SRP2(state) {
  state.rp2 = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SRP2[]", state.rp2);
  }
}
function SZP0(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SZP0[]", n);
  }
  state.zp0 = n;
  switch (n) {
    case 0:
      if (!state.tZone) {
        initTZone(state);
      }
      state.z0 = state.tZone;
      break;
    case 1:
      state.z0 = state.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
function SZP1(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SZP1[]", n);
  }
  state.zp1 = n;
  switch (n) {
    case 0:
      if (!state.tZone) {
        initTZone(state);
      }
      state.z1 = state.tZone;
      break;
    case 1:
      state.z1 = state.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
function SZP2(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SZP2[]", n);
  }
  state.zp2 = n;
  switch (n) {
    case 0:
      if (!state.tZone) {
        initTZone(state);
      }
      state.z2 = state.tZone;
      break;
    case 1:
      state.z2 = state.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
function SZPS(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SZPS[]", n);
  }
  state.zp0 = state.zp1 = state.zp2 = n;
  switch (n) {
    case 0:
      if (!state.tZone) {
        initTZone(state);
      }
      state.z0 = state.z1 = state.z2 = state.tZone;
      break;
    case 1:
      state.z0 = state.z1 = state.z2 = state.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
function SLOOP(state) {
  state.loop = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SLOOP[]", state.loop);
  }
}
function RTG(state) {
  if (exports.DEBUG) {
    console.log(state.step, "RTG[]");
  }
  state.round = roundToGrid;
}
function RTHG(state) {
  if (exports.DEBUG) {
    console.log(state.step, "RTHG[]");
  }
  state.round = roundToHalfGrid;
}
function SMD(state) {
  var d = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SMD[]", d);
  }
  state.minDis = d / 64;
}
function ELSE(state) {
  if (exports.DEBUG) {
    console.log(state.step, "ELSE[]");
  }
  skip(state, false);
}
function JMPR(state) {
  var o = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "JMPR[]", o);
  }
  state.ip += o - 1;
}
function SCVTCI(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SCVTCI[]", n);
  }
  state.cvCutIn = n / 64;
}
function DUP(state) {
  var stack = state.stack;
  if (exports.DEBUG) {
    console.log(state.step, "DUP[]");
  }
  stack.push(stack[stack.length - 1]);
}
function POP(state) {
  if (exports.DEBUG) {
    console.log(state.step, "POP[]");
  }
  state.stack.pop();
}
function CLEAR(state) {
  if (exports.DEBUG) {
    console.log(state.step, "CLEAR[]");
  }
  state.stack.length = 0;
}
function SWAP(state) {
  var stack = state.stack;
  var a = stack.pop();
  var b = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SWAP[]");
  }
  stack.push(a);
  stack.push(b);
}
function DEPTH(state) {
  var stack = state.stack;
  if (exports.DEBUG) {
    console.log(state.step, "DEPTH[]");
  }
  stack.push(stack.length);
}
function LOOPCALL(state) {
  var stack = state.stack;
  var fn = stack.pop();
  var c = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "LOOPCALL[]", fn, c);
  }
  var cip = state.ip;
  var cprog = state.prog;
  state.prog = state.funcs[fn];
  for (var i = 0; i < c; i++) {
    exec(state);
    if (exports.DEBUG) {
      console.log(
        ++state.step,
        i + 1 < c ? "next loopcall" : "done loopcall",
        i
      );
    }
  }
  state.ip = cip;
  state.prog = cprog;
}
function CALL(state) {
  var fn = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "CALL[]", fn);
  }
  var cip = state.ip;
  var cprog = state.prog;
  state.prog = state.funcs[fn];
  exec(state);
  state.ip = cip;
  state.prog = cprog;
  if (exports.DEBUG) {
    console.log(++state.step, "returning from", fn);
  }
}
function CINDEX(state) {
  var stack = state.stack;
  var k = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "CINDEX[]", k);
  }
  stack.push(stack[stack.length - k]);
}
function MINDEX(state) {
  var stack = state.stack;
  var k = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "MINDEX[]", k);
  }
  stack.push(stack.splice(stack.length - k, 1)[0]);
}
function FDEF(state) {
  if (state.env !== "fpgm") {
    throw new Error("FDEF not allowed here");
  }
  var stack = state.stack;
  var prog = state.prog;
  var ip = state.ip;
  var fn = stack.pop();
  var ipBegin = ip;
  if (exports.DEBUG) {
    console.log(state.step, "FDEF[]", fn);
  }
  while (prog[++ip] !== 45) {
  }
  state.ip = ip;
  state.funcs[fn] = prog.slice(ipBegin + 1, ip);
}
function MDAP(round, state) {
  var pi = state.stack.pop();
  var p = state.z0[pi];
  var fv = state.fv;
  var pv = state.pv;
  if (exports.DEBUG) {
    console.log(state.step, "MDAP[" + round + "]", pi);
  }
  var d = pv.distance(p, HPZero);
  if (round) {
    d = state.round(d);
  }
  fv.setRelative(p, HPZero, d, pv);
  fv.touch(p);
  state.rp0 = state.rp1 = pi;
}
function IUP(v, state) {
  var z2 = state.z2;
  var pLen = z2.length - 2;
  var cp;
  var pp;
  var np;
  if (exports.DEBUG) {
    console.log(state.step, "IUP[" + v.axis + "]");
  }
  for (var i = 0; i < pLen; i++) {
    cp = z2[i];
    if (v.touched(cp)) {
      continue;
    }
    pp = cp.prevTouched(v);
    if (pp === cp) {
      continue;
    }
    np = cp.nextTouched(v);
    if (pp === np) {
      v.setRelative(cp, cp, v.distance(pp, pp, false, true), v, true);
    }
    v.interpolate(cp, pp, np, v);
  }
}
function SHP(a, state) {
  var stack = state.stack;
  var rpi = a ? state.rp1 : state.rp2;
  var rp = (a ? state.z0 : state.z1)[rpi];
  var fv = state.fv;
  var pv = state.pv;
  var loop = state.loop;
  var z2 = state.z2;
  while (loop--) {
    var pi = stack.pop();
    var p = z2[pi];
    var d = pv.distance(rp, rp, false, true);
    fv.setRelative(p, p, d, pv);
    fv.touch(p);
    if (exports.DEBUG) {
      console.log(
        state.step,
        (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "SHP[" + (a ? "rp1" : "rp2") + "]",
        pi
      );
    }
  }
  state.loop = 1;
}
function SHC(a, state) {
  var stack = state.stack;
  var rpi = a ? state.rp1 : state.rp2;
  var rp = (a ? state.z0 : state.z1)[rpi];
  var fv = state.fv;
  var pv = state.pv;
  var ci = stack.pop();
  var sp = state.z2[state.contours[ci]];
  var p = sp;
  if (exports.DEBUG) {
    console.log(state.step, "SHC[" + a + "]", ci);
  }
  var d = pv.distance(rp, rp, false, true);
  do {
    if (p !== rp) {
      fv.setRelative(p, p, d, pv);
    }
    p = p.nextPointOnContour;
  } while (p !== sp);
}
function SHZ(a, state) {
  var stack = state.stack;
  var rpi = a ? state.rp1 : state.rp2;
  var rp = (a ? state.z0 : state.z1)[rpi];
  var fv = state.fv;
  var pv = state.pv;
  var e = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SHZ[" + a + "]", e);
  }
  var z;
  switch (e) {
    case 0:
      z = state.tZone;
      break;
    case 1:
      z = state.gZone;
      break;
    default:
      throw new Error("Invalid zone");
  }
  var p;
  var d = pv.distance(rp, rp, false, true);
  var pLen = z.length - 2;
  for (var i = 0; i < pLen; i++) {
    p = z[i];
    fv.setRelative(p, p, d, pv);
  }
}
function SHPIX(state) {
  var stack = state.stack;
  var loop = state.loop;
  var fv = state.fv;
  var d = stack.pop() / 64;
  var z2 = state.z2;
  while (loop--) {
    var pi = stack.pop();
    var p = z2[pi];
    if (exports.DEBUG) {
      console.log(
        state.step,
        (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "SHPIX[]",
        pi,
        d
      );
    }
    fv.setRelative(p, p, d);
    fv.touch(p);
  }
  state.loop = 1;
}
function IP(state) {
  var stack = state.stack;
  var rp1i = state.rp1;
  var rp2i = state.rp2;
  var loop = state.loop;
  var rp1 = state.z0[rp1i];
  var rp2 = state.z1[rp2i];
  var fv = state.fv;
  var pv = state.dpv;
  var z2 = state.z2;
  while (loop--) {
    var pi = stack.pop();
    var p = z2[pi];
    if (exports.DEBUG) {
      console.log(
        state.step,
        (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "IP[]",
        pi,
        rp1i,
        "<->",
        rp2i
      );
    }
    fv.interpolate(p, rp1, rp2, pv);
    fv.touch(p);
  }
  state.loop = 1;
}
function MSIRP(a, state) {
  var stack = state.stack;
  var d = stack.pop() / 64;
  var pi = stack.pop();
  var p = state.z1[pi];
  var rp0 = state.z0[state.rp0];
  var fv = state.fv;
  var pv = state.pv;
  fv.setRelative(p, rp0, d, pv);
  fv.touch(p);
  if (exports.DEBUG) {
    console.log(state.step, "MSIRP[" + a + "]", d, pi);
  }
  state.rp1 = state.rp0;
  state.rp2 = pi;
  if (a) {
    state.rp0 = pi;
  }
}
function ALIGNRP(state) {
  var stack = state.stack;
  var rp0i = state.rp0;
  var rp0 = state.z0[rp0i];
  var loop = state.loop;
  var fv = state.fv;
  var pv = state.pv;
  var z1 = state.z1;
  while (loop--) {
    var pi = stack.pop();
    var p = z1[pi];
    if (exports.DEBUG) {
      console.log(
        state.step,
        (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "ALIGNRP[]",
        pi
      );
    }
    fv.setRelative(p, rp0, 0, pv);
    fv.touch(p);
  }
  state.loop = 1;
}
function RTDG(state) {
  if (exports.DEBUG) {
    console.log(state.step, "RTDG[]");
  }
  state.round = roundToDoubleGrid;
}
function MIAP(round, state) {
  var stack = state.stack;
  var n = stack.pop();
  var pi = stack.pop();
  var p = state.z0[pi];
  var fv = state.fv;
  var pv = state.pv;
  var cv = state.cvt[n];
  if (exports.DEBUG) {
    console.log(
      state.step,
      "MIAP[" + round + "]",
      n,
      "(",
      cv,
      ")",
      pi
    );
  }
  var d = pv.distance(p, HPZero);
  if (round) {
    if (Math.abs(d - cv) < state.cvCutIn) {
      d = cv;
    }
    d = state.round(d);
  }
  fv.setRelative(p, HPZero, d, pv);
  if (state.zp0 === 0) {
    p.xo = p.x;
    p.yo = p.y;
  }
  fv.touch(p);
  state.rp0 = state.rp1 = pi;
}
function NPUSHB(state) {
  var prog = state.prog;
  var ip = state.ip;
  var stack = state.stack;
  var n = prog[++ip];
  if (exports.DEBUG) {
    console.log(state.step, "NPUSHB[]", n);
  }
  for (var i = 0; i < n; i++) {
    stack.push(prog[++ip]);
  }
  state.ip = ip;
}
function NPUSHW(state) {
  var ip = state.ip;
  var prog = state.prog;
  var stack = state.stack;
  var n = prog[++ip];
  if (exports.DEBUG) {
    console.log(state.step, "NPUSHW[]", n);
  }
  for (var i = 0; i < n; i++) {
    var w = prog[++ip] << 8 | prog[++ip];
    if (w & 32768) {
      w = -((w ^ 65535) + 1);
    }
    stack.push(w);
  }
  state.ip = ip;
}
function WS(state) {
  var stack = state.stack;
  var store = state.store;
  if (!store) {
    store = state.store = [];
  }
  var v = stack.pop();
  var l = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "WS", v, l);
  }
  store[l] = v;
}
function RS(state) {
  var stack = state.stack;
  var store = state.store;
  var l = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "RS", l);
  }
  var v = store && store[l] || 0;
  stack.push(v);
}
function WCVTP(state) {
  var stack = state.stack;
  var v = stack.pop();
  var l = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "WCVTP", v, l);
  }
  state.cvt[l] = v / 64;
}
function RCVT(state) {
  var stack = state.stack;
  var cvte = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "RCVT", cvte);
  }
  stack.push(state.cvt[cvte] * 64);
}
function GC(a, state) {
  var stack = state.stack;
  var pi = stack.pop();
  var p = state.z2[pi];
  if (exports.DEBUG) {
    console.log(state.step, "GC[" + a + "]", pi);
  }
  stack.push(state.dpv.distance(p, HPZero, a, false) * 64);
}
function MD(a, state) {
  var stack = state.stack;
  var pi2 = stack.pop();
  var pi1 = stack.pop();
  var p2 = state.z1[pi2];
  var p1 = state.z0[pi1];
  var d = state.dpv.distance(p1, p2, a, a);
  if (exports.DEBUG) {
    console.log(state.step, "MD[" + a + "]", pi2, pi1, "->", d);
  }
  state.stack.push(Math.round(d * 64));
}
function MPPEM(state) {
  if (exports.DEBUG) {
    console.log(state.step, "MPPEM[]");
  }
  state.stack.push(state.ppem);
}
function FLIPON(state) {
  if (exports.DEBUG) {
    console.log(state.step, "FLIPON[]");
  }
  state.autoFlip = true;
}
function LT(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "LT[]", e2, e1);
  }
  stack.push(e1 < e2 ? 1 : 0);
}
function LTEQ(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "LTEQ[]", e2, e1);
  }
  stack.push(e1 <= e2 ? 1 : 0);
}
function GT(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "GT[]", e2, e1);
  }
  stack.push(e1 > e2 ? 1 : 0);
}
function GTEQ(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "GTEQ[]", e2, e1);
  }
  stack.push(e1 >= e2 ? 1 : 0);
}
function EQ(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "EQ[]", e2, e1);
  }
  stack.push(e2 === e1 ? 1 : 0);
}
function NEQ(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "NEQ[]", e2, e1);
  }
  stack.push(e2 !== e1 ? 1 : 0);
}
function ODD(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "ODD[]", n);
  }
  stack.push(Math.trunc(n) % 2 ? 1 : 0);
}
function EVEN(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "EVEN[]", n);
  }
  stack.push(Math.trunc(n) % 2 ? 0 : 1);
}
function IF(state) {
  var test = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "IF[]", test);
  }
  if (!test) {
    skip(state, true);
    if (exports.DEBUG) {
      console.log(state.step, "EIF[]");
    }
  }
}
function EIF(state) {
  if (exports.DEBUG) {
    console.log(state.step, "EIF[]");
  }
}
function AND(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "AND[]", e2, e1);
  }
  stack.push(e2 && e1 ? 1 : 0);
}
function OR(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "OR[]", e2, e1);
  }
  stack.push(e2 || e1 ? 1 : 0);
}
function NOT(state) {
  var stack = state.stack;
  var e = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "NOT[]", e);
  }
  stack.push(e ? 0 : 1);
}
function DELTAP123(b, state) {
  var stack = state.stack;
  var n = stack.pop();
  var fv = state.fv;
  var pv = state.pv;
  var ppem = state.ppem;
  var base = state.deltaBase + (b - 1) * 16;
  var ds = state.deltaShift;
  var z0 = state.z0;
  if (exports.DEBUG) {
    console.log(state.step, "DELTAP[" + b + "]", n, stack);
  }
  for (var i = 0; i < n; i++) {
    var pi = stack.pop();
    var arg = stack.pop();
    var appem = base + ((arg & 240) >> 4);
    if (appem !== ppem) {
      continue;
    }
    var mag = (arg & 15) - 8;
    if (mag >= 0) {
      mag++;
    }
    if (exports.DEBUG) {
      console.log(state.step, "DELTAPFIX", pi, "by", mag * ds);
    }
    var p = z0[pi];
    fv.setRelative(p, p, mag * ds, pv);
  }
}
function SDB(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SDB[]", n);
  }
  state.deltaBase = n;
}
function SDS(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SDS[]", n);
  }
  state.deltaShift = Math.pow(0.5, n);
}
function ADD(state) {
  var stack = state.stack;
  var n2 = stack.pop();
  var n1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "ADD[]", n2, n1);
  }
  stack.push(n1 + n2);
}
function SUB(state) {
  var stack = state.stack;
  var n2 = stack.pop();
  var n1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SUB[]", n2, n1);
  }
  stack.push(n1 - n2);
}
function DIV(state) {
  var stack = state.stack;
  var n2 = stack.pop();
  var n1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "DIV[]", n2, n1);
  }
  stack.push(n1 * 64 / n2);
}
function MUL(state) {
  var stack = state.stack;
  var n2 = stack.pop();
  var n1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "MUL[]", n2, n1);
  }
  stack.push(n1 * n2 / 64);
}
function ABS(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "ABS[]", n);
  }
  stack.push(Math.abs(n));
}
function NEG(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "NEG[]", n);
  }
  stack.push(-n);
}
function FLOOR(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "FLOOR[]", n);
  }
  stack.push(Math.floor(n / 64) * 64);
}
function CEILING(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "CEILING[]", n);
  }
  stack.push(Math.ceil(n / 64) * 64);
}
function ROUND(dt, state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "ROUND[]");
  }
  stack.push(state.round(n / 64) * 64);
}
function WCVTF(state) {
  var stack = state.stack;
  var v = stack.pop();
  var l = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "WCVTF[]", v, l);
  }
  state.cvt[l] = v * state.ppem / state.font.unitsPerEm;
}
function DELTAC123(b, state) {
  var stack = state.stack;
  var n = stack.pop();
  var ppem = state.ppem;
  var base = state.deltaBase + (b - 1) * 16;
  var ds = state.deltaShift;
  if (exports.DEBUG) {
    console.log(state.step, "DELTAC[" + b + "]", n, stack);
  }
  for (var i = 0; i < n; i++) {
    var c = stack.pop();
    var arg = stack.pop();
    var appem = base + ((arg & 240) >> 4);
    if (appem !== ppem) {
      continue;
    }
    var mag = (arg & 15) - 8;
    if (mag >= 0) {
      mag++;
    }
    var delta = mag * ds;
    if (exports.DEBUG) {
      console.log(state.step, "DELTACFIX", c, "by", delta);
    }
    state.cvt[c] += delta;
  }
}
function SROUND(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SROUND[]", n);
  }
  state.round = roundSuper;
  var period;
  switch (n & 192) {
    case 0:
      period = 0.5;
      break;
    case 64:
      period = 1;
      break;
    case 128:
      period = 2;
      break;
    default:
      throw new Error("invalid SROUND value");
  }
  state.srPeriod = period;
  switch (n & 48) {
    case 0:
      state.srPhase = 0;
      break;
    case 16:
      state.srPhase = 0.25 * period;
      break;
    case 32:
      state.srPhase = 0.5 * period;
      break;
    case 48:
      state.srPhase = 0.75 * period;
      break;
    default:
      throw new Error("invalid SROUND value");
  }
  n &= 15;
  if (n === 0) {
    state.srThreshold = 0;
  } else {
    state.srThreshold = (n / 8 - 0.5) * period;
  }
}
function S45ROUND(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "S45ROUND[]", n);
  }
  state.round = roundSuper;
  var period;
  switch (n & 192) {
    case 0:
      period = Math.sqrt(2) / 2;
      break;
    case 64:
      period = Math.sqrt(2);
      break;
    case 128:
      period = 2 * Math.sqrt(2);
      break;
    default:
      throw new Error("invalid S45ROUND value");
  }
  state.srPeriod = period;
  switch (n & 48) {
    case 0:
      state.srPhase = 0;
      break;
    case 16:
      state.srPhase = 0.25 * period;
      break;
    case 32:
      state.srPhase = 0.5 * period;
      break;
    case 48:
      state.srPhase = 0.75 * period;
      break;
    default:
      throw new Error("invalid S45ROUND value");
  }
  n &= 15;
  if (n === 0) {
    state.srThreshold = 0;
  } else {
    state.srThreshold = (n / 8 - 0.5) * period;
  }
}
function ROFF(state) {
  if (exports.DEBUG) {
    console.log(state.step, "ROFF[]");
  }
  state.round = roundOff;
}
function RUTG(state) {
  if (exports.DEBUG) {
    console.log(state.step, "RUTG[]");
  }
  state.round = roundUpToGrid;
}
function RDTG(state) {
  if (exports.DEBUG) {
    console.log(state.step, "RDTG[]");
  }
  state.round = roundDownToGrid;
}
function SCANCTRL(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SCANCTRL[]", n);
  }
}
function SDPVTL(a, state) {
  var stack = state.stack;
  var p2i = stack.pop();
  var p1i = stack.pop();
  var p2 = state.z2[p2i];
  var p1 = state.z1[p1i];
  if (exports.DEBUG) {
    console.log(state.step, "SDPVTL[" + a + "]", p2i, p1i);
  }
  var dx;
  var dy;
  if (!a) {
    dx = p1.x - p2.x;
    dy = p1.y - p2.y;
  } else {
    dx = p2.y - p1.y;
    dy = p1.x - p2.x;
  }
  state.dpv = getUnitVector(dx, dy);
}
function GETINFO(state) {
  var stack = state.stack;
  var sel = stack.pop();
  var r = 0;
  if (exports.DEBUG) {
    console.log(state.step, "GETINFO[]", sel);
  }
  if (sel & 1) {
    r = 35;
  }
  if (sel & 32) {
    r |= 4096;
  }
  stack.push(r);
}
function ROLL(state) {
  var stack = state.stack;
  var a = stack.pop();
  var b = stack.pop();
  var c = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "ROLL[]");
  }
  stack.push(b);
  stack.push(a);
  stack.push(c);
}
function MAX(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "MAX[]", e2, e1);
  }
  stack.push(Math.max(e1, e2));
}
function MIN(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "MIN[]", e2, e1);
  }
  stack.push(Math.min(e1, e2));
}
function SCANTYPE(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SCANTYPE[]", n);
  }
}
function INSTCTRL(state) {
  var s = state.stack.pop();
  var v = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "INSTCTRL[]", s, v);
  }
  switch (s) {
    case 1:
      state.inhibitGridFit = !!v;
      return;
    case 2:
      state.ignoreCvt = !!v;
      return;
    default:
      throw new Error("invalid INSTCTRL[] selector");
  }
}
function PUSHB(n, state) {
  var stack = state.stack;
  var prog = state.prog;
  var ip = state.ip;
  if (exports.DEBUG) {
    console.log(state.step, "PUSHB[" + n + "]");
  }
  for (var i = 0; i < n; i++) {
    stack.push(prog[++ip]);
  }
  state.ip = ip;
}
function PUSHW(n, state) {
  var ip = state.ip;
  var prog = state.prog;
  var stack = state.stack;
  if (exports.DEBUG) {
    console.log(state.ip, "PUSHW[" + n + "]");
  }
  for (var i = 0; i < n; i++) {
    var w = prog[++ip] << 8 | prog[++ip];
    if (w & 32768) {
      w = -((w ^ 65535) + 1);
    }
    stack.push(w);
  }
  state.ip = ip;
}
function MDRP_MIRP(indirect, setRp0, keepD, ro, dt, state) {
  var stack = state.stack;
  var cvte = indirect && stack.pop();
  var pi = stack.pop();
  var rp0i = state.rp0;
  var rp = state.z0[rp0i];
  var p = state.z1[pi];
  var md = state.minDis;
  var fv = state.fv;
  var pv = state.dpv;
  var od;
  var d;
  var sign;
  var cv;
  d = od = pv.distance(p, rp, true, true);
  sign = d >= 0 ? 1 : -1;
  d = Math.abs(d);
  if (indirect) {
    cv = state.cvt[cvte];
    if (ro && Math.abs(d - cv) < state.cvCutIn) {
      d = cv;
    }
  }
  if (keepD && d < md) {
    d = md;
  }
  if (ro) {
    d = state.round(d);
  }
  fv.setRelative(p, rp, sign * d, pv);
  fv.touch(p);
  if (exports.DEBUG) {
    console.log(
      state.step,
      (indirect ? "MIRP[" : "MDRP[") + (setRp0 ? "M" : "m") + (keepD ? ">" : "_") + (ro ? "R" : "_") + (dt === 0 ? "Gr" : dt === 1 ? "Bl" : dt === 2 ? "Wh" : "") + "]",
      indirect ? cvte + "(" + state.cvt[cvte] + "," + cv + ")" : "",
      pi,
      "(d =",
      od,
      "->",
      sign * d,
      ")"
    );
  }
  state.rp1 = state.rp0;
  state.rp2 = pi;
  if (setRp0) {
    state.rp0 = pi;
  }
}
instructionTable = [
  /* 0x00 */
  SVTCA.bind(void 0, yUnitVector),
  /* 0x01 */
  SVTCA.bind(void 0, xUnitVector),
  /* 0x02 */
  SPVTCA.bind(void 0, yUnitVector),
  /* 0x03 */
  SPVTCA.bind(void 0, xUnitVector),
  /* 0x04 */
  SFVTCA.bind(void 0, yUnitVector),
  /* 0x05 */
  SFVTCA.bind(void 0, xUnitVector),
  /* 0x06 */
  SPVTL.bind(void 0, 0),
  /* 0x07 */
  SPVTL.bind(void 0, 1),
  /* 0x08 */
  SFVTL.bind(void 0, 0),
  /* 0x09 */
  SFVTL.bind(void 0, 1),
  /* 0x0A */
  SPVFS,
  /* 0x0B */
  SFVFS,
  /* 0x0C */
  GPV,
  /* 0x0D */
  GFV,
  /* 0x0E */
  SFVTPV,
  /* 0x0F */
  ISECT,
  /* 0x10 */
  SRP0,
  /* 0x11 */
  SRP1,
  /* 0x12 */
  SRP2,
  /* 0x13 */
  SZP0,
  /* 0x14 */
  SZP1,
  /* 0x15 */
  SZP2,
  /* 0x16 */
  SZPS,
  /* 0x17 */
  SLOOP,
  /* 0x18 */
  RTG,
  /* 0x19 */
  RTHG,
  /* 0x1A */
  SMD,
  /* 0x1B */
  ELSE,
  /* 0x1C */
  JMPR,
  /* 0x1D */
  SCVTCI,
  /* 0x1E */
  void 0,
  // TODO SSWCI
  /* 0x1F */
  void 0,
  // TODO SSW
  /* 0x20 */
  DUP,
  /* 0x21 */
  POP,
  /* 0x22 */
  CLEAR,
  /* 0x23 */
  SWAP,
  /* 0x24 */
  DEPTH,
  /* 0x25 */
  CINDEX,
  /* 0x26 */
  MINDEX,
  /* 0x27 */
  void 0,
  // TODO ALIGNPTS
  /* 0x28 */
  void 0,
  /* 0x29 */
  void 0,
  // TODO UTP
  /* 0x2A */
  LOOPCALL,
  /* 0x2B */
  CALL,
  /* 0x2C */
  FDEF,
  /* 0x2D */
  void 0,
  // ENDF (eaten by FDEF)
  /* 0x2E */
  MDAP.bind(void 0, 0),
  /* 0x2F */
  MDAP.bind(void 0, 1),
  /* 0x30 */
  IUP.bind(void 0, yUnitVector),
  /* 0x31 */
  IUP.bind(void 0, xUnitVector),
  /* 0x32 */
  SHP.bind(void 0, 0),
  /* 0x33 */
  SHP.bind(void 0, 1),
  /* 0x34 */
  SHC.bind(void 0, 0),
  /* 0x35 */
  SHC.bind(void 0, 1),
  /* 0x36 */
  SHZ.bind(void 0, 0),
  /* 0x37 */
  SHZ.bind(void 0, 1),
  /* 0x38 */
  SHPIX,
  /* 0x39 */
  IP,
  /* 0x3A */
  MSIRP.bind(void 0, 0),
  /* 0x3B */
  MSIRP.bind(void 0, 1),
  /* 0x3C */
  ALIGNRP,
  /* 0x3D */
  RTDG,
  /* 0x3E */
  MIAP.bind(void 0, 0),
  /* 0x3F */
  MIAP.bind(void 0, 1),
  /* 0x40 */
  NPUSHB,
  /* 0x41 */
  NPUSHW,
  /* 0x42 */
  WS,
  /* 0x43 */
  RS,
  /* 0x44 */
  WCVTP,
  /* 0x45 */
  RCVT,
  /* 0x46 */
  GC.bind(void 0, 0),
  /* 0x47 */
  GC.bind(void 0, 1),
  /* 0x48 */
  void 0,
  // TODO SCFS
  /* 0x49 */
  MD.bind(void 0, 0),
  /* 0x4A */
  MD.bind(void 0, 1),
  /* 0x4B */
  MPPEM,
  /* 0x4C */
  void 0,
  // TODO MPS
  /* 0x4D */
  FLIPON,
  /* 0x4E */
  void 0,
  // TODO FLIPOFF
  /* 0x4F */
  void 0,
  // TODO DEBUG
  /* 0x50 */
  LT,
  /* 0x51 */
  LTEQ,
  /* 0x52 */
  GT,
  /* 0x53 */
  GTEQ,
  /* 0x54 */
  EQ,
  /* 0x55 */
  NEQ,
  /* 0x56 */
  ODD,
  /* 0x57 */
  EVEN,
  /* 0x58 */
  IF,
  /* 0x59 */
  EIF,
  /* 0x5A */
  AND,
  /* 0x5B */
  OR,
  /* 0x5C */
  NOT,
  /* 0x5D */
  DELTAP123.bind(void 0, 1),
  /* 0x5E */
  SDB,
  /* 0x5F */
  SDS,
  /* 0x60 */
  ADD,
  /* 0x61 */
  SUB,
  /* 0x62 */
  DIV,
  /* 0x63 */
  MUL,
  /* 0x64 */
  ABS,
  /* 0x65 */
  NEG,
  /* 0x66 */
  FLOOR,
  /* 0x67 */
  CEILING,
  /* 0x68 */
  ROUND.bind(void 0, 0),
  /* 0x69 */
  ROUND.bind(void 0, 1),
  /* 0x6A */
  ROUND.bind(void 0, 2),
  /* 0x6B */
  ROUND.bind(void 0, 3),
  /* 0x6C */
  void 0,
  // TODO NROUND[ab]
  /* 0x6D */
  void 0,
  // TODO NROUND[ab]
  /* 0x6E */
  void 0,
  // TODO NROUND[ab]
  /* 0x6F */
  void 0,
  // TODO NROUND[ab]
  /* 0x70 */
  WCVTF,
  /* 0x71 */
  DELTAP123.bind(void 0, 2),
  /* 0x72 */
  DELTAP123.bind(void 0, 3),
  /* 0x73 */
  DELTAC123.bind(void 0, 1),
  /* 0x74 */
  DELTAC123.bind(void 0, 2),
  /* 0x75 */
  DELTAC123.bind(void 0, 3),
  /* 0x76 */
  SROUND,
  /* 0x77 */
  S45ROUND,
  /* 0x78 */
  void 0,
  // TODO JROT[]
  /* 0x79 */
  void 0,
  // TODO JROF[]
  /* 0x7A */
  ROFF,
  /* 0x7B */
  void 0,
  /* 0x7C */
  RUTG,
  /* 0x7D */
  RDTG,
  /* 0x7E */
  POP,
  // actually SANGW, supposed to do only a pop though
  /* 0x7F */
  POP,
  // actually AA, supposed to do only a pop though
  /* 0x80 */
  void 0,
  // TODO FLIPPT
  /* 0x81 */
  void 0,
  // TODO FLIPRGON
  /* 0x82 */
  void 0,
  // TODO FLIPRGOFF
  /* 0x83 */
  void 0,
  /* 0x84 */
  void 0,
  /* 0x85 */
  SCANCTRL,
  /* 0x86 */
  SDPVTL.bind(void 0, 0),
  /* 0x87 */
  SDPVTL.bind(void 0, 1),
  /* 0x88 */
  GETINFO,
  /* 0x89 */
  void 0,
  // TODO IDEF
  /* 0x8A */
  ROLL,
  /* 0x8B */
  MAX,
  /* 0x8C */
  MIN,
  /* 0x8D */
  SCANTYPE,
  /* 0x8E */
  INSTCTRL,
  /* 0x8F */
  void 0,
  /* 0x90 */
  void 0,
  /* 0x91 */
  void 0,
  /* 0x92 */
  void 0,
  /* 0x93 */
  void 0,
  /* 0x94 */
  void 0,
  /* 0x95 */
  void 0,
  /* 0x96 */
  void 0,
  /* 0x97 */
  void 0,
  /* 0x98 */
  void 0,
  /* 0x99 */
  void 0,
  /* 0x9A */
  void 0,
  /* 0x9B */
  void 0,
  /* 0x9C */
  void 0,
  /* 0x9D */
  void 0,
  /* 0x9E */
  void 0,
  /* 0x9F */
  void 0,
  /* 0xA0 */
  void 0,
  /* 0xA1 */
  void 0,
  /* 0xA2 */
  void 0,
  /* 0xA3 */
  void 0,
  /* 0xA4 */
  void 0,
  /* 0xA5 */
  void 0,
  /* 0xA6 */
  void 0,
  /* 0xA7 */
  void 0,
  /* 0xA8 */
  void 0,
  /* 0xA9 */
  void 0,
  /* 0xAA */
  void 0,
  /* 0xAB */
  void 0,
  /* 0xAC */
  void 0,
  /* 0xAD */
  void 0,
  /* 0xAE */
  void 0,
  /* 0xAF */
  void 0,
  /* 0xB0 */
  PUSHB.bind(void 0, 1),
  /* 0xB1 */
  PUSHB.bind(void 0, 2),
  /* 0xB2 */
  PUSHB.bind(void 0, 3),
  /* 0xB3 */
  PUSHB.bind(void 0, 4),
  /* 0xB4 */
  PUSHB.bind(void 0, 5),
  /* 0xB5 */
  PUSHB.bind(void 0, 6),
  /* 0xB6 */
  PUSHB.bind(void 0, 7),
  /* 0xB7 */
  PUSHB.bind(void 0, 8),
  /* 0xB8 */
  PUSHW.bind(void 0, 1),
  /* 0xB9 */
  PUSHW.bind(void 0, 2),
  /* 0xBA */
  PUSHW.bind(void 0, 3),
  /* 0xBB */
  PUSHW.bind(void 0, 4),
  /* 0xBC */
  PUSHW.bind(void 0, 5),
  /* 0xBD */
  PUSHW.bind(void 0, 6),
  /* 0xBE */
  PUSHW.bind(void 0, 7),
  /* 0xBF */
  PUSHW.bind(void 0, 8),
  /* 0xC0 */
  MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 0),
  /* 0xC1 */
  MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 1),
  /* 0xC2 */
  MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 2),
  /* 0xC3 */
  MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 3),
  /* 0xC4 */
  MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 0),
  /* 0xC5 */
  MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 1),
  /* 0xC6 */
  MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 2),
  /* 0xC7 */
  MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 3),
  /* 0xC8 */
  MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 0),
  /* 0xC9 */
  MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 1),
  /* 0xCA */
  MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 2),
  /* 0xCB */
  MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 3),
  /* 0xCC */
  MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 0),
  /* 0xCD */
  MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 1),
  /* 0xCE */
  MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 2),
  /* 0xCF */
  MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 3),
  /* 0xD0 */
  MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 0),
  /* 0xD1 */
  MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 1),
  /* 0xD2 */
  MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 2),
  /* 0xD3 */
  MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 3),
  /* 0xD4 */
  MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 0),
  /* 0xD5 */
  MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 1),
  /* 0xD6 */
  MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 2),
  /* 0xD7 */
  MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 3),
  /* 0xD8 */
  MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 0),
  /* 0xD9 */
  MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 1),
  /* 0xDA */
  MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 2),
  /* 0xDB */
  MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 3),
  /* 0xDC */
  MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 0),
  /* 0xDD */
  MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 1),
  /* 0xDE */
  MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 2),
  /* 0xDF */
  MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 3),
  /* 0xE0 */
  MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 0),
  /* 0xE1 */
  MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 1),
  /* 0xE2 */
  MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 2),
  /* 0xE3 */
  MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 3),
  /* 0xE4 */
  MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 0),
  /* 0xE5 */
  MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 1),
  /* 0xE6 */
  MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 2),
  /* 0xE7 */
  MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 3),
  /* 0xE8 */
  MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 0),
  /* 0xE9 */
  MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 1),
  /* 0xEA */
  MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 2),
  /* 0xEB */
  MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 3),
  /* 0xEC */
  MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 0),
  /* 0xED */
  MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 1),
  /* 0xEE */
  MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 2),
  /* 0xEF */
  MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 3),
  /* 0xF0 */
  MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 0),
  /* 0xF1 */
  MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 1),
  /* 0xF2 */
  MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 2),
  /* 0xF3 */
  MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 3),
  /* 0xF4 */
  MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 0),
  /* 0xF5 */
  MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 1),
  /* 0xF6 */
  MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 2),
  /* 0xF7 */
  MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 3),
  /* 0xF8 */
  MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 0),
  /* 0xF9 */
  MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 1),
  /* 0xFA */
  MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 2),
  /* 0xFB */
  MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 3),
  /* 0xFC */
  MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 0),
  /* 0xFD */
  MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 1),
  /* 0xFE */
  MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 2),
  /* 0xFF */
  MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 3)
];
function Token(char) {
  this.char = char;
  this.state = {};
  this.activeState = null;
}
function ContextRange(startIndex, endOffset, contextName) {
  this.contextName = contextName;
  this.startIndex = startIndex;
  this.endOffset = endOffset;
}
function ContextChecker(contextName, checkStart, checkEnd) {
  this.contextName = contextName;
  this.openRange = null;
  this.ranges = [];
  this.checkStart = checkStart;
  this.checkEnd = checkEnd;
}
function ContextParams(context, currentIndex) {
  this.context = context;
  this.index = currentIndex;
  this.length = context.length;
  this.current = context[currentIndex];
  this.backtrack = context.slice(0, currentIndex);
  this.lookahead = context.slice(currentIndex + 1);
}
function Event(eventId) {
  this.eventId = eventId;
  this.subscribers = [];
}
function initializeCoreEvents(events) {
  var this$1 = this;
  var coreEvents = [
    "start",
    "end",
    "next",
    "newToken",
    "contextStart",
    "contextEnd",
    "insertToken",
    "removeToken",
    "removeRange",
    "replaceToken",
    "replaceRange",
    "composeRUD",
    "updateContextsRanges"
  ];
  coreEvents.forEach(function(eventId) {
    Object.defineProperty(this$1.events, eventId, {
      value: new Event(eventId)
    });
  });
  if (!!events) {
    coreEvents.forEach(function(eventId) {
      var event = events[eventId];
      if (typeof event === "function") {
        this$1.events[eventId].subscribe(event);
      }
    });
  }
  var requiresContextUpdate = [
    "insertToken",
    "removeToken",
    "removeRange",
    "replaceToken",
    "replaceRange",
    "composeRUD"
  ];
  requiresContextUpdate.forEach(function(eventId) {
    this$1.events[eventId].subscribe(
      this$1.updateContextsRanges
    );
  });
}
function Tokenizer(events) {
  this.tokens = [];
  this.registeredContexts = {};
  this.contextCheckers = [];
  this.events = {};
  this.registeredModifiers = [];
  initializeCoreEvents.call(this, events);
}
Token.prototype.setState = function(key, value) {
  this.state[key] = value;
  this.activeState = { key, value: this.state[key] };
  return this.activeState;
};
Token.prototype.getState = function(stateId) {
  return this.state[stateId] || null;
};
Tokenizer.prototype.inboundIndex = function(index) {
  return index >= 0 && index < this.tokens.length;
};
Tokenizer.prototype.composeRUD = function(RUDs) {
  var this$1 = this;
  var silent = true;
  var state = RUDs.map(function(RUD) {
    return this$1[RUD[0]].apply(this$1, RUD.slice(1).concat(silent));
  });
  var hasFAILObject = function(obj) {
    return typeof obj === "object" && obj.hasOwnProperty("FAIL");
  };
  if (state.every(hasFAILObject)) {
    return {
      FAIL: "composeRUD: one or more operations hasn't completed successfully",
      report: state.filter(hasFAILObject)
    };
  }
  this.dispatch("composeRUD", [state.filter(function(op) {
    return !hasFAILObject(op);
  })]);
};
Tokenizer.prototype.replaceRange = function(startIndex, offset, tokens, silent) {
  offset = offset !== null ? offset : this.tokens.length;
  var isTokenType = tokens.every(function(token) {
    return token instanceof Token;
  });
  if (!isNaN(startIndex) && this.inboundIndex(startIndex) && isTokenType) {
    var replaced = this.tokens.splice.apply(
      this.tokens,
      [startIndex, offset].concat(tokens)
    );
    if (!silent) {
      this.dispatch("replaceToken", [startIndex, offset, tokens]);
    }
    return [replaced, tokens];
  } else {
    return { FAIL: "replaceRange: invalid tokens or startIndex." };
  }
};
Tokenizer.prototype.replaceToken = function(index, token, silent) {
  if (!isNaN(index) && this.inboundIndex(index) && token instanceof Token) {
    var replaced = this.tokens.splice(index, 1, token);
    if (!silent) {
      this.dispatch("replaceToken", [index, token]);
    }
    return [replaced[0], token];
  } else {
    return { FAIL: "replaceToken: invalid token or index." };
  }
};
Tokenizer.prototype.removeRange = function(startIndex, offset, silent) {
  offset = !isNaN(offset) ? offset : this.tokens.length;
  var tokens = this.tokens.splice(startIndex, offset);
  if (!silent) {
    this.dispatch("removeRange", [tokens, startIndex, offset]);
  }
  return tokens;
};
Tokenizer.prototype.removeToken = function(index, silent) {
  if (!isNaN(index) && this.inboundIndex(index)) {
    var token = this.tokens.splice(index, 1);
    if (!silent) {
      this.dispatch("removeToken", [token, index]);
    }
    return token;
  } else {
    return { FAIL: "removeToken: invalid token index." };
  }
};
Tokenizer.prototype.insertToken = function(tokens, index, silent) {
  var tokenType = tokens.every(
    function(token) {
      return token instanceof Token;
    }
  );
  if (tokenType) {
    this.tokens.splice.apply(
      this.tokens,
      [index, 0].concat(tokens)
    );
    if (!silent) {
      this.dispatch("insertToken", [tokens, index]);
    }
    return tokens;
  } else {
    return { FAIL: "insertToken: invalid token(s)." };
  }
};
Tokenizer.prototype.registerModifier = function(modifierId, condition, modifier) {
  this.events.newToken.subscribe(function(token, contextParams) {
    var conditionParams = [token, contextParams];
    var canApplyModifier = condition === null || condition.apply(this, conditionParams) === true;
    var modifierParams = [token, contextParams];
    if (canApplyModifier) {
      var newStateValue = modifier.apply(this, modifierParams);
      token.setState(modifierId, newStateValue);
    }
  });
  this.registeredModifiers.push(modifierId);
};
Event.prototype.subscribe = function(eventHandler) {
  if (typeof eventHandler === "function") {
    return this.subscribers.push(eventHandler) - 1;
  } else {
    return { FAIL: "invalid '" + this.eventId + "' event handler" };
  }
};
Event.prototype.unsubscribe = function(subsId) {
  this.subscribers.splice(subsId, 1);
};
ContextParams.prototype.setCurrentIndex = function(index) {
  this.index = index;
  this.current = this.context[index];
  this.backtrack = this.context.slice(0, index);
  this.lookahead = this.context.slice(index + 1);
};
ContextParams.prototype.get = function(offset) {
  switch (true) {
    case offset === 0:
      return this.current;
    case (offset < 0 && Math.abs(offset) <= this.backtrack.length):
      return this.backtrack.slice(offset)[0];
    case (offset > 0 && offset <= this.lookahead.length):
      return this.lookahead[offset - 1];
    default:
      return null;
  }
};
Tokenizer.prototype.rangeToText = function(range) {
  if (range instanceof ContextRange) {
    return this.getRangeTokens(range).map(function(token) {
      return token.char;
    }).join("");
  }
};
Tokenizer.prototype.getText = function() {
  return this.tokens.map(function(token) {
    return token.char;
  }).join("");
};
Tokenizer.prototype.getContext = function(contextName) {
  var context = this.registeredContexts[contextName];
  return !!context ? context : null;
};
Tokenizer.prototype.on = function(eventName, eventHandler) {
  var event = this.events[eventName];
  if (!!event) {
    return event.subscribe(eventHandler);
  } else {
    return null;
  }
};
Tokenizer.prototype.dispatch = function(eventName, args) {
  var this$1 = this;
  var event = this.events[eventName];
  if (event instanceof Event) {
    event.subscribers.forEach(function(subscriber) {
      subscriber.apply(this$1, args || []);
    });
  }
};
Tokenizer.prototype.registerContextChecker = function(contextName, contextStartCheck, contextEndCheck) {
  if (!!this.getContext(contextName)) {
    return {
      FAIL: "context name '" + contextName + "' is already registered."
    };
  }
  if (typeof contextStartCheck !== "function") {
    return {
      FAIL: "missing context start check."
    };
  }
  if (typeof contextEndCheck !== "function") {
    return {
      FAIL: "missing context end check."
    };
  }
  var contextCheckers = new ContextChecker(
    contextName,
    contextStartCheck,
    contextEndCheck
  );
  this.registeredContexts[contextName] = contextCheckers;
  this.contextCheckers.push(contextCheckers);
  return contextCheckers;
};
Tokenizer.prototype.getRangeTokens = function(range) {
  var endIndex = range.startIndex + range.endOffset;
  return [].concat(
    this.tokens.slice(range.startIndex, endIndex)
  );
};
Tokenizer.prototype.getContextRanges = function(contextName) {
  var context = this.getContext(contextName);
  if (!!context) {
    return context.ranges;
  } else {
    return { FAIL: "context checker '" + contextName + "' is not registered." };
  }
};
Tokenizer.prototype.resetContextsRanges = function() {
  var registeredContexts = this.registeredContexts;
  for (var contextName in registeredContexts) {
    if (registeredContexts.hasOwnProperty(contextName)) {
      var context = registeredContexts[contextName];
      context.ranges = [];
    }
  }
};
Tokenizer.prototype.updateContextsRanges = function() {
  this.resetContextsRanges();
  var chars = this.tokens.map(function(token) {
    return token.char;
  });
  for (var i = 0; i < chars.length; i++) {
    var contextParams = new ContextParams(chars, i);
    this.runContextCheck(contextParams);
  }
  this.dispatch("updateContextsRanges", [this.registeredContexts]);
};
Tokenizer.prototype.setEndOffset = function(offset, contextName) {
  var startIndex = this.getContext(contextName).openRange.startIndex;
  var range = new ContextRange(startIndex, offset, contextName);
  var ranges = this.getContext(contextName).ranges;
  range.rangeId = contextName + "." + ranges.length;
  ranges.push(range);
  this.getContext(contextName).openRange = null;
  return range;
};
Tokenizer.prototype.runContextCheck = function(contextParams) {
  var this$1 = this;
  var index = contextParams.index;
  this.contextCheckers.forEach(function(contextChecker) {
    var contextName = contextChecker.contextName;
    var openRange = this$1.getContext(contextName).openRange;
    if (!openRange && contextChecker.checkStart(contextParams)) {
      openRange = new ContextRange(index, null, contextName);
      this$1.getContext(contextName).openRange = openRange;
      this$1.dispatch("contextStart", [contextName, index]);
    }
    if (!!openRange && contextChecker.checkEnd(contextParams)) {
      var offset = index - openRange.startIndex + 1;
      var range = this$1.setEndOffset(offset, contextName);
      this$1.dispatch("contextEnd", [contextName, range]);
    }
  });
};
Tokenizer.prototype.tokenize = function(text) {
  this.tokens = [];
  this.resetContextsRanges();
  var chars = Array.from(text);
  this.dispatch("start");
  for (var i = 0; i < chars.length; i++) {
    var char = chars[i];
    var contextParams = new ContextParams(chars, i);
    this.dispatch("next", [contextParams]);
    this.runContextCheck(contextParams);
    var token = new Token(char);
    this.tokens.push(token);
    this.dispatch("newToken", [token, contextParams]);
  }
  this.dispatch("end", [this.tokens]);
  return this.tokens;
};
function isArabicChar(c) {
  return /[\u0600-\u065F\u066A-\u06D2\u06FA-\u06FF]/.test(c);
}
function isIsolatedArabicChar(char) {
  return /[\u0630\u0690\u0621\u0631\u0661\u0671\u0622\u0632\u0672\u0692\u06C2\u0623\u0673\u0693\u06C3\u0624\u0694\u06C4\u0625\u0675\u0695\u06C5\u06E5\u0676\u0696\u06C6\u0627\u0677\u0697\u06C7\u0648\u0688\u0698\u06C8\u0689\u0699\u06C9\u068A\u06CA\u066B\u068B\u06CB\u068C\u068D\u06CD\u06FD\u068E\u06EE\u06FE\u062F\u068F\u06CF\u06EF]/.test(char);
}
function isTashkeelArabicChar(char) {
  return /[\u0600-\u0605\u060C-\u060E\u0610-\u061B\u061E\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/.test(char);
}
function isLatinChar(c) {
  return /[A-z]/.test(c);
}
function isWhiteSpace(c) {
  return /\s/.test(c);
}
function FeatureQuery(font) {
  this.font = font;
  this.features = {};
}
function SubstitutionAction(action) {
  this.id = action.id;
  this.tag = action.tag;
  this.substitution = action.substitution;
}
function lookupCoverage(glyphIndex, coverage) {
  if (!glyphIndex) {
    return -1;
  }
  switch (coverage.format) {
    case 1:
      return coverage.glyphs.indexOf(glyphIndex);
    case 2:
      var ranges = coverage.ranges;
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        if (glyphIndex >= range.start && glyphIndex <= range.end) {
          var offset = glyphIndex - range.start;
          return range.index + offset;
        }
      }
      break;
    default:
      return -1;
  }
  return -1;
}
function singleSubstitutionFormat1(glyphIndex, subtable) {
  var substituteIndex = lookupCoverage(glyphIndex, subtable.coverage);
  if (substituteIndex === -1) {
    return null;
  }
  return glyphIndex + subtable.deltaGlyphId;
}
function singleSubstitutionFormat2(glyphIndex, subtable) {
  var substituteIndex = lookupCoverage(glyphIndex, subtable.coverage);
  if (substituteIndex === -1) {
    return null;
  }
  return subtable.substitute[substituteIndex];
}
function lookupCoverageList(coverageList, contextParams) {
  var lookupList = [];
  for (var i = 0; i < coverageList.length; i++) {
    var coverage = coverageList[i];
    var glyphIndex = contextParams.current;
    glyphIndex = Array.isArray(glyphIndex) ? glyphIndex[0] : glyphIndex;
    var lookupIndex = lookupCoverage(glyphIndex, coverage);
    if (lookupIndex !== -1) {
      lookupList.push(lookupIndex);
    }
  }
  if (lookupList.length !== coverageList.length) {
    return -1;
  }
  return lookupList;
}
function chainingSubstitutionFormat3(contextParams, subtable) {
  var lookupsCount = subtable.inputCoverage.length + subtable.lookaheadCoverage.length + subtable.backtrackCoverage.length;
  if (contextParams.context.length < lookupsCount) {
    return [];
  }
  var inputLookups = lookupCoverageList(
    subtable.inputCoverage,
    contextParams
  );
  if (inputLookups === -1) {
    return [];
  }
  var lookaheadOffset = subtable.inputCoverage.length - 1;
  if (contextParams.lookahead.length < subtable.lookaheadCoverage.length) {
    return [];
  }
  var lookaheadContext = contextParams.lookahead.slice(lookaheadOffset);
  while (lookaheadContext.length && isTashkeelArabicChar(lookaheadContext[0].char)) {
    lookaheadContext.shift();
  }
  var lookaheadParams = new ContextParams(lookaheadContext, 0);
  var lookaheadLookups = lookupCoverageList(
    subtable.lookaheadCoverage,
    lookaheadParams
  );
  var backtrackContext = [].concat(contextParams.backtrack);
  backtrackContext.reverse();
  while (backtrackContext.length && isTashkeelArabicChar(backtrackContext[0].char)) {
    backtrackContext.shift();
  }
  if (backtrackContext.length < subtable.backtrackCoverage.length) {
    return [];
  }
  var backtrackParams = new ContextParams(backtrackContext, 0);
  var backtrackLookups = lookupCoverageList(
    subtable.backtrackCoverage,
    backtrackParams
  );
  var contextRulesMatch = inputLookups.length === subtable.inputCoverage.length && lookaheadLookups.length === subtable.lookaheadCoverage.length && backtrackLookups.length === subtable.backtrackCoverage.length;
  var substitutions = [];
  if (contextRulesMatch) {
    for (var i = 0; i < subtable.lookupRecords.length; i++) {
      var lookupRecord = subtable.lookupRecords[i];
      var lookupListIndex = lookupRecord.lookupListIndex;
      var lookupTable = this.getLookupByIndex(lookupListIndex);
      for (var s = 0; s < lookupTable.subtables.length; s++) {
        var subtable$1 = lookupTable.subtables[s];
        var lookup = this.getLookupMethod(lookupTable, subtable$1);
        var substitutionType = this.getSubstitutionType(lookupTable, subtable$1);
        if (substitutionType === "12") {
          for (var n = 0; n < inputLookups.length; n++) {
            var glyphIndex = contextParams.get(n);
            var substitution = lookup(glyphIndex);
            if (substitution) {
              substitutions.push(substitution);
            }
          }
        }
      }
    }
  }
  return substitutions;
}
function ligatureSubstitutionFormat1(contextParams, subtable) {
  var glyphIndex = contextParams.current;
  var ligSetIndex = lookupCoverage(glyphIndex, subtable.coverage);
  if (ligSetIndex === -1) {
    return null;
  }
  var ligature;
  var ligatureSet = subtable.ligatureSets[ligSetIndex];
  for (var s = 0; s < ligatureSet.length; s++) {
    ligature = ligatureSet[s];
    for (var l = 0; l < ligature.components.length; l++) {
      var lookaheadItem = contextParams.lookahead[l];
      var component = ligature.components[l];
      if (lookaheadItem !== component) {
        break;
      }
      if (l === ligature.components.length - 1) {
        return ligature;
      }
    }
  }
  return null;
}
function decompositionSubstitutionFormat1(glyphIndex, subtable) {
  var substituteIndex = lookupCoverage(glyphIndex, subtable.coverage);
  if (substituteIndex === -1) {
    return null;
  }
  return subtable.sequences[substituteIndex];
}
FeatureQuery.prototype.getDefaultScriptFeaturesIndexes = function() {
  var scripts = this.font.tables.gsub.scripts;
  for (var s = 0; s < scripts.length; s++) {
    var script = scripts[s];
    if (script.tag === "DFLT") {
      return script.script.defaultLangSys.featureIndexes;
    }
  }
  return [];
};
FeatureQuery.prototype.getScriptFeaturesIndexes = function(scriptTag) {
  var tables = this.font.tables;
  if (!tables.gsub) {
    return [];
  }
  if (!scriptTag) {
    return this.getDefaultScriptFeaturesIndexes();
  }
  var scripts = this.font.tables.gsub.scripts;
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (script.tag === scriptTag && script.script.defaultLangSys) {
      return script.script.defaultLangSys.featureIndexes;
    } else {
      var langSysRecords = script.langSysRecords;
      if (!!langSysRecords) {
        for (var j = 0; j < langSysRecords.length; j++) {
          var langSysRecord = langSysRecords[j];
          if (langSysRecord.tag === scriptTag) {
            var langSys = langSysRecord.langSys;
            return langSys.featureIndexes;
          }
        }
      }
    }
  }
  return this.getDefaultScriptFeaturesIndexes();
};
FeatureQuery.prototype.mapTagsToFeatures = function(features, scriptTag) {
  var tags = {};
  for (var i = 0; i < features.length; i++) {
    var tag = features[i].tag;
    var feature = features[i].feature;
    tags[tag] = feature;
  }
  this.features[scriptTag].tags = tags;
};
FeatureQuery.prototype.getScriptFeatures = function(scriptTag) {
  var features = this.features[scriptTag];
  if (this.features.hasOwnProperty(scriptTag)) {
    return features;
  }
  var featuresIndexes = this.getScriptFeaturesIndexes(scriptTag);
  if (!featuresIndexes) {
    return null;
  }
  var gsub2 = this.font.tables.gsub;
  features = featuresIndexes.map(function(index) {
    return gsub2.features[index];
  });
  this.features[scriptTag] = features;
  this.mapTagsToFeatures(features, scriptTag);
  return features;
};
FeatureQuery.prototype.getSubstitutionType = function(lookupTable, subtable) {
  var lookupType = lookupTable.lookupType.toString();
  var substFormat = subtable.substFormat.toString();
  return lookupType + substFormat;
};
FeatureQuery.prototype.getLookupMethod = function(lookupTable, subtable) {
  var this$1 = this;
  var substitutionType = this.getSubstitutionType(lookupTable, subtable);
  switch (substitutionType) {
    case "11":
      return function(glyphIndex) {
        return singleSubstitutionFormat1.apply(
          this$1,
          [glyphIndex, subtable]
        );
      };
    case "12":
      return function(glyphIndex) {
        return singleSubstitutionFormat2.apply(
          this$1,
          [glyphIndex, subtable]
        );
      };
    case "63":
      return function(contextParams) {
        return chainingSubstitutionFormat3.apply(
          this$1,
          [contextParams, subtable]
        );
      };
    case "41":
      return function(contextParams) {
        return ligatureSubstitutionFormat1.apply(
          this$1,
          [contextParams, subtable]
        );
      };
    case "21":
      return function(glyphIndex) {
        return decompositionSubstitutionFormat1.apply(
          this$1,
          [glyphIndex, subtable]
        );
      };
    default:
      throw new Error(
        "lookupType: " + lookupTable.lookupType + " - substFormat: " + subtable.substFormat + " is not yet supported"
      );
  }
};
FeatureQuery.prototype.lookupFeature = function(query) {
  var contextParams = query.contextParams;
  var currentIndex = contextParams.index;
  var feature = this.getFeature({
    tag: query.tag,
    script: query.script
  });
  if (!feature) {
    return new Error(
      "font '" + this.font.names.fullName.en + "' doesn't support feature '" + query.tag + "' for script '" + query.script + "'."
    );
  }
  var lookups = this.getFeatureLookups(feature);
  var substitutions = [].concat(contextParams.context);
  for (var l = 0; l < lookups.length; l++) {
    var lookupTable = lookups[l];
    var subtables = this.getLookupSubtables(lookupTable);
    for (var s = 0; s < subtables.length; s++) {
      var subtable = subtables[s];
      var substType = this.getSubstitutionType(lookupTable, subtable);
      var lookup = this.getLookupMethod(lookupTable, subtable);
      var substitution = void 0;
      switch (substType) {
        case "11":
          substitution = lookup(contextParams.current);
          if (substitution) {
            substitutions.splice(currentIndex, 1, new SubstitutionAction({
              id: 11,
              tag: query.tag,
              substitution
            }));
          }
          break;
        case "12":
          substitution = lookup(contextParams.current);
          if (substitution) {
            substitutions.splice(currentIndex, 1, new SubstitutionAction({
              id: 12,
              tag: query.tag,
              substitution
            }));
          }
          break;
        case "63":
          substitution = lookup(contextParams);
          if (Array.isArray(substitution) && substitution.length) {
            substitutions.splice(currentIndex, 1, new SubstitutionAction({
              id: 63,
              tag: query.tag,
              substitution
            }));
          }
          break;
        case "41":
          substitution = lookup(contextParams);
          if (substitution) {
            substitutions.splice(currentIndex, 1, new SubstitutionAction({
              id: 41,
              tag: query.tag,
              substitution
            }));
          }
          break;
        case "21":
          substitution = lookup(contextParams.current);
          if (substitution) {
            substitutions.splice(currentIndex, 1, new SubstitutionAction({
              id: 21,
              tag: query.tag,
              substitution
            }));
          }
          break;
      }
      contextParams = new ContextParams(substitutions, currentIndex);
      if (Array.isArray(substitution) && !substitution.length) {
        continue;
      }
      substitution = null;
    }
  }
  return substitutions.length ? substitutions : null;
};
FeatureQuery.prototype.supports = function(query) {
  if (!query.script) {
    return false;
  }
  this.getScriptFeatures(query.script);
  var supportedScript = this.features.hasOwnProperty(query.script);
  if (!query.tag) {
    return supportedScript;
  }
  var supportedFeature = this.features[query.script].some(function(feature) {
    return feature.tag === query.tag;
  });
  return supportedScript && supportedFeature;
};
FeatureQuery.prototype.getLookupSubtables = function(lookupTable) {
  return lookupTable.subtables || null;
};
FeatureQuery.prototype.getLookupByIndex = function(index) {
  var lookups = this.font.tables.gsub.lookups;
  return lookups[index] || null;
};
FeatureQuery.prototype.getFeatureLookups = function(feature) {
  return feature.lookupListIndexes.map(this.getLookupByIndex.bind(this));
};
FeatureQuery.prototype.getFeature = function getFeature(query) {
  if (!this.font) {
    return { FAIL: "No font was found" };
  }
  if (!this.features.hasOwnProperty(query.script)) {
    this.getScriptFeatures(query.script);
  }
  var scriptFeatures = this.features[query.script];
  if (!scriptFeatures) {
    return { FAIL: "No feature for script " + query.script };
  }
  if (!scriptFeatures.tags[query.tag]) {
    return null;
  }
  return this.features[query.script].tags[query.tag];
};
function arabicWordStartCheck(contextParams) {
  var char = contextParams.current;
  var prevChar = contextParams.get(-1);
  return (
    // ? arabic first char
    prevChar === null && isArabicChar(char) || // ? arabic char preceded with a non arabic char
    !isArabicChar(prevChar) && isArabicChar(char)
  );
}
function arabicWordEndCheck(contextParams) {
  var nextChar = contextParams.get(1);
  return (
    // ? last arabic char
    nextChar === null || // ? next char is not arabic
    !isArabicChar(nextChar)
  );
}
var arabicWordCheck = {
  startCheck: arabicWordStartCheck,
  endCheck: arabicWordEndCheck
};
function arabicSentenceStartCheck(contextParams) {
  var char = contextParams.current;
  var prevChar = contextParams.get(-1);
  return (
    // ? an arabic char preceded with a non arabic char
    (isArabicChar(char) || isTashkeelArabicChar(char)) && !isArabicChar(prevChar)
  );
}
function arabicSentenceEndCheck(contextParams) {
  var nextChar = contextParams.get(1);
  switch (true) {
    case nextChar === null:
      return true;
    case (!isArabicChar(nextChar) && !isTashkeelArabicChar(nextChar)):
      var nextIsWhitespace = isWhiteSpace(nextChar);
      if (!nextIsWhitespace) {
        return true;
      }
      if (nextIsWhitespace) {
        var arabicCharAhead = false;
        arabicCharAhead = contextParams.lookahead.some(
          function(c) {
            return isArabicChar(c) || isTashkeelArabicChar(c);
          }
        );
        if (!arabicCharAhead) {
          return true;
        }
      }
      break;
    default:
      return false;
  }
}
var arabicSentenceCheck = {
  startCheck: arabicSentenceStartCheck,
  endCheck: arabicSentenceEndCheck
};
function singleSubstitutionFormat1$1(action, tokens, index) {
  tokens[index].setState(action.tag, action.substitution);
}
function singleSubstitutionFormat2$1(action, tokens, index) {
  tokens[index].setState(action.tag, action.substitution);
}
function chainingSubstitutionFormat3$1(action, tokens, index) {
  action.substitution.forEach(function(subst, offset) {
    var token = tokens[index + offset];
    token.setState(action.tag, subst);
  });
}
function ligatureSubstitutionFormat1$1(action, tokens, index) {
  var token = tokens[index];
  token.setState(action.tag, action.substitution.ligGlyph);
  var compsCount = action.substitution.components.length;
  for (var i = 0; i < compsCount; i++) {
    token = tokens[index + i + 1];
    token.setState("deleted", true);
  }
}
var SUBSTITUTIONS = {
  11: singleSubstitutionFormat1$1,
  12: singleSubstitutionFormat2$1,
  63: chainingSubstitutionFormat3$1,
  41: ligatureSubstitutionFormat1$1
};
function applySubstitution(action, tokens, index) {
  if (action instanceof SubstitutionAction && SUBSTITUTIONS[action.id]) {
    SUBSTITUTIONS[action.id](action, tokens, index);
  }
}
function willConnectPrev(charContextParams) {
  var backtrack = [].concat(charContextParams.backtrack);
  for (var i = backtrack.length - 1; i >= 0; i--) {
    var prevChar = backtrack[i];
    var isolated = isIsolatedArabicChar(prevChar);
    var tashkeel = isTashkeelArabicChar(prevChar);
    if (!isolated && !tashkeel) {
      return true;
    }
    if (isolated) {
      return false;
    }
  }
  return false;
}
function willConnectNext(charContextParams) {
  if (isIsolatedArabicChar(charContextParams.current)) {
    return false;
  }
  for (var i = 0; i < charContextParams.lookahead.length; i++) {
    var nextChar = charContextParams.lookahead[i];
    var tashkeel = isTashkeelArabicChar(nextChar);
    if (!tashkeel) {
      return true;
    }
  }
  return false;
}
function arabicPresentationForms(range) {
  var this$1 = this;
  var script = "arab";
  var tags = this.featuresTags[script];
  var tokens = this.tokenizer.getRangeTokens(range);
  if (tokens.length === 1) {
    return;
  }
  var contextParams = new ContextParams(
    tokens.map(
      function(token) {
        return token.getState("glyphIndex");
      }
    ),
    0
  );
  var charContextParams = new ContextParams(
    tokens.map(
      function(token) {
        return token.char;
      }
    ),
    0
  );
  tokens.forEach(function(token, index) {
    if (isTashkeelArabicChar(token.char)) {
      return;
    }
    contextParams.setCurrentIndex(index);
    charContextParams.setCurrentIndex(index);
    var CONNECT = 0;
    if (willConnectPrev(charContextParams)) {
      CONNECT |= 1;
    }
    if (willConnectNext(charContextParams)) {
      CONNECT |= 2;
    }
    var tag;
    switch (CONNECT) {
      case 1:
        tag = "fina";
        break;
      case 2:
        tag = "init";
        break;
      case 3:
        tag = "medi";
        break;
    }
    if (tags.indexOf(tag) === -1) {
      return;
    }
    var substitutions = this$1.query.lookupFeature({
      tag,
      script,
      contextParams
    });
    if (substitutions instanceof Error) {
      return console.info(substitutions.message);
    }
    substitutions.forEach(function(action, index2) {
      if (action instanceof SubstitutionAction) {
        applySubstitution(action, tokens, index2);
        contextParams.context[index2] = action.substitution;
      }
    });
  });
}
function getContextParams(tokens, index) {
  var context = tokens.map(function(token) {
    return token.activeState.value;
  });
  return new ContextParams(context, index || 0);
}
function arabicRequiredLigatures(range) {
  var this$1 = this;
  var script = "arab";
  var tokens = this.tokenizer.getRangeTokens(range);
  var contextParams = getContextParams(tokens);
  contextParams.context.forEach(function(glyphIndex, index) {
    contextParams.setCurrentIndex(index);
    var substitutions = this$1.query.lookupFeature({
      tag: "rlig",
      script,
      contextParams
    });
    if (substitutions.length) {
      substitutions.forEach(
        function(action) {
          return applySubstitution(action, tokens, index);
        }
      );
      contextParams = getContextParams(tokens);
    }
  });
}
function latinWordStartCheck(contextParams) {
  var char = contextParams.current;
  var prevChar = contextParams.get(-1);
  return (
    // ? latin first char
    prevChar === null && isLatinChar(char) || // ? latin char preceded with a non latin char
    !isLatinChar(prevChar) && isLatinChar(char)
  );
}
function latinWordEndCheck(contextParams) {
  var nextChar = contextParams.get(1);
  return (
    // ? last latin char
    nextChar === null || // ? next char is not latin
    !isLatinChar(nextChar)
  );
}
var latinWordCheck = {
  startCheck: latinWordStartCheck,
  endCheck: latinWordEndCheck
};
function getContextParams$1(tokens, index) {
  var context = tokens.map(function(token) {
    return token.activeState.value;
  });
  return new ContextParams(context, index || 0);
}
function latinLigature(range) {
  var this$1 = this;
  var script = "latn";
  var tokens = this.tokenizer.getRangeTokens(range);
  var contextParams = getContextParams$1(tokens);
  contextParams.context.forEach(function(glyphIndex, index) {
    contextParams.setCurrentIndex(index);
    var substitutions = this$1.query.lookupFeature({
      tag: "liga",
      script,
      contextParams
    });
    if (substitutions.length) {
      substitutions.forEach(
        function(action) {
          return applySubstitution(action, tokens, index);
        }
      );
      contextParams = getContextParams$1(tokens);
    }
  });
}
function Bidi(baseDir) {
  this.baseDir = baseDir || "ltr";
  this.tokenizer = new Tokenizer();
  this.featuresTags = {};
}
Bidi.prototype.setText = function(text) {
  this.text = text;
};
Bidi.prototype.contextChecks = {
  latinWordCheck,
  arabicWordCheck,
  arabicSentenceCheck
};
function registerContextChecker(checkId) {
  var check2 = this.contextChecks[checkId + "Check"];
  return this.tokenizer.registerContextChecker(
    checkId,
    check2.startCheck,
    check2.endCheck
  );
}
function tokenizeText() {
  registerContextChecker.call(this, "latinWord");
  registerContextChecker.call(this, "arabicWord");
  registerContextChecker.call(this, "arabicSentence");
  return this.tokenizer.tokenize(this.text);
}
function reverseArabicSentences() {
  var this$1 = this;
  var ranges = this.tokenizer.getContextRanges("arabicSentence");
  ranges.forEach(function(range) {
    var rangeTokens = this$1.tokenizer.getRangeTokens(range);
    this$1.tokenizer.replaceRange(
      range.startIndex,
      range.endOffset,
      rangeTokens.reverse()
    );
  });
}
Bidi.prototype.registerFeatures = function(script, tags) {
  var this$1 = this;
  var supportedTags = tags.filter(
    function(tag) {
      return this$1.query.supports({ script, tag });
    }
  );
  if (!this.featuresTags.hasOwnProperty(script)) {
    this.featuresTags[script] = supportedTags;
  } else {
    this.featuresTags[script] = this.featuresTags[script].concat(supportedTags);
  }
};
Bidi.prototype.applyFeatures = function(font, features) {
  if (!font) {
    throw new Error(
      "No valid font was provided to apply features"
    );
  }
  if (!this.query) {
    this.query = new FeatureQuery(font);
  }
  for (var f = 0; f < features.length; f++) {
    var feature = features[f];
    if (!this.query.supports({ script: feature.script })) {
      continue;
    }
    this.registerFeatures(feature.script, feature.tags);
  }
};
Bidi.prototype.registerModifier = function(modifierId, condition, modifier) {
  this.tokenizer.registerModifier(modifierId, condition, modifier);
};
function checkGlyphIndexStatus() {
  if (this.tokenizer.registeredModifiers.indexOf("glyphIndex") === -1) {
    throw new Error(
      "glyphIndex modifier is required to apply arabic presentation features."
    );
  }
}
function applyArabicPresentationForms() {
  var this$1 = this;
  var script = "arab";
  if (!this.featuresTags.hasOwnProperty(script)) {
    return;
  }
  checkGlyphIndexStatus.call(this);
  var ranges = this.tokenizer.getContextRanges("arabicWord");
  ranges.forEach(function(range) {
    arabicPresentationForms.call(this$1, range);
  });
}
function applyArabicRequireLigatures() {
  var this$1 = this;
  var script = "arab";
  if (!this.featuresTags.hasOwnProperty(script)) {
    return;
  }
  var tags = this.featuresTags[script];
  if (tags.indexOf("rlig") === -1) {
    return;
  }
  checkGlyphIndexStatus.call(this);
  var ranges = this.tokenizer.getContextRanges("arabicWord");
  ranges.forEach(function(range) {
    arabicRequiredLigatures.call(this$1, range);
  });
}
function applyLatinLigatures() {
  var this$1 = this;
  var script = "latn";
  if (!this.featuresTags.hasOwnProperty(script)) {
    return;
  }
  var tags = this.featuresTags[script];
  if (tags.indexOf("liga") === -1) {
    return;
  }
  checkGlyphIndexStatus.call(this);
  var ranges = this.tokenizer.getContextRanges("latinWord");
  ranges.forEach(function(range) {
    latinLigature.call(this$1, range);
  });
}
Bidi.prototype.checkContextReady = function(contextId) {
  return !!this.tokenizer.getContext(contextId);
};
Bidi.prototype.applyFeaturesToContexts = function() {
  if (this.checkContextReady("arabicWord")) {
    applyArabicPresentationForms.call(this);
    applyArabicRequireLigatures.call(this);
  }
  if (this.checkContextReady("latinWord")) {
    applyLatinLigatures.call(this);
  }
  if (this.checkContextReady("arabicSentence")) {
    reverseArabicSentences.call(this);
  }
};
Bidi.prototype.processText = function(text) {
  if (!this.text || this.text !== text) {
    this.setText(text);
    tokenizeText.call(this);
    this.applyFeaturesToContexts();
  }
};
Bidi.prototype.getBidiText = function(text) {
  this.processText(text);
  return this.tokenizer.getText();
};
Bidi.prototype.getTextGlyphs = function(text) {
  this.processText(text);
  var indexes = [];
  for (var i = 0; i < this.tokenizer.tokens.length; i++) {
    var token = this.tokenizer.tokens[i];
    if (token.state.deleted) {
      continue;
    }
    var index = token.activeState.value;
    indexes.push(Array.isArray(index) ? index[0] : index);
  }
  return indexes;
};
function Font(options) {
  options = options || {};
  options.tables = options.tables || {};
  if (!options.empty) {
    checkArgument(options.familyName, "When creating a new Font object, familyName is required.");
    checkArgument(options.styleName, "When creating a new Font object, styleName is required.");
    checkArgument(options.unitsPerEm, "When creating a new Font object, unitsPerEm is required.");
    checkArgument(options.ascender, "When creating a new Font object, ascender is required.");
    checkArgument(options.descender <= 0, "When creating a new Font object, negative descender value is required.");
    this.names = {
      fontFamily: { en: options.familyName || " " },
      fontSubfamily: { en: options.styleName || " " },
      fullName: { en: options.fullName || options.familyName + " " + options.styleName },
      // postScriptName may not contain any whitespace
      postScriptName: { en: options.postScriptName || (options.familyName + options.styleName).replace(/\s/g, "") },
      designer: { en: options.designer || " " },
      designerURL: { en: options.designerURL || " " },
      manufacturer: { en: options.manufacturer || " " },
      manufacturerURL: { en: options.manufacturerURL || " " },
      license: { en: options.license || " " },
      licenseURL: { en: options.licenseURL || " " },
      version: { en: options.version || "Version 0.1" },
      description: { en: options.description || " " },
      copyright: { en: options.copyright || " " },
      trademark: { en: options.trademark || " " }
    };
    this.unitsPerEm = options.unitsPerEm || 1e3;
    this.ascender = options.ascender;
    this.descender = options.descender;
    this.createdTimestamp = options.createdTimestamp;
    this.tables = Object.assign(options.tables, {
      os2: Object.assign({
        usWeightClass: options.weightClass || this.usWeightClasses.MEDIUM,
        usWidthClass: options.widthClass || this.usWidthClasses.MEDIUM,
        fsSelection: options.fsSelection || this.fsSelectionValues.REGULAR
      }, options.tables.os2)
    });
  }
  this.supported = true;
  this.glyphs = new glyphset.GlyphSet(this, options.glyphs || []);
  this.encoding = new DefaultEncoding(this);
  this.position = new Position(this);
  this.substitution = new Substitution(this);
  this.tables = this.tables || {};
  this._push = null;
  this._hmtxTableData = {};
  Object.defineProperty(this, "hinting", {
    get: function() {
      if (this._hinting) {
        return this._hinting;
      }
      if (this.outlinesFormat === "truetype") {
        return this._hinting = new Hinting(this);
      }
    }
  });
}
Font.prototype.hasChar = function(c) {
  return this.encoding.charToGlyphIndex(c) !== null;
};
Font.prototype.charToGlyphIndex = function(s) {
  return this.encoding.charToGlyphIndex(s);
};
Font.prototype.charToGlyph = function(c) {
  var glyphIndex = this.charToGlyphIndex(c);
  var glyph = this.glyphs.get(glyphIndex);
  if (!glyph) {
    glyph = this.glyphs.get(0);
  }
  return glyph;
};
Font.prototype.updateFeatures = function(options) {
  return this.defaultRenderOptions.features.map(function(feature) {
    if (feature.script === "latn") {
      return {
        script: "latn",
        tags: feature.tags.filter(function(tag) {
          return options[tag];
        })
      };
    } else {
      return feature;
    }
  });
};
Font.prototype.stringToGlyphs = function(s, options) {
  var this$1 = this;
  var bidi = new Bidi();
  var charToGlyphIndexMod = function(token) {
    return this$1.charToGlyphIndex(token.char);
  };
  bidi.registerModifier("glyphIndex", null, charToGlyphIndexMod);
  var features = options ? this.updateFeatures(options.features) : this.defaultRenderOptions.features;
  bidi.applyFeatures(this, features);
  var indexes = bidi.getTextGlyphs(s);
  var length = indexes.length;
  var glyphs = new Array(length);
  var notdef = this.glyphs.get(0);
  for (var i = 0; i < length; i += 1) {
    glyphs[i] = this.glyphs.get(indexes[i]) || notdef;
  }
  return glyphs;
};
Font.prototype.nameToGlyphIndex = function(name) {
  return this.glyphNames.nameToGlyphIndex(name);
};
Font.prototype.nameToGlyph = function(name) {
  var glyphIndex = this.nameToGlyphIndex(name);
  var glyph = this.glyphs.get(glyphIndex);
  if (!glyph) {
    glyph = this.glyphs.get(0);
  }
  return glyph;
};
Font.prototype.glyphIndexToName = function(gid) {
  if (!this.glyphNames.glyphIndexToName) {
    return "";
  }
  return this.glyphNames.glyphIndexToName(gid);
};
Font.prototype.getKerningValue = function(leftGlyph, rightGlyph) {
  leftGlyph = leftGlyph.index || leftGlyph;
  rightGlyph = rightGlyph.index || rightGlyph;
  var gposKerning = this.position.defaultKerningTables;
  if (gposKerning) {
    return this.position.getKerningValue(gposKerning, leftGlyph, rightGlyph);
  }
  return this.kerningPairs[leftGlyph + "," + rightGlyph] || 0;
};
Font.prototype.defaultRenderOptions = {
  kerning: true,
  features: [
    /**
     * these 4 features are required to render Arabic text properly
     * and shouldn't be turned off when rendering arabic text.
     */
    { script: "arab", tags: ["init", "medi", "fina", "rlig"] },
    { script: "latn", tags: ["liga", "rlig"] }
  ]
};
Font.prototype.forEachGlyph = function(text, x, y, fontSize, options, callback) {
  x = x !== void 0 ? x : 0;
  y = y !== void 0 ? y : 0;
  fontSize = fontSize !== void 0 ? fontSize : 72;
  options = Object.assign({}, this.defaultRenderOptions, options);
  var fontScale = 1 / this.unitsPerEm * fontSize;
  var glyphs = this.stringToGlyphs(text, options);
  var kerningLookups;
  if (options.kerning) {
    var script = options.script || this.position.getDefaultScriptName();
    kerningLookups = this.position.getKerningTables(script, options.language);
  }
  for (var i = 0; i < glyphs.length; i += 1) {
    var glyph = glyphs[i];
    callback.call(this, glyph, x, y, fontSize, options);
    if (glyph.advanceWidth) {
      x += glyph.advanceWidth * fontScale;
    }
    if (options.kerning && i < glyphs.length - 1) {
      var kerningValue = kerningLookups ? this.position.getKerningValue(kerningLookups, glyph.index, glyphs[i + 1].index) : this.getKerningValue(glyph, glyphs[i + 1]);
      x += kerningValue * fontScale;
    }
    if (options.letterSpacing) {
      x += options.letterSpacing * fontSize;
    } else if (options.tracking) {
      x += options.tracking / 1e3 * fontSize;
    }
  }
  return x;
};
Font.prototype.getPath = function(text, x, y, fontSize, options) {
  var fullPath = new Path();
  this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
    var glyphPath = glyph.getPath(gX, gY, gFontSize, options, this);
    fullPath.extend(glyphPath);
  });
  return fullPath;
};
Font.prototype.getPaths = function(text, x, y, fontSize, options) {
  var glyphPaths = [];
  this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
    var glyphPath = glyph.getPath(gX, gY, gFontSize, options, this);
    glyphPaths.push(glyphPath);
  });
  return glyphPaths;
};
Font.prototype.getAdvanceWidth = function(text, fontSize, options) {
  return this.forEachGlyph(text, 0, 0, fontSize, options, function() {
  });
};
Font.prototype.draw = function(ctx, text, x, y, fontSize, options) {
  this.getPath(text, x, y, fontSize, options).draw(ctx);
};
Font.prototype.drawPoints = function(ctx, text, x, y, fontSize, options) {
  this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
    glyph.drawPoints(ctx, gX, gY, gFontSize);
  });
};
Font.prototype.drawMetrics = function(ctx, text, x, y, fontSize, options) {
  this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
    glyph.drawMetrics(ctx, gX, gY, gFontSize);
  });
};
Font.prototype.getEnglishName = function(name) {
  var translations = this.names[name];
  if (translations) {
    return translations.en;
  }
};
Font.prototype.validate = function() {
  var _this = this;
  function assert(predicate, message) {
  }
  function assertNamePresent(name) {
    var englishName = _this.getEnglishName(name);
    assert(englishName && englishName.trim().length > 0);
  }
  assertNamePresent("fontFamily");
  assertNamePresent("weightName");
  assertNamePresent("manufacturer");
  assertNamePresent("copyright");
  assertNamePresent("version");
  assert(this.unitsPerEm > 0);
};
Font.prototype.toTables = function() {
  return sfnt.fontToTable(this);
};
Font.prototype.toBuffer = function() {
  console.warn("Font.toBuffer is deprecated. Use Font.toArrayBuffer instead.");
  return this.toArrayBuffer();
};
Font.prototype.toArrayBuffer = function() {
  var sfntTable = this.toTables();
  var bytes = sfntTable.encode();
  var buffer = new ArrayBuffer(bytes.length);
  var intArray = new Uint8Array(buffer);
  for (var i = 0; i < bytes.length; i++) {
    intArray[i] = bytes[i];
  }
  return buffer;
};
Font.prototype.download = function(fileName) {
  var familyName = this.getEnglishName("fontFamily");
  var styleName = this.getEnglishName("fontSubfamily");
  fileName = fileName || familyName.replace(/\s/g, "") + "-" + styleName + ".otf";
  var arrayBuffer = this.toArrayBuffer();
  if (isBrowser()) {
    window.URL = window.URL || window.webkitURL;
    if (window.URL) {
      var dataView = new DataView(arrayBuffer);
      var blob = new Blob([dataView], { type: "font/opentype" });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      var event = document.createEvent("MouseEvents");
      event.initEvent("click", true, false);
      link.dispatchEvent(event);
    } else {
      console.warn("Font file could not be downloaded. Try using a different browser.");
    }
  } else {
    var fs = require_fs();
    var buffer = arrayBufferToNodeBuffer(arrayBuffer);
    fs.writeFileSync(fileName, buffer);
  }
};
Font.prototype.fsSelectionValues = {
  ITALIC: 1,
  //1
  UNDERSCORE: 2,
  //2
  NEGATIVE: 4,
  //4
  OUTLINED: 8,
  //8
  STRIKEOUT: 16,
  //16
  BOLD: 32,
  //32
  REGULAR: 64,
  //64
  USER_TYPO_METRICS: 128,
  //128
  WWS: 256,
  //256
  OBLIQUE: 512
  //512
};
Font.prototype.usWidthClasses = {
  ULTRA_CONDENSED: 1,
  EXTRA_CONDENSED: 2,
  CONDENSED: 3,
  SEMI_CONDENSED: 4,
  MEDIUM: 5,
  SEMI_EXPANDED: 6,
  EXPANDED: 7,
  EXTRA_EXPANDED: 8,
  ULTRA_EXPANDED: 9
};
Font.prototype.usWeightClasses = {
  THIN: 100,
  EXTRA_LIGHT: 200,
  LIGHT: 300,
  NORMAL: 400,
  MEDIUM: 500,
  SEMI_BOLD: 600,
  BOLD: 700,
  EXTRA_BOLD: 800,
  BLACK: 900
};
function addName(name, names) {
  var nameString = JSON.stringify(name);
  var nameID = 256;
  for (var nameKey in names) {
    var n = parseInt(nameKey);
    if (!n || n < 256) {
      continue;
    }
    if (JSON.stringify(names[nameKey]) === nameString) {
      return n;
    }
    if (nameID <= n) {
      nameID = n + 1;
    }
  }
  names[nameID] = name;
  return nameID;
}
function makeFvarAxis(n, axis, names) {
  var nameID = addName(axis.name, names);
  return [
    { name: "tag_" + n, type: "TAG", value: axis.tag },
    { name: "minValue_" + n, type: "FIXED", value: axis.minValue << 16 },
    { name: "defaultValue_" + n, type: "FIXED", value: axis.defaultValue << 16 },
    { name: "maxValue_" + n, type: "FIXED", value: axis.maxValue << 16 },
    { name: "flags_" + n, type: "USHORT", value: 0 },
    { name: "nameID_" + n, type: "USHORT", value: nameID }
  ];
}
function parseFvarAxis(data, start, names) {
  var axis = {};
  var p = new parse.Parser(data, start);
  axis.tag = p.parseTag();
  axis.minValue = p.parseFixed();
  axis.defaultValue = p.parseFixed();
  axis.maxValue = p.parseFixed();
  p.skip("uShort", 1);
  axis.name = names[p.parseUShort()] || {};
  return axis;
}
function makeFvarInstance(n, inst, axes, names) {
  var nameID = addName(inst.name, names);
  var fields = [
    { name: "nameID_" + n, type: "USHORT", value: nameID },
    { name: "flags_" + n, type: "USHORT", value: 0 }
  ];
  for (var i = 0; i < axes.length; ++i) {
    var axisTag = axes[i].tag;
    fields.push({
      name: "axis_" + n + " " + axisTag,
      type: "FIXED",
      value: inst.coordinates[axisTag] << 16
    });
  }
  return fields;
}
function parseFvarInstance(data, start, axes, names) {
  var inst = {};
  var p = new parse.Parser(data, start);
  inst.name = names[p.parseUShort()] || {};
  p.skip("uShort", 1);
  inst.coordinates = {};
  for (var i = 0; i < axes.length; ++i) {
    inst.coordinates[axes[i].tag] = p.parseFixed();
  }
  return inst;
}
function makeFvarTable(fvar2, names) {
  var result = new table.Table("fvar", [
    { name: "version", type: "ULONG", value: 65536 },
    { name: "offsetToData", type: "USHORT", value: 0 },
    { name: "countSizePairs", type: "USHORT", value: 2 },
    { name: "axisCount", type: "USHORT", value: fvar2.axes.length },
    { name: "axisSize", type: "USHORT", value: 20 },
    { name: "instanceCount", type: "USHORT", value: fvar2.instances.length },
    { name: "instanceSize", type: "USHORT", value: 4 + fvar2.axes.length * 4 }
  ]);
  result.offsetToData = result.sizeOf();
  for (var i = 0; i < fvar2.axes.length; i++) {
    result.fields = result.fields.concat(makeFvarAxis(i, fvar2.axes[i], names));
  }
  for (var j = 0; j < fvar2.instances.length; j++) {
    result.fields = result.fields.concat(makeFvarInstance(j, fvar2.instances[j], fvar2.axes, names));
  }
  return result;
}
function parseFvarTable(data, start, names) {
  var p = new parse.Parser(data, start);
  var tableVersion = p.parseULong();
  check.argument(tableVersion === 65536, "Unsupported fvar table version.");
  var offsetToData = p.parseOffset16();
  p.skip("uShort", 1);
  var axisCount = p.parseUShort();
  var axisSize = p.parseUShort();
  var instanceCount = p.parseUShort();
  var instanceSize = p.parseUShort();
  var axes = [];
  for (var i = 0; i < axisCount; i++) {
    axes.push(parseFvarAxis(data, start + offsetToData + i * axisSize, names));
  }
  var instances = [];
  var instanceStart = start + offsetToData + axisCount * axisSize;
  for (var j = 0; j < instanceCount; j++) {
    instances.push(parseFvarInstance(data, instanceStart + j * instanceSize, axes, names));
  }
  return { axes, instances };
}
var fvar = { make: makeFvarTable, parse: parseFvarTable };
var attachList = function() {
  return {
    coverage: this.parsePointer(Parser.coverage),
    attachPoints: this.parseList(Parser.pointer(Parser.uShortList))
  };
};
var caretValue = function() {
  var format = this.parseUShort();
  check.argument(
    format === 1 || format === 2 || format === 3,
    "Unsupported CaretValue table version."
  );
  if (format === 1) {
    return { coordinate: this.parseShort() };
  } else if (format === 2) {
    return { pointindex: this.parseShort() };
  } else if (format === 3) {
    return { coordinate: this.parseShort() };
  }
};
var ligGlyph = function() {
  return this.parseList(Parser.pointer(caretValue));
};
var ligCaretList = function() {
  return {
    coverage: this.parsePointer(Parser.coverage),
    ligGlyphs: this.parseList(Parser.pointer(ligGlyph))
  };
};
var markGlyphSets = function() {
  this.parseUShort();
  return this.parseList(Parser.pointer(Parser.coverage));
};
function parseGDEFTable(data, start) {
  start = start || 0;
  var p = new Parser(data, start);
  var tableVersion = p.parseVersion(1);
  check.argument(
    tableVersion === 1 || tableVersion === 1.2 || tableVersion === 1.3,
    "Unsupported GDEF table version."
  );
  var gdef2 = {
    version: tableVersion,
    classDef: p.parsePointer(Parser.classDef),
    attachList: p.parsePointer(attachList),
    ligCaretList: p.parsePointer(ligCaretList),
    markAttachClassDef: p.parsePointer(Parser.classDef)
  };
  if (tableVersion >= 1.2) {
    gdef2.markGlyphSets = p.parsePointer(markGlyphSets);
  }
  return gdef2;
}
var gdef = { parse: parseGDEFTable };
var subtableParsers$1 = new Array(10);
subtableParsers$1[1] = function parseLookup12() {
  var start = this.offset + this.relativeOffset;
  var posformat = this.parseUShort();
  if (posformat === 1) {
    return {
      posFormat: 1,
      coverage: this.parsePointer(Parser.coverage),
      value: this.parseValueRecord()
    };
  } else if (posformat === 2) {
    return {
      posFormat: 2,
      coverage: this.parsePointer(Parser.coverage),
      values: this.parseValueRecordList()
    };
  }
  check.assert(false, "0x" + start.toString(16) + ": GPOS lookup type 1 format must be 1 or 2.");
};
subtableParsers$1[2] = function parseLookup22() {
  var start = this.offset + this.relativeOffset;
  var posFormat = this.parseUShort();
  check.assert(posFormat === 1 || posFormat === 2, "0x" + start.toString(16) + ": GPOS lookup type 2 format must be 1 or 2.");
  var coverage = this.parsePointer(Parser.coverage);
  var valueFormat1 = this.parseUShort();
  var valueFormat2 = this.parseUShort();
  if (posFormat === 1) {
    return {
      posFormat,
      coverage,
      valueFormat1,
      valueFormat2,
      pairSets: this.parseList(Parser.pointer(Parser.list(function() {
        return {
          // pairValueRecord
          secondGlyph: this.parseUShort(),
          value1: this.parseValueRecord(valueFormat1),
          value2: this.parseValueRecord(valueFormat2)
        };
      })))
    };
  } else if (posFormat === 2) {
    var classDef1 = this.parsePointer(Parser.classDef);
    var classDef2 = this.parsePointer(Parser.classDef);
    var class1Count = this.parseUShort();
    var class2Count = this.parseUShort();
    return {
      // Class Pair Adjustment
      posFormat,
      coverage,
      valueFormat1,
      valueFormat2,
      classDef1,
      classDef2,
      class1Count,
      class2Count,
      classRecords: this.parseList(class1Count, Parser.list(class2Count, function() {
        return {
          value1: this.parseValueRecord(valueFormat1),
          value2: this.parseValueRecord(valueFormat2)
        };
      }))
    };
  }
};
subtableParsers$1[3] = function parseLookup32() {
  return { error: "GPOS Lookup 3 not supported" };
};
subtableParsers$1[4] = function parseLookup42() {
  return { error: "GPOS Lookup 4 not supported" };
};
subtableParsers$1[5] = function parseLookup52() {
  return { error: "GPOS Lookup 5 not supported" };
};
subtableParsers$1[6] = function parseLookup62() {
  return { error: "GPOS Lookup 6 not supported" };
};
subtableParsers$1[7] = function parseLookup72() {
  return { error: "GPOS Lookup 7 not supported" };
};
subtableParsers$1[8] = function parseLookup82() {
  return { error: "GPOS Lookup 8 not supported" };
};
subtableParsers$1[9] = function parseLookup9() {
  return { error: "GPOS Lookup 9 not supported" };
};
function parseGposTable(data, start) {
  start = start || 0;
  var p = new Parser(data, start);
  var tableVersion = p.parseVersion(1);
  check.argument(tableVersion === 1 || tableVersion === 1.1, "Unsupported GPOS table version " + tableVersion);
  if (tableVersion === 1) {
    return {
      version: tableVersion,
      scripts: p.parseScriptList(),
      features: p.parseFeatureList(),
      lookups: p.parseLookupList(subtableParsers$1)
    };
  } else {
    return {
      version: tableVersion,
      scripts: p.parseScriptList(),
      features: p.parseFeatureList(),
      lookups: p.parseLookupList(subtableParsers$1),
      variations: p.parseFeatureVariationsList()
    };
  }
}
var subtableMakers$1 = new Array(10);
function makeGposTable(gpos2) {
  return new table.Table("GPOS", [
    { name: "version", type: "ULONG", value: 65536 },
    { name: "scripts", type: "TABLE", value: new table.ScriptList(gpos2.scripts) },
    { name: "features", type: "TABLE", value: new table.FeatureList(gpos2.features) },
    { name: "lookups", type: "TABLE", value: new table.LookupList(gpos2.lookups, subtableMakers$1) }
  ]);
}
var gpos = { parse: parseGposTable, make: makeGposTable };
function parseWindowsKernTable(p) {
  var pairs = {};
  p.skip("uShort");
  var subtableVersion = p.parseUShort();
  check.argument(subtableVersion === 0, "Unsupported kern sub-table version.");
  p.skip("uShort", 2);
  var nPairs = p.parseUShort();
  p.skip("uShort", 3);
  for (var i = 0; i < nPairs; i += 1) {
    var leftIndex = p.parseUShort();
    var rightIndex = p.parseUShort();
    var value = p.parseShort();
    pairs[leftIndex + "," + rightIndex] = value;
  }
  return pairs;
}
function parseMacKernTable(p) {
  var pairs = {};
  p.skip("uShort");
  var nTables = p.parseULong();
  if (nTables > 1) {
    console.warn("Only the first kern subtable is supported.");
  }
  p.skip("uLong");
  var coverage = p.parseUShort();
  var subtableVersion = coverage & 255;
  p.skip("uShort");
  if (subtableVersion === 0) {
    var nPairs = p.parseUShort();
    p.skip("uShort", 3);
    for (var i = 0; i < nPairs; i += 1) {
      var leftIndex = p.parseUShort();
      var rightIndex = p.parseUShort();
      var value = p.parseShort();
      pairs[leftIndex + "," + rightIndex] = value;
    }
  }
  return pairs;
}
function parseKernTable(data, start) {
  var p = new parse.Parser(data, start);
  var tableVersion = p.parseUShort();
  if (tableVersion === 0) {
    return parseWindowsKernTable(p);
  } else if (tableVersion === 1) {
    return parseMacKernTable(p);
  } else {
    throw new Error("Unsupported kern table version (" + tableVersion + ").");
  }
}
var kern = { parse: parseKernTable };
function parseLocaTable(data, start, numGlyphs, shortVersion) {
  var p = new parse.Parser(data, start);
  var parseFn = shortVersion ? p.parseUShort : p.parseULong;
  var glyphOffsets = [];
  for (var i = 0; i < numGlyphs + 1; i += 1) {
    var glyphOffset = parseFn.call(p);
    if (shortVersion) {
      glyphOffset *= 2;
    }
    glyphOffsets.push(glyphOffset);
  }
  return glyphOffsets;
}
var loca = { parse: parseLocaTable };
function loadFromFile(path, callback) {
  var fs = require_fs();
  fs.readFile(path, function(err, buffer) {
    if (err) {
      return callback(err.message);
    }
    callback(null, nodeBufferToArrayBuffer(buffer));
  });
}
function loadFromUrl(url, callback) {
  var request = new XMLHttpRequest();
  request.open("get", url, true);
  request.responseType = "arraybuffer";
  request.onload = function() {
    if (request.response) {
      return callback(null, request.response);
    } else {
      return callback("Font could not be loaded: " + request.statusText);
    }
  };
  request.onerror = function() {
    callback("Font could not be loaded");
  };
  request.send();
}
function parseOpenTypeTableEntries(data, numTables) {
  var tableEntries = [];
  var p = 12;
  for (var i = 0; i < numTables; i += 1) {
    var tag = parse.getTag(data, p);
    var checksum = parse.getULong(data, p + 4);
    var offset = parse.getULong(data, p + 8);
    var length = parse.getULong(data, p + 12);
    tableEntries.push({ tag, checksum, offset, length, compression: false });
    p += 16;
  }
  return tableEntries;
}
function parseWOFFTableEntries(data, numTables) {
  var tableEntries = [];
  var p = 44;
  for (var i = 0; i < numTables; i += 1) {
    var tag = parse.getTag(data, p);
    var offset = parse.getULong(data, p + 4);
    var compLength = parse.getULong(data, p + 8);
    var origLength = parse.getULong(data, p + 12);
    var compression = void 0;
    if (compLength < origLength) {
      compression = "WOFF";
    } else {
      compression = false;
    }
    tableEntries.push({
      tag,
      offset,
      compression,
      compressedLength: compLength,
      length: origLength
    });
    p += 20;
  }
  return tableEntries;
}
function uncompressTable(data, tableEntry) {
  if (tableEntry.compression === "WOFF") {
    var inBuffer = new Uint8Array(data.buffer, tableEntry.offset + 2, tableEntry.compressedLength - 2);
    var outBuffer = new Uint8Array(tableEntry.length);
    tinyInflate(inBuffer, outBuffer);
    if (outBuffer.byteLength !== tableEntry.length) {
      throw new Error("Decompression error: " + tableEntry.tag + " decompressed length doesn't match recorded length");
    }
    var view = new DataView(outBuffer.buffer, 0);
    return { data: view, offset: 0 };
  } else {
    return { data, offset: tableEntry.offset };
  }
}
function parseBuffer(buffer, opt) {
  opt = opt === void 0 || opt === null ? {} : opt;
  var indexToLocFormat;
  var ltagTable;
  var font = new Font({ empty: true });
  var data = new DataView(buffer, 0);
  var numTables;
  var tableEntries = [];
  var signature = parse.getTag(data, 0);
  if (signature === String.fromCharCode(0, 1, 0, 0) || signature === "true" || signature === "typ1") {
    font.outlinesFormat = "truetype";
    numTables = parse.getUShort(data, 4);
    tableEntries = parseOpenTypeTableEntries(data, numTables);
  } else if (signature === "OTTO") {
    font.outlinesFormat = "cff";
    numTables = parse.getUShort(data, 4);
    tableEntries = parseOpenTypeTableEntries(data, numTables);
  } else if (signature === "wOFF") {
    var flavor = parse.getTag(data, 4);
    if (flavor === String.fromCharCode(0, 1, 0, 0)) {
      font.outlinesFormat = "truetype";
    } else if (flavor === "OTTO") {
      font.outlinesFormat = "cff";
    } else {
      throw new Error("Unsupported OpenType flavor " + signature);
    }
    numTables = parse.getUShort(data, 12);
    tableEntries = parseWOFFTableEntries(data, numTables);
  } else {
    throw new Error("Unsupported OpenType signature " + signature);
  }
  var cffTableEntry;
  var fvarTableEntry;
  var glyfTableEntry;
  var gdefTableEntry;
  var gposTableEntry;
  var gsubTableEntry;
  var hmtxTableEntry;
  var kernTableEntry;
  var locaTableEntry;
  var nameTableEntry;
  var metaTableEntry;
  var p;
  for (var i = 0; i < numTables; i += 1) {
    var tableEntry = tableEntries[i];
    var table2 = void 0;
    switch (tableEntry.tag) {
      case "cmap":
        table2 = uncompressTable(data, tableEntry);
        font.tables.cmap = cmap.parse(table2.data, table2.offset);
        font.encoding = new CmapEncoding(font.tables.cmap);
        break;
      case "cvt ":
        table2 = uncompressTable(data, tableEntry);
        p = new parse.Parser(table2.data, table2.offset);
        font.tables.cvt = p.parseShortList(tableEntry.length / 2);
        break;
      case "fvar":
        fvarTableEntry = tableEntry;
        break;
      case "fpgm":
        table2 = uncompressTable(data, tableEntry);
        p = new parse.Parser(table2.data, table2.offset);
        font.tables.fpgm = p.parseByteList(tableEntry.length);
        break;
      case "head":
        table2 = uncompressTable(data, tableEntry);
        font.tables.head = head.parse(table2.data, table2.offset);
        font.unitsPerEm = font.tables.head.unitsPerEm;
        indexToLocFormat = font.tables.head.indexToLocFormat;
        break;
      case "hhea":
        table2 = uncompressTable(data, tableEntry);
        font.tables.hhea = hhea.parse(table2.data, table2.offset);
        font.ascender = font.tables.hhea.ascender;
        font.descender = font.tables.hhea.descender;
        font.numberOfHMetrics = font.tables.hhea.numberOfHMetrics;
        break;
      case "hmtx":
        hmtxTableEntry = tableEntry;
        break;
      case "ltag":
        table2 = uncompressTable(data, tableEntry);
        ltagTable = ltag.parse(table2.data, table2.offset);
        break;
      case "maxp":
        table2 = uncompressTable(data, tableEntry);
        font.tables.maxp = maxp.parse(table2.data, table2.offset);
        font.numGlyphs = font.tables.maxp.numGlyphs;
        break;
      case "name":
        nameTableEntry = tableEntry;
        break;
      case "OS/2":
        table2 = uncompressTable(data, tableEntry);
        font.tables.os2 = os2.parse(table2.data, table2.offset);
        break;
      case "post":
        table2 = uncompressTable(data, tableEntry);
        font.tables.post = post.parse(table2.data, table2.offset);
        font.glyphNames = new GlyphNames(font.tables.post);
        break;
      case "prep":
        table2 = uncompressTable(data, tableEntry);
        p = new parse.Parser(table2.data, table2.offset);
        font.tables.prep = p.parseByteList(tableEntry.length);
        break;
      case "glyf":
        glyfTableEntry = tableEntry;
        break;
      case "loca":
        locaTableEntry = tableEntry;
        break;
      case "CFF ":
        cffTableEntry = tableEntry;
        break;
      case "kern":
        kernTableEntry = tableEntry;
        break;
      case "GDEF":
        gdefTableEntry = tableEntry;
        break;
      case "GPOS":
        gposTableEntry = tableEntry;
        break;
      case "GSUB":
        gsubTableEntry = tableEntry;
        break;
      case "meta":
        metaTableEntry = tableEntry;
        break;
    }
  }
  var nameTable = uncompressTable(data, nameTableEntry);
  font.tables.name = _name.parse(nameTable.data, nameTable.offset, ltagTable);
  font.names = font.tables.name;
  if (glyfTableEntry && locaTableEntry) {
    var shortVersion = indexToLocFormat === 0;
    var locaTable = uncompressTable(data, locaTableEntry);
    var locaOffsets = loca.parse(locaTable.data, locaTable.offset, font.numGlyphs, shortVersion);
    var glyfTable = uncompressTable(data, glyfTableEntry);
    font.glyphs = glyf.parse(glyfTable.data, glyfTable.offset, locaOffsets, font, opt);
  } else if (cffTableEntry) {
    var cffTable = uncompressTable(data, cffTableEntry);
    cff.parse(cffTable.data, cffTable.offset, font, opt);
  } else {
    throw new Error("Font doesn't contain TrueType or CFF outlines.");
  }
  var hmtxTable = uncompressTable(data, hmtxTableEntry);
  hmtx.parse(font, hmtxTable.data, hmtxTable.offset, font.numberOfHMetrics, font.numGlyphs, font.glyphs, opt);
  addGlyphNames(font, opt);
  if (kernTableEntry) {
    var kernTable = uncompressTable(data, kernTableEntry);
    font.kerningPairs = kern.parse(kernTable.data, kernTable.offset);
  } else {
    font.kerningPairs = {};
  }
  if (gdefTableEntry) {
    var gdefTable = uncompressTable(data, gdefTableEntry);
    font.tables.gdef = gdef.parse(gdefTable.data, gdefTable.offset);
  }
  if (gposTableEntry) {
    var gposTable = uncompressTable(data, gposTableEntry);
    font.tables.gpos = gpos.parse(gposTable.data, gposTable.offset);
    font.position.init();
  }
  if (gsubTableEntry) {
    var gsubTable = uncompressTable(data, gsubTableEntry);
    font.tables.gsub = gsub.parse(gsubTable.data, gsubTable.offset);
  }
  if (fvarTableEntry) {
    var fvarTable = uncompressTable(data, fvarTableEntry);
    font.tables.fvar = fvar.parse(fvarTable.data, fvarTable.offset, font.names);
  }
  if (metaTableEntry) {
    var metaTable = uncompressTable(data, metaTableEntry);
    font.tables.meta = meta.parse(metaTable.data, metaTable.offset);
    font.metas = font.tables.meta;
  }
  return font;
}
function load(url, callback, opt) {
  opt = opt === void 0 || opt === null ? {} : opt;
  var isNode = typeof window === "undefined";
  var loadFn = isNode && !opt.isUrl ? loadFromFile : loadFromUrl;
  return new Promise(function(resolve, reject) {
    loadFn(url, function(err, arrayBuffer) {
      if (err) {
        if (callback) {
          return callback(err);
        } else {
          reject(err);
        }
      }
      var font;
      try {
        font = parseBuffer(arrayBuffer, opt);
      } catch (e) {
        if (callback) {
          return callback(e, null);
        } else {
          reject(e);
        }
      }
      if (callback) {
        return callback(null, font);
      } else {
        resolve(font);
      }
    });
  });
}

// src/app/common/services/fonts.service.ts
var FontService = class _FontService {
  constructor() {
    this.fontPaths = {};
    this.rkrf = {
      "gjK_RA": {
        "Components": "\u0A95\u0ACD\u0AB0",
        "Name": "gjK_RA"
      },
      "gjKH_RA": {
        "Components": "\u0A96\u0ACD\u0AB0",
        "Name": "gjKH_RA"
      },
      "gjG_RA": {
        "Components": "\u0A97\u0ACD\u0AB0",
        "Name": "gjG_RA"
      },
      "gjGH_RA": {
        "Components": "\u0A98\u0ACD\u0AB0",
        "Name": "gjGH_RA"
      },
      "gjC_RA": {
        "Components": "\u0A9A\u0ACD\u0AB0",
        "Name": "gjC_RA"
      },
      "gjCH_RA": {
        "Components": "\u0A9B\u0ACD\u0AB0",
        "Name": "gjCH_RA"
      },
      "gjJ_RA": {
        "Components": "\u0A9C\u0ACD\u0AB0",
        "Name": "gjJ_RA"
      },
      "gjJH_RA": {
        "Components": "\u0A9D\u0ACD\u0AB0",
        "Name": "gjJH_RA"
      },
      "gjTT_RA": {
        "Components": "\u0A9F\u0ACD\u0AB0",
        "Name": "gjTT_RA"
      },
      "gjTTH_RA": {
        "Components": "\u0AA0\u0ACD\u0AB0",
        "Name": "gjTTH_RA"
      },
      "gjDD_RA": {
        "Components": "\u0AA1\u0ACD\u0AB0",
        "Name": "gjDD_RA"
      },
      "gjDDH_RA": {
        "Components": "\u0AA2\u0ACD\u0AB0",
        "Name": "gjDDH_RA"
      },
      "gjT_RA": {
        "Components": "\u0AA4\u0ACD\u0AB0",
        "Name": "gjT_RA"
      },
      "gjTH_RA": {
        "Components": "\u0AA5\u0ACD\u0AB0",
        "Name": "gjTH_RA"
      },
      "gjD_RA": {
        "Components": "\u0AA6\u0ACD\u0AB0",
        "Name": "gjD_RA"
      },
      "gjDH_RA": {
        "Components": "\u0AA7\u0ACD\u0AB0",
        "Name": "gjDH_RA"
      },
      "gjN_RA": {
        "Components": "\u0AA8\u0ACD\u0AB0",
        "Name": "gjN_RA"
      },
      "gjP_RA": {
        "Components": "\u0AAA\u0ACD\u0AB0",
        "Name": "gjP_RA"
      },
      "gjPH_RA": {
        "Components": "\u0AAB\u0ACD\u0AB0",
        "Name": "gjPH_RA"
      },
      "gjB_RA": {
        "Components": "\u0AAC\u0ACD\u0AB0",
        "Name": "gjB_RA"
      },
      "gjBH_RA": {
        "Components": "\u0AAD\u0ACD\u0AB0",
        "Name": "gjBH_RA"
      },
      "gjM_RA": {
        "Components": "\u0AAE\u0ACD\u0AB0",
        "Name": "gjM_RA"
      },
      "gjY_RA": {
        "Components": "\u0AAF\u0ACD\u0AB0",
        "Name": "gjY_RA"
      },
      "gjV_RA": {
        "Components": "\u0AB5\u0ACD\u0AB0",
        "Name": "gjV_RA"
      },
      "gjSH_RA": {
        "Components": "\u0AB6\u0ACD\u0AB0",
        "Name": "gjSH_RA"
      },
      "gjS_RA": {
        "Components": "\u0AB8\u0ACD\u0AB0",
        "Name": "gjS_RA"
      },
      "gjH_RA": {
        "Components": "\u0AB9\u0ACD\u0AB0",
        "Name": "gjH_RA"
      }
    };
    this.fontFamilies = [
      {
        "family": "Anek Gujarati",
        "variables": ["100", "200", "300", "400", "500", "600", "700", "800"],
        "names": ["Thin", "ExtraLight", "Light", "Regular", "Medium", "SemiBold", "Bold", "ExtraBold"]
      },
      {
        "family": "Baloo Bhai 2",
        "variables": ["400", "500", "600", "700", "800"],
        "names": ["Regular", "Medium", "SemiBold", "Bold", "ExtraBold"]
      },
      {
        "family": "Farsan",
        "variables": [],
        "names": []
      },
      {
        "family": "Hind Vadodara",
        "variables": ["300", "400", "500", "600", "700"],
        "names": ["Light", "Regular", "Medium", "SemiBold", "Bold"]
      },
      {
        "family": "Kumar One",
        "variables": [],
        "names": []
      },
      {
        "family": "Kumar One Outline",
        "variables": [],
        "names": []
      },
      {
        "family": "Mogra",
        "variables": [],
        "names": []
      },
      {
        "family": "Mukta Vaani",
        "variables": ["200", "300", "400", "500", "600", "700", "800"],
        "names": ["ExtraLight", "Light", "Regular", "Medium", "SemiBold", "Bold", "ExtraBold"]
      },
      {
        "family": "Noto Sans Gujarati",
        "variables": ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
        "names": ["Thin", "ExtraLight", "Light", "Regular", "Medium", "SemiBold", "Bold", "ExtraBold", "Black"]
      },
      {
        "family": "Noto Serif Gujarati",
        "variables": ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
        "names": ["Thin", "ExtraLight", "Light", "Regular", "Medium", "SemiBold", "Bold", "ExtraBold", "Black"]
      },
      {
        "family": "Rasa",
        "variables": ["0", "300", "400", "500", "600", "700", "1"],
        "names": ["Thin", "Light", "Regular", "Medium", "SemiBold", "Bold", "ExtraBold"]
      },
      {
        "family": "Shrikhand",
        "variables": [],
        "names": []
      },
      {
        "family": "Asar",
        "variables": [],
        "names": []
      }
    ];
    this.generateFontPaths();
  }
  generateFontPaths() {
    this.fontFamilies.forEach((fontFamily) => {
      const folder = fontFamily.family.replace(/\s/g, "_");
      const file = fontFamily.family.replace(/\s/g, "");
      fontFamily.variables.forEach((weight, index) => {
        this.fontPaths[fontFamily.family] = this.fontPaths[fontFamily.family] || {};
        this.fontPaths[fontFamily.family][weight] = `${folder}/${file}-${fontFamily.names[index]}`;
      });
    });
  }
  getFontPath(fontFamily, fontWeight) {
    const defaultFont = `${fontFamily.replace(/\s/g, "_")}/${fontFamily.replace(/\s/g, "")}-Regular`;
    const family = this.fontPaths[fontFamily];
    return family ? family[fontWeight] || defaultFont : defaultFont;
  }
  static {
    this.\u0275fac = function FontService_Factory(t) {
      return new (t || _FontService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FontService, factory: _FontService.\u0275fac, providedIn: "root" });
  }
};

// src/app/common/services/svg-rect.service.ts
var SvgRectService = class _SvgRectService {
  constructor(rendererFactory, document2) {
    this.document = document2;
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  createRect(rectData) {
    const rect = this.renderer.createElement("rect", "svg");
    const { x, y, width, height, rx, ry, fill, fillOpacity, opacity, rotate, originX, originY, stroke, strokeWidth, strokeAlignment, strokeOpacity } = rectData;
    this.renderer.setAttribute(rect, "x", String(x));
    this.renderer.setAttribute(rect, "y", String(y));
    this.renderer.setAttribute(rect, "width", String(width));
    this.renderer.setAttribute(rect, "height", String(height));
    if (rx !== void 0) {
      this.renderer.setAttribute(rect, "rx", String(rx));
    }
    if (ry !== void 0) {
      this.renderer.setAttribute(rect, "ry", String(ry));
    }
    if (fill !== void 0) {
      this.renderer.setAttribute(rect, "fill", fill);
    }
    if (fillOpacity !== void 0) {
      this.renderer.setAttribute(rect, "fill-opacity", String(fillOpacity));
    }
    if (opacity !== void 0) {
      this.renderer.setAttribute(rect, "opacity", String(opacity));
    }
    if (rotate !== void 0 || originX !== void 0 && originY !== void 0) {
      const transformValue = `rotate(${rotate || 0} ${originX || x + width / 2} ${originY || y + height / 2})`;
      this.renderer.setAttribute(rect, "transform", transformValue);
    }
    if (stroke !== void 0) {
      this.renderer.setAttribute(rect, "stroke", stroke);
    }
    if (strokeOpacity !== void 0) {
      this.renderer.setAttribute(rect, "stroke-opacity", String(strokeOpacity));
    }
    if (strokeWidth !== void 0) {
      this.renderer.setAttribute(rect, "stroke-width", String(strokeWidth));
    }
    if (strokeAlignment !== void 0) {
      this.renderer.setAttribute(rect, "stroke-alignment", strokeAlignment);
    }
    this.renderer.setAttribute(rect, "data-type", "rect");
    return rect;
  }
  static {
    this.\u0275fac = function SvgRectService_Factory(t) {
      return new (t || _SvgRectService)(\u0275\u0275inject(RendererFactory2), \u0275\u0275inject(DOCUMENT));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SvgRectService, factory: _SvgRectService.\u0275fac, providedIn: "root" });
  }
};

// src/app/common/services/svg-circle.service.ts
var SvgCircleService = class _SvgCircleService {
  constructor(rendererFactory, document2) {
    this.document = document2;
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  createCircle(circleData) {
    const circle = this.renderer.createElement("circle", "svg");
    const { cx, cy, r, fill, fillOpacity, opacity, stroke, strokeWidth, strokeOpacity, strokeAlignment } = circleData;
    this.renderer.setAttribute(circle, "cx", String(cx));
    this.renderer.setAttribute(circle, "cy", String(cy));
    this.renderer.setAttribute(circle, "r", String(r));
    this.renderer.setAttribute(circle, "data-type", "circle");
    this.renderer.setAttribute(circle, "fill", fill);
    this.renderer.setAttribute(circle, "opacity", String(opacity));
    if (fillOpacity !== void 0) {
      this.renderer.setAttribute(circle, "fill-opacity", String(fillOpacity));
    }
    if (stroke !== void 0) {
      this.renderer.setAttribute(circle, "stroke", String(stroke));
    }
    if (strokeWidth !== void 0) {
      this.renderer.setAttribute(circle, "stroke-width", String(strokeWidth));
    }
    if (strokeOpacity !== void 0) {
      this.renderer.setAttribute(circle, "stroke-opacity", String(strokeOpacity));
    }
    if (strokeAlignment !== void 0) {
      this.renderer.setAttribute(circle, "stroke-alignment", String(strokeAlignment));
    }
    return circle;
  }
  static {
    this.\u0275fac = function SvgCircleService_Factory(t) {
      return new (t || _SvgCircleService)(\u0275\u0275inject(RendererFactory2), \u0275\u0275inject(DOCUMENT));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SvgCircleService, factory: _SvgCircleService.\u0275fac, providedIn: "root" });
  }
};

// src/app/common/directives/svg-processor.directive.ts
var SvgProcessorDirective = class _SvgProcessorDirective {
  set postDataSet(value) {
    this.postDataSetSubject.next(value);
  }
  constructor(el, renderer, fontService, Rect, Circle, http, platformService) {
    this.el = el;
    this.renderer = renderer;
    this.fontService = fontService;
    this.Rect = Rect;
    this.Circle = Circle;
    this.http = http;
    this.platformService = platformService;
    this.offsetX = 0;
    this.offsetY = 0;
    this.width = 0;
    this.height = 0;
    this.postDataSetSubject = new Subject();
    this.destroy$ = new Subject();
    this.postDataSet$ = this.postDataSetSubject.asObservable();
    this.dataChanges = new EventEmitter();
    this.getSelected = new EventEmitter();
    this.data = [];
    this.dataLoaded = false;
    this.firstLoad = true;
    this.eventListeners = [];
    this.apiData = {};
    this.selectData = {};
  }
  get dataArray() {
    return this.data;
  }
  getFontPath(fontFamily, fontWeight) {
    return this.fontService.getFontPath(fontFamily, fontWeight);
  }
  updateBackGround(backgroundUrl) {
    return __async(this, null, function* () {
      if (backgroundUrl) {
        const svg = this.el.nativeElement;
        const background = yield this.getImageDataUrl(backgroundUrl);
        if (background) {
          const b = this.renderer.createElement("image", "http://www.w3.org/2000/svg");
          this.renderer.setAttribute(b, "x", "0");
          this.renderer.setAttribute(b, "data-type", "background-img");
          this.renderer.setAttribute(b, "y", "0");
          this.renderer.setAttribute(b, "width", "100%");
          this.renderer.setAttribute(b, "height", "100%");
          this.renderer.setAttribute(b, "preserveAspectRatio", "xMidYMid slice");
          this.renderer.setAttribute(b, "href", background);
          this.renderer.listen(b, "click", () => {
            this.getSelected.emit({ index: -1 });
          });
          const firstChild = svg.firstChild;
          if (firstChild) {
            svg.insertBefore(b, firstChild);
            if (firstChild.nodeName === "image") {
              firstChild.remove();
            }
          } else {
            svg.appendChild(b);
          }
        } else {
          console.warn("Background image could not be loaded, skipping background update.");
        }
      }
    });
  }
  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  updateViewBox(x, y) {
    if (this.el.nativeElement) {
      const svg = this.el.nativeElement;
      const viewBoxValue = `0 0 ${x} ${y}`;
      svg.setAttribute("viewBox", viewBoxValue);
    }
  }
  createRect(d, i) {
    if (this.el.nativeElement && d.rect) {
      const svg = this.el.nativeElement;
      const rect = this.Rect.createRect(d.rect);
      this.renderer.appendChild(svg, rect);
      return rect;
    }
    return null;
  }
  createCircle(d, i) {
    if (this.el.nativeElement && d.circle) {
      const svg = this.el.nativeElement;
      const c = this.Circle.createCircle(d.circle);
      this.renderer.appendChild(svg, c);
      return c;
    }
    return null;
  }
  createEllipse(d, i) {
    if (this.el.nativeElement && d.ellipse) {
      const svg = this.el.nativeElement;
      const e = this.renderer.createElement("ellipse", "http://www.w3.org/2000/svg");
      const { cx, cy, rx, ry, fill, opacity, rotate } = d.ellipse;
      this.renderer.setAttribute(e, "cx", String(cx));
      this.renderer.setAttribute(e, "cy", String(cy));
      this.renderer.setAttribute(e, "rx", String(rx));
      this.renderer.setAttribute(e, "ry", String(ry));
      this.renderer.setAttribute(e, "fill", fill);
      this.renderer.setAttribute(e, "opacity", String(opacity));
      this.renderer.setAttribute(e, "transform", `rotate(${rotate} ${cx} ${cy})`);
      this.renderer.setAttribute(e, "data-type", "ellipse");
      this.renderer.appendChild(svg, e);
      return e;
    }
    return null;
  }
  createLine(d, i) {
    if (this.el.nativeElement && d.line) {
      const svg = this.el.nativeElement;
      const line2 = this.renderer.createElement("line", "http://www.w3.org/2000/svg");
      const { x1, y1, x2, y2, stroke, strokeWidth, opacity, rotate } = d.line;
      this.renderer.setAttribute(line2, "x1", String(x1));
      this.renderer.setAttribute(line2, "y1", String(y1));
      this.renderer.setAttribute(line2, "x2", String(x2));
      this.renderer.setAttribute(line2, "y2", String(y2));
      this.renderer.setAttribute(line2, "stroke", stroke);
      this.renderer.setAttribute(line2, "stroke-width", String(strokeWidth));
      this.renderer.setAttribute(line2, "opacity", String(opacity));
      this.renderer.setAttribute(line2, "transform", `rotate(${rotate} ${x1} ${y1})`);
      this.renderer.setAttribute(line2, "data-type", "line");
      this.renderer.appendChild(svg, line2);
      return line2;
    }
    return null;
  }
  calculateWH(image) {
    let w = 320;
    let h = 320;
    const shape = image.shape;
    const aspectRatios = {
      "circle": { ratio: 1, divisor: 1 },
      "ellipse": { ratio: 1, divisor: 1 },
      "rect": { ratio: 1, divisor: 1 },
      "rect_3_2": { ratio: 3, divisor: 2 },
      "rect_4_3": { ratio: 4, divisor: 3 },
      "rect_16_9": { ratio: 16, divisor: 9 },
      "rect_1_1": { ratio: 1, divisor: 1 },
      "rect_5_4": { ratio: 5, divisor: 4 },
      "rect_3_1": { ratio: 3, divisor: 1 },
      "rect_7_5": { ratio: 7, divisor: 5 },
      "rect_2_3": { ratio: 2, divisor: 3 },
      "rect_3_4": { ratio: 3, divisor: 4 },
      "rect_9_16": { ratio: 9, divisor: 16 },
      "rect_4_5": { ratio: 4, divisor: 5 },
      "rect_5_7": { ratio: 5, divisor: 7 }
    };
    const closestMatch = aspectRatios[shape];
    if (closestMatch) {
      const r = image.r;
      w = r * 2;
      h = w * closestMatch.ratio / closestMatch.divisor;
    } else {
      console.error("Aspect ratio not defined for shape:", shape);
    }
    return { w, h };
  }
  createImage(d, i) {
    if (this.el.nativeElement && d.image) {
      const svg = this.el.nativeElement;
      const { x, y, r, imageUrl, borderColor, borderWidth, shape, origin, placeholder, svgProperties, rotate } = d.image;
      let element;
      const newWH = this.calculateWH(d.image);
      const w = newWH.w;
      const h = newWH.h;
      switch (shape) {
        case "circle":
          element = this.renderer.createElement("circle", "http://www.w3.org/2000/svg");
          this.renderer.setAttribute(element, "cx", String(x));
          this.renderer.setAttribute(element, "cy", String(y));
          this.renderer.setAttribute(element, "r", String(r));
          this.renderer.setAttribute(element, "fill", "#FFF");
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
        case "rect_3_2":
        case "rect":
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
          break;
        default:
          console.error("Invalid shape");
          return null;
      }
      if (element !== null) {
        const id = Math.random().toString(36).substring(7);
        this.renderer.setAttribute(element, "fill", "url(#" + id + ")");
        this.renderer.setStyle(element, "cursor", "grab");
        this.renderer.setStyle(element, "filter", "url(#shadow)");
        const imagePattern = this.renderer.createElement("pattern", "http://www.w3.org/2000/svg");
        this.renderer.setAttribute(imagePattern, "id", id);
        this.renderer.setAttribute(imagePattern, "x", "0");
        this.renderer.setAttribute(imagePattern, "y", "0");
        this.renderer.setAttribute(imagePattern, "height", "100%");
        this.renderer.setAttribute(imagePattern, "width", "100%");
        this.renderer.setAttribute(imagePattern, "viewBox", "0 0 " + String(w) + " " + String(h));
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
        d.editable && this.renderer.appendChild(imagePattern, extraRect);
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
        return element;
      }
    }
    return null;
  }
  createText(d, i) {
    return __async(this, null, function* () {
      if (this.el.nativeElement && d.text) {
        const svg = this.el.nativeElement;
        const t = this.renderer.createElement("text", "http://www.w3.org/2000/svg");
        const { x, y, fs, fw, text, type, controlName, api, lang, dependency, color, fontStyle, rotate, fontFamily, textShadow, backgroundColor, textEffects, textAnchor, alignmentBaseline, letterSpacing, lineHeight, textTransformation, originX, originY, opacity } = d.text;
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
          "font-weight": fw || "400",
          "text-decoration": fontStyle.underline ? "underline" : "none",
          "font-style": fontStyle.italic ? "italic" : "normal",
          "opacity": opacity ? opacity.toString() : "100"
        };
        if (d.text.backgroundColor) {
          textAttributes["background-color"] = backgroundColor;
        }
        if (textEffects) {
        }
        let textStyles = {
          "-webkit-user-select": "none",
          "letter-spacing": letterSpacing ? `${letterSpacing}px` : "0",
          "line-height": d.text.lineHeight ? `${d.text.lineHeight}` : "1.5",
          "text-transform": textTransformation || "none"
        };
        if (d.text.textShadow.enable) {
          textAttributes["filter"] = `drop-shadow(${textShadow.offsetX}px ${textShadow.offsetY}px ${textShadow.blur}px ${textShadow.color})` || "none";
        }
        Object.entries(textAttributes).forEach(([key, value]) => this.renderer.setAttribute(t, key, value));
        Object.entries(textStyles).forEach(([key, value]) => this.renderer.setStyle(t, key, value));
        if (text) {
          const lines = this.textFormat(text);
          if (lines.length === 1) {
            const textElement = this.renderer.createText(text);
            if (controlName && lang && type && type == "select") {
              const data = this.selectData[controlName];
              let changed = true;
              if (data && !data.changed) {
                changed = data.api !== api;
              }
              this.selectData[controlName] = {
                lang,
                value: text,
                api,
                dependency: dependency || "none",
                text: textElement,
                controlName,
                changed: data ? changed : true
              };
            }
            this.renderer.appendChild(t, textElement);
          } else {
            const dyOffset = fs * lineHeight || 0;
            let dxOffset = 0;
            switch (textAnchor) {
              case "middle":
                const totalWidth = lines.reduce((sum, line2) => sum + this.getTextWidth(line2, fs, fontFamily), 0);
                dxOffset = totalWidth / 2;
                break;
              case "end":
                dxOffset = lines.reduce((maxWidth, line2) => {
                  const lineWidth = this.getTextWidth(line2, fs, fontFamily);
                  return lineWidth > maxWidth ? lineWidth : maxWidth;
                }, 0);
                break;
            }
            lines.forEach((line2, index) => {
              const tspanElement = this.renderer.createElement("tspan", "http://www.w3.org/2000/svg");
              this.renderer.appendChild(tspanElement, this.renderer.createText(line2.trim()));
              if (index > 0 || index === 0 && line2.trim() === "") {
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
        this.renderer.appendChild(svg, t);
        if (rotate || originX !== void 0 && originY !== void 0) {
          const bbox = t.getBBox();
          const width = bbox.width;
          const height = bbox.height;
          const transformValue = `rotate(${rotate || 0} ${x + width / 2} ${y + height / 2})`;
          this.renderer.setAttribute(t, "transform", transformValue);
        }
        return t;
      }
      return null;
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
        delete this.apiData[controlName];
        console.error("Error fetching data from API:", error);
      }
    });
  }
  updateElements(data) {
    return __async(this, null, function* () {
      const svg = this.el.nativeElement;
      const children = svg.childNodes;
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        const dataType = child.getAttribute("data-type");
        if (dataType !== "background-img") {
          svg.removeChild(child);
        }
      }
      const elements = [];
      for (const [i, d] of data.entries()) {
        if (d.rect) {
          const rect = this.createRect(d, i);
          rect && elements.push();
        }
        ;
        if (d.circle) {
          const circle = this.createCircle(d, i);
          circle && elements.push(circle);
        }
        ;
        if (d.ellipse)
          elements.push(this.createEllipse(d, i));
        if (d.line)
          elements.push(this.createLine(d, i));
        if (d.image)
          elements.push(this.createImage(d, i));
        if (d.text)
          elements.push(yield this.createText(d, i));
      }
      this.removeEventListeners();
      this.addDraggableBehavior(elements);
      if (this.defaultValue) {
        const promises = [];
        yield Promise.all(this.defaultValue.data.map((item, i) => __async(this, null, function* () {
          for (const key in this.selectData) {
            const data2 = this.selectData[key];
            if (item.text && item.text.controlName === data2.controlName) {
              if (!data2.api.endsWith("/")) {
                data2.api += "/";
              }
              if (item.text.api && !item.text.api.endsWith("/")) {
                item.text.api += "/";
              }
              if (data2.changed) {
                const promise = data2.dependency === "none" ? this.loadData(key, data2.api) : this.setupDependency(key, data2);
                promises.push(promise);
              }
            }
          }
        })));
        yield Promise.all(promises);
      }
      for (const key in this.selectData) {
        const data2 = this.selectData[key];
        if (this.apiData[key]) {
          const filteredData = this.apiData[key].filter((item) => item.id == data2.value);
          if (filteredData.length) {
            this.renderer.setValue(data2.text, filteredData[0][data2.lang == "gu" ? "gu_name" : "name"]);
          }
        }
      }
    });
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
      const dependencyKey = data.dependency;
      const dependencyControl = this.selectData[dependencyKey].value;
      const dependentApi = `${data.api}${dependencyControl}`;
      yield this.fetchDataFromAPI(dependentApi, key);
    });
  }
  getTextWidth(text, fontSize, fontFamily) {
    const svgText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    svgText.setAttribute("font-size", `${fontSize}px`);
    svgText.setAttribute("font-family", fontFamily);
    svgText.textContent = text;
    document.body.appendChild(svgText);
    const width = svgText.getBBox().width;
    document.body.removeChild(svgText);
    return width;
  }
  getImageDataUrl(imageUrl) {
    return __async(this, null, function* () {
      if (!this.platformService.isBrowser()) {
        console.warn("FileReader is not available on the server. Returning null.");
        return null;
      }
      try {
        const response = yield fetch(imageUrl);
        const blob = yield response.blob();
        const convertedImageUrl = yield new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        return convertedImageUrl;
      } catch (error) {
        console.error("Error fetching or converting image:", error);
        throw error;
      }
    });
  }
  addDraggableBehavior(elements) {
    const svg = this.el.nativeElement;
    const showControls = elements.map(() => {
      return false;
    });
    elements.forEach((element, index) => {
      const eleData = this.postData.data[index];
      if (element) {
        let isDragging = false;
        let isDragged = false;
        const bbox = element.getBBox();
        const x = bbox.x;
        const y = bbox.y;
        const width = bbox.width;
        const height = bbox.height;
        this.renderer.setAttribute(element, "cursor", "grab");
        const elementType = element.getAttribute("data-type");
        const onMouseDown = (event) => {
          isDragging = true;
          isDragged = false;
          showControls.fill(false);
          showControls[index] = true;
          const svgPoint = this.getMousePosition(event, svg);
          const clickedX = svgPoint.x;
          const clickedY = svgPoint.y;
          let elementX = 0;
          let elementY = 0;
          if (["circle"].includes(elementType)) {
          } else {
          }
          this.renderer.setAttribute(element, "cursor", "grabbing");
          switch (elementType) {
            case "circle":
            case "ellipse":
              elementX = parseFloat(element.getAttribute("cx") || "0");
              elementY = parseFloat(element.getAttribute("cy") || "0");
              break;
            case "rectangle":
              break;
            case "svg":
              const pathBoundingBox = element.getBBox();
              elementX = pathBoundingBox.x;
              elementY = pathBoundingBox.y;
              break;
            case "image":
              break;
            case "g":
              const transformAttribute = element.getAttribute("transform");
              if (transformAttribute) {
                const match = transformAttribute.match(/translate\(([^,]+),([^)]+)\)/);
                if (match && match.length === 3) {
                  elementX = parseFloat(match[1]);
                  elementY = parseFloat(match[2]);
                }
              }
              break;
            default:
              elementX = parseFloat(element.getAttribute("x") || "0");
              elementY = parseFloat(element.getAttribute("y") || "0");
              break;
          }
          this.offsetX = elementX - clickedX;
          this.offsetY = elementY - clickedY;
          this.getSelected.emit({ index });
        };
        const onMouseMove = (event) => {
          if (isDragging) {
            isDragged = true;
            const svgPoint = this.getMousePosition(event, svg);
            if (element) {
              let x2, y2;
              let r = 0;
              switch (elementType) {
                case "circle":
                  x2 = parseFloat(element.getAttribute("cx") || "0");
                  y2 = parseFloat(element.getAttribute("cy") || "0");
                  r = parseFloat(element.getAttribute("r") || "0");
                  break;
                case "ellipse":
                  x2 = parseFloat(element.getAttribute("cx") || "0");
                  y2 = parseFloat(element.getAttribute("cy") || "0");
                  r = parseFloat(element.getAttribute("r") || "0");
                  break;
                case "g":
                  const transformAttribute = element.getAttribute("transform");
                  if (transformAttribute) {
                    const match = transformAttribute.match(/translate\(([^,]+),([^)]+)\)/);
                    if (match && match.length === 3) {
                      x2 = parseFloat(match[1]);
                      y2 = parseFloat(match[2]);
                    }
                  }
                  break;
                default:
                  x2 = parseFloat(element.getAttribute("x") || "0");
                  y2 = parseFloat(element.getAttribute("y") || "0");
                  break;
              }
              if (x2 !== void 0 && y2 !== void 0) {
                const oX = svgPoint.x - x2 + this.offsetX;
                const oY = svgPoint.y - y2 + this.offsetY;
                const newX = x2 + oX;
                const newY = y2 + oY;
                let minX = 30 + r;
                let minY = 30 + r;
                let maxX = this.width - (element.getBBox().width + minX) + 2 * r;
                let maxY = this.height - (element.getBBox().height + minY) + 2 * r;
                const textAnchor = element.getAttribute("text-anchor");
                if (textAnchor) {
                  minY += element.getBBox().height / 2;
                  maxY += element.getBBox().height;
                  switch (textAnchor) {
                    case "middle":
                      minX += element.getBBox().width / 2;
                      maxX += element.getBBox().width / 2;
                      break;
                    case "start":
                      break;
                    case "end":
                      minX += element.getBBox().width;
                      maxX += element.getBBox().width;
                      break;
                    default:
                      break;
                  }
                }
                const adjustedX = eleData.boxed ? Math.floor(Math.min(Math.max(newX, minX), maxX)) : Math.floor(newX);
                const adjustedY = eleData.boxed ? Math.floor(Math.min(Math.max(newY, minY), maxY)) : Math.floor(newY);
                switch (true) {
                  case (!!eleData.circle || !!eleData.ellipse):
                    if (eleData.circle) {
                      eleData.circle.cx = adjustedX;
                      eleData.circle.cy = adjustedY;
                    }
                    if (eleData.ellipse) {
                      eleData.ellipse.cx = adjustedX;
                      eleData.ellipse.cy = adjustedY;
                    }
                    break;
                  case (!!eleData.rect || !!eleData.text || !!eleData.image):
                    if (eleData.rect) {
                      eleData.rect.x = adjustedX;
                      eleData.rect.y = adjustedY;
                      const transformValue = `rotate(${eleData.rect.rotate || 0} ${x2 + width / 2} ${y2 + height / 2})`;
                      this.renderer.setAttribute(element, "transform", transformValue);
                    }
                    if (eleData.text) {
                      eleData.text.x = adjustedX;
                      eleData.text.y = adjustedY;
                      const bbox2 = element.getBBox();
                      const width2 = bbox2.width;
                      const height2 = bbox2.height;
                      const transformValue = `rotate(${eleData.text.rotate || 0} ${adjustedX + width2 / 2} ${adjustedY + height2 / 2})`;
                      const tspanElements = element.getElementsByTagName("tspan");
                      if (tspanElements.length > 0) {
                        for (let i = 0; i < tspanElements.length; i++) {
                          const tspanElement = tspanElements[i];
                          this.renderer.setAttribute(tspanElement, "x", adjustedX.toString());
                        }
                      }
                      this.renderer.setAttribute(element, "transform", transformValue);
                    }
                    if (eleData.image) {
                      eleData.image.x = adjustedX;
                      eleData.image.y = adjustedY;
                      const transformValue = `rotate(${eleData.image.rotate || 0} ${x2 + width / 2} ${y2 + height / 2})`;
                      this.renderer.setAttribute(element, "transform", transformValue);
                    }
                    break;
                  default:
                    console.log("Element data not found");
                    break;
                }
                switch (elementType) {
                  case "circle":
                  case "ellipse":
                    this.renderer.setAttribute(element, "cx", adjustedX.toString());
                    this.renderer.setAttribute(element, "cy", adjustedY.toString());
                    break;
                  case "rect":
                    this.renderer.setAttribute(element, "x", adjustedX.toString());
                    this.renderer.setAttribute(element, "y", adjustedY.toString());
                    break;
                  case "svg":
                    break;
                  case "image":
                    break;
                  case "g":
                    this.renderer.setAttribute(element, "transform", `translate(${adjustedX},${adjustedY})`);
                    break;
                  default:
                    this.renderer.setAttribute(element, "x", adjustedX.toString());
                    this.renderer.setAttribute(element, "y", adjustedY.toString());
                    break;
                }
              }
            }
          }
        };
        const onMouseUp = () => {
          isDragging && isDragged && this.dataChanges.emit({ data: eleData, index });
          isDragging = false;
          this.renderer.setAttribute(element, "cursor", "grab");
        };
        const mousedownListener = this.renderer.listen(element, "mousedown", onMouseDown);
        const touchstartListener = this.renderer.listen(element, "touchstart", onMouseDown);
        const mousemoveListener = this.renderer.listen(svg, "mousemove", onMouseMove);
        const touchmoveListener = this.renderer.listen(svg, "touchmove", onMouseMove);
        const mouseupListener = this.renderer.listen(svg, "mouseup", onMouseUp);
        const mouseleaveListener = this.renderer.listen(svg, "mouseleave", onMouseUp);
        const touchendListener = this.renderer.listen(svg, "touchend", onMouseUp);
        this.eventListeners.push(mousedownListener, touchstartListener, mousemoveListener, touchmoveListener, mouseupListener, mouseleaveListener, touchendListener);
      }
    });
  }
  getMousePosition(evt, svg) {
    evt.preventDefault();
    const touchOrMouse = "touches" in evt ? evt.touches[0] : evt;
    const CTM = svg.getScreenCTM();
    return {
      x: (touchOrMouse.clientX - CTM.e) / CTM.a,
      y: (touchOrMouse.clientY - CTM.f) / CTM.d
    };
  }
  removeEventListeners() {
    this.eventListeners.forEach((removeListener) => removeListener());
    this.eventListeners = [];
  }
  textFormat(text) {
    const formattedText = text.replace(/\n/g, "\n").replace(/\n(?!\*{3})/g, "***\n");
    const lines = formattedText.split("\n");
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/\*\*\*/g, "\xA0").trim();
    }
    return lines;
  }
  ngAfterViewInit() {
  }
  ngOnInit() {
    if (this.platformService.isBrowser()) {
      let f = true;
      this.postDataSet$.pipe(takeUntil(this.destroy$)).subscribe((value) => __async(this, null, function* () {
        yield this.initSVG(value);
        if (f) {
        }
        this.defaultValue = value;
        f = false;
      }));
    }
  }
  initSVG(d) {
    return __async(this, null, function* () {
      const { id, deleted, h, w, title, backgroundurl, data } = d;
      this.height = h;
      this.width = w;
      if (!this.postData || backgroundurl !== this.postData.backgroundurl) {
        this.updateBackGround(backgroundurl);
      }
      if (!this.postData || w !== this.postData.w || h !== this.postData.h) {
        this.updateViewBox(Math.min(Math.max(w, 1024), 1920), Math.min(Math.max(h, 1024), 1920));
      }
      if (data && this.postData) {
        if (data != this.postData.data || this.firstLoad) {
          if (data.length !== this.postData.data.length) {
            let added = data.filter((item) => !this.postData.data.includes(item));
            let removed = this.postData.data.filter((item) => !data.includes(item));
            if (added) {
              added.forEach((item) => this.postData.data.push(item));
              yield this.updateElements(this.postData.data);
            }
            if (removed) {
              this.postData.data = data;
              yield this.updateElements(this.postData.data);
            }
          } else {
            let updateRequire = this.postData.data.map((item, index) => data[index] !== this.postData.data[index]);
            if (updateRequire) {
              let updated = this.postData.data.filter((item, index) => {
                if (data[index] !== item) {
                  this.postData.data[index] = data[index];
                }
                return data[index] !== item;
              });
              if (updated.length > 0) {
                yield this.updateElements(this.postData.data);
              }
            }
          }
        }
      }
      if (!this.dataLoaded) {
        this.dataLoaded = true;
        this.postData = d;
        yield this.updateElements(data);
      }
      this.firstLoad = false;
    });
  }
  ngOnDestroy() {
    this.removeEventListeners();
    this.destroy$.next();
    this.destroy$.complete();
    this.postDataSetSubject?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
  getEventListeners(element) {
    const eventListeners = {};
    const registeredEvents = this.getRegisteredEvents(element);
    for (const event in registeredEvents) {
      if (registeredEvents.hasOwnProperty(event)) {
        const listeners = [];
        registeredEvents[event].forEach((listener) => {
          listeners.push(listener);
        });
        eventListeners[event] = listeners;
      }
    }
    return eventListeners;
  }
  getRegisteredEvents(element) {
    const registeredEvents = {};
    const listeners = this.renderer.data["get"](element);
    if (listeners) {
      Object.keys(listeners).forEach((eventName) => {
        const eventListeners = listeners[eventName].map((listener) => listener.handleEvent);
        registeredEvents[eventName] = eventListeners;
      });
    }
    return registeredEvents;
  }
  generateSVGPathData(t) {
    return __async(this, null, function* () {
      try {
        if (!t.text) {
          console.error("Font loading failed");
          throw new Error("Font loading failed");
        } else {
          const fontUrl = this.getFontPath(t.text?.fontFamily, t.text?.fw);
          const font = yield this.loadFont(`assets/fonts/${fontUrl}.ttf`);
          if (!font || !t.text) {
            console.error("Font loading failed");
            throw new Error("Font loading failed");
          }
          const textData = t.text;
          const fontSize = textData.fs;
          const pathData = [];
          const yOffset = 0;
          const lines = textData.text?.split("\n");
          if (lines) {
            for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
              const line2 = lines[lineIndex];
              const lineHeightFactor = textData.lineHeight;
              const ascent = font.ascender / font.unitsPerEm * fontSize;
              const descent = font.descender / font.unitsPerEm * fontSize;
              const lineHeight = (ascent - descent) * lineHeightFactor;
              let yoff = yOffset + lineHeight * lineIndex;
              let xOffset = 0;
              switch (textData.textAnchor) {
                case "middle":
                  xOffset -= font.getAdvanceWidth(line2, fontSize) / 2;
                  break;
                case "end":
                  xOffset -= font.getAdvanceWidth(line2, fontSize);
                  break;
                case "start":
                default:
                  break;
              }
              for (let i = 0; i < line2.length; i++) {
                const char = line2[i];
                console.log(char);
                const glyph = font.charToGlyph(char);
                const glyphPath = glyph.getPath(xOffset, yoff, fontSize);
                pathData.push(glyphPath.toPathData(5));
                xOffset += glyph.advanceWidth * fontSize / font.unitsPerEm;
              }
            }
          }
          const svgPathData = pathData.join(" ");
          const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
          pathElement.setAttribute("d", svgPathData);
          const lineGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
          lineGroup.setAttribute("transform", `translate(${textData.x},${textData.y})`);
          for (const prop in textData) {
            if (Object.prototype.hasOwnProperty.call(textData, prop) && prop !== "text") {
              const propValue = textData[prop];
              if (propValue !== void 0 && propValue !== null) {
                let p = null;
                let v = null;
                switch (prop) {
                  case "color":
                    p = "fill";
                    v = propValue;
                    break;
                  case "letterSpacing":
                    break;
                  case "lineHeight":
                    break;
                  case "textTransform":
                    break;
                  case "textShadow":
                    p = "filter";
                    const t2 = propValue;
                    v = `drop-shadow(${t2.offsetX}px ${t2.offsetY}px ${t2.blur}px ${t2.color})` || "none";
                    break;
                  default:
                    break;
                }
                if (p && v) {
                  pathElement.setAttribute(p, v);
                }
              }
            }
          }
          this.renderer.setAttribute(lineGroup, "data-type", "g");
          lineGroup.appendChild(pathElement);
          return lineGroup;
        }
      } catch (error) {
        console.error("Error generating SVG path data:", error);
        throw error;
      }
    });
  }
  loadFont(fontUrl) {
    return new Promise((resolve, reject) => {
      load(fontUrl, (err, font) => {
        if (err) {
          reject(err);
        } else {
          resolve(font);
        }
      });
    });
  }
  static {
    this.\u0275fac = function SvgProcessorDirective_Factory(t) {
      return new (t || _SvgProcessorDirective)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(FontService), \u0275\u0275directiveInject(SvgRectService), \u0275\u0275directiveInject(SvgCircleService), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(PlatformService));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _SvgProcessorDirective, selectors: [["", "svgProcessor", ""]], inputs: { loadOnly: "loadOnly", postDataSet: "postDataSet" }, outputs: { dataChanges: "dataChanges", getSelected: "getSelected" } });
  }
};

// src/app/common/services/color.service.ts
var ColorService = class _ColorService {
  constructor() {
  }
  getColors(image, colorCounts) {
    return __async(this, null, function* () {
      try {
        const colorThief = new colorthief.ColorThief();
        const img = new Image();
        img.src = image;
        img.crossOrigin = "Anonymous";
        return new Promise((resolve, reject) => {
          img.onload = () => {
            const dominantColors = colorThief.getPalette(img, colorCounts);
            const colorSet = dominantColors.map((rgb) => this.rgbToHex(rgb[0], rgb[1], rgb[2]));
            colorSet.unshift("#000000", "#FFFFFF");
            resolve(colorSet);
          };
          img.onerror = (error) => {
            reject(error);
          };
        });
      } catch (error) {
        console.error("Error getting colors:", error);
        throw error;
      }
    });
  }
  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  static {
    this.\u0275fac = function ColorService_Factory(t) {
      return new (t || _ColorService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ColorService, factory: _ColorService.\u0275fac, providedIn: "root" });
  }
};

// src/app/common/controllers/color-picker/color-picker.component.ts
function ColorPickerComponent_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "input", 8);
    \u0275\u0275listener("change", function ColorPickerComponent_ng_container_3_ng_container_1_Template_input_change_1_listener() {
      const color_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectColor(color_r3));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "label", 9);
    \u0275\u0275element(3, "span", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const color_r3 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("id", ctx_r3.uniqueId + "-color-" + i_r5)("value", color_r3)("checked", ctx_r3.selectedColor === color_r3);
    \u0275\u0275advance();
    \u0275\u0275property("for", ctx_r3.uniqueId + "-color-" + i_r5);
    \u0275\u0275advance();
    \u0275\u0275styleMap("background-color: " + color_r3 + "; display: block;");
  }
}
function ColorPickerComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, ColorPickerComponent_ng_container_3_ng_container_1_Template, 4, 6, "ng-container", 7);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.colorSet);
  }
}
function ColorPickerComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 12);
    \u0275\u0275text(2, "Loading...");
    \u0275\u0275elementEnd()();
  }
}
function ColorPickerComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 12);
    \u0275\u0275text(2, "Loading...");
    \u0275\u0275elementEnd()();
  }
}
var ColorPickerComponent = class _ColorPickerComponent {
  constructor() {
    this.uniqueId = "";
    this.onChange = () => {
    };
    this.onTouch = () => {
    };
    this.colorControl = new FormControl();
  }
  ngOnInit() {
    this.uniqueId = "color-picker-" + Math.random().toString(36).substr(2, 9);
  }
  getColorClass(color) {
    return this.selectedColor === color ? "shadow border border-light border-3" : "";
  }
  selectColor(color) {
    this.selectedColor = color;
    this.colorControl.setValue(this.selectedColor);
    this.onChange(this.selectedColor);
    this.onTouch();
  }
  // ControlValueAccessor methods
  writeValue(value) {
    this.selectedColor = value;
    this.colorControl.setValue(value);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled) {
  }
  static {
    this.\u0275fac = function ColorPickerComponent_Factory(t) {
      return new (t || _ColorPickerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ColorPickerComponent, selectors: [["color-picker"]], inputs: { colorSet: "colorSet", getActiveControl: "getActiveControl" }, features: [\u0275\u0275ProvidersFeature([
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => _ColorPickerComponent),
        multi: true
      }
    ])], decls: 9, vars: 4, consts: [["loading", ""], [1, "row", "g-3"], [1, "col-12"], [1, "color-picker", "position-relative"], [4, "ngIf", "ngIfElse"], ["class", "spinner-border", "role", "status", 4, "ngIf"], ["type", "text", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], [4, "ngFor", "ngForOf"], ["type", "radio", 1, "btn-check", 3, "change", "id", "value", "checked"], [1, "btn", "btn-outline-white", "p-3", "rounded-0", "w-50-px", "h-50-px", "border-2", "rounded-3", "position-relative", 3, "for"], [1, "position-absolute", "w-75", "h-75", "top-50", "start-50", "rounded-3", "translate-middle", "border", "border-3", "border-light", "shadow"], ["role", "status", 1, "spinner-border"], [1, "sr-only"]], template: function ColorPickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
        \u0275\u0275template(3, ColorPickerComponent_ng_container_3_Template, 2, 1, "ng-container", 4)(4, ColorPickerComponent_div_4_Template, 3, 0, "div", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "div", 2);
        \u0275\u0275template(6, ColorPickerComponent_ng_template_6_Template, 3, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(8, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function ColorPickerComponent_Template_input_ngModelChange_8_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.selectedColor, $event) || (ctx.selectedColor = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function ColorPickerComponent_Template_input_change_8_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.selectColor(ctx.selectedColor));
        });
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        const loading_r6 = \u0275\u0275reference(7);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.colorSet.length)("ngIfElse", loading_r6);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.colorSet.length);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedColor);
      }
    }, dependencies: [DefaultValueAccessor, NgControlStatus, NgForOf, NgIf, NgModel] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ColorPickerComponent, { className: "ColorPickerComponent", filePath: "src\\app\\common\\controllers\\color-picker\\color-picker.component.ts", lineNumber: 16 });
})();

// src/app/common/directives/pagination.directive.ts
var PaginationDirective = class _PaginationDirective {
  set currentPage(value) {
    this.currentPageSubject.next(value);
  }
  set totalItems(value) {
    this.totalItemsSubject.next(value);
  }
  constructor(renderer, el) {
    this.renderer = renderer;
    this.el = el;
    this.currentPageSubject = new BehaviorSubject(1);
    this.totalItemsSubject = new BehaviorSubject(0);
    this.subscriptions = [];
    this.selectChangeListeners = [];
    this.currentPageChange = new EventEmitter();
    this.pageSizeChange = new EventEmitter();
    this.pageSizes = [10, 25, 50, 100];
    this.totalPages = 0;
    if (this.pageSize === void 0) {
      this.pageSize = 10;
    } else {
      this.pageSize = this.getNearestPageSize(this.pageSize);
    }
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.totalItemsSubject.subscribe((value) => {
        this.updatePagination();
        this.pageSizeChange.emit(this.pageSize);
      });
      yield this.currentPageSubject.subscribe((value) => {
        this.updatePagination();
        this.currentPageChange.emit(value);
      });
      if (this.pageSize === void 0) {
        this.pageSize = 10;
      } else {
        this.pageSize = this.getNearestPageSize(this.pageSize);
      }
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.selectChangeListeners.forEach((listener) => listener());
  }
  getNearestPageSize(size) {
    let closest = this.pageSizes[0];
    let smallestDiff = Math.abs(size - closest);
    for (const ps of this.pageSizes) {
      const diff = Math.abs(size - ps);
      if (diff < smallestDiff) {
        closest = ps;
        smallestDiff = diff;
      } else if (diff === smallestDiff && ps > closest) {
        closest = ps;
      }
    }
    if (this.pageSize !== closest) {
      this.pageSizeChange.emit(closest);
    }
    return closest;
  }
  updatePagination() {
    const currentPage = this.currentPageSubject.getValue();
    const totalItems = this.totalItemsSubject.getValue();
    this.totalPages = Math.ceil(totalItems / this.pageSize);
    const paginationContainer = this.el.nativeElement;
    this.renderer.setProperty(paginationContainer, "innerHTML", "");
    this.renderer.addClass(paginationContainer, "d-flex");
    this.renderer.addClass(paginationContainer, "flex-wrap");
    this.renderer.addClass(paginationContainer, "align-items-center");
    this.renderer.addClass(paginationContainer, "justify-content-center");
    this.renderer.addClass(paginationContainer, "my-3");
    this.sticky && this.renderer.addClass(paginationContainer, "sticky-bottom");
    this.renderer.addClass(paginationContainer, "bg-body");
    this.renderer.addClass(paginationContainer, "p-2");
    const ul = this.renderer.createElement("ul");
    this.renderer.addClass(ul, "pagination");
    this.renderer.addClass(ul, "d-flex");
    this.renderer.addClass(ul, "flex-wrap");
    this.renderer.addClass(ul, "mx-0");
    this.renderer.addClass(ul, "my-1");
    this.renderer.addClass(ul, "align-items-stretch");
    const createPageItem = (page, iconClass = "", isDisabled, isActive) => {
      const li = this.renderer.createElement("li");
      this.renderer.addClass(li, "page-item");
      if (isDisabled)
        this.renderer.addClass(li, "disabled");
      const a = this.renderer.createElement("button");
      this.renderer.addClass(a, "btn");
      this.renderer.addClass(a, isActive ? "btn-dark" : isDisabled ? "btn-flat" : "btn-outline-dark");
      this.renderer.addClass(a, !isActive && isDisabled ? "opacity-50" : "opacity-1");
      this.renderer.addClass(a, !isActive && isDisabled ? "pe-none" : isActive && isDisabled ? "pe-none" : "pe-auto");
      this.renderer.addClass(a, "h-100");
      this.renderer.addClass(a, "rounded-0");
      this.renderer.addClass(a, "border-0");
      this.renderer.addClass(a, "d-flex");
      this.renderer.addClass(a, "align-items-center");
      switch (page) {
        case "<<":
          this.renderer.setAttribute(a, "title", "First Page");
          break;
        case "<":
          this.renderer.setAttribute(a, "title", "Previous Page");
          break;
        case ">":
          this.renderer.setAttribute(a, "title", "Next Page");
          break;
        case ">>":
          this.renderer.setAttribute(a, "title", "Last Page");
          break;
        case "...":
          false;
          break;
        default:
          this.renderer.setAttribute(a, "title", "Page " + page);
          break;
      }
      this.renderer.listen(a, "click", () => {
        if (!isDisabled && page !== "...") {
          if (page === "<<") {
            this.onPageChange(1);
          } else if (page === "<") {
            this.onPageChange(Math.max(currentPage - 1, 1));
          } else if (page === ">") {
            this.onPageChange(Math.min(currentPage + 1, this.totalPages));
          } else if (page === ">>") {
            this.onPageChange(this.totalPages);
          } else {
            this.onPageChange(Number(page));
          }
        }
      });
      if (iconClass) {
        const icon = this.renderer.createElement("i");
        const small = this.renderer.createElement("small");
        this.renderer.addClass(icon, "fa");
        this.renderer.addClass(small, "d-flex");
        this.renderer.addClass(small, "align-items-center");
        this.renderer.addClass(icon, iconClass);
        this.renderer.appendChild(a, small);
        this.renderer.appendChild(small, icon);
      } else {
        const text = this.renderer.createText(page.toString());
        this.renderer.appendChild(a, text);
      }
      this.renderer.appendChild(li, a);
      this.renderer.appendChild(ul, li);
    };
    createPageItem("<<", "fa-x-first", currentPage === 1, false);
    createPageItem("<", "fa-x-previous", currentPage === 1, false);
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, this.totalPages);
    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }
    if (startPage > 1) {
      createPageItem(1, "", currentPage === 1, false);
      if (startPage > 2) {
        createPageItem("...", "", true, false);
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      createPageItem(i, "", i === currentPage, i === currentPage);
    }
    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        createPageItem("...", "", true, false);
      }
      createPageItem(this.totalPages, "", this.totalPages === currentPage, this.totalPages === currentPage);
      createPageItem("...", "", true, false);
    }
    createPageItem(">", "fa-x-next", this.totalPages === currentPage, false);
    createPageItem(">>", "fa-x-last", this.totalPages === currentPage, false);
    this.renderer.appendChild(paginationContainer, ul);
    const dropdownDiv = this.renderer.createElement("div");
    this.renderer.addClass(dropdownDiv, "pagination-page-size");
    this.renderer.addClass(dropdownDiv, "d-flex");
    this.renderer.addClass(dropdownDiv, "mx-3");
    this.renderer.addClass(dropdownDiv, "my-1");
    this.renderer.addClass(dropdownDiv, "w-auto");
    this.renderer.addClass(dropdownDiv, "align-items-center");
    this.renderer.addClass(dropdownDiv, "text-nowrap");
    const select = this.renderer.createElement("select");
    this.renderer.addClass(select, "form-select");
    this.renderer.addClass(select, "mx-2");
    this.renderer.addClass(select, "w-65-px");
    this.pageSizes.forEach((size) => {
      const option = this.renderer.createElement("option");
      this.renderer.setProperty(option, "value", size);
      const optionText = this.renderer.createText(size.toString());
      this.renderer.appendChild(option, optionText);
      if (size === this.pageSize) {
        this.renderer.setAttribute(option, "selected", "true");
      }
      this.renderer.appendChild(select, option);
    });
    this.selectChangeListeners.forEach((listener) => listener());
    this.selectChangeListeners = [];
    const selectChangeListener = this.renderer.listen(select, "change", (event) => {
      const newSize = parseInt(event.target.value, 10);
      this.onPageSizeChange(newSize);
    });
    this.selectChangeListeners.push(selectChangeListener);
    const itemsPerPageText = this.renderer.createText("Show");
    this.renderer.appendChild(dropdownDiv, itemsPerPageText);
    this.renderer.appendChild(dropdownDiv, select);
    const itemsPostPageText = this.renderer.createText(" Items Per Page");
    this.renderer.appendChild(dropdownDiv, itemsPostPageText);
    this.renderer.appendChild(paginationContainer, dropdownDiv);
    const itemRangeText = this.renderer.createElement("span");
    this.renderer.addClass(itemRangeText, "pagination-item-range");
    this.renderer.addClass(itemRangeText, "ms-md-auto");
    this.renderer.addClass(itemRangeText, "my-1");
    const startItem = totalItems ? (currentPage - 1) * this.pageSize + 1 : 0;
    const endItem = Math.min(currentPage * this.pageSize, totalItems);
    const itemRangeTextContent = this.renderer.createText(`Showing ${startItem} - ${endItem} of ${totalItems} items`);
    this.renderer.appendChild(itemRangeText, itemRangeTextContent);
    this.renderer.appendChild(paginationContainer, itemRangeText);
  }
  onPageChange(page) {
    this.currentPageSubject.next(page);
  }
  onPageSizeChange(size) {
    this.pageSizeChange.emit(size);
    this.pageSize = size;
    this.currentPageSubject.next(1);
    this.updatePagination();
  }
  static {
    this.\u0275fac = function PaginationDirective_Factory(t) {
      return new (t || _PaginationDirective)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _PaginationDirective, selectors: [["", "pagination", ""]], inputs: { currentPage: "currentPage", totalItems: "totalItems", pageSize: "pageSize", sticky: "sticky", pageSizes: "pageSizes" }, outputs: { currentPageChange: "currentPageChange", pageSizeChange: "pageSizeChange" } });
  }
};

// src/app/common/pipes/dependency-list.pipe.ts
var DependencyListPipe = class _DependencyListPipe {
  transform(selectData, key) {
    const result = [];
    for (const k in selectData) {
      if (k !== key) {
        result.push({ title: selectData[k].title, value: k });
      }
    }
    return result;
  }
  static {
    this.\u0275fac = function DependencyListPipe_Factory(t) {
      return new (t || _DependencyListPipe)();
    };
  }
  static {
    this.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "dependencyList", type: _DependencyListPipe, pure: true });
  }
};

// src/app/common/services/svg-ellipse.service.ts
var SvgEllipseService = class _SvgEllipseService {
  constructor(rendererFactory, document2) {
    this.document = document2;
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  createEllipse(ellipseData) {
    const ellipse = this.renderer.createElement("ellipse", "svg");
    const { cx, cy, rx, ry, fill, opacity, rotate } = ellipseData;
    this.renderer.setAttribute(ellipse, "cx", String(cx));
    this.renderer.setAttribute(ellipse, "cy", String(cy));
    this.renderer.setAttribute(ellipse, "rx", String(rx));
    this.renderer.setAttribute(ellipse, "ry", String(ry));
    this.renderer.setAttribute(ellipse, "fill", fill);
    this.renderer.setAttribute(ellipse, "opacity", String(opacity));
    this.renderer.setAttribute(ellipse, "transform", `rotate(${rotate} ${cx} ${cy})`);
    this.renderer.setAttribute(ellipse, "data-type", "ellipse");
    return ellipse;
  }
  static {
    this.\u0275fac = function SvgEllipseService_Factory(t) {
      return new (t || _SvgEllipseService)(\u0275\u0275inject(RendererFactory2), \u0275\u0275inject(DOCUMENT));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SvgEllipseService, factory: _SvgEllipseService.\u0275fac, providedIn: "root" });
  }
};

// src/app/common/directives/svg-response.directive.ts
var SvgResponseDirective = class _SvgResponseDirective {
  set postDataSet(value) {
    this.postData = value;
    this.postDataSetSubject.next(value);
  }
  constructor(el, renderer, Rect, Circle, Ellipse, platformService) {
    this.el = el;
    this.renderer = renderer;
    this.Rect = Rect;
    this.Circle = Circle;
    this.Ellipse = Ellipse;
    this.platformService = platformService;
    this.postDataSetSubject = new Subject();
    this.destroy$ = new Subject();
    this.postDataSet$ = this.postDataSetSubject.asObservable();
    this.loadOnly = false;
    this.dataChanges = new EventEmitter();
    this.getSelected = new EventEmitter();
    this.formGroupValueChanges = new Subject();
    this.eventListeners = [];
    this.offsetX = 0;
    this.offsetY = 0;
    this.width = 0;
    this.height = 0;
    this.controlList = {};
    this.apiData = {};
    this.subscription = new Subscription();
  }
  ngAfterViewInit() {
    this.postDataSet$.pipe(takeUntil(this.destroy$)).subscribe((value) => __async(this, null, function* () {
      this.drawSVG(value);
    }));
    this.loadOnly && this.drawSVG(this.postData);
  }
  drawSVG(value) {
    return __async(this, null, function* () {
      const currentValue = value;
      this.newFormGroupValue = currentValue;
      const previousValue = this.previousFormGroupValue;
      const differences = this.findDifferences(previousValue, currentValue);
      const { id, deleted, h, w, title, backgroundurl, data, boxed, apiData } = differences;
      this.formGroupValueChanges.next(differences);
      if (apiData) {
        this.apiData = apiData.current;
        yield this.updateElements(currentValue.data || []);
      }
      if (backgroundurl && backgroundurl["current"]) {
        yield this.updateBackGround(backgroundurl["current"]);
      }
      if (w || h) {
        if (w) {
          this.width = w.current;
        }
        if (h) {
          this.height = h.current;
        }
        this.updateViewBox(Math.min(Math.max(this.width, 1024), 1920), Math.min(Math.max(this.height, 1024), 1920));
      }
      if (data) {
        yield this.updateElements(data.current);
      }
      this.previousFormGroupValue = __spreadValues({}, this.newFormGroupValue);
      for (let key in this.controlList) {
        let data2 = this.controlList[key];
        this.renderer.setValue(data2.control, data2.title);
        if (data2) {
          const a = this.apiData[key];
          for (let k in a) {
            let d = a[k];
            if (d.id == data2.text) {
              this.renderer.setValue(data2.control, data2["lang"] == "en" ? d["name"] : data2["lang"] == "gu" ? d["gu_name"] : d["name"]);
              break;
            }
          }
        }
      }
    });
  }
  ngOnChanges(changes) {
    return __async(this, null, function* () {
      if (changes["formGroupValue"]) {
      }
    });
  }
  findDifferences(previousValue, currentValue) {
    const changes = {};
    for (const key in currentValue) {
      if (currentValue.hasOwnProperty(key)) {
        const keyTyped = key;
        const currentVal = currentValue[keyTyped];
        if (previousValue) {
          const previousVal = previousValue[keyTyped];
          if (previousVal !== currentVal) {
            changes[keyTyped] = {
              previous: previousValue?.[keyTyped],
              current: currentValue[keyTyped]
            };
          }
        } else {
          changes[keyTyped] = {
            previous: previousValue?.[keyTyped],
            current: currentValue[keyTyped]
          };
        }
      }
    }
    return changes;
  }
  updateBackGround(backgroundurl) {
    return __async(this, null, function* () {
      if (backgroundurl) {
        const svg = this.el.nativeElement;
        const background = yield this.getImageDataUrl(backgroundurl);
        const b = this.renderer.createElement("image", "http://www.w3.org/2000/svg");
        this.renderer.setAttribute(b, "x", "0");
        this.renderer.setAttribute(b, "data-type", "background-img");
        this.renderer.setAttribute(b, "y", "0");
        this.renderer.setAttribute(b, "width", "100%");
        this.renderer.setAttribute(b, "height", "100%");
        this.renderer.setAttribute(b, "preserveAspectRatio", "xMidYMid slice");
        this.renderer.setAttribute(b, "href", background);
        this.renderer.listen(b, "click", (event) => {
          this.getSelected.emit({ index: -1 });
        });
        const firstChild = svg.firstChild;
        if (firstChild) {
          svg.insertBefore(b, firstChild);
          firstChild.nodeName === "image" && firstChild.remove();
        } else {
          svg.appendChild(b);
        }
      }
    });
  }
  getImageDataUrl(imageUrl) {
    return __async(this, null, function* () {
      if (this.platformService.isBrowser()) {
        try {
          const response = yield fetch(imageUrl);
          const blob = yield response.blob();
          const convertedImageUrl = yield new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          return convertedImageUrl;
        } catch (error) {
          console.error("Error fetching or converting image:", error);
          throw error;
        }
      } else {
        console.warn("Image fetching and conversion are not available on the server. Returning fallback value.");
        return "";
      }
    });
  }
  updateViewBox(x, y) {
    if (this.el.nativeElement) {
      const svg = this.el.nativeElement;
      const viewBoxValue = `0 0 ${x} ${y}`;
      svg.setAttribute("viewBox", viewBoxValue);
    }
  }
  updateElements(data) {
    return __async(this, null, function* () {
      const svg = this.el.nativeElement;
      const children = svg.childNodes;
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        const dataType = child.getAttribute("data-type");
        if (dataType !== "background-img") {
          svg.removeChild(child);
        }
      }
      const elements = [];
      for (const [i, d] of data.entries()) {
        if (d.rect) {
          const rect = yield this.createRect(d, i);
          rect && elements.push(rect);
        }
        ;
        if (d.circle) {
          const circle = yield this.createCircle(d, i);
          circle && elements.push(circle);
        }
        ;
        if (d.ellipse) {
          const ellipse = yield this.createEllipse(d, i);
          ellipse && elements.push(ellipse);
        }
        ;
        if (d.line)
          elements.push(this.createLine(d, i));
        if (d.image)
          elements.push(this.createImage(d, i));
        if (d.text)
          elements.push(yield this.createText(d, i));
      }
      this.removeEventListeners();
      !this.loadOnly && this.addDraggableBehavior(elements);
    });
  }
  createRect(d, i) {
    if (this.el.nativeElement && d.rect) {
      const svg = this.el.nativeElement;
      const rect = this.Rect.createRect(d.rect);
      this.renderer.appendChild(svg, rect);
      return rect;
    }
    return null;
  }
  createCircle(d, i) {
    if (this.el.nativeElement && d.circle) {
      const svg = this.el.nativeElement;
      const c = this.Circle.createCircle(d.circle);
      this.renderer.appendChild(svg, c);
      return c;
    }
    return null;
  }
  createEllipse(d, i) {
    if (this.el.nativeElement && d.ellipse) {
      const svg = this.el.nativeElement;
      const c = this.Ellipse.createEllipse(d.ellipse);
      this.renderer.appendChild(svg, c);
      return c;
    }
    return null;
  }
  createLine(d, i) {
    if (this.el.nativeElement && d.line) {
      const svg = this.el.nativeElement;
      const line2 = this.renderer.createElement("line", "http://www.w3.org/2000/svg");
      const { x1, y1, x2, y2, stroke, strokeWidth, opacity, rotate } = d.line;
      this.renderer.setAttribute(line2, "x1", String(x1));
      this.renderer.setAttribute(line2, "y1", String(y1));
      this.renderer.setAttribute(line2, "x2", String(x2));
      this.renderer.setAttribute(line2, "y2", String(y2));
      this.renderer.setAttribute(line2, "stroke", stroke);
      this.renderer.setAttribute(line2, "stroke-width", String(strokeWidth));
      this.renderer.setAttribute(line2, "opacity", String(opacity));
      this.renderer.setAttribute(line2, "transform", `rotate(${rotate} ${x1} ${y1})`);
      this.renderer.setAttribute(line2, "data-type", "line");
      this.renderer.appendChild(svg, line2);
      return line2;
    }
    return null;
  }
  createImage(d, i) {
    if (this.el.nativeElement && d.image) {
      const svg = this.el.nativeElement;
      const { x, y, r, imageUrl, borderColor, borderWidth, shape, origin, placeholder, svgProperties, rotate } = d.image;
      let element;
      const newWH = this.calculateWH(d.image);
      const w = newWH.w;
      const h = newWH.h;
      switch (shape) {
        case "circle":
          element = this.renderer.createElement("circle", "http://www.w3.org/2000/svg");
          this.renderer.setAttribute(element, "cx", String(x));
          this.renderer.setAttribute(element, "cy", String(y));
          this.renderer.setAttribute(element, "r", String(r));
          this.renderer.setAttribute(element, "fill", "#FFF");
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
        case "rect_3_2":
        case "rect":
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
          break;
        default:
          console.error("Invalid shape");
          return null;
      }
      if (element !== null) {
        const id = Math.random().toString(36).substring(7);
        this.renderer.setAttribute(element, "fill", "url(#" + id + ")");
        this.renderer.setStyle(element, "cursor", "grab");
        this.renderer.setStyle(element, "filter", "url(#shadow)");
        const imagePattern = this.renderer.createElement("pattern", "http://www.w3.org/2000/svg");
        this.renderer.setAttribute(imagePattern, "id", id);
        this.renderer.setAttribute(imagePattern, "x", "0");
        this.renderer.setAttribute(imagePattern, "y", "0");
        this.renderer.setAttribute(imagePattern, "height", "100%");
        this.renderer.setAttribute(imagePattern, "width", "100%");
        this.renderer.setAttribute(imagePattern, "viewBox", "0 0 " + String(w) + " " + String(h));
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
        d.editable && this.renderer.appendChild(imagePattern, extraRect);
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
        return element;
      }
    }
    return null;
  }
  createText(d, i) {
    return __async(this, null, function* () {
      if (this.el.nativeElement && d.text) {
        const svg = this.el.nativeElement;
        const t = this.renderer.createElement("text", "http://www.w3.org/2000/svg");
        const { x, y, fs, fw, text, type, controlName, api, lang, dependency, color, fontStyle, rotate, fontFamily, textShadow, backgroundColor, textEffects, textAnchor, alignmentBaseline, letterSpacing, lineHeight, textTransformation, originX, originY, opacity } = d.text;
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
          "font-weight": fw || "400",
          "text-decoration": fontStyle.underline ? "underline" : "none",
          "font-style": fontStyle.italic ? "italic" : "normal",
          "opacity": opacity ? opacity.toString() : "100"
        };
        if (d.text.backgroundColor) {
          textAttributes["background-color"] = backgroundColor;
        }
        if (textEffects) {
        }
        let textStyles = {
          "-webkit-user-select": "none",
          "letter-spacing": letterSpacing ? `${letterSpacing}px` : "0",
          "line-height": d.text.lineHeight ? `${d.text.lineHeight}` : "1.5",
          "text-transform": textTransformation || "none"
        };
        if (d.text.textShadow.enable) {
          textAttributes["filter"] = `drop-shadow(${textShadow.offsetX}px ${textShadow.offsetY}px ${textShadow.blur}px ${textShadow.color})` || "none";
        }
        Object.entries(textAttributes).forEach(([key, value]) => this.renderer.setAttribute(t, key, value));
        Object.entries(textStyles).forEach(([key, value]) => this.renderer.setStyle(t, key, value));
        if (text) {
          const lines = this.textFormat(text);
          if (lines.length === 1) {
            const textElement = this.renderer.createText(text);
            if (controlName && lang && type && type == "select") {
              this.controlList[controlName] = { title: d.title, control: textElement, lang, text, api: api || "", dependency: dependency || "" };
            }
            this.renderer.appendChild(t, textElement);
          } else {
            const dyOffset = fs * lineHeight || 0;
            let dxOffset = 0;
            switch (textAnchor) {
              case "middle":
                const totalWidth = lines.reduce((sum, line2) => sum + this.getTextWidth(line2, fs, fontFamily), 0);
                dxOffset = totalWidth / 2;
                break;
              case "end":
                dxOffset = lines.reduce((maxWidth, line2) => {
                  const lineWidth = this.getTextWidth(line2, fs, fontFamily);
                  return lineWidth > maxWidth ? lineWidth : maxWidth;
                }, 0);
                break;
            }
            lines.forEach((line2, index) => {
              const tspanElement = this.renderer.createElement("tspan", "http://www.w3.org/2000/svg");
              this.renderer.appendChild(tspanElement, this.renderer.createText(line2.trim()));
              if (index > 0 || index === 0 && line2.trim() === "") {
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
        this.renderer.appendChild(svg, t);
        if (rotate || originX !== void 0 && originY !== void 0) {
          const bbox = t.getBBox();
          const width = bbox.width;
          const height = bbox.height;
          const transformValue = `rotate(${rotate || 0} ${x + width / 2} ${y + height / 2})`;
          this.renderer.setAttribute(t, "transform", transformValue);
        }
        return t;
      }
      return null;
    });
  }
  getTextWidth(text, fontSize, fontFamily) {
    const svgText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    svgText.setAttribute("font-size", `${fontSize}px`);
    svgText.setAttribute("font-family", fontFamily);
    svgText.textContent = text;
    document.body.appendChild(svgText);
    const width = svgText.getBBox().width;
    document.body.removeChild(svgText);
    return width;
  }
  textFormat(text) {
    const formattedText = text.replace(/\n/g, "\n").replace(/\n(?!\*{3})/g, "***\n");
    const lines = formattedText.split("\n");
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/\*\*\*/g, "\xA0").trim();
    }
    return lines;
  }
  calculateWH(image) {
    let w = 320;
    let h = 320;
    const shape = image.shape;
    const aspectRatios = {
      "circle": { ratio: 1, divisor: 1 },
      "ellipse": { ratio: 1, divisor: 1 },
      "rect": { ratio: 1, divisor: 1 },
      "rect_3_2": { ratio: 3, divisor: 2 },
      "rect_4_3": { ratio: 4, divisor: 3 },
      "rect_16_9": { ratio: 16, divisor: 9 },
      "rect_1_1": { ratio: 1, divisor: 1 },
      "rect_5_4": { ratio: 5, divisor: 4 },
      "rect_3_1": { ratio: 3, divisor: 1 },
      "rect_7_5": { ratio: 7, divisor: 5 },
      "rect_2_3": { ratio: 2, divisor: 3 },
      "rect_3_4": { ratio: 3, divisor: 4 },
      "rect_9_16": { ratio: 9, divisor: 16 },
      "rect_4_5": { ratio: 4, divisor: 5 },
      "rect_5_7": { ratio: 5, divisor: 7 }
    };
    const closestMatch = aspectRatios[shape];
    if (closestMatch) {
      const r = image.r;
      w = r * 2;
      h = w * closestMatch.ratio / closestMatch.divisor;
    } else {
      console.error("Aspect ratio not defined for shape:", shape);
    }
    return { w, h };
  }
  addDraggableBehavior(elements) {
    const svg = this.el.nativeElement;
    const showControls = elements.map(() => {
      return false;
    });
    elements.forEach((element, index) => {
      const eleData = this.newFormGroupValue.data[index];
      const { boxed } = eleData;
      if (element) {
        let isDragging = false;
        let isDragged = false;
        const bbox = element.getBBox();
        const x = bbox.x;
        const y = bbox.y;
        const width = bbox.width;
        const height = bbox.height;
        this.renderer.setAttribute(element, "cursor", "grab");
        const elementType = element.getAttribute("data-type");
        const onMouseDown = (event) => {
          isDragging = true;
          isDragged = false;
          showControls.fill(false);
          showControls[index] = true;
          const svgPoint = this.getMousePosition(event, svg);
          const clickedX = svgPoint.x;
          const clickedY = svgPoint.y;
          let elementX = 0;
          let elementY = 0;
          if (["circle"].includes(elementType)) {
          } else {
          }
          this.renderer.setAttribute(element, "cursor", "grabbing");
          switch (elementType) {
            case "circle":
            case "ellipse":
              elementX = parseFloat(element.getAttribute("cx") || "0");
              elementY = parseFloat(element.getAttribute("cy") || "0");
              break;
            case "svg":
              const pathBoundingBox = element.getBBox();
              elementX = pathBoundingBox.x;
              elementY = pathBoundingBox.y;
              break;
            case "image":
              break;
            case "g":
              const transformAttribute = element.getAttribute("transform");
              if (transformAttribute) {
                const match = transformAttribute.match(/translate\(([^,]+),([^)]+)\)/);
                if (match && match.length === 3) {
                  elementX = parseFloat(match[1]);
                  elementY = parseFloat(match[2]);
                }
              }
              break;
            default:
              elementX = parseFloat(element.getAttribute("x") || "0");
              elementY = parseFloat(element.getAttribute("y") || "0");
              break;
          }
          this.offsetX = elementX - clickedX;
          this.offsetY = elementY - clickedY;
          this.getSelected.emit({ index });
        };
        const onMouseMove = (event) => {
          if (isDragging) {
            isDragged = true;
            const svgPoint = this.getMousePosition(event, svg);
            if (element) {
              let x2, y2;
              let r = 0;
              switch (elementType) {
                case "circle":
                case "ellipse":
                  x2 = parseFloat(element.getAttribute("cx") || "0");
                  y2 = parseFloat(element.getAttribute("cy") || "0");
                  r = parseFloat(element.getAttribute("r") || "0");
                  break;
                case "g":
                  const transformAttribute = element.getAttribute("transform");
                  if (transformAttribute) {
                    const match = transformAttribute.match(/translate\(([^,]+),([^)]+)\)/);
                    if (match && match.length === 3) {
                      x2 = parseFloat(match[1]);
                      y2 = parseFloat(match[2]);
                    }
                  }
                  break;
                default:
                  x2 = parseFloat(element.getAttribute("x") || "0");
                  y2 = parseFloat(element.getAttribute("y") || "0");
                  break;
              }
              if (x2 !== void 0 && y2 !== void 0) {
                const oX = svgPoint.x - x2 + this.offsetX;
                const oY = svgPoint.y - y2 + this.offsetY;
                const newX = x2 + oX;
                const newY = y2 + oY;
                let minX = 30 + r;
                let minY = 30 + r;
                let maxX = this.width - (element.getBBox().width + minX) + 2 * r;
                let maxY = this.height - (element.getBBox().height + minY) + 2 * r;
                const textAnchor = element.getAttribute("text-anchor");
                if (textAnchor) {
                  minY += element.getBBox().height / 2;
                  maxY += element.getBBox().height;
                  switch (textAnchor) {
                    case "middle":
                      minX += element.getBBox().width / 2;
                      maxX += element.getBBox().width / 2;
                      break;
                    case "start":
                      break;
                    case "end":
                      minX += element.getBBox().width;
                      maxX += element.getBBox().width;
                      break;
                    default:
                      break;
                  }
                }
                const adjustedX = boxed ? Math.max(minX, Math.min(newX, maxX)) : newX;
                const adjustedY = boxed ? Math.max(minY, Math.min(newY, maxY)) : newY;
                switch (true) {
                  case (!!eleData.circle || !!eleData.ellipse):
                    if (eleData.circle) {
                      eleData.circle.cx = adjustedX;
                      eleData.circle.cy = adjustedY;
                    }
                    if (eleData.ellipse) {
                      eleData.ellipse.cx = adjustedX;
                      eleData.ellipse.cy = adjustedY;
                    }
                    break;
                  case (!!eleData.rect || !!eleData.text || !!eleData.image):
                    if (eleData.rect) {
                      eleData.rect.x = adjustedX;
                      eleData.rect.y = adjustedY;
                      const width2 = element.getBBox().width;
                      const height2 = element.getBBox().height;
                      const transformValue = `rotate(${eleData.rect.rotate || 0} ${adjustedX + width2 / 2} ${adjustedY + height2 / 2})`;
                      this.renderer.setAttribute(element, "transform", transformValue);
                    }
                    if (eleData.text) {
                      eleData.text.x = adjustedX;
                      eleData.text.y = adjustedY;
                      const bbox2 = element.getBBox();
                      const width2 = bbox2.width;
                      const height2 = bbox2.height;
                      const transformValue = `rotate(${eleData.text.rotate || 0} ${adjustedX + width2 / 2} ${adjustedY + height2 / 2})`;
                      const tspanElements = element.getElementsByTagName("tspan");
                      if (tspanElements.length > 0) {
                        for (let i = 0; i < tspanElements.length; i++) {
                          const tspanElement = tspanElements[i];
                          this.renderer.setAttribute(tspanElement, "x", adjustedX.toString());
                        }
                      }
                      this.renderer.setAttribute(element, "transform", transformValue);
                    }
                    if (eleData.image) {
                      eleData.image.x = adjustedX;
                      eleData.image.y = adjustedY;
                      const width2 = element.getBBox().width;
                      const height2 = element.getBBox().height;
                      const transformValue = `rotate(${eleData.image.rotate || 0} ${adjustedX + width2 / 2} ${adjustedY + height2 / 2})`;
                      this.renderer.setAttribute(element, "transform", transformValue);
                    }
                    break;
                  default:
                    console.log("Element data not found");
                    break;
                }
                switch (elementType) {
                  case "circle":
                  case "ellipse":
                    this.renderer.setAttribute(element, "cx", adjustedX.toString());
                    this.renderer.setAttribute(element, "cy", adjustedY.toString());
                    break;
                  case "rect":
                    this.renderer.setAttribute(element, "x", adjustedX.toString());
                    this.renderer.setAttribute(element, "y", adjustedY.toString());
                    break;
                  case "svg":
                    break;
                  case "image":
                    break;
                  case "g":
                    this.renderer.setAttribute(element, "transform", `translate(${adjustedX},${adjustedY})`);
                    break;
                  default:
                    this.renderer.setAttribute(element, "x", adjustedX.toString());
                    this.renderer.setAttribute(element, "y", adjustedY.toString());
                    break;
                }
              }
            }
          }
        };
        const onMouseUp = () => {
          isDragging && isDragged && this.dataChanges.emit({ data: eleData, index });
          isDragging = false;
          this.renderer.setAttribute(element, "cursor", "grab");
        };
        const mousedownListener = this.renderer.listen(element, "mousedown", onMouseDown);
        const touchstartListener = this.renderer.listen(element, "touchstart", onMouseDown);
        const mousemoveListener = this.renderer.listen(svg, "mousemove", onMouseMove);
        const touchmoveListener = this.renderer.listen(svg, "touchmove", onMouseMove);
        const mouseupListener = this.renderer.listen(svg, "mouseup", onMouseUp);
        const mouseleaveListener = this.renderer.listen(svg, "mouseleave", onMouseUp);
        const touchendListener = this.renderer.listen(svg, "touchend", onMouseUp);
        !this.loadOnly && this.eventListeners.push(mousedownListener, touchstartListener, mousemoveListener, touchmoveListener, mouseupListener, mouseleaveListener, touchendListener);
      }
    });
  }
  getMousePosition(evt, svg) {
    evt.preventDefault();
    const touchOrMouse = "touches" in evt ? evt.touches[0] : evt;
    const CTM = svg.getScreenCTM();
    return {
      x: (touchOrMouse.clientX - CTM.e) / CTM.a,
      y: (touchOrMouse.clientY - CTM.f) / CTM.d
    };
  }
  removeEventListeners() {
    this.eventListeners.forEach((removeListener) => removeListener());
    this.eventListeners = [];
  }
  ngOnDestroy() {
    this.removeEventListeners();
    this.destroy$.next();
    this.destroy$.complete();
    this.postDataSetSubject?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.\u0275fac = function SvgResponseDirective_Factory(t) {
      return new (t || _SvgResponseDirective)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(SvgRectService), \u0275\u0275directiveInject(SvgCircleService), \u0275\u0275directiveInject(SvgEllipseService), \u0275\u0275directiveInject(PlatformService));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _SvgResponseDirective, selectors: [["", "svgDraw", ""]], inputs: { formGroupValue: [InputFlags.None, "svgDraw", "formGroupValue"], postDataSet: "postDataSet", loadOnly: "loadOnly" }, outputs: { dataChanges: "dataChanges", getSelected: "getSelected" }, features: [\u0275\u0275NgOnChangesFeature] });
  }
};

// src/app/common/directives/scroll-center.directive.ts
var ScrollCenterDirective = class _ScrollCenterDirective {
  set activeIndexSet(value) {
    this.activeIndex = value;
    this.activeIndexSetSubject.next(value);
    this.centerActiveItem();
  }
  set selectedIndexSet(value) {
    this.selectedIndexSetSubject.next(value);
    this.centerActiveItem(true);
  }
  constructor(el, renderer) {
    this.el = el;
    this.renderer = renderer;
    this.destroy$ = new Subject();
    this.activeIndexSetSubject = new Subject();
    this.selectedIndexSetSubject = new Subject();
    this.activeIndexSet$ = this.activeIndexSetSubject.asObservable();
    this.selectedIndexSet$ = this.selectedIndexSetSubject.asObservable();
  }
  ngAfterViewInit() {
    this.activeIndexSet$.pipe(takeUntil(this.destroy$)).subscribe((value) => __async(this, null, function* () {
      this.activeIndex = value;
      yield this.centerActiveItem();
    }));
    this.selectedIndexSet$.pipe().subscribe(() => __async(this, null, function* () {
      yield this.centerActiveItem(true);
    }));
    this.el.nativeElement.addEventListener("wheel", this.onWheel.bind(this));
    this.checkOverflow();
    this.el.nativeElement.addEventListener("scroll", this.checkOverflow.bind(this));
  }
  centerActiveItem(fast) {
    const container = this.el.nativeElement;
    const items = container.children;
    if (this.activeIndex >= 0 && this.activeIndex < items.length) {
      const activeItem = items[this.activeIndex];
      const containerWidth = container.offsetWidth;
      const itemWidth = activeItem.offsetWidth;
      const offsetLeft = activeItem.offsetLeft;
      const scrollPosition = offsetLeft - containerWidth / 2 + itemWidth / 2;
      setTimeout(() => {
        container.scroll({
          left: scrollPosition,
          behavior: fast ? "instant" : "smooth"
        });
      }, 0);
    }
  }
  onWheel(event) {
    const container = this.el.nativeElement;
    container.scrollLeft += event.deltaY;
  }
  checkOverflow() {
    const container = this.el.nativeElement;
    const parent = container.parentElement;
    const isOverflowingStart = container.scrollLeft > 0;
    const isOverflowingRight = container.scrollLeft + container.offsetWidth < container.scrollWidth;
    this.renderer.setStyle(parent, "overflow", "hidden");
    if (isOverflowingStart) {
      this.renderer.addClass(parent, "overflowing-start");
    } else {
      this.renderer.removeClass(parent, "overflowing-start");
    }
    if (isOverflowingRight) {
      this.renderer.addClass(parent, "overflowing-end");
    } else {
      this.renderer.removeClass(parent, "overflowing-end");
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.activeIndexSetSubject?.unsubscribe();
    this.el.nativeElement.removeEventListener("wheel", this.onWheel);
    this.el.nativeElement.removeEventListener("scroll", this.checkOverflow);
  }
  static {
    this.\u0275fac = function ScrollCenterDirective_Factory(t) {
      return new (t || _ScrollCenterDirective)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ScrollCenterDirective, selectors: [["", "scrollCenter", ""]], inputs: { activeIndex: "activeIndex", selectedIndex: "selectedIndex", activeIndexSet: "activeIndexSet", selectedIndexSet: "selectedIndexSet" } });
  }
};

// src/app/common/directives/decimal.directive.ts
var DecimalDirective = class _DecimalDirective {
  constructor(el, control) {
    this.el = el;
    this.control = control;
  }
  onInputChange(event) {
    const inputElement = this.el.nativeElement;
    const currentValue = inputElement.value;
    let sanitizedValue = currentValue.replace(/[^0-9.]/g, "");
    const parts = sanitizedValue.split(".");
    if (parts.length > 2) {
      sanitizedValue = parts[0] + "." + parts.slice(1).join("");
    }
    const [integerPart, decimalPart = ""] = sanitizedValue.split(".");
    const limitedDecimalPart = decimalPart.slice(0, 2);
    sanitizedValue = decimalPart ? `${integerPart}.${limitedDecimalPart}` : integerPart;
    if (currentValue !== sanitizedValue) {
      this.control.control?.setValue(sanitizedValue, { emitEvent: false });
      inputElement.value = sanitizedValue;
      event.stopPropagation();
    }
  }
  // Allow cursor placement in the input field
  onKeyDown(event) {
    const inputElement = this.el.nativeElement;
    const cursorPosition = inputElement.selectionStart || 0;
    const currentValue = inputElement.value;
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Control", "Shift", "Home", "End", "PageUp", "PageDown", "Tab"];
    if (!event.key || allowedKeys.includes(event.key)) {
      return;
    }
    event.preventDefault();
    if (/^\d$/.test(event.key)) {
      const newValue = currentValue.slice(0, cursorPosition) + event.key + currentValue.slice(cursorPosition);
      const [integerPart, decimalPart = ""] = newValue.split(".");
      const limitedDecimalPart = decimalPart.slice(0, 2);
      inputElement.value = decimalPart ? `${integerPart}.${limitedDecimalPart}` : integerPart;
      this.control.control?.setValue(inputElement.value, { emitEvent: false });
    }
  }
  static {
    this.\u0275fac = function DecimalDirective_Factory(t) {
      return new (t || _DecimalDirective)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgControl));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _DecimalDirective, selectors: [["", "decimalOnly", ""]], hostBindings: function DecimalDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function DecimalDirective_input_HostBindingHandler($event) {
          return ctx.onInputChange($event);
        })("keydown", function DecimalDirective_keydown_HostBindingHandler($event) {
          return ctx.onKeyDown($event);
        });
      }
    } });
  }
};

// src/app/common/component/confirmation-modal/confirmation-modal.component.ts
var ConfirmationModalComponent = class _ConfirmationModalComponent {
  constructor() {
    this.title = "";
    this.message = "";
    this.confirm = new EventEmitter();
  }
  // Method to emit the confirmation event
  onConfirm() {
    this.confirm.emit();
  }
  static {
    this.\u0275fac = function ConfirmationModalComponent_Factory(t) {
      return new (t || _ConfirmationModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmationModalComponent, selectors: [["app-confirmation-modal"]], inputs: { title: "title", message: "message" }, outputs: { confirm: "confirm" }, decls: 14, vars: 2, consts: [["id", "confirmationModal", "tabindex", "-1", "aria-labelledby", "confirmationModalLabel", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], ["type", "button", "data-bs-dismiss", "modal", "aria-label", "Close", 1, "btn-close"], [1, "modal-body"], [1, "modal-footer"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-secondary"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-danger", 3, "click"]], template: function ConfirmationModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h5", 4);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275element(6, "button", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 6);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 7)(10, "button", 8);
        \u0275\u0275text(11, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "button", 9);
        \u0275\u0275listener("click", function ConfirmationModalComponent_Template_button_click_12_listener() {
          return ctx.onConfirm();
        });
        \u0275\u0275text(13, "Delete");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.title);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx.message, " ");
      }
    } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmationModalComponent, { className: "ConfirmationModalComponent", filePath: "src\\app\\common\\component\\confirmation-modal\\confirmation-modal.component.ts", lineNumber: 8 });
})();

// src/app/common/shared/shared.module.ts
var SharedModule = class _SharedModule {
  static {
    this.\u0275fac = function SharedModule_Factory(t) {
      return new (t || _SharedModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _SharedModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ providers: [KeysPipe, ColorService, ColorPickerComponent, DependencyListPipe], imports: [
      ReactiveFormsModule,
      CommonModule,
      FormsModule
    ] });
  }
};

// src/app/common/services/toast.service.ts
var ToastService = class _ToastService {
  constructor(platformService) {
    this.platformService = platformService;
    this.toasts = [];
  }
  show(message, options = {}) {
    options.show = true;
    this.toasts.push(__spreadValues({ message }, options));
    if (this.platformService.isBrowser()) {
      this.scheduleAutoDismiss();
    }
  }
  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
  scheduleAutoDismiss() {
    setTimeout(() => {
      this.toasts.forEach((toast, index) => {
        setTimeout(() => this.remove(toast), 500 * (index + 1));
      });
    }, 5e3);
  }
  static {
    this.\u0275fac = function ToastService_Factory(t) {
      return new (t || _ToastService)(\u0275\u0275inject(PlatformService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
  }
};

export {
  ToastService,
  AsteriskDirective,
  PaginationDirective,
  ConfirmationModalComponent,
  SelectDropdownDirective,
  DistrictService,
  TalukaService,
  FontService,
  SvgRectService,
  SvgCircleService,
  SvgEllipseService,
  SharedModule
};
/*! Bundled license information:

opentype.js/dist/opentype.module.js:
  (*! https://mths.be/codepointat v0.2.0 by @mathias *)
*/
//# sourceMappingURL=chunk-TUD4Z2WI.js.map
