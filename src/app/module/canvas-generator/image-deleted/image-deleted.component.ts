import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PostDetails } from 'src/app/common/interfaces/image-element';
import { PostDetailService } from 'src/app/common/services/post-detail.service';
import { ActivatedRoute, Router } from '@angular/router';

declare const bootstrap: any;
declare const Masonry: any;

@Component({
  selector: 'app-image-deleted',
  templateUrl: './image-deleted.component.html',
  styleUrls: ['./image-deleted.component.scss']
})
export class ImageDeletedComponent implements OnInit, AfterViewInit {

  posts: PostDetails[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  totalPosts: number = 0;
  limit: number = 12;
  isBrowser: boolean;
  window!: Window & typeof globalThis;

  confirmRecover: any;
  hardDeleteModal: any;
  selectedID: string | undefined;
  post_msg = 'Loading deleted posts';

  @ViewChild('masonryGrid', { static: false }) masonryGridRef!: ElementRef;
  private masonryInstance: any;

  constructor(
    private PS: PostDetailService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.window = window;

    // Initialize query parameters
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['page'] || 1;
      this.limit = +params['limit'] || this.limit;
      this.loadPosts();
    });

    // Initialize Bootstrap modals
    this.confirmRecover = new bootstrap.Modal(document.getElementById('confirmRecover')!, {});
    this.hardDeleteModal = new bootstrap.Modal(document.getElementById('hardDeleteModal')!, {});
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      window.addEventListener('resize', () => {
        if (this.masonryInstance) {
          this.masonryInstance.layout();
        }
      });
    }
  }

  loadPosts(): void {
    this.PS.getAllSoftDeletedPosts({
      page: this.currentPage,
      limit: this.limit
    }).subscribe(response => {
      this.posts = response.posts;
      this.totalPosts = response.pagination.totalPosts;
      this.totalPages = Math.ceil(this.totalPosts / this.limit);
      setTimeout(() => this.initializeMasonry(), 0);
      this.post_msg = 'No deleted posts available.';
    });
  }

  private initializeMasonry(): void {
    if (this.masonryGridRef) {
      this.masonryInstance = new Masonry(this.masonryGridRef.nativeElement, {
        itemSelector: '.col-lg-2',
        columnWidth: '.col-lg-2',
        percentPosition: true
      });
    }
  }

  selectRecoverId(id: any) {
    this.selectedID = id;
    id && this.confirmRecover.show();
  }

  selectDeleteId(id: any) {
    this.selectedID = id;
    id && this.hardDeleteModal.show();
  }

  recoverPost(): void {
    this.selectedID && this.PS.recoverPost(this.selectedID)
      .subscribe(() => {
        this.confirmRecover.hide();
        this.loadPosts();
      });
  }

  hardDelete(): void {
    this.selectedID && this.PS.hardDeletePost(this.selectedID)
      .subscribe(() => {
        this.hardDeleteModal.hide();
        this.loadPosts();
      });
  }

  onPageChange(pageNumber: number): void {
    if (this.currentPage !== pageNumber) {
      this.currentPage = pageNumber;
      this.updateUrlParams();
    }
  }

  changePage(newPage: number): void {
    if (this.currentPage != newPage) {
      this.currentPage = newPage;
      this.loadPosts();
    }
  }

  changePageSize(newSize: number): void {
    if (this.limit != newSize) {
      this.limit = newSize;
      this.currentPage = 1; // Reset to the first page
      this.loadPosts();
    }
  }

  getPaginationControls(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  updateUrlParams(): void {
    this.router.navigate([], {
      queryParams: { page: this.currentPage, limit: this.limit },
      queryParamsHandling: 'merge'
    });
  }
  onSvgLoad(): void {
    if (this.masonryInstance && this.isBrowser) {
      window.dispatchEvent(new Event('resize'));
    }
  }
}
