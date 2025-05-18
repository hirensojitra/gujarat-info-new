import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { ImgService } from 'src/app/common/services/img.service';
import { RoleService } from 'src/app/common/services/role.service';
import {
  Folder,
  Image,
  UploadImageResponse,
} from 'src/app/graphql/types/img.types';
import { environment } from 'src/environments/environment';

interface UploadFile {
  name: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}
declare const bootstrap: any;
@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss'],
})
export class ImageManagerComponent implements OnInit {
  folders: Folder[] = [];
  images: Image[] = [];
  selectedFolder: Folder | null = null;
  role: string = '';
  search = '';
  sort = 'DESC';

  folderPage = 1;
  folderLimit = 9999;
  totalFolders = 0;

  imagePage = 1;
  imageLimit = 12;
  totalImages = 0;

  uploads: UploadFile[] = [];
  apiUrl = environment.MasterApi;

  loading = {
    folders: false,
    images: false,
    uploading: false,
  };

  constructor(
    private imgService: ImgService,
    private authService: AuthenticationService,
    private roleService: RoleService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.authService.getUser();
    if (!user) return;

    this.roleService.getRoles().subscribe((roles) => {
      const matched = roles.find((r) => r.id === user.role_id);
      this.role = matched?.code ?? 'VIEWER';
      this.loadInitialData();
    });
  }

  loadInitialData(): void {
    this.loading.folders = true;

    this.imgService
      .getFolders({
        page: 1,
        limit: this.folderLimit,
        search: this.search,
        sortBy: 'created_at',
        order: this.sort, // ensure consistency
      })
      .subscribe({
        next: (folderData) => {
          this.folders = folderData.folders;
          this.totalFolders = folderData.total;

          const firstFolder = this.folders.length > 0 ? this.folders[0] : null;
          this.selectedFolder = firstFolder;

          if (firstFolder) {
            this.imgService
              .getImagesInFolder(firstFolder.id, 1, this.imageLimit, '', 'DESC')
              .subscribe((res) => {
                this.images = res.images;
                this.totalImages = res.total;
                this.loading.folders = false;
              });
          } else {
            this.loading.folders = false;
          }
        },
        error: () => {
          this.loading.folders = false;
        },
      });
  }

  loadFolders(): void {
    this.imgService
      .getFolders({
        page: this.folderPage,
        limit: this.folderLimit,
        search: this.search,
        sortBy: 'created_at',
        order: this.sort,
      })
      .subscribe((data) => {
        this.folders = data.folders;
        this.totalFolders = data.total;
        if (this.folders.length > 0) {
          this.selectedFolder = this.folders[0];
          this.loadImages();
        }
      });
  }
  selectFolder(folder: Folder): void {
    if (!folder || folder.id === this.selectedFolder?.id) return;

    this.selectedFolder = folder;
    this.imagePage = 1;
    this.loadImages();
  }

  loadImages(): void {
    if (!this.selectedFolder) return;

    this.loading.images = true;
    this.imgService
      .getImagesInFolder(
        this.selectedFolder.id,
        this.imagePage,
        this.imageLimit,
        '',
        'DESC'
      )
      .subscribe({
        next: (res) => {
          this.images = res.images;
          this.totalImages = res.total;
          this.loading.images = false;
        },
        error: () => {
          this.loading.images = false;
        },
      });
  }

  onFolderPageChange(pageIndex: number): void {
    if (this.folderPage !== pageIndex) {
      this.folderPage = pageIndex;
      this.loadFolders();
    }
  }

  onFolderPageSizeChange(newSize: number): void {
    if (this.folderLimit !== newSize) {
      this.folderLimit = newSize;
      this.folderPage = 1;
      this.loadFolders();
    }
  }

  onImagePageChange(pageIndex: number): void {
    if (this.imagePage !== pageIndex) {
      this.imagePage = pageIndex;
      this.loadImages();
    }
  }

  onImagePageSizeChange(newSize: number): void {
    if (this.imageLimit !== newSize) {
      this.imageLimit = newSize;
      this.imagePage = 1;
      this.loadImages();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) this.uploadImages(Array.from(files));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.uploadImages(Array.from(event.dataTransfer.files));
    }
  }

  uploadImages(files: File[]) {
    if (!this.selectedFolder) return;
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['jpg', 'jpeg', 'png'].includes(ext || '')) {
        alert('Only JPG, JPEG, or PNG files are allowed.');
        continue;
      }

      const upload: UploadFile = {
        name: file.name,
        progress: 0,
        status: 'uploading',
      };
      this.uploads.push(upload);
      this.imgService
        .uploadImage(
          this.selectedFolder.id,
          file,
          JSON.stringify({ description: 'Sample Image' })
        )
        .subscribe({
          next: () => {
            upload.progress = 100;
            upload.status = 'completed';
            this.loadImages();
          },
          error: () => {
            upload.status = 'error';
          },
        });
    }
  }

  refreshImage(image: Image): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/jpeg,image/png,image/jpg';

    fileInput.onchange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];

        if (!this.selectedFolder) return;

        this.imgService
          .refreshImage(image.id, this.selectedFolder.id, file)
          .subscribe({
            next: () => this.loadImages(),
            error: (err) => {
              console.error('Error refreshing image:', err);
              alert('Failed to refresh image');
            },
          });
      }
    };

    fileInput.click();
  }

  deleteImage(image: Image): void {
    if (!this.selectedFolder) return;

    // Replace confirm with modal later
    const confirmed = confirm(`Are you sure you want to delete "${image.id}"?`);
    if (!confirmed) return;

    this.imgService.deleteImage(this.selectedFolder.id, image.id).subscribe({
      next: () => this.loadImages(),
      error: () => alert('Failed to delete the image.'),
    });
  }

  getImageUrl(image: Image): string {
    return `${image.image_url}`;
  }

  canUpload(): boolean {
    return this.role === 'OWNER' || this.role === 'ADMINISTRATOR';
  }

  canDelete(): boolean {
    return this.role === 'OWNER' || this.role === 'ADMINISTRATOR';
  }

  canView(): boolean {
    return this.role !== 'VIEWER';
  }
  modalTitle = '';
modalMessage = '';
pendingDeleteImage: Image | null = null;

openConfirmModal(image: Image): void {
  this.modalTitle = 'Confirm Delete';
  this.modalMessage = `Are you sure you want to delete "${image.id}"?`;
  this.pendingDeleteImage = image;
  const modal = new bootstrap.Modal(document.getElementById('confirmModal')!);
  modal.show();
}

confirmModal(): void {
  if (!this.selectedFolder || !this.pendingDeleteImage) return;
  this.imgService.deleteImage(this.selectedFolder.id, this.pendingDeleteImage.id).subscribe({
    next: () => this.loadImages(),
    error: () => alert('Failed to delete image.'),
  });
  this.pendingDeleteImage = null;
}
}
