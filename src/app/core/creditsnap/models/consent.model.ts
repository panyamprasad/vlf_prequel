export class ConsentModel {
    applicationId: number;
    consentId: number;
    softInquiryConsent: boolean;
    softInquiryConsentDate: Date;
    marComConsent: boolean;
    marComConsentDate: Date;
    emailVerified: boolean;
    smsVerified: boolean;
    hardInquiryConsent: boolean;
    hardInquiryConsentDate: Date;
    emailUnsubscribe: boolean;
    emailUnsubscribeDate: Date;
    smsUnsubscribe: Date;
    smsUnsubscribeDate: Date;
    offerConsent : boolean;
    reviewConsent : boolean;

    constructor() {
        this.softInquiryConsent = false;
        this.marComConsent = false;
        this.offerConsent = false;
        this.reviewConsent = false;
    }
}
