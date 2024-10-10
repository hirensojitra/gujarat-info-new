import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {
  private apiUrl = environment.MasterApi + '/img'; // Adjust this URL as per your server configuration
  constructor(private http: HttpClient) {

  }
  // Create a new folder
  createFolder(folderName: string): Observable<any> {
    const body = { folderName };
    return this.http.post(`${this.apiUrl}/folders`, body);
  }

  // Get folder list with pagination, search, and sorting
  getFolders(page: number = 1, limit: number = 10, search: string = '', sortBy: string = 'created_at', order: string = 'asc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('search', search)
      .set('sortBy', sortBy)
      .set('order', order);

    const completeUrl = `${this.apiUrl}/folders?${params.toString()}`;  // Combine URL and query parameters
    console.log(completeUrl);  // Log the complete URL to the console

    return this.http.get(`${this.apiUrl}/folders`, { params });
  }


  // Upload an image to a specific folder
  uploadImage(folderId: string, imageFile: File, metadata: any): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile); // File to upload
    formData.append('metadata', JSON.stringify(metadata)); // Additional metadata

    return this.http.post(`${this.apiUrl}/folders/${folderId}/images`, formData);
  }

  // Get images within a folder with pagination, search, and sorting
  getImagesInFolder(folderId: string, page: number = 1, limit: number = 10, search: string = '', sortBy: string = 'created_at', order: string = 'asc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('search', search)
      .set('sortBy', sortBy)
      .set('order', order);

    return this.http.get(`${this.apiUrl}/folders/${folderId}/images`, { params });
  }

  // Delete an image from a folder
  deleteImage(folderId: number, imageId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/folders/${folderId}/images/${imageId}`);
  }
  getImage(imageId: string, quality?: number, format?: string, thumb?: boolean): Observable<any> {
    let params: any = {};
    if (quality) params.quality = quality.toString();
    if (format) params.format = format;
    if (thumb) params.thumb = 'true';
    return this.http.get(`${this.apiUrl}/uploads/${imageId}`, { params, responseType: 'blob' });
  }
  // Rename an existing folder
  renameFolder(folderId: string, newFolderName: string): Observable<any> {
    const body = { folderName: newFolderName };
    return this.http.put(`${this.apiUrl}/folders/${folderId}/rename`, body);
  }
  deleteFolder(folderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/folders/${folderId}`);
  }
  refreshImage(folderId: string, imageId: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/folders/${folderId}/images/${imageId}/refresh`, formData);
  }
  getTotalFolderCount(search: string = ''): Observable<{ count: number }> {
    const params = new HttpParams().set('search', search);
    return this.http.get<{ count: number }>(`${this.apiUrl}/folders/count`, { params });
  }
  getTotalImageCount(folderId: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/folders/${folderId}/images/count`);
  }
}
