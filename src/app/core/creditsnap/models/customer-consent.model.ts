export class CustomerConsentModel {
    applicationId: number;
    consentId: number;
    name: string;
    value: string;
    consentDate: Date = new Date();
}
