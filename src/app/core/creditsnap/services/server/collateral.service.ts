import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {CollateralModel, CSPostResponseModel} from '@service/models';
import {AppConfigService} from "@service/config/app-config.service";

const API_COLLATERAL_URL = environment.apiUrl + '/collateral';

@Injectable({
    providedIn: 'root'
})
export class CollateralService {
    appConfig = AppConfigService.config;

    constructor(private http: HttpClient) {
    }

    // This service can act as adding new collateral or updating the existing.
    // If collateral entity has collateralId then backend updates the existing collateral entity
    addCollateral(collateral: CollateralModel, _applicationId: number): Observable<CSPostResponseModel> {
        return this.http.post<CSPostResponseModel>(API_COLLATERAL_URL + `/${_applicationId}`, collateral);
    }

    getCollateralLTV(_applicationId: number): Observable<CollateralModel> {
        return this.http.get<CollateralModel>(API_COLLATERAL_URL + `/ltv/${_applicationId}`);
    }

    // Each application has single collateral, so read data attribute for the collateral entity
    getCollateral(_applicationId: number): Observable<CollateralModel> {
        return this.http.get<CollateralModel>(API_COLLATERAL_URL + `/${_applicationId}`);
    }

    generateCollateralLTV(_applicationId: number): Observable<CSPostResponseModel> {
        return this.http.put<CSPostResponseModel>(API_COLLATERAL_URL + `/valuation/${_applicationId}`, {});
    }
    getCollateralYears(): Observable<any> {
        return this.http.get<any>(API_COLLATERAL_URL + `/lookup/years`);
    }
    getCollateralMakesByYear(_yearCode: number): Observable<any> {
        return this.http.get<any>(API_COLLATERAL_URL + `/lookup/${_yearCode}/make`);
    }
    getCollateralSeriesByMakesAndYear(_yearCode: number, _makeCode: number): Observable<any> {
        return this.http.get<any>(API_COLLATERAL_URL + `/lookup/${_yearCode}/${_makeCode}/series`);
    }
    getCollateralBodiesBySeriesAndMakesAndYear(_yearCode: number, _makeCode: number, _seriesCode: number): Observable<any> {
        return this.http.get<any>(API_COLLATERAL_URL + `/lookup/${_yearCode}/${_makeCode}/${_seriesCode}/bodies`);
    }

    upsertTradeLines(collateral: CollateralModel, _applicationId: number): Observable<CSPostResponseModel> {
        return this.http.post<CSPostResponseModel>(  `${API_COLLATERAL_URL}/tradelines/${_applicationId}`, collateral);
    }

    getCollateralLoanAmount(productType: string, _applicationId: number, defaultLoanAmount: number): Observable<CSPostResponseModel>  {
        return this.http.post<CSPostResponseModel>(  `${API_COLLATERAL_URL}/tradelines/${_applicationId}/product/${productType}/default/${defaultLoanAmount}`, {});
    }

    addCollateralAddress(addressVO) {
        return this.http.post<CSPostResponseModel>(  `${environment.apiUrl}/applicant/address/${addressVO.applicantId}`, addressVO);
    }
}
