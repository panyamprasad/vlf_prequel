import { Injectable } from '@angular/core';
import { BusinessModel } from '@service/models';

@Injectable({
  providedIn: 'root'
})
export class BusinessDetailService {
public businessDetail: BusinessModel;
  constructor() { }
  public getBusinessDetail(): BusinessModel {
      return this.businessDetail;
  }
  public setBusinessDetail(scope: any): void {
    this.businessDetail = scope;
  }
}
