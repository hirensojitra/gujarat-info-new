import { Directive, ElementRef, Renderer2, OnInit, Input, AfterViewInit, OnDestroy, HostListener, forwardRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, FormControl, ValidatorFn, AbstractControl, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[captcha]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CaptchaDirective),
        multi: true
    }]
})
export class CaptchaDirective implements OnInit, AfterViewInit {
    private captchaValue: string = '';
    private canvasElement: HTMLCanvasElement;
    @Input() character: number | undefined;
    @Input() captchaStyle: string | undefined;
    @Input() captchaLabelClasses: string | undefined;
    @Input() formGroup: FormGroup | undefined;

    @Output() captchaAdded = new EventEmitter<void>();

    captchaControl: HTMLInputElement;
    inputLabel: HTMLElement;
    errorLabel: HTMLElement;
    inputElement: HTMLInputElement;
    label: string = 'Captcha'
    placeholder: string = 'Enter Captcha'
    captchaFormControl: FormControl;
    private languageSubscription: Subscription;
    constructor(
        private fb: FormBuilder,
        private el: ElementRef,
        private renderer: Renderer2,
        private formGroupDirective: FormGroupDirective,
        private cdr: ChangeDetectorRef,
        private ls: LanguageService
    ) {
        this.canvasElement = this.renderer.createElement('canvas') as HTMLCanvasElement;
    }
    @HostListener('keydown.enter', ['$event'])
    onEnterPress(event: KeyboardEvent): void {
        event.preventDefault();
        // You can add additional logic here if needed
    }
    @HostListener('reset', ['$event'])
    onReset(event: Event): void {
        this.formGroup?.get('captcha')?.setValue('', { emitEvent: false });
        this.resetCaptcha();
    }
    cValue: string;
    async ngAfterViewInit() {
        this.cValue = this.formGroup.get('captcha')?.value;
        this.languageSubscription = await this.ls.language$.subscribe(language => {
            switch (language) {
                case 'en':
                    this.label = 'Captcha';
                    this.placeholder = 'Enter Captcha';
                    break;
                case 'mr':
                    this.label = 'कॅप्चा';
                    this.placeholder = 'कॅप्चा प्रविष्ट करा';
                    break;
                case 'fr':
                    console.log('French selected');
                    // Perform actions for French language
                    break;
                // Add more cases as needed
                default:
                    this.label = 'Captcha';
                    this.placeholder = 'Enter Captcha';
                    break;
            }
            if (this.inputLabel) {
                this.inputLabel.textContent = this.label;
                const asteriskSpan = this.renderer.createElement('span');
                this.renderer.addClass(asteriskSpan, 'text-danger');
                this.renderer.appendChild(asteriskSpan, this.renderer.createText(' *'));
                this.renderer.appendChild(this.inputLabel, asteriskSpan);
            };
            if (this.inputElement) { this.renderer.setAttribute(inputElement, 'placeholder', this.placeholder); };
        });
        this.formGroup?.valueChanges.subscribe(() => {
            // this.FormGroup.get('captcha').setValue('', { emitEvent: false });

        })

        let formGroup = this.formGroup || this.formGroupDirective.form;
        this.captchaFormControl = new FormControl('', Validators.required);
        formGroup.addControl('captcha', this.captchaFormControl);
        this.generateCaptcha(this.canvasElement);
        const form = this.el.nativeElement;
        form.formGroup = formGroup;
        const captchaContainer = this.renderer.createElement('div');
        captchaContainer.classList.add('mb-3');
        const submitButton = this.el.nativeElement.querySelector('button[type="submit"]');
        let parentForm = submitButton;
        while (parentForm && parentForm.parentElement.tagName !== 'FORM') {
            parentForm = parentForm.parentElement;
        }

        this.inputLabel = this.renderer.createElement('label');
        if (this.captchaLabelClasses) {
            const trimmedClasses = this.captchaLabelClasses.trim(); // Trim the string
            const classesArray = trimmedClasses.split(' '); // Split by space
            classesArray.forEach(className => {
                this.inputLabel.classList.add(className);
            });
        }
        this.inputLabel.textContent = this.label;
        const asteriskSpan = this.renderer.createElement('span');
        this.renderer.addClass(asteriskSpan, 'text-danger');
        this.renderer.appendChild(asteriskSpan, this.renderer.createText(' *'));
        this.renderer.appendChild(this.inputLabel, asteriskSpan);
        this.inputElement = this.renderer.createElement('input');
        const inputElement = this.inputElement;
        this.captchaControl = this.inputElement;
        this.renderer.listen(inputElement, 'input', (e) => {
            const captchaControl = formGroup.get('captcha');
            if (captchaControl && inputElement.value !== this.captchaValue) {
                captchaControl.setErrors({ 'invalid': true });
                const validatorFn: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
                    const captchaValue = control.value;
                    return captchaValue === this.captchaValue ? null : { 'captchaMismatch': true };
                };
                this.captchaFormControl.setValidators([
                    Validators.required,
                    Validators.minLength(this.character || 5),
                    Validators.maxLength(this.character || 5),
                    validatorFn
                ]);
                errorMessageDiv.style.display = 'block';
                this.renderer.addClass(inputElement, 'border-danger');
            } else {
                captchaControl.updateValueAndValidity();
                captchaControl.setErrors({ 'invalid': false });
                captchaControl.setErrors({ 'required': false });
                errorMessageDiv.style.display = 'none';
                this.renderer.removeClass(this.inputLabel, 'text-danger');
                this.renderer.removeClass(inputElement, 'border-danger');
                delete captchaControl.errors['invalid'];
                if (Object.keys(captchaControl.errors).length === 0) {
                    captchaControl.updateValueAndValidity();
                }
            }
        });
        this.renderer.setAttribute(inputElement, 'type', 'text');
        this.renderer.setAttribute(inputElement, 'placeholder', this.placeholder);
        this.renderer.setAttribute(inputElement, 'formControlName', 'captcha');
        inputElement.classList.add('form-control');

