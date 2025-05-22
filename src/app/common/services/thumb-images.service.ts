import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ThumbnailResponse {
  message: string;
  filename: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThumbImagesService {
  private baseUrl = `${environment.MasterApi}/thumb-images`;

  constructor(private http: HttpClient) {}

  // Upload new thumbnail
  // In your PostDetailService
  uploadThumbnail(postId: string, formData: FormData): Observable<any> {
    console.log('Uploading thumbnail for post ID:', postId);
    console.log('FormData:', formData.get('thumbnail'));
    return this.http.post(`${this.baseUrl}/upload`, formData, {
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  }

  // Get thumbnail by filename
  getThumbnail(filename: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${filename}`, {
      responseType: 'blob',
    });
  }

  // Update existing thumbnail
  updateThumbnail(filename: string, file: File): Observable<ThumbnailResponse> {
    const formData = new FormData();
    formData.append('thumbnail', file, file.name);

    return this.http.put<ThumbnailResponse>(
      `${this.baseUrl}/${filename}`,
      formData
    );
  }

  // Delete thumbnail
  deleteThumbnail(filename: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${filename}`);
  }

  // List all thumbnails (optional)
  listThumbnails(): Observable<{
    count: number;
    thumbnails: Array<{ filename: string; url: string }>;
  }> {
    return this.http.get<{
      count: number;
      thumbnails: Array<{ filename: string; url: string }>;
    }>(this.baseUrl);
  }
}
