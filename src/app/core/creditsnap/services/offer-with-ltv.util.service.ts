import {Injectable} from '@angular/core';
import {OfferOptionsVO, TradelineVO} from '@service/vo';
import {LoanAmountVariationsModel, OfferModel, OfferVariationModel, TradelineModel} from '@service/models';
import {UtilsService} from '@core/util-services/utils.service';
import {ApplicationStatusEnum} from '@service/enum/process-state.enum';

/**
 * Provide custom Offer util service for offer related calculations, filter params etc.
 */
@Injectable({
    providedIn: 'root'
})
export class OfferWithLtvUtilService {

    recommendedOfferOptedAch(item: OfferVariationModel = new OfferVariationModel(), optedAch: boolean): OfferVariationModel {
        return calcEMI(item, optedAch);
    }

    findDefaultOffer(_offer: OfferModel): OfferVariationModel {
        // If offers list is one then no need to apply lender relavancy score and return the lender offer
        if (_offer === undefined || _offer === null || _offer.status !== ApplicationStatusEnum.OFFER_ACCEPTED) {
            return null;
        }
        let offerVariation: OfferVariationModel;
        _offer.variation.forEach(function (variation) {
            offerVariation = new OfferVariationModel();
            offerVariation = copyObject(offerVariation, _offer, variation);
            offerVariation.isLenderOfferAch = (_offer.isLenderOfferAch === undefined
                || _offer.isLenderOfferAch === null) ? false : _offer.isLenderOfferAch;
        });
        return offerVariation;
    }

    generateOfferVariations(offers: OfferModel[]): OfferVariationModel[] {
        const offerVariations: OfferVariationModel[] = [];
        let offerVariation: OfferVariationModel;
        if (offers === null || offers === undefined) {
            return null;
        }
        offers.forEach(function (obj) {
            if (obj.variation === null || obj.variation === undefined) {
                return true;
            }
            obj.variation.forEach(function (variation) {
                offerVariation = new OfferVariationModel();
                offerVariation = copyObject(offerVariation, obj, variation);
                offerVariation.isLenderOfferAch = (obj.isLenderOfferAch === undefined || obj.isLenderOfferAch === null)
                    ? false : obj.isLenderOfferAch;
                offerVariations.push(offerVariation);
                offerVariation = null;
            });
        });
        return offerVariations;
    }

}

/**
 * @description Chart monthly loan balance, interest and equity in an HTML <canvas> element.
 *      If called with no arguments then just erase any previously drawn chart.
 * @param loan terms : loan amount, apr, term
 * @return monthly payment
 */
export function calcEMI(item: OfferVariationModel = new OfferVariationModel(), achOpted: boolean, includeTax = false): OfferVariationModel {
    // Convert interest from a percentage to a decimal, and convert from
    // an annual rate to a monthly rate. Convert payment period in years
    // to the number of monthly payments.
    // MonthlyPayment*(1-(1+((APR/12)/100)^-Term)/((APR/12)/100)) -- when we do not know the total loan amount
    // Default ACH applied, the ach option is auto selected on page load.
    // const _loanTerms = Object.assign({}, item);
    if (item.isLenderOfferAch && achOpted) {
        item.withAllAPR = item.apr - item.achDiscountRate;
    } else {
        item.withAllAPR = item.apr;
    }
    if(!item.withAllAPR) {
        debugger;
    }
    item.withAllAPR = Number(item.withAllAPR.toFixed(2));

    const interest = item.withAllAPR / 100 / 12;

    // compute the monthly payment figure
    const x = Math.pow(1 + interest, item.defaultTerm); // Math.pow computes powers
    let loanAmount = item.customizedLoanAmount;
    if (includeTax) {
        loanAmount += item.totalTax;
    }
    const monthly = (loanAmount * x * interest) / (x - 1);


    // If the result is a not finite number, then something wrong with input provided
    if (isFinite(monthly)) {
        // Rounding to 2 decimal places
        item.emi = monthly;
        item.totalAmount = (monthly * item.defaultTerm);
        item.totalInterest = ((monthly * item.defaultTerm) - item.customizedLoanAmount);
        item.isCalcSuccess = true;
    } else {
        // Result was Not-a-Number or infinite, which means the input was
        // incomplete or invalid. Clear any previously displayed output.
        item.isCalcSuccess = false;
    }
    return item;
}


/**
 * @description Calculate dti loan amount based on dti emi
 * @return Offer Variation
 * @param item: OfferVariationModel
 * @param achOpted
 */
