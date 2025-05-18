// src/app/common/services/post-subcategory.service.ts

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';

import {
  CREATE_POST_SUBCATEGORIES,
  UPDATE_POST_SUBCATEGORIES,
  SOFT_DELETE_POST_SUBCATEGORY,
  SOFT_DELETE_POST_SUBCATEGORIES,
  RESTORE_POST_SUBCATEGORY,
  RESTORE_POST_SUBCATEGORIES,
  HARD_DELETE_POST_SUBCATEGORY,
  HARD_DELETE_POST_SUBCATEGORIES,
} from 'src/app/graphql/mutations/post-subcategory.mutations';

import {
  GET_SELECTED_POST_CATEGORY_ID,
  GET_POST_SUBCATEGORY_STATS_AND_DATA,
  GET_POST_SUBCATEGORIES,
  GET_DELETED_POST_SUBCATEGORIES,
} from 'src/app/graphql/queries/post_subcategories.queries';

import {
  PostSubcategory,
  PostSubcategoryStats,
  PaginationInput,
  PostCategory,
} from 'src/app/graphql/types/post-subcategory.types';
@Injectable({ providedIn: 'root' })
export class PostSubcategoryService {
  constructor(private apollo: Apollo) {}
  getSelectedPostCategoryId(): Observable<
    ApolloQueryResult<{ getSelectedPostCategoryId: string }>
  > {
    return this.apollo.watchQuery<{ getSelectedPostCategoryId: string }>({
      query: GET_SELECTED_POST_CATEGORY_ID,
    }).valueChanges;
  }

  getPostSubcategoryStatsAndData(
    categoryId: string,
    activePagination: PaginationInput,
    deletedPagination: PaginationInput
  ): Observable<
    ApolloQueryResult<{
      getPostSubcategoryStatsByCategory: PostSubcategoryStats;
    }>
  > {
    return this.apollo.watchQuery<{
      getPostSubcategoryStatsByCategory: PostSubcategoryStats;
    }>({
      query: GET_POST_SUBCATEGORY_STATS_AND_DATA,
      variables: {
        category_id: categoryId,
        activePagination,
        deletedPagination,
      },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  getPostSubcategories(
    categoryId: string,
    page: number,
    limit: number
  ): Observable<
    ApolloQueryResult<{
      getPostSubcategoriesByCategoryId: PostSubcategory[];
    }>
  > {
    return this.apollo.watchQuery<{
      getPostSubcategoriesByCategoryId: PostSubcategory[];
    }>({
      query: GET_POST_SUBCATEGORIES,
      variables: {
        category_id: categoryId,
        page,
        limit,
      },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  getDeletedPostSubcategories(
    page: number,
    limit: number
  ): Observable<
    ApolloQueryResult<{
      getDeletedPostSubcategories: PostSubcategory[];
    }>
  > {
    return this.apollo.watchQuery<{
      getDeletedPostSubcategories: PostSubcategory[];
    }>({
      query: GET_DELETED_POST_SUBCATEGORIES,
      variables: {
        page,
        limit,
      },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  createPostSubcategories(
    subcategories: Omit<PostSubcategory, 'id'>[]
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_POST_SUBCATEGORIES,
      variables: { subcategories },
    });
  }

  updatePostSubcategories(
    subcategories: Partial<PostSubcategory> & { id: string }[]
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_POST_SUBCATEGORIES,
      variables: { subcategories },
    });
  }

  softDeletePostSubcategory(id: string): Observable<any> {
    return this.softDeletePostSubcategories([id]);
  }

  softDeletePostSubcategories(ids: string[]): Observable<any> {
    return this.apollo.mutate({
      mutation: SOFT_DELETE_POST_SUBCATEGORIES,
      variables: { ids },
    });
  }
  hardDeletePostSubcategory(id: string): Observable<any> {
    return this.hardDeletePostSubcategories([id]);
  }

  hardDeletePostSubcategories(ids: string[]): Observable<any> {
    return this.apollo.mutate({
      mutation: HARD_DELETE_POST_SUBCATEGORIES,
      variables: { ids },
    });
  }

  restorePostSubcategory(id: string): Observable<any> {
    return this.restorePostSubcategories([id]);
  }

  restorePostSubcategories(ids: string[]): Observable<any> {
    return this.apollo.mutate({
      mutation: RESTORE_POST_SUBCATEGORIES,
      variables: { ids },
    });
  }
}
