import { Directive, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Directive({
  selector: '[pagination]'
})
export class PaginationDirective implements OnInit, OnDestroy {
  private currentPageSubject = new BehaviorSubject<number>(1);
  private totalItemsSubject = new BehaviorSubject<number>(0);
  private subscriptions: Subscription[] = [];
  private selectChangeListeners: (() => void)[] = [];

  @Input() set currentPage(value: number) {
    this.currentPageSubject.next(value);
  }

  @Input() set totalItems(value: number) {
    this.totalItemsSubject.next(value);
  }

  @Output() currentPageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  @Input() pageSize: number | undefined;
  @Input() sticky: boolean | undefined;
  @Input() pageSizes: number[] = [10, 25, 50, 100];
  totalPages: number = 0;
  constructor(private renderer: Renderer2, private el: ElementRef) {
    if (this.pageSize === undefined) {
      this.pageSize = 10;
    } else {
      this.pageSize = this.getNearestPageSize(this.pageSize);
    }
  }

  async ngOnInit() {

    await this.totalItemsSubject.subscribe((value) => {
      this.updatePagination();
      this.pageSizeChange.emit(this.pageSize);
    })
    await this.currentPageSubject.subscribe((value) => {
      this.updatePagination();
      this.currentPageChange.emit(value);
    });
    if (this.pageSize === undefined) {
      this.pageSize = 10;
    } else {
      this.pageSize = this.getNearestPageSize(this.pageSize);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.selectChangeListeners.forEach(listener => listener());
  }
  getNearestPageSize(size: number): number {
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

  private updatePagination() {
    const currentPage = this.currentPageSubject.getValue();
    const totalItems = this.totalItemsSubject.getValue();
    this.totalPages = Math.ceil(totalItems / this.pageSize);
    const paginationContainer = this.el.nativeElement;
    this.renderer.setProperty(paginationContainer, 'innerHTML', '');
    this.renderer.addClass(paginationContainer, 'd-flex');
    this.renderer.addClass(paginationContainer, 'flex-wrap');
    this.renderer.addClass(paginationContainer, 'align-items-center');
    this.renderer.addClass(paginationContainer, 'justify-content-center');
    this.renderer.addClass(paginationContainer, 'my-3');
    this.sticky && this.renderer.addClass(paginationContainer, 'sticky-bottom');
    this.renderer.addClass(paginationContainer, 'bg-body');
    this.renderer.addClass(paginationContainer, 'p-2');
    const ul = this.renderer.createElement('ul');
    this.renderer.addClass(ul, 'pagination');
    this.renderer.addClass(ul, 'd-flex');
    this.renderer.addClass(ul, 'flex-wrap');
    this.renderer.addClass(ul, 'mx-0');
    this.renderer.addClass(ul, 'my-1');
    this.renderer.addClass(ul, 'align-items-stretch');

    const createPageItem = (page: number | string, iconClass: string = '', isDisabled: boolean, isActive: boolean) => {
      const li = this.renderer.createElement('li');
      this.renderer.addClass(li, 'page-item');
      if (isDisabled) this.renderer.addClass(li, 'disabled');
      const a = this.renderer.createElement('button');
      this.renderer.addClass(a, 'btn');
      this.renderer.addClass(a, isActive ? 'btn-dark' : isDisabled ? 'btn-flat' : 'btn-outline-dark');
      this.renderer.addClass(a, !isActive && isDisabled ? 'opacity-50' : 'opacity-1');
      this.renderer.addClass(a, !isActive && isDisabled ? 'pe-none' : isActive && isDisabled ? 'pe-none' : 'pe-auto');
      this.renderer.addClass(a, 'h-100');
      this.renderer.addClass(a, 'rounded-0');
      this.renderer.addClass(a, 'border-0');
      this.renderer.addClass(a, 'd-flex');
      this.renderer.addClass(a, 'align-items-center');
      switch (page) {
        case '<<':
          this.renderer.setAttribute(a, 'title', 'First Page');
          break;

        case '<':
          this.renderer.setAttribute(a, 'title', 'Previous Page');
          break;

        case '>':
          this.renderer.setAttribute(a, 'title', 'Next Page');
          break;

        case '>>':
          this.renderer.setAttribute(a, 'title', 'Last Page');
          break;

        case '...':
          false;
          break;

        default:
          this.renderer.setAttribute(a, 'title', 'Page ' + page);
          break;
      }
      this.renderer.listen(a, 'click', () => {
        if (!isDisabled && page !== '...') {
          if (page === '<<') {
            this.onPageChange(1);
          } else if (page === '<') {
            this.onPageChange(Math.max(currentPage - 1, 1));
          } else if (page === '>') {
            this.onPageChange(Math.min(currentPage + 1, this.totalPages));
          } else if (page === '>>') {
            this.onPageChange(this.totalPages);
          } else {
            this.onPageChange(Number(page));
          }
        }
      });

      if (iconClass) {
        const icon = this.renderer.createElement('i');
        const small = this.renderer.createElement('small');
        this.renderer.addClass(icon, 'fa');
        this.renderer.addClass(small, 'd-flex');
        this.renderer.addClass(small, 'align-items-center');
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

    // First page and Previous button with icons
    createPageItem('<<', 'fa-x-first', currentPage === 1, false);
    createPageItem('<', 'fa-x-previous', currentPage === 1, false);

    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, this.totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    if (startPage > 1) {
      createPageItem(1, '', currentPage === 1, false);
      if (startPage > 2) {
        createPageItem('...', '', true, false);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      createPageItem(i, '', i === currentPage, i === currentPage);
    }

    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        createPageItem('...', '', true, false);
      }
      createPageItem(this.totalPages, '', this.totalPages === currentPage, this.totalPages === currentPage);
      createPageItem('...', '', true, false);
    }

    // Next button and Last page with icons
    createPageItem('>', 'fa-x-next', this.totalPages === currentPage, false);
    createPageItem('>>', 'fa-x-last', this.totalPages === currentPage, false);

    this.renderer.appendChild(paginationContainer, ul);

    // Page size dropdown
    const dropdownDiv = this.renderer.createElement('div');
    this.renderer.addClass(dropdownDiv, 'pagination-page-size');
    this.renderer.addClass(dropdownDiv, 'd-flex');
    this.renderer.addClass(dropdownDiv, 'mx-3');
    this.renderer.addClass(dropdownDiv, 'my-1');
    this.renderer.addClass(dropdownDiv, 'w-auto');
    this.renderer.addClass(dropdownDiv, 'align-items-center');
    this.renderer.addClass(dropdownDiv, 'text-nowrap');

    const select = this.renderer.createElement('select');
    this.renderer.addClass(select, 'form-select');
    this.renderer.addClass(select, 'mx-2');
    this.renderer.addClass(select, 'w-65-px');
    this.pageSizes.forEach(size => {
      const option = this.renderer.createElement('option');
      this.renderer.setProperty(option, 'value', size);
      const optionText = this.renderer.createText(size.toString());
      this.renderer.appendChild(option, optionText);
      if (size === this.pageSize) {
        this.renderer.setAttribute(option, 'selected', 'true');
      }
      this.renderer.appendChild(select, option);
    });

    // Remove any previously attached change listeners
    this.selectChangeListeners.forEach(listener => listener());
    this.selectChangeListeners = [];

    const selectChangeListener = this.renderer.listen(select, 'change', (event) => {
      const newSize = parseInt((event.target as HTMLSelectElement).value, 10);
      this.onPageSizeChange(newSize);
    });

    // Store the new listener for future removal
    this.selectChangeListeners.push(selectChangeListener);


    this.renderer.appendChild(dropdownDiv, select);
    this.renderer.appendChild(paginationContainer, dropdownDiv);

    // Item range text
    const itemRangeText = this.renderer.createElement('span');
    this.renderer.addClass(itemRangeText, 'pagination-item-range');
    this.renderer.addClass(itemRangeText, 'ms-md-auto');
    this.renderer.addClass(itemRangeText, 'my-1');
    const startItem = totalItems ? ((currentPage - 1) * this.pageSize + 1) : 0;
    const endItem = Math.min(currentPage * this.pageSize, totalItems);
    const itemRangeTextContent = this.renderer.createText(`Showing ${startItem} - ${endItem} of ${totalItems} items`);
    this.renderer.appendChild(itemRangeText, itemRangeTextContent);
    this.renderer.appendChild(paginationContainer, itemRangeText);
  }

  private onPageChange(page: number) {
    this.currentPageSubject.next(page);
  }

  private onPageSizeChange(size: number) {
    this.pageSizeChange.emit(size);
    this.pageSize = size;
    this.currentPageSubject.next(1);
    this.updatePagination();
  }
}
