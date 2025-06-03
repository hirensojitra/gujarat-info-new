import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { FileManagerService } from '../file-manager.service';
import { Folder, Image, UploadImageResponse } from 'src/app/graphql/types/img.types';
import { environment } from 'src/environments/environment';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-file-manager-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInStagger', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'scale(0.9)' }),
            stagger(100, [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'scale(1)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('matDrawer', { static: true }) matDrawer!: MatDrawer;
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;

  apiUrl = environment.MasterApi;
  folders: Folder[] = [];
  images: Image[] = [];
  selectedFolder: Folder | null = null;
  drawerMode: 'side' | 'over' = 'side';

  /** Track and unsubscribe from all observables on destroy */
  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _fileManagerService: FileManagerService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // 1) Adjust drawer mode based on screen size
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        // If on handset/tablet, we want the drawer in 'over' mode
        this.drawerMode = result.matches ? 'over' : 'side';
        this._cdr.markForCheck();
      });

    // 2) Subscribe to folders$ stream
    this._fileManagerService.folders$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((folders) => {
        this.folders = folders;
        this._cdr.markForCheck();
      });

    // 3) Subscribe to images$ stream
    this._fileManagerService.images$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((images) => {
        this.images = images;
        this._cdr.markForCheck();
      });

    // 4) Subscribe to selectedFolder$ stream
    this._fileManagerService.selectedFolder$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((folder) => {
        this.selectedFolder = folder;
        this._cdr.markForCheck();
      });

    // 5) Trigger initial load of all folders
    this._fileManagerService.loadFolders();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /** Called when user clicks on a folder card */
  onFolderSelect(folder: Folder): void {
    if (!folder || folder.id === this.selectedFolder?.id) {
      // If re‐clicking the same folder, do nothing
      return;
    }

    // 1) Update the service's selectedFolder$
    this._fileManagerService.setSelectedFolder(folder);

    // 2) Fetch images for that folder
    this._fileManagerService.loadImages(folder.id);

    // 3) Update the URL (optional, so "back" button works)
    this._router.navigate(['/file-manager/folders', folder.id]);
  }

  /** Called when user clicks on an image card */
  onFileDetails(file: Image): void {
    // 1) Open the side‐drawer, then navigate to the 'details' route
    this.matDrawer.open();
    this._router.navigate(['./details', file.id], { relativeTo: this._route });
  }

  /** Called when user clicks outside the drawer area (backdrop) */
  onBackdropClicked(): void {
    this._router.navigate(['./'], { relativeTo: this._route });
    this._cdr.markForCheck();
  }

  /** TrackBy function for ngFor on folder/image lists */
  trackById(index: number, item: Folder | Image): string {
    return item.id;
  }

  /**
   * Upload logic:
   * - Clicking the "Upload file" button calls onUploadClick()
   * - Then we trigger the hidden file‐input
   * - onFileSelected(...) is called whenever the user picks files
   */
  onUploadClick(): void {
    this.fileInput.nativeElement.value = ''; // reset in case user reselects same file
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || !this.selectedFolder) {
      return;
    }
    const files = Array.from(input.files);
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['jpg', 'jpeg', 'png'].includes(ext || '')) {
        // Only allow JPG / PNG
        window.alert('Only JPG, JPEG, or PNG files are allowed.');
        continue;
      }

      // 1) Call service.uploadFile(...)
      this._fileManagerService
        .uploadFile(this.selectedFolder.id, file)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (_res: UploadImageResponse) => {
            // After a successful upload, reload images for the folder
            if (this.selectedFolder) {
              this._fileManagerService.loadImages(this.selectedFolder.id);
            }
          },
          error: (err) => {
            console.error('Upload failed:', err);
            window.alert('Failed to upload ' + file.name);
          },
        });
    }
  }

  /** Drag‐over handler to allow drop events */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  /** Drop handler – uploads any dropped files */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (!event.dataTransfer || !event.dataTransfer.files || !this.selectedFolder) {
      return;
    }
    const files = Array.from(event.dataTransfer.files);
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['jpg', 'jpeg', 'png'].includes(ext || '')) {
        window.alert('Only JPG, JPEG, or PNG files are allowed.');
        continue;
      }
      this._fileManagerService
        .uploadFile(this.selectedFolder.id, file)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (_res) => {
            if (this.selectedFolder) {
              this._fileManagerService.loadImages(this.selectedFolder.id);
            }
          },
          error: (err) => {
            console.error('Upload (via drop) failed:', err);
            window.alert('Failed to upload ' + file.name);
          },
        });
    }
  }

  /** Replace (refresh) an existing image. Opens a mini file‐picker, then calls refreshFile(...) */
  refreshFile(image: Image): void {
    const fileInput = this.renderer.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/png, image/jpeg, image/jpg';

    fileInput.onchange = (evt: Event) => {
      const inputEl = evt.target as HTMLInputElement;
      if (!inputEl.files || inputEl.files.length === 0 || !this.selectedFolder) {
        return;
      }
      const file = inputEl.files[0];
      this._fileManagerService
        .refreshFile(image.id, this.selectedFolder.id, file)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (_res) => {
            // After a successful replacement, reload images
            if (this.selectedFolder) {
              this._fileManagerService.loadImages(this.selectedFolder.id);
            }
          },
          error: (err) => {
            console.error('Error refreshing file:', err);
            window.alert('Failed to replace the file.');
          },
        });
    };

    // Trigger the hidden input
    fileInput.click();
  }

  /** Delete an existing image (with a confirm prompt) */
  deleteFile(image: Image): void {
    if (!this.selectedFolder) {
      return;
    }
    const confirmed = window.confirm(
      `Are you sure you want to delete "${image.id}"?`
    );
    if (!confirmed) {
      return;
    }
    this._fileManagerService
      .deleteFile(this.selectedFolder.id, image.id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          // On success, reload the image list
          if (this.selectedFolder) {
            this._fileManagerService.loadImages(this.selectedFolder.id);
          }
        },
        error: (err) => {
          console.error('Failed to delete image:', err);
          window.alert('Error deleting image.');
        },
      });
  }

  /** Copy an image URL to the clipboard (same logic you already had) */
  copyHrefToClipboard(event: MouseEvent, image: Image): void {
    event.preventDefault();
    const el = this.renderer.createElement('textarea');
    el.value = environment.MasterApi + `/user-img/uploads/` + image.id;
    this.renderer.appendChild(this.elementRef.nativeElement, el);
    el.select();
    document.execCommand('copy');
    this.renderer.removeChild(this.elementRef.nativeElement, el);
    window.alert('Copied to clipboard: ' + el.value);
  }

  /** Delete a folder when the user clicks the "info" icon on a folder card */
  deleteFolder(folder: Folder, event: MouseEvent): void {
    event.stopPropagation(); // Prevent the folder card from also firing onFolderSelect(...)
    const confirmed = window.confirm(`Delete folder "${folder.name}"?`);
    if (!confirmed) {
      return;
    }
    this._fileManagerService
      .deleteFolder(folder.id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          // If we just deleted the folder that was selected, clear selection
          if (this.selectedFolder?.id === folder.id) {
            this._fileManagerService.setSelectedFolder(null);
            this.images = []; // clear images
          }
          // Reload the folder list
          this._fileManagerService.loadFolders();
        },
        error: (err) => {
          console.error('Failed to delete folder:', err);
          window.alert('Error deleting folder.');
        },
      });
  }

  /** (Optional) Create a new folder via prompt - if you want an inline prompt dialog */
  createFolder(): void {
    const name = window.prompt('Enter new folder name:');
    if (!name || !name.trim()) {
      return;
    }
    this._fileManagerService
      .createFolder(name.trim())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (_newFolder) => {
          // After creation, reload folder list and auto‐select the new one
          this._fileManagerService.loadFolders();
        },
        error: (err) => {
          console.error('Failed to create folder:', err);
          window.alert('Error creating folder.');
        },
      });
  }
  closeDrawer() {
    this.matDrawer.close();
    this._router.navigate(['/file-manager/folders', this.selectedFolder.id]);
  }
}
