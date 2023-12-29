import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {CSPostResponseModel, FinanceModel} from '@service/models';

const API_COLLATERAL_URL = environment.apiUrl + '/finance';

@Injectable({
    providedIn: 'root'
})
export class FinanceService {
    constructor(private http: HttpClient) {
    }

    financeSubmit(_applicationId: number, finance: FinanceModel): Observable<CSPostResponseModel> {
        return this.http.put<CSPostResponseModel>(API_COLLATERAL_URL + `/${_applicationId}`, finance);
    }
}