        const errorMessageDiv = this.renderer.createElement('div');
        this.errorLabel = errorMessageDiv;
        errorMessageDiv.style.position = 'absolute';
        errorMessageDiv.style.top = '100%';
        errorMessageDiv.classList.add('text-danger');
        errorMessageDiv.innerHTML = '<small>Captcha is not valid</small>';
        errorMessageDiv.style.display = 'none';
        inputElement.addEventListener('input', (event: Event) => {
            const input = event.target as HTMLInputElement;
            const newValue = input.value;
            const captchaControl = formGroup.get('captcha');
            if (captchaControl) {
                captchaControl.setValue(newValue);
            } else {
                captchaControl.setErrors({ 'required': true });
            }
        });
        form.addEventListener('submit', (event: Event) => {
            const captchaControl = formGroup.get('captcha');
            if (captchaControl) {
                const captchaInputValue = captchaControl.value;
                if (captchaInputValue === this.captchaValue) {
                    errorMessageDiv.style.display = 'none';
                    this.renderer.removeClass(this.inputLabel, 'text-danger');
                    this.renderer.removeClass(inputElement, 'border-danger');
                    if (!formGroup.valid) {
                        this.resetCaptcha();
                    }
                } else {
                    captchaControl.setErrors({ 'invalid': true });
                    errorMessageDiv.style.display = 'block';
                    this.resetCaptcha();
                }
            }
            event.preventDefault();
        });

        const canvasElement = this.canvasElement;
        const refreshButton = this.renderer.createElement('button');
        this.renderer.setAttribute(refreshButton, 'type', 'button');
        refreshButton.classList.add('btn', 'btn-secondary');
        const buttonIcon = this.renderer.createElement('i');
        buttonIcon.classList.add('fa', 'fa-refresh');
        this.renderer.appendChild(refreshButton, buttonIcon);
        this.renderer.listen(refreshButton, 'click', (event: Event) => {
            event.preventDefault();
            this.resetCaptcha();
        });

