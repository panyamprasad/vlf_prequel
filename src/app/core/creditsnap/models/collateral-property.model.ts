export class CollateralPropertyModel {
    collateralId: number;
    applicationId: number;
    collateralPropertyId: number;   // this is not mandatory
    uid: number;
    accDesc: string;
    accCode: string;
    tradeIn: number;
    retailValue: number;
    loan: number;
    included: boolean;
    added: boolean;
    isBaseValue: boolean = false;

    constructor(accDesc: string, rvalue: number, tradein: number, baseValue: boolean = false) {
        this.tradeIn = tradein;
        this.retailValue = rvalue;
        this.accDesc = accDesc;
        this.isBaseValue = baseValue;
    }
}
