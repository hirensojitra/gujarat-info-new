import { AbstractControl } from '@angular/forms';

export function passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value || '';
  const hasUpperCase = /[A-Z]+/.test(value);
  const hasLowerCase = /[a-z]+/.test(value);
  const hasDigit = /[0-9]+/.test(value);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
  const hasMinLength = value.length >= 8;

  const passwordValid = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && hasMinLength;

  if (!passwordValid) {
    return {
      passwordStrength: true,
      hasUpperCase: hasUpperCase,
      hasLowerCase: hasLowerCase,
      hasDigit: hasDigit,
      hasSpecialChar: hasSpecialChar,
      hasMinLength: hasMinLength
    };
  }
  return null;
}
