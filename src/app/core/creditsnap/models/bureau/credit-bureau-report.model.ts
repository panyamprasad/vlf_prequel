import {CreditSummaryModel} from '@service/models/bureau/credit-summary.model';
import {ReportModel} from '@service/models/bureau/report.model';

export class CreditBureauReportModel {
    firstName: string;
    lastName: string;
    creditSummary: CreditSummaryModel;
    report: ReportModel;
}
