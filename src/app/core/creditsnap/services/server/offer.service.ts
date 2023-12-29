import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {CSPostResponseModel, OfferModel, OfferNewModel, OfferNewSubmitModel} from '@service/models';

const API_OFFER_URL = environment.apiUrl + '/offer';
//const API_OFFER_URL = 'http://localhost:8080' + '/offer';
//const API_OFFER_URL = 'http://52.90.145.105:8080/api-pf' + '/offer';

@Injectable({
    providedIn: 'root'
})
export class OfferService {
    public loanAmount: any;
    public monthlyPayment: any;
    public closingCost: any;
    public apr : any;
    public closingCostPercentage : any;
    public intrestRatePercentage : any;
    public offerRateLookUpId : any;
    public status : any;
    public term : any;


    constructor(private http: HttpClient) {
    }

    findOfferNewByApplicationId(_applicationId: number): Observable<OfferNewModel> {
        //return this.http.get<OfferNewModel>("http://localhost:4200/api-pf/offer/43/28");
        return this.http.get<OfferNewModel>(API_OFFER_URL + `/${_applicationId}`);
    }

    updateSelectedNewOffer(offer: OfferNewSubmitModel): Observable<any> {
        //  console.log('update offer =>', JSON.stringify(offer));
        return this.http.post<CSPostResponseModel>(API_OFFER_URL +'/saveOffer', offer);
    }

    setLoanAmount(id : any) {this.loanAmount = id; }
    getLoanAmount(): any {return this.loanAmount }

    setMonthlyPayment(id : any) {this.monthlyPayment = id; }
    getMonthlyPayment(): any {return this.monthlyPayment }

    setclosingCost(id : any) {this.closingCost = id; }
    getclosingCost(): any {return this.closingCost }

    setAPR(id : any) {this.apr = id; }
    getAPR(): any {return this.apr } 

    setClosingCostPercentage(id : any) {this.closingCostPercentage = id; }
    getClosingCostPercentage(): any {return this.closingCostPercentage } 

    setIntrestRatePercentage(id : any) {this.intrestRatePercentage = id; }
    getIntrestRatePercentage(): any {return this.intrestRatePercentage } 

    setOfferRateLookUpId(id : any) {this.offerRateLookUpId = id; }
    getOfferRateLookUpId(): any {return this.offerRateLookUpId } 

    setStatus(id : any) {this.status = id; }
    getStatus(): any {return this.status } 

    setTerm(id : any) {this.term = id; }
    getTerm(): any {return this.term } 
}
