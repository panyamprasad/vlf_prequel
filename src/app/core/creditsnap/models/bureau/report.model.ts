import {JudgmentModel} from '@service/models/bureau/judgment.model';
import {TradelineModel} from '@service/models';

export class ReportModel {
    isSecurityFreeze: boolean;
    isFileSurpression: string;
    dti: number;
    pti: number;
    score: number;
    deceased: string;
    ofacNameScreenStatus: string;
    highRiskFraudAlert: string;
    tradeLineVOS: TradelineModel[];
    judments: JudgmentModel[];
    collections: any [];
    chargeOffs: any [];
}
