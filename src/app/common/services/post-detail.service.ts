import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { PostDetails } from '../interfaces/image-element';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PostDetailService {
    private baseUrl = environment.MasterApi + '/post-detail';
    constructor(private http: HttpClient) {

    }
    getAllPosts(page: number): Observable<PostDetails[]> {
        return this.http.get<PostDetails[]>(`${this.baseUrl}?page=${page}`);
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
        return this.http.get<PostDetails>(`${this.baseUrl}/get/${id}`).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                    return null
                } else {
                    // Handle other errors (e.g., server errors)
                    return []
                }
            })
        );
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

    getAllSoftDeletedPosts(page: number): Observable<PostDetails[]> {
        return this.http.get<PostDetails[]>(`${this.baseUrl}/soft-deleted/?page=${page}`);
    }

    getTotalPostLength(): Observable<{ totalLength: number }> {
        return this.http.get<{ totalLength: number }>(`${this.baseUrl}/post-length`);
    }

    getTotalDeletedPostLength(): Observable<{ totalLength: number }> {
        return this.http.get<{ totalLength: number }>(`${this.baseUrl}/post-deleted-length`);
    }
}
