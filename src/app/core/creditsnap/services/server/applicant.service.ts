import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ApplicantModel, ApplicationModel, CSPostResponseModel, EmploymentModel, ResidenceModel} from '@service/models';

const API_APPLICANT_URL = environment.apiUrl + '/applicant';

@Injectable({
    providedIn: 'root'
})
export class ApplicantService {

    constructor(private http: HttpClient) {
    }

    addApplicant(_applicationId: number, _applicant: ApplicantModel): Observable<CSPostResponseModel> {
        return this.http.post<CSPostResponseModel>(API_APPLICANT_URL + `/${_applicationId}`, _applicant);
    }

    updateApplicant(_applicationId: number, applicant: ApplicantModel): Observable<CSPostResponseModel> {
        return this.http.put<CSPostResponseModel>(API_APPLICANT_URL + `/${_applicationId}`, applicant);
    }
    findApplicant(_applicantId: number): Observable<ApplicantModel> {
        return this.http.get<ApplicantModel>(API_APPLICANT_URL + `/${_applicantId}`).pipe(
            retry(3));
    }

    // the applicants will be part of the data attribute, this can be one or collection
    findLoanApplicants(_applicantionId: number): Observable<ApplicationModel> {
        return this.http.get<ApplicationModel>(API_APPLICANT_URL + `/${_applicantionId}`).pipe(
            retry(3));
    }

    addEmployment(_employment: EmploymentModel, _applicantId: number): Observable<CSPostResponseModel> {
        return this.http.post<CSPostResponseModel>(API_APPLICANT_URL + `/employment/${_applicantId}`, _employment);
    }

    addResidence(residence: ResidenceModel, _applicantId: number): Observable<CSPostResponseModel> {
        return this.http.post<CSPostResponseModel>(API_APPLICANT_URL + `/residence/${_applicantId}`, residence);
    }

    deleteEmp(_empId: number, _applicantId: number): Observable<CSPostResponseModel> {
        return this.http.delete<CSPostResponseModel>(API_APPLICANT_URL + `/employment/${_applicantId}/${_empId}`);
    }
}
