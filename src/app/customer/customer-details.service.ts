import { Injectable } from '@angular/core';
import { AboutCustomerModel } from '@service/models';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  public customerDetail: AboutCustomerModel;

  constructor() { }
  public getCustomerDetail(): AboutCustomerModel {
    return this.customerDetail;
}

public setCustomerDetail(scope: any): void {
    this.customerDetail = scope;
}
}
