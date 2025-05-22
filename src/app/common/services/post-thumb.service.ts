// src/app/common/services/post-thumb.service.ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_POST_THUMBS
} from '../../graphql/queries/post-thumb.queries';
import {
  UPLOAD_POST_THUMBS,
  DELETE_POST_THUMBS,
  UPDATE_POST_THUMBS
} from '../../graphql/mutations/post-thumb.mutations';
import {
  PostThumb,
  PostThumbUpdateInput
} from '../../graphql/types/post-thumb.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface UploadPostThumbsResponse {
  uploadPostThumbs: PostThumb[];
}

interface DeletePostThumbsResponse {
  deletePostThumbs: string[];
}

interface UpdatePostThumbsResponse {
  updatePostThumbs: PostThumb[];
}

interface GetPostThumbsResponse {
  getPostThumbs: PostThumb[];
}

@Injectable({ providedIn: 'root' })
export class PostThumbService {
  constructor(private apollo: Apollo) {}

  getPostThumbs(postId: string): Observable<PostThumb[]> {
    return this.apollo
      .watchQuery<GetPostThumbsResponse>({
        query: GET_POST_THUMBS,
        variables: { postId }
      })
      .valueChanges.pipe(map((res) => res.data.getPostThumbs));
  }

  uploadPostThumbs(postId: string, files: File[]): Observable<PostThumb[]> {
    return this.apollo
      .mutate<UploadPostThumbsResponse>({
        mutation: UPLOAD_POST_THUMBS,
        variables: { postId, thumbnails: files },
        context: { useUpload: true }
      })
      .pipe(map((res) => res.data!.uploadPostThumbs));
  }

  deletePostThumbs(postId: string, filenames: string[]): Observable<string[]> {
    return this.apollo
      .mutate<DeletePostThumbsResponse>({
        mutation: DELETE_POST_THUMBS,
        variables: { postId, filenames }
      })
      .pipe(map((res) => res.data!.deletePostThumbs));
  }

  updatePostThumbs(
    postId: string,
    updates: PostThumbUpdateInput[]
  ): Observable<PostThumb[]> {
    // Apollo upload for each .file within updates
    return this.apollo
      .mutate<UpdatePostThumbsResponse>({
        mutation: UPDATE_POST_THUMBS,
        variables: { postId, updates },
        context: { useUpload: true }
      })
      .pipe(map((res) => res.data!.updatePostThumbs));
  }
}
