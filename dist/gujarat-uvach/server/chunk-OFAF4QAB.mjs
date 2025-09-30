import './polyfills.server.mjs';
function i(h){let s=h.value||"",t=/[A-Z]+/.test(s),a=/[a-z]+/.test(s),e=/[0-9]+/.test(s),n=/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(s),r=s.length>=8;return t&&a&&e&&n&&r?null:{passwordStrength:!0,hasUpperCase:t,hasLowerCase:a,hasDigit:e,hasSpecialChar:n,hasMinLength:r}}export{i as a};
