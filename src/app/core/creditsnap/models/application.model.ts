import {OfferModel} from './offer.model';
import {ApplicantModel} from './applicant.model';
import {CollateralModel} from './collateral.model';
import {FinanceModel} from './finance.model';
import {AutoLoanPurpose} from '@service/enum/process-state.enum';
import {CustomerConsentModel} from '@service/models/customer-consent.model';
import {environment} from '@env/environment';
import { BusinessModel } from './business.model';

export class ApplicationModel {
    applicationId: number;
    preApprovalApplicationId: number;
    clientApplicationNumber: string;
    applicationType: string; // J - Joint, I - Individual
    applicationStatus: string;
    offerStatus: string;  // helps to understand whether offer is generated or not
    collateralStatus: string; // helps to understand whether collateral is added or not
    applicantsStatus: string; // helps to understand whether applicants added or not
    status: string;
    statusShortName: string;
    productName: string;
    loanPurpose: string; // AR - Refinance, AL - Lease Buyout, AF - Fleet Buyout, AN - New Auto Purchase,
    // AU - Used Auto Purchase; HE - Home Equity, HM - Mortgage
    productType: string; // A - Auto,  F - Fleet, H - Home Equity, P - Personal, C - Cash, M - Mortgage
    stipulations: string;
    loanAmount: number;
    ach: boolean;
    emi: number;
    apr: number;
    term: number;
    expireDate: Date;
    appDate: Date;
    offers: OfferModel[];
    applicants: ApplicantModel[];
    business: BusinessModel;
    collateral: CollateralModel;
    finance: FinanceModel;
    partnerId: string; // SAAS customer partner number
    leadId: string;  // Unique customer identifier coming from SaaS customer lead identifier
    referralCode: string;  // this is our SaaS customer's lead partner name or description.
    subID: string; // SAAS customer partner lead Id
    channel: string;
    activity: string;
    activityShortDesc: string;
    consents: CustomerConsentModel[];
    institutionCode: string; // SaaS customer id i.e. IFS for IFS implementation
    leadSource: string;
    underWritingStatus: string;
    loanAgreementStatus: string;
    idVerificationStatus: string;

    constructor() {
        this.applicants = [];
        this.collateral = new CollateralModel();
        this.applicationType = 'INDIVIDUAL';
        this.productType = 'Auto';
        this.appDate = new Date();
        this.channel = 'web';
        this.institutionCode = environment.institutionId;
        this.expireDate = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
        this.consents = [];
    }

    loanPurposeDescription() {
        return AutoLoanPurpose[this.loanPurpose];
    }
}

