import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessModel } from '@service/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessDataService {
private businessUrl = " www.myWebService.com/api/products";
  constructor(private http: HttpClient) { }

  getBusinessData(): Observable<BusinessModel>{
    return this.http.get<BusinessModel>(this.businessUrl);
  }
}
