import { AttachmentVO } from "./attachmentVO";
import { FreeResponseQuestions } from "./freeResponseQuestions";

export class AboutCustomerModel {
    annualRevenue: any;
    jobTitle: string;
    firstName: string;
    race: string;
    industryName: string;
    isDisclauseEthnicity: string;
    isSpouseVeteran: string;
    ethnicity: string;
    fileUrlBusinessPlan: string;
    fileUrlDrivingLicense: string;
    fileUrlBankAccountStatement: string;
    fileUrlPersonalAccountStatement: string;
    fileUrlBusinessDocs: string;
    businessPlanQuestion1: any;
    businessPlanQuestion2: any;
    businessPlanQuestion3: any;
    freeResponces : FreeResponseQuestions[];
    attachmentVO : AttachmentVO[];
    constructor() {
        this.isDisclauseEthnicity = 'no';
    }
}
