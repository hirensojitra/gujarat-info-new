import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ThemeSwitchPipe } from '../pipes/theme-switch.pipe';
import { SchemaService } from '../services/schema.service';

@Directive({
  selector: 'input[type=date]',
  providers: [ThemeSwitchPipe]
})
export class DateFormatDirective implements AfterViewInit {
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
      'DD/MM/YYYY',
      'DD-MM-YYYY',
      'MM/DD/YYYY',
      'MM-DD-YYYY',
      'YYYY-MM-DD',
      'MMMM DD, YYYY'
    ];
  }

  ngAfterViewInit(): void {
    this.bgClass = this.themeSwitchPipe.transform('bg-light');
    this.schemaService.getCurrentThemeObservable().subscribe(() => {
      this.bgClass = this.themeSwitchPipe.transform('bg-light');
      this.formatDate(this.currentDate);
    });
    this.formatDate(null);
    if (this.ngControl?.control.value) {
      this.formatDate(new Date(this.ngControl?.control.value));
    }
  }

  @HostListener('focus', ['$event.target.value'])
  @HostListener('blur', ['$event.target.value'])
  onFocus(value: string) {
    this.formatDate(new Date(value));
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.currentDate = new Date(value);
    this.formatDate(new Date(value));
  }

  @HostListener('window:resize')
  onResize() {
    this.formatDate(this.currentDate);
  }

  private formatDate(date: Date) {
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
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        let textNode = this.renderer.createText(`${formattedDay}/${formattedMonth}/${year}`);

        switch (this.format) {
          case 'DD/MM/YYYY':
            textNode = this.renderer.createText(`${formattedDay}/${formattedMonth}/${year}`);
            break;
          case 'DD-MM-YYYY':
            textNode = this.renderer.createText(`${formattedDay}-${formattedMonth}-${year}`);
            break;
          case 'MM/DD/YYYY':
            textNode = this.renderer.createText(`${formattedMonth}/${formattedDay}/${year}`);
            break
          case 'MM-DD-YYYY':
            textNode = this.renderer.createText(`${formattedMonth}-${formattedDay}-${year}`);
            break
          case 'YYYY-MM-DD':
            textNode = this.renderer.createText(`${year}-${formattedMonth}-${formattedDay}`);
            break
          case 'MMMM DD, YYYY':
            textNode = this.renderer.createText(`${this.getMonthName(month)} ${formattedDay}, ${year}`);
            break
          // Add more cases for other formats as needed
          default:
            textNode = this.renderer.createText(`${formattedDay}/${formattedMonth}/${year}`);
            break
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
