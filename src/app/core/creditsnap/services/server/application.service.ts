import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {HttpUtilsService} from '@core/_helpers';
import {ApplicationModel, CSPostResponseModel, CustomerConsentModel, SearchModel, TradeLinesModel, ApplicationCreateResponseModel, ApplicantModel} from '@service/models';
import {AuthenticationService} from '@core/auth/authentication.service';
import {Credential} from '@core/auth/credential';
import {ApprovalApplicationModel} from '@service/models/approvalApplication.model';
import { ApplicationResponseModel } from '@service/models/application';

const API_APPLICATION_URL = environment.apiUrl + '/application';
const API_BASIC_AUTH_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {

    public model: any = {grant_type: '', username: '', password: ''};
    public approvalApplicationData: ApprovalApplicationModel;
    public applicationId: number;
    public applicantId: number;
    public applicationCreateResponse?: ApplicationCreateResponseModel = null;
    public applicantDetail: ApplicantModel;
    public application: number;
    public applicant : number;
    public errorCode : number;
    public veteranstatus : string;
    public yellowApplicationStatus : number;
    constructor(
        private authenticationService: AuthenticationService,
        private http: HttpClient,
        private httpUtils: HttpUtilsService) {
    }
    public getApplicantDetail(): ApplicantModel {
        return this.applicantDetail;
    }
    public setApplicantDetail(scope: any): void {
      this.applicantDetail = scope;
    }
    // Create customer app or short app requires only Basic Auth
    // After application success, create authentication
    createApplication(app: ApplicationModel): Observable<CSPostResponseModel> {
        return this.http.post<CSPostResponseModel>(API_BASIC_AUTH_URL + '/create-app',
            app, {headers: {'X-Skip-Interceptor': environment.auth.interceptorSkipHeader}});
    }

    // CREATE =>  POST: add a new short application to the server
    createShortApplication(app: ApplicationModel): Observable<CSPostResponseModel> {
        return this.http.post<CSPostResponseModel>(API_BASIC_AUTH_URL + '/short-app',
            app, {headers: {'X-Skip-Interceptor': environment.auth.interceptorSkipHeader}});
    }

    addConsent(applicationId: number, consent: CustomerConsentModel): Observable<CSPostResponseModel> {
        return this.http.put<CSPostResponseModel>(environment.apiUrl + `/consent/${applicationId}`, consent);
    }

    findApplication(_appId: number): Observable<ApplicationModel> {
        return this.http.get<ApplicationModel>(API_APPLICATION_URL + `/${_appId}`);
    }

    findApplicationStatus(_appId: number): Observable<ApplicationModel> {
        return this.http.get<ApplicationModel>(API_APPLICATION_URL + `/status/${_appId}`);
    }

    updateApplicationStatus(_appId: number, body: any): Observable<any> {
        return this.http.put<any>(API_APPLICATION_URL + `/${_appId}/status`, body);
    }

    searchApplication(search: SearchModel): Observable<CSPostResponseModel> {
        return this.http.post<CSPostResponseModel>(environment.apiUrl + '/search', search,
            {headers: {'X-Skip-Interceptor': environment.auth.interceptorSkipHeader}});
        /* mergeMap(res => {
                 const app = res.applications[0];
                 console.log('searchApplication => ', JSON.stringify(res));
                 this.model.username = app.applicationId;headers: {'X-Skip-Interceptor': environment.auth.interceptorSkipHeader}
                 this.model.grant_type = 'password';
                 this.model.password = search.lastName + search.dob + search.email + search.last4SSN;
                 this.authenticationService.authenticate(this.model).subscribe( token => {
                     console.log('authentication service => ', JSON.stringify(res));
                 });
                return of(res);
            }));*/
    }

    // Get applicants tradelines that are attached to the application
    getApplicationTradeLines(_appId: number, _productType: string): Observable<TradeLinesModel> {
        console.log(' Calling getApplicationTradeLines for ', _productType, _appId);
        return this.http.get<TradeLinesModel>(API_APPLICATION_URL + `/tradeline/${_productType}/${_appId}`);
    }

    unsubscribe(code: any, reasons: string): Observable<any> {
        return this.http.put(API_BASIC_AUTH_URL + `/unsubscribe/${environment.institutionId}?code=${code}`, {reason: reasons},
            {headers: {'X-Skip-Interceptor': environment.auth.interceptorSkipHeader}});
    }

    getCoBorrowerCreditReport(_appId: number): Observable<any> {
        return this.http.get<any>(API_APPLICATION_URL + `/coborrower/creditReport/${_appId}`);
    }

    bundleService(applicationId: number): Observable<any> {
        const multipleAPIs = [];
        multipleAPIs.push({url: environment.apiUrl + `/application/${applicationId}`});
        multipleAPIs.push({url: environment.apiUrl + `/offer/${applicationId}`});
        multipleAPIs.push({url: environment.apiUrl + `/collateral/${applicationId}`});

        return forkJoin(
            multipleAPIs.length
                ? multipleAPIs.map(model =>
                    this.http.get(`${model.url}`).pipe(
                        map(response => of(response)),
                        catchError(e => of({error: e.error})
                        ),
                    ),
                )
                : of({error: {code: '4005', message: 'error'}}),
        ).pipe(
            map((res: any) => {
                return {responses: res, error: (res[0] || {}).error};
            }),
        );
    }

    searchPreApprovalApplicationWithOfferCode(_offerCode: string): Observable<CSPostResponseModel> {
        const url = `${API_BASIC_AUTH_URL}/preapprovalapplication/${environment.institutionId}/search/${_offerCode}`;
        return this.http.get<CSPostResponseModel>(url, {headers: {'X-Skip-Interceptor': environment.auth.interceptorSkipHeader}});
    }

    searchPreApprovalApplicationWithoutOfferCode(params): Observable<CSPostResponseModel> {
        const url = `${API_BASIC_AUTH_URL}/preapprovalapplication/${environment.institutionId}/search`;
        return this.http.get<CSPostResponseModel>(url, {params, headers: {'X-Skip-Interceptor': environment.auth.interceptorSkipHeader}});
    }

    setApplicationId(id : number) {
        this.applicationId = id;
    }

    getApplicationId(): number {return this.applicationId }

    setApplicantId(id : number) {
        console.log("inside setter "+ id);
        this.applicantId = id;
    }

    getApplicantId(): number {return this.applicantId }

    setApplicationCreateResponse(res: ApplicationCreateResponseModel): void {
        this.applicationCreateResponse = res;
    }
    getApplicationCreateResponse(): ApplicationCreateResponseModel {
        return this.applicationCreateResponse;
    }
    saveApplication(payload): Observable<ApplicationCreateResponseModel> {
        const path = environment.apiUrl + '/application/create';
        return this.http.post<ApplicationCreateResponseModel>(path, payload);
    }

    setApplication(id : number) {this.application = id; }

    getApplication(): number {return this.application }

    setApplicant(id : number) {this.applicant = id;}

    getApplicant(): number {return this.applicant }

    setErrorCode(id : number) {this.errorCode = id;}

    getErrorCode(): number {return this.errorCode }

    setVeteranStatus(status : string) {this.veteranstatus = status;}

    getVeteranStatus(): string {return this.veteranstatus }

    setYellowApplication(status : number) {this.yellowApplicationStatus = status;}

    getYellowApplication(): number {return this.yellowApplicationStatus }

}