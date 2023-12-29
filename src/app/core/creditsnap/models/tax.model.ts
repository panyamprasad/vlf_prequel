export class TaxModel {
    taxId: number;
    applicationId: number;
    collateralId: number;
    institutionCode: string;
    taxType: string;
    taxCalculated: number;
    loanAmountVariableTaxRate: number;
    highestOfRetailAndLoanAmountVariableTaxRate: number;
    highestOfTradeInAndLoanAmountVariableTaxRate: number;
}
