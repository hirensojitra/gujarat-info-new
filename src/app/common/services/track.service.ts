import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class trackService {
  private apiUrl = environment.MasterApi + '/track';
  constructor(private http: HttpClient) {}

  saveData(formDataValues: any, imgParam: any): Observable<unknown> {
    const payload = {
      formData: formDataValues,
      imgParam: imgParam
    };
    console.log(payload);
    return this.http.post(this.apiUrl + '/saveData', payload);
  }
  
}
