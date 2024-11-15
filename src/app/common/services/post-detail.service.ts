import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PostDetails } from '../interfaces/image-element';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PostDetailService {
    private baseUrl = environment.MasterApi + '/post-detail';
    constructor(private http: HttpClient) {

    }
    getAllPosts(params: { page: number, limit?: number, search?: string, sortBy?: string, order?: string }): Observable<{ posts: PostDetails[], pagination: any }> {
        // Build the query string from parameters
        const queryParams = new HttpParams()
            .set('page', params.page.toString())
            .set('limit', (params.limit || 12).toString())
            .set('search', params.search || '')
            .set('sortBy', params.sortBy || 'created_at')
            .set('order', params.order || 'desc');

        // Make the HTTP GET request with the constructed query string
        return this.http.get<{ posts: PostDetails[], pagination: any }>(this.baseUrl, { params: queryParams });
    }


    addPost(newPostData: PostDetails): Observable<PostDetails> {
        console.log(newPostData)
        return this.http.post<PostDetails>(`${this.baseUrl}`, newPostData).pipe(
            map(response => {
                console.log(response)
                const newPostId = response.id;
                newPostData.id = newPostId;
                return newPostData;
            })
        );
    }

    getPostById(id: string): Observable<PostDetails> {
        return this.http.get<PostDetails>(`${this.baseUrl}/get/${id}`);
    }

    updatePost(newData: PostDetails): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/update/`, newData);
    }

    softDeletePost(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/soft-delete/${id}`);
    }
    recoverPost(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/recover/${id}`);
    }

    hardDeletePost(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/hard-delete/${id}`);
    }
    downloadCounter(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/download-counter/${id}`);
    }
    updateDownloadCounter(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/update-download-counter/${id}`);
    }

    getAllSoftDeletedPosts(params: { page: number, limit?: number, search?: string, sortBy?: string, order?: string }): Observable<{ posts: PostDetails[], pagination: any }> {
        // Build the query string from parameters
        const queryParams = new HttpParams()
            .set('page', params.page.toString())
            .set('limit', (params.limit || 12).toString())
            .set('search', params.search || '')
            .set('sortBy', params.sortBy || 'created_at')
            .set('order', params.order || 'desc');

        // Construct the full URL for logging
        const fullUrl = `${this.baseUrl}/soft-deleted?${queryParams.toString()}`;
        console.log('Full URL:', fullUrl);

        // Make the HTTP GET request with the constructed query string
        return this.http.get<{ posts: PostDetails[], pagination: any }>(fullUrl);
    }



    getTotalPostLength(): Observable<{ totalLength: number }> {
        return this.http.get<{ totalLength: number }>(`${this.baseUrl}/post-length`);
    }

    getTotalDeletedPostLength(): Observable<{ totalLength: number }> {
        return this.http.get<{ totalLength: number }>(`${this.baseUrl}/post-deleted-length`);
    }
}
