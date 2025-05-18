// src/app/common/services/img.service.ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_FOLDERS,
  GET_TOTAL_FOLDER_COUNT,
  GET_IMAGES_IN_FOLDER,
  GET_TOTAL_IMAGE_COUNT,
  GET_INITIAL_FOLDER_DATA,
} from 'src/app/graphql/queries/img.queries';
import {
  CREATE_FOLDER,
  DELETE_FOLDER,
  RENAME_FOLDER,
  UPLOAD_IMAGE,
  DELETE_IMAGE,
  REFRESH_IMAGE,
} from 'src/app/graphql/mutations/img.mutations';

import {
  Folder,
  Image,
  GetFoldersResponse,
  GetImagesResponse,
  TotalCountResponse,
  CreateFolderResponse,
  RenameFolderResponse,
  DeleteResponse,
  UploadImageResponse,
  RefreshImageResponse,
  GetInitialDataResponse,
} from 'src/app/graphql/types/img.types';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ImgService {
  constructor(private apollo: Apollo, private http: HttpClient) {}
  getInitialData(
    folderLimit: number,
    imageLimit: number
  ): Observable<GetInitialDataResponse['getInitialFolderData']> {
    return this.apollo
      .watchQuery<GetInitialDataResponse>({
        query: GET_INITIAL_FOLDER_DATA,
        variables: {
          folderLimit,
          imageLimit,
        },
        fetchPolicy: 'network-only', // or 'cache-first' based on your use case
      })
      .valueChanges.pipe(map((result) => result.data.getInitialFolderData));
  }
  getFolders(params: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    order?: string;
  }): Observable<{ folders: Folder[]; total: number }> {
    return this.apollo
      .watchQuery<GetFoldersResponse>({
        query: GET_FOLDERS,
        variables: params,
      })
      .valueChanges.pipe(map((result) => result.data.getFolders));
  }

  getTotalFolderCount(search: string = ''): Observable<number> {
    return this.apollo
      .watchQuery<TotalCountResponse>({
        query: GET_TOTAL_FOLDER_COUNT,
        variables: { search },
      })
      .valueChanges.pipe(
        map((result) => result.data.getTotalFolderCount.count)
      );
  }

  createFolder(name: string): Observable<CreateFolderResponse> {
    return this.apollo
      .mutate<{ createFolder: CreateFolderResponse }>({
        mutation: CREATE_FOLDER,
        variables: { name },
      })
      .pipe(map((res) => res.data!.createFolder));
  }

  renameFolder(
    folderId: string,
    name: string
  ): Observable<RenameFolderResponse> {
    return this.apollo
      .mutate<{ renameFolder: RenameFolderResponse }>({
        mutation: RENAME_FOLDER,
        variables: { folderId, name },
      })
      .pipe(map((res) => res.data!.renameFolder));
  }

  deleteFolder(folderId: string): Observable<DeleteResponse> {
    return this.apollo
      .mutate<{ deleteFolder: DeleteResponse }>({
        mutation: DELETE_FOLDER,
        variables: { folderId },
      })
      .pipe(map((res) => res.data!.deleteFolder));
  }

  getImagesInFolder(
    folderId: string,
    page?: number,
    limit?: number,
    search?: string,
    sort?: string
  ): Observable<{ images: Image[]; total: number }> {
    return this.apollo
      .watchQuery<GetImagesResponse>({
        query: GET_IMAGES_IN_FOLDER,
        variables: { folderId, page, limit, search, sort },
      })
      .valueChanges.pipe(map((result) => result.data.getImagesInFolder));
  }

  getTotalImageCountInFolder(
    folderId: string,
    search: string = ''
  ): Observable<number> {
    return this.apollo
      .watchQuery<{ getTotalImageCountInFolder: { totalCount: number } }>({
        query: GET_TOTAL_IMAGE_COUNT,
        variables: { folderId, search },
      })
      .valueChanges.pipe(
        map((result) => result.data.getTotalImageCountInFolder.totalCount)
      );
  }

  uploadImage(
    folderId: string,
    file: File,
    metadata?: string
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: UPLOAD_IMAGE,
      variables: { folderId, image: file, metadata }, // metadata should be a plain string
      context: {
        useMultipart: true,
      },
    });
  }

  deleteImage(folderId: string, imageId: string): Observable<DeleteResponse> {
    return this.apollo
      .mutate<{ deleteImage: DeleteResponse }>({
        mutation: DELETE_IMAGE,
        variables: { folderId, imageId },
      })
      .pipe(map((res) => res.data!.deleteImage));
  }

  refreshImage(
    imageId: string,
    folderId: string,
    file: File
  ): Observable<RefreshImageResponse> {
    return this.apollo
      .mutate<{ refreshImage: RefreshImageResponse }>({
        mutation: REFRESH_IMAGE,
        variables: { folderId, imageId, image: file },
      })
      .pipe(map((res) => res.data!.refreshImage));
  }

  getImageUrl(
    imageId: string,
    options: { format?: string; quality?: number; thumb?: boolean } = {}
  ): string {
    const params = new URLSearchParams();
    if (options.format) params.append('format', options.format);
    if (options.quality) params.append('quality', options.quality.toString());
    if (options.thumb) params.append('thumb', 'true');

    return `${
      environment.MasterApi
    }/graphql/image/${imageId}?${params.toString()}`;
  }
}
