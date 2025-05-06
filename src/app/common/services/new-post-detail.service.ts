// src/app/common/services/post-detail.service.ts

import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  GET_ALL_SOFT_DELETED_POSTS,
  GET_TOTAL_POST_LENGTH,
  GET_TOTAL_DELETED_POST_LENGTH,
  GET_DOWNLOAD_COUNTER,
  UPDATE_DOWNLOAD_COUNTER,
  GET_ALL_POSTS_MINIMAL
} from 'src/app/graphql/queries/post-detail.queries';

import {
  ADD_POST,
  UPDATE_POST,
  SOFT_DELETE_POST,
  RECOVER_POST,
  HARD_DELETE_POST,
  UPLOAD_THUMBNAIL
} from 'src/app/graphql/mutations/post-detail.mutations';

import {
  PostListResponse,
  PostDetails,
  PostInput,
  PostUpdateInput,
  Pagination
} from 'src/app/graphql/types/post-detail.types';
interface MinimalPost {
  id:         string;
  title:      string;
  info:       string;
  image:      string | null;
  updated_at: string | null;
}

interface MinimalPostListResponse {
  posts:      MinimalPost[];
  pagination: Pagination;
}
@Injectable({
  providedIn: 'root'
})
export class NewPostDetailService {
  constructor(private apollo: Apollo) {}

  /** Lists posts with pagination & filters */
  getMinimalPosts(vars: {
    page: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    order?: string;
    published?: boolean;
    info_show?: boolean;
  }): Observable<MinimalPostListResponse> {
    return this.apollo
      .query<{ getAllPosts: MinimalPostListResponse }>({
        query: GET_ALL_POSTS_MINIMAL,
        variables: vars,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => result.data.getAllPosts)
      );
  }
  getAllPosts(vars: {
    page: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    order?: string;
    published?: boolean;
    info_show?: boolean;
  }): Observable<PostListResponse> {
    return this.apollo
      .query<{ getAllPosts: PostListResponse }>({
        query: GET_ALL_POSTS,
        variables: vars,
        fetchPolicy: 'network-only'
      })
      .pipe(map(res => res.data.getAllPosts));
  }
  
  /** Fetch a single post by ID */
  getPostById(id: string): Observable<PostDetails | null> {
    return this.apollo
      .query<{ getPostById: PostDetails }>({
        query: GET_POST_BY_ID,
        variables: { id }
      })
      .pipe(map(res => res.data.getPostById));
  }

  /** Lists soft‐deleted posts */
  getAllSoftDeletedPosts(vars: {
    page: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    order?: string;
  }): Observable<PostListResponse> {
    return this.apollo
      .query<{ getAllSoftDeletedPosts: PostListResponse }>({
        query: GET_ALL_SOFT_DELETED_POSTS,
        variables: vars,
        fetchPolicy: 'network-only'
      })
      .pipe(map(res => res.data.getAllSoftDeletedPosts));
  }

  /** Total count of non‐deleted posts */
  getTotalPostLength(): Observable<number> {
    return this.apollo
      .query<{ getTotalPostLength: number }>({
        query: GET_TOTAL_POST_LENGTH
      })
      .pipe(map(res => res.data.getTotalPostLength));
  }

  /** Total count of soft‐deleted posts */
  getTotalDeletedPostLength(): Observable<number> {
    return this.apollo
      .query<{ getTotalDeletedPostLength: number }>({
        query: GET_TOTAL_DELETED_POST_LENGTH
      })
      .pipe(map(res => res.data.getTotalDeletedPostLength));
  }

  /** Current download counter for a post */
  getDownloadCounter(id: string): Observable<number> {
    return this.apollo
      .query<{ getDownloadCounter: number }>({
        query: GET_DOWNLOAD_COUNTER,
        variables: { id }
      })
      .pipe(map(res => res.data.getDownloadCounter));
  }

  /** Increment & fetch the new download counter */
  updateDownloadCounter(id: string): Observable<number> {
    return this.apollo
      .query<{ updateDownloadCounter: number }>({
        query: UPDATE_DOWNLOAD_COUNTER,
        variables: { id }
      })
      .pipe(map(res => res.data.updateDownloadCounter));
  }

  /** Create a new post */
  addPost(input: PostInput): Observable<PostDetails> {
    return this.apollo
      .mutate<{ addPost: PostDetails }>({
        mutation: ADD_POST,
        variables: { input }
      })
      .pipe(map(res => res.data!.addPost));
  }

  /** Update an existing post (partial) */
  updatePost(input: PostUpdateInput): Observable<PostDetails> {
    return this.apollo
      .mutate<{ updatePost: PostDetails }>({
        mutation: UPDATE_POST,
        variables: { input }
      })
      .pipe(map(res => res.data!.updatePost));
  }

  /** Soft‐delete a post */
  softDeletePost(id: string): Observable<boolean> {
    return this.apollo
      .mutate<{ softDeletePost: boolean }>({
        mutation: SOFT_DELETE_POST,
        variables: { id }
      })
      .pipe(map(res => res.data!.softDeletePost));
  }

  /** Recover a soft‐deleted post */
  recoverPost(id: string): Observable<boolean> {
    return this.apollo
      .mutate<{ recoverPost: boolean }>({
        mutation: RECOVER_POST,
        variables: { id }
      })
      .pipe(map(res => res.data!.recoverPost));
  }

  /** Hard‐delete a post */
  hardDeletePost(id: string): Observable<boolean> {
    return this.apollo
      .mutate<{ hardDeletePost: boolean }>({
        mutation: HARD_DELETE_POST,
        variables: { id }
      })
      .pipe(map(res => res.data!.hardDeletePost));
  }

  /**
   * Uploads a thumbnail file; requires multipart support.
   * Returns the URL string for the uploaded thumbnail.
   */
  uploadThumbnail(postId: string, file: File): Observable<string> {
    return this.apollo
      .mutate<{ uploadThumbnail: string }>({
        mutation: UPLOAD_THUMBNAIL,
        variables: { postId, file },
        context: { useMultipart: true }
      })
      .pipe(map(res => res.data!.uploadThumbnail));
  }
}
