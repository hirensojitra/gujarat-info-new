import { Component, OnDestroy, OnInit } from '@angular/core';
import { PosterPage } from '../../interfaces/poster.model';
import { Subscription } from 'rxjs';
import { PosterService } from '../../services/poster';

@Component({
  selector: 'app-page-sidebar',
  templateUrl: './page-sidebar.component.html',
  styleUrl: './page-sidebar.component.scss',
})
export class PageSidebarComponent implements OnInit, OnDestroy {
  pages: PosterPage[] = [];
  currentPageId: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private posterService: PosterService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.posterService.project$.subscribe((project) => {
        if (project) {
          this.pages = project.pages;
          this.currentPageId = project.currentPageId;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addPage(): void {
    const pageNumber = this.pages.length + 1;
    this.posterService.addPage(`Page ${pageNumber}`, 800, 600);
  }

  selectPage(pageId: string): void {
    this.posterService.setCurrentPage(pageId);
  }

  duplicatePage(pageId: string): void {
    const page = this.pages.find((p) => p.id === pageId);
    if (page) {
      const newPageName = `${page.name} Copy`;
      this.posterService.addPage(newPageName, page.width, page.height);
    }
  }

  renamePage(pageId: string): void {
    const page = this.pages.find((p) => p.id === pageId);
    if (page) {
      const newName = prompt('Enter new page name:', page.name);
      if (newName && newName.trim()) {
        page.name = newName.trim();
      }
    }
  }

  deletePage(pageId: string): void {
    if (this.pages.length > 1) {
      const confirmed = confirm('Are you sure you want to delete this page?');
      if (confirmed) {
        this.posterService.deletePage(pageId);
      }
    }
  }
}
