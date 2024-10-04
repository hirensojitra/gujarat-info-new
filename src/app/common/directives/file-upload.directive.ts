// import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2, forwardRef } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// @Directive({
//   selector: '[fileUpload]',
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => FileUploadDirective),
//       multi: true
//     }
//   ]
// })
// export class FileUploadDirective implements ControlValueAccessor, AfterViewInit {
//   private onChange: (file: File) => void = () => { };
//   private onTouched: () => void = () => { };

//   constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

//   ngAfterViewInit(): void {
//     const button = this.elementRef.nativeElement.querySelector('button[type="button"]');
//     if (button) {
//       this.renderer.listen(button, 'click', () => {
//         const fileInput = this.elementRef.nativeElement.querySelector('input[type="file"]');
//         if (fileInput) {
//           fileInput.click();
//         }
//       });
//     }
//   }

//   @HostListener('change', ['$event.target.files'])
//   onChangeEvent(files: FileList) {
//     const file = files && files.length > 0 ? files[0] : null;
//     this.onChange(file);
//     const fileNameElement = this.elementRef.nativeElement.querySelector('.file-name');
//     if (fileNameElement) {
//       this.renderer.setProperty(fileNameElement, 'innerHTML', file ? file.name : '');
//     }
//   }

//   writeValue(value: any): void {
//     // Implement if needed
//   }

//   registerOnChange(fn: (file: File) => void): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: () => void): void {
//     this.onTouched = fn;
//   }
// }

import { AfterViewInit, Directive, ElementRef, Renderer2, forwardRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupDirective, FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[fileUpload]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadDirective),
      multi: true
    }
  ]
})
export class FileUploadDirective implements ControlValueAccessor, AfterViewInit, OnInit {
  @Input() formGroupName!: string;
  private onChange: (file: File | null) => void = () => {};
  private onTouched: () => void = () => {};
  private fileInput!: HTMLInputElement;
  private fileNameElement!: HTMLElement;
  
  constructor(private renderer: Renderer2, private elementRef: ElementRef, private formGroupDirective: FormGroupDirective) {}

  ngOnInit() {
    this.addFileFormControl();
  }

  ngAfterViewInit(): void {
    this.createUploadElements();
    this.listenForFormReset();
  }

  addFileFormControl(): void {
    const formGroup = this.formGroupDirective.form;
    const control = new FormControl('', Validators.required);
    formGroup.addControl('attachment', control);
  }

  createUploadElements(): void {
    const wrapper = this.renderer.createElement('div');
    this.renderer.addClass(wrapper, 'col-sm-9');
    this.renderer.addClass(wrapper, 'position-relative');
    this.renderer.addClass(wrapper, 'd-flex');
    this.renderer.addClass(wrapper, 'align-items-center');

    this.fileInput = this.renderer.createElement('input');
    this.renderer.setAttribute(this.fileInput, 'type', 'file');
    this.renderer.addClass(this.fileInput, 'd-none');
    this.renderer.addClass(this.fileInput, 'form-control');
    this.renderer.listen(this.fileInput, 'change', (event) => this.onFileSelected(event));
    
    const button = this.renderer.createElement('button');
    this.renderer.setAttribute(button, 'type', 'button');
    this.renderer.addClass(button, 'btn');
    this.renderer.addClass(button, 'btn-dark');
    this.renderer.listen(button, 'click', () => this.fileInput.click());
    const buttonText = this.renderer.createText('Upload File');
    this.renderer.appendChild(button, buttonText);

    this.fileNameElement = this.renderer.createElement('span');
    this.renderer.addClass(this.fileNameElement, 'ml-3');
    this.renderer.addClass(this.fileNameElement, 'ms-3');
    this.renderer.addClass(this.fileNameElement, 'fw-bold');
    this.renderer.addClass(this.fileNameElement, 'text-truncate');
    this.renderer.addClass(this.fileNameElement, 'file-name');

    this.renderer.appendChild(wrapper, this.fileInput);
    this.renderer.appendChild(wrapper, button);
    this.renderer.appendChild(wrapper, this.fileNameElement);

    this.renderer.appendChild(this.elementRef.nativeElement, wrapper);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;
    this.onChange(file);
    if (this.fileNameElement) {
      this.renderer.setProperty(this.fileNameElement, 'innerHTML', file ? file.name : '');
    }
  }

  @HostListener('resetFileInput')
  clear(): void {
    if (this.fileInput) {
      this.fileInput.value = '';
    }
    if (this.fileNameElement) {
      this.renderer.setProperty(this.fileNameElement, 'innerHTML', '');
    }
    this.onChange(null); // Notify form that the file is cleared
  }

  listenForFormReset(): void {
    const form = this.elementRef.nativeElement.closest('form');
    if (form) {
      this.renderer.listen(form, 'reset', () => this.clear());
    }
  }

  writeValue(value: any): void {
    // Implement if needed
  }

  registerOnChange(fn: (file: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
