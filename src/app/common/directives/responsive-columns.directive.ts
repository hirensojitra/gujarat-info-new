import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bootstrapColumns]'
})
export class ResponsiveColumnsDirective implements OnInit {
  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (!this.el.nativeElement.classList.contains('row')) {
      console.error('Element must have class "row"');
      return;
    }

    const classes = this.el.nativeElement.className.split(' ');
    const columnClasses: { [key: string]: string } = {};
    const devicePrefixes = ['desktop', 'laptop', 'pad', 'mobile'];
    const validNumbers = [1, 2, 3, 4, 6];
    let hasDeviceClass = false;

    classes.forEach(className => {
      devicePrefixes.forEach(prefix => {
        validNumbers.forEach(num => {
          if (className === `${prefix}-${num}`) {
            hasDeviceClass = true;
            switch (prefix) {
              case 'desktop':
                columnClasses['desktop'] = `col-xl-${12 / num}`;
                break;
              case 'laptop':
                columnClasses['laptop'] = `col-lg-${12 / num}`;
                break;
              case 'pad':
                columnClasses['pad'] = `col-md-${12 / num}`;
                break;
              case 'mobile':
                columnClasses['mobile'] = `col-${12 / num}`;
                break;
            }

            // Remove the matched class from the native element
            this.renderer.removeClass(this.el.nativeElement, className);
          }
        });
      });
    });

    const children = this.el.nativeElement.children;

    // Apply column classes to all children only if they don't already have a respective col- class
    if (children) {
      Array.from(children).forEach((child: HTMLElement) => {
        const childClasses = Array.from(child.classList);

        if (columnClasses['desktop'] && !childClasses.some(c => c.startsWith('col-xl-'))) {
          this.renderer.addClass(child, columnClasses['desktop']);
        }
        if (columnClasses['laptop'] && !childClasses.some(c => c.startsWith('col-lg-'))) {
          this.renderer.addClass(child, columnClasses['laptop']);
        }
        if (columnClasses['pad'] && !childClasses.some(c => c.startsWith('col-md-'))) {
          this.renderer.addClass(child, columnClasses['pad']);
        }
        if (columnClasses['mobile'] && !childClasses.some(c => /^col-\d+$/.test(c))) {
          this.renderer.addClass(child, columnClasses['mobile']);
        }
      });
    }

    // If none of the device classes are present, add default column class to each child
    if (!hasDeviceClass) {
      Array.from(children).forEach((child: HTMLElement) => {
        if (!Array.from(child.classList).some(c => /^col-/.test(c))) {
          this.renderer.addClass(child, 'col');
        }
      });
    }
  }
}
