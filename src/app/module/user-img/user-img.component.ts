import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserImageApiService } from '../../common/services/user-image-api.service';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../common/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../common/services/user.service';
declare const bootstrap: any;

@Component({
  selector: 'app-user-img',
  templateUrl: './user-img.component.html',
  styleUrls: ['./user-img.component.scss']
})
export class UserImgComponent implements OnInit, AfterViewInit {
  userId = ''; // This would be dynamically assigned based on your authentication logic
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
  imageLimit: number = 10;
  imageItems: number = 0;
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
      this.fetchFolders();
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
    private userImageService: UserImageApiService, // Use the UserImageApiService
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.initializeForms();
  }

  async ngOnInit() {

  }

  async ngAfterViewInit() {
    await this.userService.getUser().subscribe(async data => {
      if (this.userId !== data.id) {
        this.userId = data.id; await this.loadFolderCount();
        await this.fetchFolders();
      }
    });
    this.route.queryParams.subscribe(params => {
      const folderId = params['folder'];
      if (folderId) {
        this.fetchImages(folderId);
      }
    });
  }

  // Initialize form groups
  private initializeForms(): void {
    this.addFolderForm = this.formBuilder.group({
      folderName: ['', Validators.required]
    });

    this.renameFolderForm = this.formBuilder.group({
      folderName: ['', Validators.required],
      folderId: ['', Validators.required]
    });
  }

  fetchFolders(): void {
    const searchTerm = this.searchFolder.trim();
    const sortBy = this.sortFolderBy || 'created_at';
    const sortOrder = this.sortFolderOrder || 'asc';

    this.folderLimit && this.userImageService.getFolders(this.userId, this.folderPage, this.folderLimit, searchTerm, sortBy, sortOrder).subscribe({
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

  uploadImage(folderId: string): void {
    if (this.selectedFile && folderId) {
      const metadata = { description: 'Sample Image' };
      this.userImageService.uploadImage(this.userId, folderId, this.selectedFile, metadata).subscribe({
        next: () => { this.fetchImages(folderId); this.loadFolderCount(); },
        error: () => this.toast.show('Error uploading image!', { class: 'bg-danger' })
      });
    }
  }

  fetchImages(folderId: string, page: number = 1, limit: number = 10): void {
    this.userImageService.getImagesInFolder(this.userId, folderId, page, limit).subscribe({
      next: (data: any) => {
        this.images = data.images;
        this.selectedFolderId = folderId;
        this.selectedFolderName = this.folders.find(folder => folder.id === folderId)?.name || '';
        this.loadImageCount(folderId);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { folder: folderId },
          queryParamsHandling: 'merge',
        });
      },
      error: () => {
        this.toast.show('Error fetching images!', { class: 'bg-danger' });
      }
    });
  }

  deleteImage(folderId: string, imageId: number): void {
    this.userImageService.deleteImage(this.userId, folderId, imageId).subscribe({
      next: () => { this.fetchImages(folderId); },
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
      this.renameFolderForm.patchValue({ folderName: folder.name, folderId: folder.id });
      const renameFolderModal = new bootstrap.Modal(document.getElementById('renameFolderModal'));
      renameFolderModal.show();
    }
  }

  addFolder(): void {
    if (this.addFolderForm.valid) {
      const folderName = this.addFolderForm.value.folderName;
      this.userImageService.createFolder(this.userId, folderName).subscribe({
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
      const folderId = this.renameFolderForm.value.folderId;
      this.userImageService.renameFolder(folderId, folderName).subscribe({
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
      this.userImageService.deleteFolder(this.selectedFolderId).subscribe({
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
    el.value = `${this.apiUrl}/user-img${href}`;
    this.renderer.appendChild(this.elementRef.nativeElement, el);
    el.select();
    document.execCommand('copy');
    this.renderer.removeChild(this.elementRef.nativeElement, el);
    this.toast.show("Image File path copied to clipboard", { title: 'Copy Success', class: 'bg-success' });
  }

  refreshImage(imageId: number, folderId: string): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const formData = new FormData();
        formData.append('image', input.files[0]);

        this.userImageService.refreshImage(this.userId, folderId, imageId, formData).subscribe({
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
    this.userImageService.getTotalFolderCount(this.userId, search).subscribe({
      next: (response) => {
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
      if (!this.imageCounts[folderId]) {
        const response = await this.userImageService.getTotalImageCount(folderId).toPromise();
        this.imageCounts[folderId] = response.totalCount; // Store the count for the folder
      }
    } catch (error) {
      console.error('Error fetching image count', error);
      this.imageCounts[folderId] = 0; // Fallback in case of error
    }
  }

}
