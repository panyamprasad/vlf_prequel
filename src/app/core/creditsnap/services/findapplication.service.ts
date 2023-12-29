import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "@core/auth/authentication.service";
import { HttpUtilsService } from "@core/_helpers";
import { environment } from "@env/environment";
import { ApplicationCreateResponseModel } from "@service/models";
import { FindApplicationModel } from "@service/models/find-application";
import { Observable } from "rxjs";
import { ApplicationService } from "./server/application.service";

@Injectable({
    providedIn: 'root'
})
export class FindApplicationService {

    public model: any = {grant_type: '', username: '', password: ''};
     
    public applicationCreateResponse?: ApplicationCreateResponseModel = null;
    public findApplicationDetails: FindApplicationModel;
    public applicationId : number;
    constructor(
        private authenticationService: AuthenticationService,
        private http: HttpClient,
        private httpUtils: HttpUtilsService,
        private applicationService: ApplicationService,) {
    }
    public getApplicationDetail(): FindApplicationModel {
        return this.findApplicationDetails;
    }
    public setApplicationDetail(scope: any): void {
      this.findApplicationDetails = scope;
    }
     


    setApplicationFindResponse(res: ApplicationCreateResponseModel): void {
        this.applicationCreateResponse = res;
    }
    getApplicationFindResponse(): ApplicationCreateResponseModel {
        return this.applicationCreateResponse;
    }
   
    findMyApplication(payload): Observable<ApplicationCreateResponseModel> {
        const path = environment.apiUrl + '/application/search';
        return this.http.post<ApplicationCreateResponseModel>(path, payload);
    }

    completeApplication(payload): Observable<ApplicationCreateResponseModel> {
        const activityStatus = "SUBMIT";
        const response: ApplicationCreateResponseModel = this.applicationService.getApplicationCreateResponse();
        this.applicationId = response != null ? response.applicationId : this.applicationService.getApplication();
        const path = environment.apiUrl + '/application/finalsubmit/' + this.applicationId +'/'+activityStatus;
        return this.http.post<ApplicationCreateResponseModel>(path, payload);
    }

    completeApplicationBySaveExit(payload): Observable<ApplicationCreateResponseModel> {
        const activityStatus = "SAVE_AND_EXIT";
        const response: ApplicationCreateResponseModel = this.applicationService.getApplicationCreateResponse();
        this.applicationId = response != null ? response.applicationId : this.applicationService.getApplication();
        const path = environment.apiUrl + '/application/finalsubmit/' + this.applicationId +'/'+activityStatus;
        return this.http.post<ApplicationCreateResponseModel>(path, payload);
    }

}