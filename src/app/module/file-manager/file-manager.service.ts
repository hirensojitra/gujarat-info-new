// src/app/file-manager/file-manager.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { Folder, Image } from 'src/app/graphql/types/img.types';
import {
  CreateFolderResponse,
  RenameFolderResponse,
  DeleteResponse,
  UploadImageResponse,
  RefreshImageResponse,
} from 'src/app/graphql/types/img.types';
import { ImgService } from 'src/app/common/services/img.service';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  // Internal BehaviorSubjects
  private _folders$ = new BehaviorSubject<Folder[]>([]);
  private _images$ = new BehaviorSubject<Image[]>([]);
  private _selectedFolder$ = new BehaviorSubject<Folder | null>(null);

  // Exposed as Observables
  readonly folders$ = this._folders$.asObservable();
  readonly images$ = this._images$.asObservable();
  readonly selectedFolder$ = this._selectedFolder$.asObservable();

  // Also expose the BehaviorSubjects directly (for getValue() access in other components)
  readonly foldersSubject = this._folders$;
  readonly imagesSubject = this._images$;
  readonly selectedFolderSubject = this._selectedFolder$;

  constructor(private imgService: ImgService) {}

  /**
   * Fetch all folders (with optional pagination/search).
   * After loading, update BehaviorSubjects. Then load images for the selected folder.
   */
  loadFolders(
    page: number = 1,
    limit: number = 9999,
    search: string = '',
    sortBy: string = 'created_at',
    order: 'ASC' | 'DESC' = 'DESC'
  ): void {
    this.imgService
      .getFolders({ page, limit, search, sortBy, order })
      .pipe(
        tap((res) => {
          const folders = res.folders || [];
          this._folders$.next(folders);

          // Determine which folder to select
          const current = this._selectedFolder$.value;
          if (!current) {
            // If none selected, pick the first
            const first = folders.length > 0 ? folders[0] : null;
            this._selectedFolder$.next(first);
          } else {
            // If the current still exists in the new list, keep it; otherwise clear or pick first
            const match = folders.find((f) => f.id === current.id) || null;
            this._selectedFolder$.next(match);
          }
        }),
        switchMap(() => {
          const sel = this._selectedFolder$.value;
          if (sel) {
            // Load images for the selected folder (unlimited fetch for initial load)
            return this.imgService.getImagesInFolder(sel.id, 1, 9999, '', 'DESC').pipe(
              tap((imgRes) => {
                this._images$.next(imgRes.images || []);
              }),
              catchError((_) => {
                this._images$.next([]);
                return of(null);
              })
            );
          } else {
            // No folder selected → clear images
            this._images$.next([]);
            return of(null);
          }
        }),
        catchError((err) => {
          // On error, clear everything
          this._folders$.next([]);
          this._images$.next([]);
          this._selectedFolder$.next(null);
          return throwError(() => err);
        })
      )
      .subscribe({
        next: () => {
          // All BehaviorSubjects have been updated via tap
        },
        error: (err) => {
          console.error('Error in loadFolders:', err);
        },
      });
  }

  /**
   * Set a specific folder as selected (e.g. user clicked it).
   * Immediately load images for that folder.
   */
  setSelectedFolder(folder: Folder | null): void {
    this._selectedFolder$.next(folder);
    if (folder) {
      this.loadImages(folder.id);
    } else {
      this._images$.next([]);
    }
  }

  /**
   * Load a specific page/limit of images in a folder.
   * If the request fails, images list is cleared.
   */
  loadImages(folderId: string, page: number = 1, limit: number = 12): void {
    this.imgService
      .getImagesInFolder(folderId, page, limit, '', 'DESC')
      .pipe(
        tap((res) => {
          this._images$.next(res.images || []);
        }),
        catchError((_) => {
          this._images$.next([]);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          // Updated via tap
        },
        error: (err) => {
          console.error('Error in loadImages:', err);
        },
      });
  }

  /**
   * Create a new folder. Returns the raw CreateFolderResponse.
   * On success, reload folders.
   */
  createFolder(name: string): Observable<CreateFolderResponse> {
    return this.imgService.createFolder(name).pipe(
      tap(() => {
        // After creation, refresh folder list
        this.loadFolders();
      }),
      catchError((err) => {
        console.error('Error creating folder:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Rename an existing folder. Returns RenameFolderResponse.
   * On success, reload folders.
   */
  renameFolder(folderId: string, name: string): Observable<RenameFolderResponse> {
    return this.imgService.renameFolder(folderId, name).pipe(
      tap(() => {
        this.loadFolders();
      }),
      catchError((err) => {
        console.error('Error renaming folder:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Delete a folder by ID. Returns void observable.
   * On success, reload folders and clear images if that folder was selected.
   */
  deleteFolder(folderId: string): Observable<void> {
    return this.imgService.deleteFolder(folderId).pipe(
      map(() => {
        // If the deleted folder was selected, clear selection and images
        const current = this._selectedFolder$.value;
        if (current && current.id === folderId) {
          this._selectedFolder$.next(null);
          this._images$.next([]);
        }
      }),
      tap(() => {
        this.loadFolders();
      }),
      catchError((err) => {
        console.error('Error deleting folder:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Upload a new image into the specified folder. Returns any (upload result).
   * On success, reload that folder's images.
   */
  uploadFile(folderId: string, file: File, metadata: string = ''): Observable<UploadImageResponse> {
    return this.imgService.uploadImage(folderId, file, metadata).pipe(
      tap(() => {
        this.loadImages(folderId);
      }),
      catchError((err) => {
        console.error('Error uploading file:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Replace (refresh) an existing image. Returns RefreshImageResponse.
   * On success, reload that folder's images.
   */
  refreshFile(imageId: string, folderId: string, file: File): Observable<RefreshImageResponse> {
    return this.imgService.refreshImage(imageId, folderId, file).pipe(
      tap(() => {
        this.loadImages(folderId);
      }),
      catchError((err) => {
        console.error('Error refreshing file:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Delete an image from a folder. Returns void observable.
   * On success, reload that folder's images.
   */
  deleteFile(folderId: string, imageId: string): Observable<void> {
    return this.imgService.deleteImage(folderId, imageId).pipe(
      map(() => {
        // no payload needed
      }),
      tap(() => {
        this.loadImages(folderId);
      }),
      catchError((err) => {
        console.error('Error deleting file:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Convenience: re‐load images for whichever folder is currently selected.
   */
  refreshImagesForCurrentFolder(): void {
    const folder = this._selectedFolder$.value;
    if (folder) {
      this.loadImages(folder.id);
    }
  }

  /**
   * Retrieve both folders and images in one shot (used by a resolver or initial loader).
   * If folderId is provided, it will attempt to select and load that folder; otherwise selects the first folder.
   */
  getItems(
    folderId?: string
  ): Observable<{ folders: Folder[]; images: Image[] }> {
    return this.imgService
      .getFolders({
        page: 1,
        limit: 9999,
        search: '',
        sortBy: 'created_at',
        order: 'DESC',
      })
      .pipe(
        map((res) => {
          const folders = res.folders || [];
          this._folders$.next(folders);

          // Determine selection
          const selected =
            folderId != null
              ? folders.find((f) => f.id === folderId) || null
              : folders.length > 0
              ? folders[0]
              : null;
          this._selectedFolder$.next(selected);
          return { folders, selected };
        }),
        switchMap(({ folders, selected }) => {
          if (!selected) {
            this._images$.next([]);
            return of({ folders, images: [] });
          }
          return this.imgService
            .getImagesInFolder(selected.id, 1, 9999, '', 'DESC')
            .pipe(
              map((imgRes) => {
                this._images$.next(imgRes.images || []);
                return { folders, images: imgRes.images || [] };
              })
            );
        }),
        catchError((err) => {
          this._folders$.next([]);
          this._images$.next([]);
          this._selectedFolder$.next(null);
          return throwError(() => err);
        })
      );
  }

  /**
   * Retrieve a single image by ID from the currently cached image list.
   * If not found locally, returns an error. (Extendable to fetch from server.)
   */
  getItemById(id: string | null): Observable<Image> {
    if (!id) {
      return throwError(() => new Error('Invalid image ID'));
    }
    const cached = this._images$.value.find((i) => i.id === id);
    if (cached) {
      return of(cached);
    } else {
      return throwError(() => new Error('Image not found in cache'));
    }
  }
}
