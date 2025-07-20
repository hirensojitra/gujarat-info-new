import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private graphqlEndpoint = environment.GraphApi + '/graphql'; // Assuming your GraphQL endpoint is /graphql

  constructor(private http: HttpClient) {}

  private sendGraphQLRequest(query: string, variables: any = {}): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any authentication headers if required (e.g., 'Authorization': `Bearer ${yourAuthToken}`)
    });

    return this.http.post(this.graphqlEndpoint, { query, variables }, { headers }).pipe(
      map((response: any) => {
        if (response.errors) {
          console.error('GraphQL Errors:', response.errors);
          throw new Error(response.errors[0].message || 'GraphQL error occurred');
        }
        return response.data;
      }),
      catchError((error) => {
        console.error('HTTP Error sending GraphQL request:', error);
        return throwError(() => new Error('Failed to send GraphQL request'));
      })
    );
  }

  saveData(formData: any, imgParam: string): Observable<string> {
    const mutation = `
      mutation SaveTrackData($input: FormDataInput!) {
        saveTrackData(input: $input) {
          message
        }
      }
    `;
    const variables = {
      input: {
        formData,
        imgParam,
      },
    };

    return this.sendGraphQLRequest(mutation, variables).pipe(
      map((data) => data.saveTrackData.message)
    );
  }

  getTrackData(imgParam: string): Observable<any[]> {
    const query = `
      query GetTrackData($imgParam: String!) {
        getTrackData(imgParam: $imgParam) {
          value_data
          timestamp
        }
      }
    `;
    const variables = { imgParam };

    return this.sendGraphQLRequest(query, variables).pipe(
      map((data) => data.getTrackData)
    );
  }

  generateExcel(imgParam: string): Observable<Blob> {
    const query = `
      query GenerateTrackExcel($imgParam: String!) {
        generateTrackExcel(imgParam: $imgParam)
      }
    `;
    const variables = { imgParam };

    return this.sendGraphQLRequest(query, variables).pipe(
      map((data) => data.generateTrackExcel),
      catchError((error) => {
        console.error('Error getting Excel URL from GraphQL:', error);
        return throwError(() => new Error('Failed to get Excel file URL'));
      }),
      // Now fetch the file from the URL
      switchMap((fileUrl: string) => {
        if (!fileUrl) {
          return throwError(() => new Error('Excel file URL is empty'));
        }
        // Assuming the fileUrl is relative to your backend, you might need to prepend MasterApi
        const fullFileUrl = fileUrl.startsWith('/') ? environment.MasterApi + fileUrl : fileUrl;
        return this.http.get(fullFileUrl, { responseType: 'blob' }).pipe(
          catchError((downloadError) => {
            console.error('Error downloading Excel file:', downloadError);
            return throwError(() => new Error('Failed to download Excel file'));
          })
        );
      })
    );
  }

  generatePdf(imgParam: string): Observable<Blob> {
    const query = `
      query GenerateTrackPdf($imgParam: String!) {
        generateTrackPdf(imgParam: $imgParam)
      }
    `;
    const variables = { imgParam };

    return this.sendGraphQLRequest(query, variables).pipe(
      map((data) => data.generateTrackPdf),
      catchError((error) => {
        console.error('Error getting PDF URL from GraphQL:', error);
        return throwError(() => new Error('Failed to get PDF file URL'));
      }),
      // Now fetch the file from the URL
      switchMap((fileUrl: string) => {
        if (!fileUrl) {
          return throwError(() => new Error('PDF file URL is empty'));
        }
        const fullFileUrl = fileUrl.startsWith('/') ? environment.MasterApi + fileUrl : fileUrl;
        return this.http.get(fullFileUrl, { responseType: 'blob' }).pipe(
          catchError((downloadError) => {
            console.error('Error downloading PDF file:', downloadError);
            return throwError(() => new Error('Failed to download PDF file'));
          })
        );
      })
    );
  }

  // Helper to trigger file download in the browser
  downloadFile(blob: Blob, filename: string, type: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
