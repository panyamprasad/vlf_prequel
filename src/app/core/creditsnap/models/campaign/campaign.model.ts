import {LoanPurposeModel} from '@service/models/loan-purpose.model';

export class CampaignModel {
    campaignId: number;
    campaignNumber: number;
    campaignType: string;  // Prescreen, ITA
    name: string;
    description: string;
    campaignDate: string;
    scheduleType: string; //schedule, onDemand
    offerExpireDays: number;
    institutionBranchId: number;
    deliveryChannels: string[];
    loanPurpose: LoanPurposeModel[];

    constructor() {
        this.loanPurpose = [];
        this.deliveryChannels = [];
        this.campaignId = 0;
    }
}
