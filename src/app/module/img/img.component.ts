import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageApiService } from '../../common/services/image-api.service';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../common/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
declare const bootstrap: any;

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, AfterViewInit {
  folders: any[] = [];
  images: any[] = [];
  selectedFile: File | null = null;
  selectedFolderId: number | null = null;
  selectedFolderName: string = '';
  apiUrl = environment.MasterApi;

  addFolderForm: FormGroup;
  renameFolderForm: FormGroup;

  confirmationMessage: string = '';
  confirmationTitle: string = '';

  // Image pagination properties
  imagePage: number = 1;
  imageLimit: number = 10;
  totalImagePages: number = 1;

  // Folder pagination properties
  folderPage: number = 1;
  folderItems: number = 0;
  folderLimit: number = 30;
  searchFolder: string = '';
  sortFolderBy: string;
  sortFolderOrder: string;

  async onFolderPageChange(pageIndex: number): Promise<void> {
    if (this.folderPage !== pageIndex) {
      this.folderPage = pageIndex;
      this.fetchFolders()
    }
  }
  async onFolderPageSizeChange(newSize: number): Promise<void> {
    if (this.folderLimit !== newSize) {
      this.folderLimit = newSize;
      this.folderPage = 1;
      this.fetchFolders();
    }
  }
  constructor(
    private imageService: ImageApiService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForms();
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const folderId = params['folder'];
      if (folderId) {
        this.fetchImages(folderId);
      }
    });
  }
  async ngAfterViewInit() {
    await this.loadFolderCount();
    await this.fetchFolders();
  }

  // Initialize form groups
  private initializeForms(): void {
    this.addFolderForm = this.formBuilder.group({
      folderName: ['', Validators.required]
    });

    this.renameFolderForm = this.formBuilder.group({
      folderName: ['', Validators.required]
    });
  }

  fetchFolders(): void {
    const searchTerm = this.searchFolder.trim(); // Assuming you have a search term bound to a component variable
    const sortBy = this.sortFolderBy || 'created_at';  // Default sort field
    const sortOrder = this.sortFolderOrder || 'asc';   // Default sort order

    this.folderLimit && this.imageService.getFolders(this.folderPage, this.folderLimit, searchTerm, sortBy, sortOrder).subscribe({
      next: (data: any) => {
        this.folders = data.folders;
      },
      error: () => {
        this.toast.show('Error fetching folders!', { class: 'bg-danger' });
      }
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      if (this.selectedFolderId) this.uploadImage(this.selectedFolderId);
    }
  }

  uploadImage(folderId: number): void {
    if (this.selectedFile && folderId) {
      const metadata = { description: 'Sample Image' };
      this.imageService.uploadImage(folderId, this.selectedFile, metadata).subscribe({
        next: () => { this.fetchImages(folderId); this.loadFolderCount() },
        error: () => this.toast.show('Error uploading image!', { class: 'bg-danger' })
      });
    }
  }

  fetchImages(folderId: number, page: number = 1, limit: number = 10): void {
    this.imageService.getImagesInFolder(folderId, page, limit).subscribe({
      next: (data: any) => {
        this.images = data.images;
        this.selectedFolderId = folderId;
        this.selectedFolderName = this.folders.find(folder => folder.id === folderId)?.name || '';

        // Update the URL with folder ID as a query parameter
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { folder: folderId },
          queryParamsHandling: 'merge', // To preserve other query params if any
        });
      },
      error: () => {
        this.toast.show('Error fetching images!', { class: 'bg-danger' });
      }
    });
  }

  deleteImage(folderId: number, imageId: number): void {
    this.imageService.deleteImage(folderId, imageId).subscribe({
      next: () => { this.fetchImages(folderId); },
      error: () => this.toast.show('Error deleting image!', { class: 'bg-danger' })
    });
  }

  // Bootstrap modals handling
  openAddFolderModal(): void {
    const addFolderModal = new bootstrap.Modal(document.getElementById('addFolderModal'));
    addFolderModal.show();
  }

  openRenameFolderModal(folderId: number): void {
    const folder = this.folders.find(f => f.id === folderId);
    if (folder) {
      this.selectedFolderId = folderId;
      this.renameFolderForm.patchValue({ folderName: folder.name });
      this.fetchImages(folderId);
      const renameFolderModal = new bootstrap.Modal(document.getElementById('renameFolderModal'));
      renameFolderModal.show();
    }
  }

  addFolder(): void {
    if (this.addFolderForm.valid) {
      const folderName = this.addFolderForm.value.folderName;
      this.imageService.createFolder(folderName).subscribe({
        next: () => {
          this.fetchFolders();
          this.addFolderForm.reset();
          bootstrap.Modal.getInstance(document.getElementById('addFolderModal')).hide();
          this.toast.show('Folder created successfully!', { class: 'bg-success' });
          this.loadFolderCount();
        },
        error: () => {
          this.toast.show('Error creating folder!', { class: 'bg-danger' });
        }
      });
    }
  }

  renameFolder(): void {
    if (this.renameFolderForm.valid) {
      const folderName = this.renameFolderForm.value.folderName;
      this.imageService.renameFolder(this.selectedFolderId, folderName).subscribe({
        next: () => {
          this.fetchFolders();
          this.toast.show('Folder renamed successfully!', { class: 'bg-success' });
          bootstrap.Modal.getInstance(document.getElementById('renameFolderModal')).hide();
        },
        error: () => {
          this.toast.show('Error renaming folder!', { class: 'bg-danger' });
        }
      });
    }
  }

  deleteFolder(): void {
    if (this.selectedFolderId !== null) {
      this.imageService.deleteFolder(this.selectedFolderId).subscribe({
        next: () => {
          this.toast.show('Folder deleted successfully!', { class: 'bg-success' });
          this.selectedFolderId = null;
          this.fetchFolders();
        },
        error: () => {
          this.toast.show('Error deleting folder!', { class: 'bg-danger' });
          this.selectedFolderId = null;
        }
      });
    }
  }

  copyHrefToClipboard(event: MouseEvent, href: string): void {
    event.preventDefault();
    const el = this.renderer.createElement('textarea');
    el.value = `${this.apiUrl}/img${href}`;
    this.renderer.appendChild(this.elementRef.nativeElement, el);
    el.select();
    document.execCommand('copy');
    this.renderer.removeChild(this.elementRef.nativeElement, el);
    this.toast.show("Image File path copied to clipboard", { title: 'Copy Successed', class: 'bg-success' });

  }

  refreshImage(imageId: number, folderId: number): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const formData = new FormData();
        formData.append('image', input.files[0]);

        this.imageService.refreshImage(folderId, imageId, formData).subscribe({
          next: () => {
            this.fetchImages(this.selectedFolderId);
            this.toast.show('Image replaced successfully!', { class: 'bg-success' });
          },
          error: () => {
            this.toast.show('Error replacing image!', { class: 'bg-danger' });
          }
        });
      }
    };

    fileInput.click(); // Open file dialog
  }

  openFolderDeleteModal(folderId: number, folderName: string): void {
    this.selectedFolderId = folderId;
    this.selectedFolderName = folderName;
    this.confirmationTitle = 'Confirm Folder Deletion';
    this.confirmationMessage = `Are you sure you want to delete the folder "${folderName}"? This action cannot be undone.`;
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    modal.show();
  }
  getImagePath(image: any): string {
    const parts = image.image_url.split('/');
    parts.pop();
    const basePath = parts.join('/');
    return `${basePath}/${image.id}`;
  }
  loadFolderCount(search: string = ''): void {
    this.imageService.getTotalFolderCount(search).subscribe({
      next: (response) => {
        // Ensure response is valid before using it
        if (response && typeof response.count === 'number') {
          this.folderItems = response.count;

        } else {
          console.warn('Unexpected response structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching folder count:', error);
      },
      complete: () => {
        console.log('Folder count request completed.');
      }
    });
  }
  loadImageCount(folderId: string): void {
    this.imageService.getTotalImageCount(folderId).subscribe(
      (response) => {
        this.totalImagePages = response.count;
      },
      (error) => {
        console.error('Error fetching image count', error);
      }
    );
  }
}
