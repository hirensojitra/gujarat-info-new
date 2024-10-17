import './polyfills.server.mjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup
} from "./chunk-YA4RVP7S.mjs";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-5I3IBUKT.mjs";

// src/app/common/services/development.service.ts
var DevelopmentService = class _DevelopmentService {
  constructor(fb) {
    this.fb = fb;
    this.ReportDate = /* @__PURE__ */ new Date();
  }
  getDate() {
    const year = this.ReportDate.getFullYear();
    const month = String(this.ReportDate.getMonth() + 1).padStart(2, "0");
    const day = String(this.ReportDate.getDate()).padStart(2, "0");
    this.formattedDate = `${year}-${month}-${day}`;
    return this.formattedDate;
  }
  markFormGroupTouched(formGroup) {
    Object.keys(formGroup.controls).forEach((controlName) => {
      const control = formGroup?.get(controlName);
      if (control instanceof FormControl) {
        if (!control.touched) {
          control.markAsTouched();
          control.updateValueAndValidity();
        }
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        this.markFormArrayTouched(control);
      }
    });
  }
  markFormArrayTouched(formArray) {
    formArray.controls.forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        this.markFormArrayTouched(control);
      }
    });
  }
  setControl(formGroup, controlName, defaultValue, validators) {
    if (formGroup.get(controlName)) {
      return;
    }
    const control = this.fb.control(defaultValue, validators);
    control.markAsUntouched;
    formGroup.addControl(controlName, control);
  }
  removeControls(formGroup, controlNames) {
    controlNames.forEach((controlName) => {
      if (formGroup.get(controlName)) {
        formGroup.removeControl(controlName);
      }
    });
  }
  filterAndSetValue(control) {
    const value = control?.value;
    if (value !== void 0 && value !== null) {
      const filteredValue = value.toString().replace(/^0+(?=\d)/, "");
      const intValue = parseInt(filteredValue, 10) || 0;
      intValue.toString() !== filteredValue && control?.setValue(intValue);
    }
  }
  calculateWH(image) {
    let cW = 320;
    let cH = 320;
    let w = 320;
    let h = 320;
    const shape = image.shape;
    const aspectRatios = {
      "circle": { ratio: 1, divisor: 1 },
      "rect": { ratio: 1, divisor: 1 },
      "ellipse": { ratio: 1, divisor: 1 },
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
      cW = w;
      cH = cW * closestMatch.ratio / closestMatch.divisor;
      w = r * 2;
      h = w * closestMatch.ratio / closestMatch.divisor;
    } else {
      console.error("Aspect ratio not defined for shape:", shape);
    }
    return { w, h, cW, cH };
  }
  static {
    this.\u0275fac = function DevelopmentService_Factory(t) {
      return new (t || _DevelopmentService)(\u0275\u0275inject(FormBuilder));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DevelopmentService, factory: _DevelopmentService.\u0275fac, providedIn: "root" });
  }
};

export {
  DevelopmentService
};
//# sourceMappingURL=chunk-OHMCRVXD.mjs.map
