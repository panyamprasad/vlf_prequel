import { ApplicationResponseModel } from "./application";

export class ApplicationCreateResponseModel {
    accessToken?: string;
    applicationStatus?: string;
    applicationId?: number;
    applicantId?: number;
    code?: number;
    message?: string;
    details?: string;
    appOfferStatus?: number;
    applications?: ApplicationResponseModel[];
    constructor() {
    }
}
