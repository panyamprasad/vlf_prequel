import {WarrantyModel} from './warranty.model';
import {CollateralPropertyModel} from '@service/models/collateral-property.model';
import {TaxModel} from '@service/models/tax.model';
import {TradelineModel} from '@service/models/tradeline.model';

export class CollateralModel {
    collateralId: number;
    applicationId: number;
    tradeLineId: number;   // this is not mandatory
    vehicleCategory: string;
    vehicleType: string; //  Auto, Motorcycle
    valuationType: string; // 0 - Manual, 1 - Automated
    // Retail, MSRP, Trade-in --- this is not updated by backend, may be forced update from UI
    valueType: string;
    year: string;
    make: string;
    model: string;
    series: string;
    body: string;
    color: string;
    condition: string;
    stateOfRegistration: string;
    ziCodeOfRegistration: string;
    vin: string;
    uid: string;
    makeuid: string;
    modeluid: string;
    seriesuid: string;
    mileage: number;
    autoType: string; // 0 - New , 1 - Used
    imageURL: string;

    msrp: number;
    mileageAdj: number;
    retailValue: number;
    retailValueWithAccessories: number;
    retailPlusVin: number;
    retailPlusVinMileage: number;
    tradeIn: number;
    tradeInWithAccessories: number;
    tradeInPlusVin: number;
    tradeInPlusVinMileage: number;
    // These are used for Refinance to hold the current loan data
    highLoanAmount: number;
    maxLoanAmount: number;
    loanAmount: number;
    monthlyPayment: number;
    currentLoanAPR: number;
    description: string;
    vendor: string;  // Vehicle Valuation Service provider
    protectionPlans: WarrantyModel[];
    protectionPlanId: number;
    status: string;
    isValuationCompleted: boolean = false;
    isVINAvailable: boolean = false;
    isYearAvailable: boolean = false;
    isCollateralAvailable: boolean = false;
    vehicleDescription: string;
    properties: CollateralPropertyModel[];
    hasCollateralProperties: boolean;
    isVINCheckBoxChecked: boolean;
    valuationTS: Date;
    registrationTax: number;
    salesTax: number;
    titleTax: number;
    totalTax: number;
    taxes: TaxModel[];
    tradeLineVOS: TradelineModel[];

    constructor() {
        this.loanAmount = 0;
        this.monthlyPayment = 0;
    }
}
