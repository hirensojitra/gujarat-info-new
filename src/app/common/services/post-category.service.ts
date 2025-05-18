// src/app/graphql/services/post-category.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CREATE_POST_CATEGORY,
  CREATE_POST_CATEGORIES,
  UPDATE_POST_CATEGORY,
  UPDATE_POST_CATEGORIES,
  SOFT_DELETE_POST_CATEGORY,
  SOFT_DELETE_POST_CATEGORIES,
  RESTORE_POST_CATEGORY,
  RESTORE_POST_CATEGORIES,
  HARD_DELETE_POST_CATEGORY,
  HARD_DELETE_POST_CATEGORIES,
} from 'src/app/graphql/mutations/post-category.mutations';

import {
  GET_POST_CATEGORY_STATS_AND_DATA,
  GET_POST_CATEGORIES,
  GET_DELETED_POST_CATEGORIES,
  GET_POST_CATEGORY_BY_ID,
  GET_DELETED_POST_CATEGORY_BY_ID,
} from 'src/app/graphql/queries/post-category.queries';

import {
  PostCategoryInput,
  UpdatePostCategoryInput,
  PaginationInput,
  PostCategory,
} from 'src/app/graphql/types/post-category.types';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostCategoryService {
  private graphUrl = `${environment.GraphApi}/graphql`;

  constructor(private http: HttpClient) {}

  // getPostCategoryStatsAndData(
  //   pagination: PaginationInput,
  //   getDeletedPostCategoriesPagination: PaginationInput
  // ): Observable<any> {
  //   return this.http.post<any>(this.graphUrl, {
  //     query: GET_POST_CATEGORY_STATS_AND_DATA,
  //     variables: { pagination, getDeletedPostCategoriesPagination },
  //   });
  // }
  getPostCategoryStatsAndData(
    pagination: PaginationInput,
    getDeletedPostCategoriesPagination: PaginationInput
  ): Observable<any> {
    // 1️⃣ Assemble query and variables
    const query = GET_POST_CATEGORY_STATS_AND_DATA;
    const variables = { pagination, getDeletedPostCategoriesPagination };

    // 2️⃣ Log them
    console.log('GraphQL Query:\n', query);
    console.log('Variables:\n', JSON.stringify(variables, null, 2));

    // 3️⃣ Send the request
    return this.http.post<any>(this.graphUrl, { query, variables });
  }

  getPostCategories(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'name',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): Observable<any> {
    const pagination: PaginationInput = { page, limit, sortBy, sortOrder };
    return this.http.post<any>(this.graphUrl, {
      query: GET_POST_CATEGORIES,
      variables: { pagination },
    });
  }

  getDeletedPostCategories(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'name',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): Observable<any> {
    const pagination: PaginationInput = { page, limit, sortBy, sortOrder };
    return this.http.post<any>(this.graphUrl, {
      query: GET_DELETED_POST_CATEGORIES,
      variables: { pagination },
    });
  }

  getPostCategoryById(id: string): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: GET_POST_CATEGORY_BY_ID,
      variables: { id },
    });
  }

  getDeletedPostCategoryById(id: string): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: GET_DELETED_POST_CATEGORY_BY_ID,
      variables: { id },
    });
  }

  createPostCategory(input: PostCategoryInput & { active?: boolean }): Observable<any> {
    const { name, description, active = true } = input;
    return this.http.post<any>(this.graphUrl, {
      query: CREATE_POST_CATEGORY,
      variables: { name, description, active },
    });
  }

  createPostCategories(postCategories: PostCategoryInput[]): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: CREATE_POST_CATEGORIES,
      variables: { postCategories },
    });
  }

  updatePostCategory(input: UpdatePostCategoryInput): Observable<any> {
    const { id, name, description, active } = input;
    return this.http.post<any>(this.graphUrl, {
      query: UPDATE_POST_CATEGORY,
      variables: { id, name, description, active },
    });
  }

  updatePostCategories(inputs: UpdatePostCategoryInput[]): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: UPDATE_POST_CATEGORIES,
      variables: { postCategories: inputs },
    });
  }

  softDeletePostCategory(id: string): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: SOFT_DELETE_POST_CATEGORY,
      variables: { id },
    });
  }

  softDeletePostCategories(ids: string[]): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: SOFT_DELETE_POST_CATEGORIES,
      variables: { ids },
    });
  }

  restorePostCategory(id: string): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: RESTORE_POST_CATEGORY,
      variables: { id },
    });
  }

  restorePostCategories(ids: string[]): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: RESTORE_POST_CATEGORIES,
      variables: { ids },
    });
  }

  hardDeletePostCategory(id: string): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: HARD_DELETE_POST_CATEGORY,
      variables: { id },
    });
  }

  hardDeletePostCategories(ids: string[]): Observable<any> {
    return this.http.post<any>(this.graphUrl, {
      query: HARD_DELETE_POST_CATEGORIES,
      variables: { ids },
    });
  }
}
