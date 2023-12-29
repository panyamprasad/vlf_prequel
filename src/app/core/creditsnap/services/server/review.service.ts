import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ApplicationCreateResponseModel } from '@service/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  public applicationCreateResponse?: ApplicationCreateResponseModel = null;
  constructor(private http: HttpClient) { }
  setApplicationCreateResponse(res: ApplicationCreateResponseModel): void {
    this.applicationCreateResponse = res;
}
getApplicationCreateResponse(): ApplicationCreateResponseModel {
    return this.applicationCreateResponse;
}
//   saveApplication(payload): Observable<ApplicationCreateResponseModel> {
//     const path = environment.apiUrl + '/application/update';
//     const reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');
//     return this.http.post<ApplicationCreateResponseModel>(path, JSON.stringify(payload), { headers: reqHeaders });
// }
  saveApplication(payload): Observable<ApplicationCreateResponseModel> {
    const path = environment.apiUrl + '/application/update';
    return this.http.post<ApplicationCreateResponseModel>(path, JSON.stringify(payload));
}
}
