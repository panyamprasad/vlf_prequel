import {OfferVariationModel} from './offerVariation.model';
import {LenderModel} from './lender.model';

export class OfferNewModel {
    accessToken: any;
    applicationStatus: string;
    applicationId: number;
    applicantId: number;
    code: number;
    message: string;
    details: string;
    appOfferStatus: string;
    offerRateLookUpId: number;
    status: string;
    loanAmount: any;
    intrestRatePercentage: any;
    term: number;
    closingCostPercentage: any;
    apr: number;
    closingCost: any ;
    monthlyPayment: any;
    gender: string;
    veteran: boolean;
    preApprovedLoanAmount: any;

    constructor() {
        this.loanAmount = 0;
    }
}
