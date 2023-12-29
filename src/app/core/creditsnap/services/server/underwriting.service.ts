import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';

const API_UNDERWRITING_URL = environment.apiUrl + '/underwriting';

@Injectable({
    providedIn: 'root'
})
export class UnderwritingService {

    provisionEndpoint = `https://xo7mcoan2f.execute-api.us-east-1.amazonaws.com/cs/provisions/IFS`;

    constructor(private http: HttpClient) {
    }

    checkUnderwriting(_applicationId: number): Observable<any> {
        return this.http.post<any>(API_UNDERWRITING_URL + `/${_applicationId}`, null);
    }

    getProvisionFeatures(): Observable<any> {
        // const url = `${environment.apiUrl}/provision/${environment.institutionId}/ABC/L`;
        return this.http.get(this.provisionEndpoint);
        // return this.http.get(url);
    }

    getAverUrl(applicationId, applicantId) {
        const url = `${environment.apiUrl}/aver/check/create`;
        const body = {
           // returnUrl: `${environment.baseUrl}/approved?appId=${applicationId}&feature=aver`,
            applicationId,
            applicantId,
            institutionCode: environment.institutionId
        };
        return this.http.post<any>(url, body);
    }

    getDocusignUrl(applicationId) {
        const url = `${environment.apiUrl}/docusign/embeddedurl`;
        const body = {
           // returnUrl: `${environment.baseUrl}/redirect?appId=${applicationId}&feature=docusign`,
            applicationId,
            institutionCode: environment.institutionId
        };
        return this.http.post<any>(url, body);
    }
}
