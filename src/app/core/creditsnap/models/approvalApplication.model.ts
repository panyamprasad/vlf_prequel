export class ApprovalApplicationModel {
    applicationId: number;
    preApprovalApplicationId: number;
    clientApplicationNumber: string;
    applicationType: string; // J - Joint, I - Individual
    applicationStatus: string;
    firstName: string;  // helps to understand whether offer is generated or not
    lastName: string; // helps to understand whether collateral is added or not
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
    homeAddress: string;
    lenderName: string;
    city: string;
    state: string;
    country: string;
    dob: string;

    dobFull: Date;
    orderRecordId: number;
    phone: string;
    institutionCode: string; // SaaS customer id i.e. IFS for IFS implementation
    leadSource: string;
    streetNumber: string;
    zip: string;

    constructor() {

    }
}

