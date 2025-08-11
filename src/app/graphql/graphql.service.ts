import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define interfaces for your GraphQL types
export interface Poster {
  id?: string;
  name: string;
  canvasState: string; // JSON string of Fabric.js canvas
  backgroundColor?: string;
  width?: number;
  height?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface SavePosterResponse {
  savePoster: Poster;
}

interface GetPosterResponse {
  getPoster: Poster;
}

interface GetPostersResponse {
  getPosters: Poster[];
}

const SAVE_POSTER_MUTATION = gql`
  mutation SavePoster($input: PosterInput!) {
    savePoster(input: $input) {
      id
      name
      canvasState
      backgroundColor
      width
      height
      createdAt
      updatedAt
    }
  }
`;

const GET_POSTER_QUERY = gql`
  query GetPoster($id: ID!) {
    getPoster(id: $id) {
      id
      name
      canvasState
      backgroundColor
      width
      height
      createdAt
      updatedAt
    }
  }
`;

const GET_POSTERS_QUERY = gql`
  query GetPosters {
    getPosters {
      id
      name
      createdAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  savePoster(poster: Poster): Observable<Poster> {
    return this.apollo.mutate<SavePosterResponse>({
      mutation: SAVE_POSTER_MUTATION,
      variables: {
        input: poster,
      },
    }).pipe(
      map(result => result.data!.savePoster)
    );
  }

  getPoster(id: string): Observable<Poster> {
    return this.apollo.query<GetPosterResponse>({
      query: GET_POSTER_QUERY,
      variables: { id },
    }).pipe(
      map(result => result.data!.getPoster)
    );
  }

  getPosters(): Observable<Poster[]> {
    return this.apollo.query<GetPostersResponse>({
      query: GET_POSTERS_QUERY,
    }).pipe(
      map(result => result.data!.getPosters)
    );
  }
}
