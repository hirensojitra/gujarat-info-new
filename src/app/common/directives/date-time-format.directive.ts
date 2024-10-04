import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ThemeSwitchPipe } from '../pipes/theme-switch.pipe';
import { SchemaService } from '../services/schema.service';

@Directive({
  selector: 'input[type=datetime-local]',
  providers: [ThemeSwitchPipe]
})
export class DateTimeFormatDirective implements AfterViewInit {
  @Input() format: string;
  formatList: string[];
  bgClass: string = 'bg-light';
  currentDate: Date = new Date();
  
  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private ngControl: NgControl | null,
    private themeSwitchPipe: ThemeSwitchPipe,
    private schemaService: SchemaService
  ) {
    this.formatList = [
      'DD/MM/YYYY HH:mm',
      'DD-MM-YYYY HH:mm',
      'MM/DD/YYYY HH:mm',
      'MM-DD-YYYY HH:mm',
      'YYYY-MM-DDTHH:mm',
      'MMMM DD, YYYY HH:mm'
    ];
  }
  
  ngAfterViewInit(): void {
    this.bgClass = this.themeSwitchPipe.transform('bg-light');
    this.schemaService.getCurrentThemeObservable().subscribe(() => {
      this.bgClass = this.themeSwitchPipe.transform('bg-light');
      this.formatDateTime(this.currentDate);
    });
    this.formatDateTime(null);
    if (this.ngControl?.control.value) {
      this.formatDateTime(new Date(this.ngControl.control.value));
    }
  }
  
  @HostListener('focus', ['$event.target.value'])
  @HostListener('blur', ['$event.target.value'])
  onFocus(value: string) {
    this.formatDateTime(new Date(value));
  }
  
  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.currentDate = new Date(value);
    this.formatDateTime(new Date(value));
  }

  @HostListener('window:resize')
  onResize() {
    this.formatDateTime(this.currentDate);
  }
  
  private formatDateTime(date: Date) {
    if (!this.format) { return; }
    const validDate = date instanceof Date && !isNaN(date.getTime());
    this.renderer.setStyle(this.el.nativeElement, 'opacity', 0);
    const inputRect = this.el.nativeElement.getBoundingClientRect();
    let parent = this.el.nativeElement.parentElement;
    // while (parent && !parent.classList.contains('form-group')) {
    //   parent = parent.parentElement;
    // }
    const childElement = parent.querySelector('.form-control-clone');

    if (childElement) {
      parent.removeChild(childElement);
    }
    if (parent) {
      const parentRect = this.el.nativeElement.parentElement.getBoundingClientRect();
      this.renderer.addClass(parent, 'position-relative');
      const overlayDiv = this.renderer.createElement('div');
      overlayDiv.addEventListener('click', () => {
        this.el.nativeElement['showPicker']();
      });
      this.el.nativeElement.addEventListener('focus', () => {
        this.el.nativeElement['showPicker']();
      });
      this.renderer.setStyle(overlayDiv, 'position', 'absolute');
      this.renderer.setStyle(overlayDiv, 'top', inputRect.top - parentRect.top + 'px');
      this.renderer.setStyle(overlayDiv, 'left', inputRect.left - parentRect.left + 'px');
      this.renderer.setStyle(overlayDiv, 'width', inputRect.width + 'px');
      this.renderer.setStyle(overlayDiv, 'height', inputRect.height + 'px');
      this.renderer.addClass(overlayDiv, 'form-control-clone');
      this.renderer.addClass(overlayDiv, 'form-control');
      this.renderer.addClass(overlayDiv, 'align-items-center');
      this.renderer.addClass(overlayDiv, this.bgClass);
      this.renderer.addClass(overlayDiv, 'cursor-pointer');
      this.renderer.addClass(overlayDiv, 'd-flex');
      this.renderer.addClass(overlayDiv, 'rounded');
      this.renderer.addClass(overlayDiv, 'border');
      this.renderer.appendChild(parent, overlayDiv);
      const textNode = this.renderer.createText(this.format);
      this.renderer.appendChild(overlayDiv, textNode);
      if (validDate) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        let textNode = this.renderer.createText(`${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`);

        switch (this.format) {
          case 'DD/MM/YYYY HH:mm':
            textNode = this.renderer.createText(`${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`);
            break;
          case 'DD-MM-YYYY HH:mm':
            textNode = this.renderer.createText(`${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}`);
            break;
          case 'MM/DD/YYYY HH:mm':
            textNode = this.renderer.createText(`${formattedMonth}/${formattedDay}/${year} ${formattedHours}:${formattedMinutes}`);
            break;
          case 'MM-DD-YYYY HH:mm':
            textNode = this.renderer.createText(`${formattedMonth}-${formattedDay}-${year} ${formattedHours}:${formattedMinutes}`);
            break;
          case 'YYYY-MM-DDTHH:mm':
            textNode = this.renderer.createText(`${year}-${formattedMonth}-${formattedDay}T${formattedHours}:${formattedMinutes}`);
            break;
          case 'MMMM DD, YYYY HH:mm':
            textNode = this.renderer.createText(`${this.getMonthName(month)} ${formattedDay}, ${year} ${formattedHours}:${formattedMinutes}`);
            break;
          // Add more cases for other formats as needed
          default:
            textNode = this.renderer.createText(`${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`);
            break;
        }
        while (overlayDiv.firstChild) {
          overlayDiv.removeChild(overlayDiv.firstChild);
        }
        this.renderer.appendChild(overlayDiv, textNode);
      }

      const icon = this.renderer.createElement('i');
      this.renderer.addClass(icon, 'ms-auto');
      this.renderer.addClass(icon, 'fa');
      this.renderer.addClass(icon, 'fa-x-date-input');
      this.renderer.appendChild(overlayDiv, icon);
    }
  }
  
  getMonthName(month: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
  }
}
