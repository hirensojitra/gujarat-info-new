import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class UserImageApiService {
    private apiUrl = environment.MasterApi + '/user-img'; // Adjust this URL as per your server configuration

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    // Create a new folder for a specific user
    createFolder(userid: string, folderName: string): Observable<any> {
        const token = this.cookieService.get('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const body = { folderName, userid: userid };
        return this.http.post(`${this.apiUrl}/folders`, body, { headers });
    }

    // Get folders for a specific user with pagination, search, and sorting
    getFolders(userid: string, page: number = 1, limit: number = 10, search: string = '', sortBy: string = 'created_at', order: string = 'asc'): Observable<any> {
        const params = new HttpParams()
            .set('userid', userid)
            .set('page', page)
            .set('limit', limit)
            .set('search', search)
            .set('sortBy', sortBy)
            .set('order', order);

        return this.http.get(`${this.apiUrl}/folders`, { params });
    }

    // Upload an image to a specific user's folder
    uploadImage(userid: string, folderId: string, imageFile: File, metadata: any): Observable<any> {
        const formData = new FormData();
        formData.append('image', imageFile); // File to upload
        formData.append('metadata', JSON.stringify(metadata)); // Additional metadata
        formData.append('userid', userid); // Pass userid with the form data
        formData.append('folderId', folderId.toString()); // Pass userid with the form data
        const token = this.cookieService.get('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(`${this.apiUrl}/folders/${folderId}/images`, formData, { headers });
    }

    // Get images within a specific user's folder with pagination, search, and sorting
    getImagesInFolder(userid: string, folderId: string, page: number = 1, limit: number = 10, search: string = '', sort: string = 'asc'): Observable<any> {
        const params = new HttpParams()
            .set('userid', userid)
            .set('page', page)
            .set('limit', limit)
            .set('search', search)
            .set('sort', sort);

        return this.http.get(`${this.apiUrl}/folders/${folderId}/images`, { params });
    }

    // Delete an image from a specific user's folder
    deleteImage(userid: string, folderId: string, imageId: number): Observable<any> {
        const body = { userid: userid };
        return this.http.delete(`${this.apiUrl}/folders/${folderId}/images/${imageId}`, { body });
    }

    // Get the total count of folders for a user
    getTotalFolderCount(userid: string, search: string = ''): Observable<{ count: number }> {
        const params = new HttpParams().set('userid', userid).set('search', search); // Use userid in params
        return this.http.get<{ count: number }>(`${this.apiUrl}/folders/count`, { params });
    }

    // Get the total image count in a specific folder for a user
    getTotalImageCount(userid: string, folderId: string): Observable<{ count: number }> {
        const params = new HttpParams().set('userid', userid);
        return this.http.get<{ count: number }>(`${this.apiUrl}/folders/${folderId}/images/count`, { params });
    }

    // Refresh an image for a specific user
    refreshImage(userid: string, folderId: string, imageId: number, formData: FormData): Observable<any> {
        formData.append('userid', userid); // Include userid in the form data
        return this.http.post(`${this.apiUrl}/folders/${folderId}/images/${imageId}/refresh`, formData);
    }

    // Get image data
    getImage(imageId: string, quality?: number, format?: string, thumb?: boolean): Observable<any> {
        let params: any = {};
        if (quality) params.quality = quality.toString();
        if (format) params.format = format;
        if (thumb) params.thumb = 'true';
        return this.http.get(`${this.apiUrl}/uploads/${imageId}`, { params, responseType: 'blob' });
    }

    // Delete a folder for a specific user
    deleteFolder(userid: string, folderId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/folders/${folderId}`, { body: { userid: userid } });
    }

    // Rename a folder
    renameFolder(userid: string, folderId: string, newFolderName: string): Observable<any> {
        const body = { folderName: newFolderName, userid: userid };
        return this.http.put(`${this.apiUrl}/folders/${folderId}/rename`, body);
    }
}