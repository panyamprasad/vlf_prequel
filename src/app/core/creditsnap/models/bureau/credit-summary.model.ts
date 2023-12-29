export class CreditSummaryModel {
    score: number;
    noOfTrades: number = 0;
    openInstallments: number = 0;
    closedInstallments: number = 0;
    openRevolvings: number = 0;
    closedRevolvings: number = 0;
    monthlyOutDebt: number = 0;
    sourceName: string;
    orderDate: Date;
}
