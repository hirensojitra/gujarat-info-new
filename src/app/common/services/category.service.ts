
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostCategory, PostSubcategory } from '../../graphql/types/post-detail.types';

const GET_POST_CATEGORIES = gql`
  query GetPostCategories {
    getPostCategories {
      id
      name
    }
  }
`;

const GET_POST_SUBCATEGORIES_BY_CATEGORY_ID = gql`
  query GetPostSubcategoriesByCategoryId($category_id: ID!) {
    getPostSubcategoriesByCategoryId(category_id: $category_id) {
      id
      name
      category_id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apollo: Apollo) { }

  getCategories(): Observable<PostCategory[]> {
    return this.apollo.watchQuery<{ getPostCategories: PostCategory[] }>({
      query: GET_POST_CATEGORIES
    }).valueChanges.pipe(
      map(result => result.data.getPostCategories)
    );
  }

  getSubcategories(categoryId: string): Observable<PostSubcategory[]> {
    return this.apollo.watchQuery<{ getPostSubcategoriesByCategoryId: PostSubcategory[] }>({
      query: GET_POST_SUBCATEGORIES_BY_CATEGORY_ID,
      variables: {
        category_id: categoryId
      }
    }).valueChanges.pipe(
      map(result => result.data.getPostSubcategoriesByCategoryId)
    );
  }
}
