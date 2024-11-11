import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageApiService } from '../../common/services/image-api.service';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../common/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserImageApiService } from '../../common/services/user-image-api.service';
import { UserService } from '../../common/services/user.service';
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
  selectedFolderId: string | null = null;
  selectedFolderName: string = '';
  apiUrl = environment.MasterApi;

  addFolderForm: FormGroup;
  renameFolderForm: FormGroup;

  confirmationMessage: string = '';
  confirmationTitle: string = '';

  // Image pagination properties
  imagePage: number = 1;
  imageLimit: number = 32;
  totalImagePages: number = 1;

  // Folder pagination properties
  folderPage: number = 1;
  folderItems: number = 0;
  folderLimit: number = 8;
  searchFolder: string = '';
  sortFolderBy: string;
  sortFolderOrder: string;

  searchImage: string;
  sortImageBy: string;
  sortImageOrder: string;

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
    private route: ActivatedRoute,
    private userImageService: UserImageApiService,
    private userService: UserService
  ) {
    this.initializeForms();
  }

  async ngOnInit() {
    await this.userService.getUser().subscribe(async data => {
      if (this.userId !== data.id) {
        this.userId = data.id; await this.loadFolderCount();
        await this.fetchFolders();
      }
    });
    this.route.queryParams.subscribe(params => {
      const folderId = params['folder'];
      this.selectedFolderId = folderId;
      if (folderId) {
        this.fetchImages();
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
        this.folders.forEach((folder: any) => {
          this.loadImageCount(folder.id); // Call loadImageCount with folder id
        });
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

  uploadImage(folderId: string): void {
    if (this.selectedFile && folderId) {
      const metadata = { description: 'Sample Image' };
      this.imageService.uploadImage(folderId, this.selectedFile, metadata).subscribe({
        next: () => { this.fetchImages(); this.loadFolderCount() },
        error: () => this.toast.show('Error uploading image!', { class: 'bg-danger' })
      });
    }
  }

  fetchImages(): void {
    const searchTerm = this.searchImage?.trim() || ''; // Similar to folder search term
    const sortBy = this.sortImageBy || 'created_at'; // Default to sorting by created_at
    const sortOrder = this.sortImageOrder || 'asc'; // Default sort order is ascending
    const actualFolderId = this.selectedFolderId || ''; // Use selected folderId or empty for root
    actualFolderId && this.imageLimit && this.imageService.getImagesInFolder(actualFolderId, this.imagePage, this.imageLimit, searchTerm, sortBy, sortOrder).subscribe({
      next: (data: any) => {
        this.images = data.images || [];
        this.selectedFolderId = actualFolderId;
        this.selectedFolderName = this.folders.find(folder => folder.id === actualFolderId)?.name || 'All Images';
        this.loadImageCount(actualFolderId);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { folder: actualFolderId || null, page: this.imagePage, limit: this.imageLimit },
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      },
      error: () => {
        this.toast.show('Error fetching images!', { class: 'bg-danger' });
      }
    });
  }
  userId: string

  deleteImage(folderId: string, imageId: number): void {
    this.userImageService.deleteImage(this.userId, folderId, imageId).subscribe({
      next: () => { this.fetchImages(); },
      error: () => this.toast.show('Error deleting image!', { class: 'bg-danger' })
    });
  }
  // Bootstrap modals handling
  openAddFolderModal(): void {
    const addFolderModal = new bootstrap.Modal(document.getElementById('addFolderModal'));
    addFolderModal.show();
  }

  openRenameFolderModal(folderId: string): void {
    const folder = this.folders.find(f => f.id === folderId);
    if (folder) {
      this.selectedFolderId = folderId;
      this.renameFolderForm.patchValue({ folderName: folder.name });
      this.fetchImages();
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

  refreshImage(imageId: string, folderId: string): void {
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
            this.fetchImages();
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

  openFolderDeleteModal(folderId: string, folderName: string): void {
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

      }
    });
  }
  imageCounts: { [key: string]: number } = {};
  async loadImageCount(folderId: string): Promise<void> {
    try {
      const response = await this.userImageService.getTotalImageCount(folderId).toPromise();
      this.imageCounts[folderId] = response.totalCount;
    } catch (error) {
      console.error('Error fetching image count', error);
      this.imageCounts[folderId] = 0; // Fallback in case of error
    }
  }
  async onImagePageChange(pageIndex: number): Promise<void> {
    if (this.imagePage !== pageIndex) {
      this.imagePage = pageIndex;
      this.fetchImages();
    }
  }
  async onImagePageSizeChange(newSize: number): Promise<void> {
    if (this.imageLimit !== newSize) {
      this.imageLimit = newSize;
      this.imagePage = 1;
      this.fetchImages();
    }
  }
}
