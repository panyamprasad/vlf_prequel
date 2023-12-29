import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';

const API_APPLICATION_URL = environment.apiUrl + '/application';
const API_BASIC_AUTH_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ThankYouService {
  
    constructor(
        private http: HttpClient) {
    }
    public dataImport(_appId: any): Observable<any> {
        return this.http.get<any>(API_APPLICATION_URL + `/importmms/${_appId}`);
    }

}