        const captchaControl = this.renderer.createElement('div');
        captchaControl.classList.add('d-flex', 'align-items-center', 'justify-content-center');


        let captchaInputElement = form.querySelector('.captcha-input');
        let captchaLabelElement = form.querySelector('.captcha-label');
        if (this.captchaStyle === 'floating') {
            const formFloatingDiv = this.renderer.createElement('div');
            formFloatingDiv.classList.add('form-floating');
            this.renderer.appendChild(formFloatingDiv, inputElement);
            this.renderer.appendChild(formFloatingDiv, this.inputLabel);
            this.renderer.appendChild(captchaContainer, formFloatingDiv);
        } else {
            // Add input and label directly to the captchaContainer for the default style
            if (captchaLabelElement) {
                this.renderer.appendChild(captchaLabelElement, this.inputLabel);
            } else {
                this.renderer.appendChild(captchaContainer, this.inputLabel);
            }
            if (captchaInputElement) {
                this.renderer.appendChild(captchaInputElement, captchaControl);
                this.renderer.appendChild(captchaControl, inputElement);
                this.renderer.appendChild(captchaControl, canvasElement);
                this.renderer.addClass(canvasElement, 'mx-3')
                this.renderer.addClass(canvasElement, 'border-dark')
                this.renderer.addClass(canvasElement, 'rounded')
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
            this.renderer.addClass(errorMessageDiv, 'position-absolute');
            this.renderer.addClass(errorMessageDiv, 'top-100');
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
    }
    ngOnInit() { }
    private generateCaptcha(canvas: HTMLCanvasElement) {
        if (this.inputLabel) {
            this.renderer.removeClass(this.inputLabel, 'text-danger');
        }

        if (this.inputElement) {
            this.renderer.removeClass(this.inputElement, 'border-danger');
        }

        if (this.errorLabel) {
            this.errorLabel.style.display = 'none';
        }
        const character: number = this.character || 5;
        canvas.height = 35;
        canvas.width = character * 23;
        const context = canvas.getContext('2d');
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            // context.fillStyle = '#F5F5F5';
            // context.fillRect(0, 0, canvas.width, canvas.height);
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz@#$';
            let captchaText = '';
            const angleMin = -45;
            const angleMax = 45;
            const angleRange = angleMax - angleMin;
            const fontSizeMin = 15;
            const fontSizeMax = 20;
            const fontSizeRange = fontSizeMax - fontSizeMin;

            for (let i = 0; i < character; i++) {
                const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
                captchaText += randomChar;

                // Set random font size and color
                context.font = `${fontSizeMin + Math.random() * fontSizeRange}px Arial`;
                context.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

                // Set text shadow properties
                // context.shadowColor = 'black'; // Shadow color
                // context.shadowBlur = 3; // Shadow blur radius
                // context.shadowOffsetX = 1; // Horizontal shadow offset
                // context.shadowOffsetY = 1; // Vertical shadow offset

                // Set text rendering properties
                context.textAlign = 'center';
                context.textBaseline = 'middle';

                const angle = angleMin + Math.random() * angleRange;

                // Translate, rotate, and draw text
                context.translate(20 + i * 20, canvas.height / 2);
                context.rotate(angle * (Math.PI / 180));
                context.fillText(randomChar, 0, 0);
                context.rotate(-angle * (Math.PI / 180));
                context.translate(-(20 + i * 20), -canvas.height / 2);

                // Reset shadow properties for next character
                context.shadowColor = 'transparent';
                context.shadowBlur = 0;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
            }

            this.captchaValue = captchaText;
            sessionStorage.setItem('captchaCode', this.captchaValue);
        }
    }

    private resetCaptcha() {
        let formGroup = this.formGroupDirective.form;
        this.inputElement.value = '';
        const captchaControl = formGroup.get('captcha');
        this.captchaFormControl.setValue('', { emitEvent: false });
        const validatorFn: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
            const captchaValue = control.value;
            return captchaValue === this.captchaValue ? null : { 'captchaMismatch': true };
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
}
