// src/app/module/latest/latest.component.ts

import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/common/services/auth.service';
import { ColorService } from 'src/app/common/services/color.service';
import { NewPostDetailService } from 'src/app/common/services/new-post-detail.service';
import { PostDetails } from 'src/app/graphql/types/post-detail.types';
import { environment } from 'src/environments/environment';
declare const Masonry: any;

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrl: './latest.component.scss',
})
export class LatestComponent implements OnInit, AfterViewInit, OnDestroy {
  /** now holds only the minimal shape + image */
  posts: Array<Partial<PostDetails>> = [];

  currentPage = 1;
  limit = 10;
  search = '';
  sortBy = 'created_at';
  order = 'desc';
  pagination = { totalPosts: 0, currentPage: 1, totalPages: 0 };

  loading = false;
  progress = 0;
  isBrowser: boolean;

  private routeSub!: Subscription;
  private masonryInstance: any;

  @ViewChild('masonryGrid', { static: false }) masonryGridRef!: ElementRef;
  imgUrl = environment.MasterApi + '/thumb-images/';

  constructor(
    private postService: NewPostDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private colorService: ColorService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = +params['page'] || this.currentPage;
      this.limit = +params['limit'] || this.limit;
      this.search = params['search'] ?? this.search;
      this.sortBy = params['sortBy'] ?? this.sortBy;
      this.order = params['order'] ?? this.order;
      this.loadPosts();
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initMasonry();
      window.addEventListener('resize', () => this.masonryInstance?.layout());
    }
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private initMasonry(): void {
    if (this.masonryGridRef && this.isBrowser) {
      this.masonryInstance = new Masonry(this.masonryGridRef.nativeElement, {
        itemSelector: '.masonry-box',
        percentPosition: true,
      });
    }
  }

  private loadPosts(): void {
    this.loading = true;
    this.progress = 0;

    this.postService
      .getMinimalPosts({
        page: this.currentPage,
        limit: this.limit,
        search: this.search,
        sortBy: this.sortBy,
        order: this.order,
        published: true,
        info_show: true,
      })
      .subscribe((resp) => {
        const total = resp.posts.length;
        let count = 0;

        // for each minimal post, fetch the thumbnail and update progress
        const tasks = resp.posts.map((post) =>
          this.toDataURI(this.imgUrl + post.id!).then((uri) => {
            count++;
            this.progress = Math.round((count / total) * 100);
            this.cdr.detectChanges();
            // return a fresh object with image
            return { ...post, image: uri } as Partial<PostDetails>;
          })
        );

        Promise.all(tasks).then((newPosts) => {
          this.posts = newPosts;
          this.pagination = resp.pagination;
          this.loading = false;
          this.progress = 100;
          this.cdr.detectChanges();
          this.initMasonry();
        });
      });
  }

  private toDataURI(url: string): Promise<string> {
    if (!this.isBrowser) return Promise.resolve(url);
    return fetch(url, { mode: 'cors' })
      .then((r) => r.blob())
      .then(
        (blob) =>
          new Promise<string>((res, rej) => {
            const reader = new FileReader();
            reader.onloadend = () => res(reader.result as string);
            reader.onerror = rej;
            reader.readAsDataURL(blob);
          })
      )
      .catch((err) => {
        console.error('convertImage error', err);
        return '';
      });
  }

  changePage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.updateUrl();
    }
  }

  changePageSize(newLimit: number): void {
    if (newLimit !== this.limit) {
      this.limit = newLimit;
      this.currentPage = 1;
      this.updateUrl();
    }
  }

  private updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.currentPage,
        limit: this.limit,
        search: this.search,
        sortBy: this.sortBy,
        order: this.order,
      },
      queryParamsHandling: 'merge',
    });
  }

  isAdmin(): boolean {
    return this.authService.hasRole(['admin', 'master']);
  }

  onSvgLoad(post: Partial<PostDetails>, ev?: Event): void {
    if (!this.isBrowser) return;
    window.dispatchEvent(new Event('resize'));
    const parent = (ev?.target as any)?.parentElement;
    if (parent && post.image) {
      this.colorService
        .getColors(post.image, 5)
        .then((cols) => {
          if (cols.length >= 3) {
            parent.style.backgroundColor = cols[4] || '';
            parent.style.color = cols[2];
            parent
              .querySelectorAll('img')
              .forEach(
                (img: any) => (img.style.boxShadow = `0 0.5rem 1rem ${cols[2]}`)
              );
          }
        })
        .catch(console.error);
    }
  }

  async getColors(image: string, count: number) {
    try {
      return await this.colorService.getColors(image, count);
    } catch {
      return [];
    }
  }
}
