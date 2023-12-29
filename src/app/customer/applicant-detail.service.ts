import { Injectable } from "@angular/core";
import { ApplicantModel } from "@service/models";

@Injectable({
    providedIn: 'root'
  })
  export class ApplicantDetailService {
  public applicantDetail: ApplicantModel;
    constructor() { }
    public getApplicantDetail(): ApplicantModel {
        return this.applicantDetail;
    }
    public setApplicantDetail(scope: any): void {
      this.applicantDetail = scope;
    }
  }