// src/app/file-manager/details/details.component.ts

import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { FileManagerService } from '../file-manager.service';
import { Image } from 'src/app/graphql/types/img.types';
import { environment } from 'src/environments/environment';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  image: Image | null = null;
  apiUrl = environment.MasterApi;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private fileManagerService: FileManagerService,
    private listComponent: ListComponent,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id) {
          const images = this.fileManagerService.imagesSubject.getValue();
          this.image = images.find((img) => img.id === id) || null;
          this.cdr.markForCheck();
        }
      })
    );

    // Open the drawer on init
    this.listComponent.matDrawer.open();
  }

  loadImageDetails(id: string): void {
    const currentImages = this.fileManagerService.imagesSubject.getValue();
    const found = currentImages.find((img) => img.id === id);
    this.image = found || null;

    if (!this.image && this.fileManagerService.selectedFolder$) {
      const folder = this.fileManagerService.selectedFolderSubject.getValue();
      if (folder) {
        this.fileManagerService.loadImages(folder.id);
      }
    }
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  getImageUrl(): string {
    return `${this.apiUrl}/user-img/uploads/${this.image?.id}`;
  }

  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this.listComponent.matDrawer.close();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