export function calcDTILoanAmount(item: OfferVariationModel = new OfferVariationModel(), achOpted: boolean = false): OfferVariationModel {
    if (item.isLenderOfferAch && achOpted) {
        item.withAllAPR = item.apr - item.achDiscountRate;
    } else {
        item.withAllAPR = item.apr;
    }
    item.withAllAPR = Number(item.withAllAPR.toFixed(2));

    const interest = item.withAllAPR / 100 / 12;

    // compute the monthly payment figure
    const x = Math.pow(1 + interest, item.defaultTerm); // Math.pow computes powers

    // const monthly = ((item.customizedLoanAmount + item.totalTax) * x * interest) / (x - 1);
    item.maxDTILoanAmount = item.maxDtiEmi * (x - 1) / (x * interest);

    // item.maxDTILoanAmount = dtiLoanAmount - item.totalTax;
    return item;
}

export function calcMonthlyPayment(_loanTerms: any = {}): any {
    // Convert interest from a percentage to a decimal, and convert from
    // an annual rate to a monthly rate. Convert payment period in years
    // to the number of monthly payments.
    // MonthlyPayment*(1-(1+((APR/12)/100)^-Term)/((APR/12)/100)) -- when we do not know the total loan amount
    const principal = parseFloat(_loanTerms.uptoAmt);
    const interest = parseFloat(_loanTerms.apr) / 100 / 12;
    const payments = parseFloat(_loanTerms.term);

    // compute the monthly payment figure
    const x = Math.pow(1 + interest, payments); // Math.pow computes powers
    const monthly = (principal * x * interest) / (x - 1);

    // If the result is a not finite number, then something wrong with input provided
    if (isFinite(monthly)) {
        // Rounding to 2 decimal places
        _loanTerms.payment = monthly.toFixed(2);
        _loanTerms.totalAmount = (monthly * payments).toFixed(2);
        _loanTerms.totalInterest = ((monthly * payments) - principal).toFixed(2);
        _loanTerms.isCalcSuccess = true;
    } else {
        // Result was Not-a-Number or infinite, which means the input was
        // incomplete or invalid. Clear any previously displayed output.
        _loanTerms.isCalcSuccess = false;
    }
    return _loanTerms;
}

/*
export function monthsBetweenDatesV1(_loanTerms: any = {}): number {
    const firstDate: Date = new Date(2018, 8, 8);
    const secondDate: Date = new Date(2018, 10, 28);
    const fm: number = firstDate.getMonth();
    const fy: number = firstDate.getFullYear();
    const sm: number = secondDate.getMonth();
    const sy: number = secondDate.getFullYear();
    let months = Math.abs(((fy - sy) * 12) + fm - sm);
    const firstBefore: boolean = firstDate > secondDate;
    firstDate.setFullYear(sy);
    firstDate.setMonth(sm);
    firstBefore ? firstDate < secondDate ? months-- : '' : secondDate < firstDate ? months-- : '';
    return months;
}
*/

export function monthsBetweenDates(_startDate: any, _endDate: any): number {

    let roundUpFractionalMonths = false;
    if (typeof _startDate === 'string' || typeof _endDate === 'string') {
        roundUpFractionalMonths = true;
    }

    const startDate: Date = new Date(_startDate);
    const endDate: Date = new Date(_endDate);
    // Calculate the differences between the start and end dates
    const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
    const monthsDifference = endDate.getMonth() - startDate.getMonth();
    const daysDifference = endDate.getDate() - startDate.getDate();

    let monthCorrection = 0;
    // If roundUpFractionalMonths is true, check if an extra month needs to be added from rounding up.
    // The difference is done by ceiling (round up), e.g. 3 months and 1 day will be 4 months.
    if (roundUpFractionalMonths && daysDifference > 0) {
        monthCorrection = 1;
    } else if (!roundUpFractionalMonths && daysDifference < 0) {
        monthCorrection = -1;
    }
    return (yearsDifference * 12 + monthsDifference + monthCorrection);
}

export function calculateAPR(loan: number, payment: number, term: number): number {
    let p = 1;
    let tmp = 1;
    let a = p;
    let b = 0;
    while (Math.abs(tmp) > 0.0001) {
        p = (a - b) / 2 + b;
        tmp = (loan / payment) - (1 - Math.pow(1 + p, -term)) / p;
        if (tmp > 0) {
            a = p;
        } else {
            b = p;
        }
    }
    return Math.pow((1 + p), 12) - 1;
}


export function copyObject(offerVariation: OfferVariationModel, obj: OfferModel, variation: OfferVariationModel): OfferVariationModel {
    const utilService = new UtilsService();
    return utilService.copyObject(offerVariation, obj, variation);
}

function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
