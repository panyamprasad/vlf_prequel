import {Injectable} from '@angular/core';
import {OfferOptionsVO, TradelineVO} from '@service/vo';
import {
    CollateralModel, KeyIdentifierModel,
    LoanAmountVariationsModel,
    OfferModel,
    OfferVariationModel,
    TradelineModel
} from '@service/models';
import {UtilsService} from '@core/util-services/utils.service';
import {ApplicationStatusEnum} from '@service/enum/process-state.enum';
import {calcEMI, calcDTILoanAmount} from '@service/services/offer-with-ltv.util.service';
import {environment} from '@env/environment';
import {TaxModel} from '@service/models/tax.model';
import {OfferVariationTypeModel} from '@service/models/offerVariationType.model';

/**
 * Provide custom Offer util service for offer related calculations, filter params etc.
 */
@Injectable({
    providedIn: 'root'
})
export class OfferUtilService {

    constructor(public utilService: UtilsService) {
        this.utilService = new UtilsService();
    }

    /**
     * @description: Assume that one recommend offer with isOfferSelected status as a true.
     *      If offer is not selected then use the default term logic to identify the selected offer
     * @param obj - offers
     * @return  Single Offer with variations
     */
    findDefaultOffer(_offers: OfferVariationModel[] = []): OfferVariationModel {
        // If offers list is one then no need to apply lender relavancy score and return the lender offer
        if (_offers.length === 1) {
            //  return Object.assign(_offers[0]);
        }
        return Object.assign({}, _offers.find(
            obj => obj.status === ApplicationStatusEnum.OFFER_SELECTED && obj.isVariationSelected === true));
    }

    generateOfferVariations(offers: OfferModel[] = []): any {
        // const offerVariations: OfferVariationTypeModel = new OfferVariationTypeModel();
        const offerVariations: OfferVariationModel[] = [];
        let offerVariation: OfferVariationModel;
        offers.forEach(function (obj) {
            if (obj.variation === null || obj.variation === undefined ||
                obj.maxAvailableCredit === undefined || obj.maxAvailableCredit === null ||
                obj.maxAvailableCredit === 0) {
                return true;
            }
            obj.variation.forEach(function (variation) {
                offerVariation = new OfferVariationModel();
                offerVariation = copyObject(offerVariation, obj, variation);
                offerVariations.push(offerVariation);
                // if (variation.rateType === 'fixed') {
                //     offerVariations.push(offerVariation);
                // } else {
                //
                //     offerVariations.customerOffers.push(offerVariation);
                // }
                offerVariation = null;
            });
        });
        return offerVariations;
    }

    optedACH(item: OfferVariationModel[] = [], optedAch: boolean): OfferVariationModel[] {
        return item.filter(obj => calcEMIWithoutLTV(obj, optedAch));
    }

    termOrAmountChanged(items: OfferVariationModel[] = [], customOptions: OfferOptionsVO): OfferVariationModel {
        const offers = items.filter((el) => {
            return (el.defaultTerm === customOptions.selectedTerm
                && el.maxAvailableCredit >= customOptions.customizedLoanAmount &&
                customOptions.customizedLoanAmount >= this.findMinLoanAmount(el));
        });
        if (offers && offers.length > 0) {
            const offer = offers.reduce((min, p) => p.apr < min.apr ? p : min);
            offer.customizedLoanAmount = customOptions.customizedLoanAmount;
            return calcEMIWithoutLTV(offer, customOptions.optedAch);
        }
    }

    recommendedOfferOptedAch(item: OfferVariationModel = new OfferVariationModel(), optedAch: boolean): OfferVariationModel {
        return calcEMIWithoutLTV(item, optedAch);
    }

    findAvailableOfferOptions(items: OfferVariationModel[] = null, loanAmountVariations: LoanAmountVariationsModel): OfferOptionsVO {
        const offerOptionsVO: OfferOptionsVO = new OfferOptionsVO();
        const defaultMin: number = environment.institutionConfig.minLoanAmount;
        // let lowerPayment: OfferVariationModel;
        // let lowerInterest: OfferVariationModel;
        // let lowestAPR: OfferVariationModel;
        let collateral: CollateralModel;
        let eligibleLoanAmount: number = 9999999; // transaction value
        // let maxAvailableAmountForAllVariations: number = 0;
        // let minAvailableAmountForAllVariations: number = 999999;
        let selectedLenderId: number = 0;
        let selectedTerm: number = loanAmountVariations.selectedTerm || 0;
        let regeneratedOffer: boolean = false;
        let isOfferVariationSelected: boolean = false;
        const fixedRecommendations: any = {
            lowerPayment: null,
            lowerInterest: null,
            lowestAPR: null,
        };
        const variableRecommendations: any = {
            lowerPayment: null,
            lowerInterest: null,
            lowestAPR: null,
        };
        // Step1: Check whether offer is selected by customer or not

        console.log(' eligibleLoanAmount, loanAmountVariations =>', eligibleLoanAmount, loanAmountVariations);
        if (loanAmountVariations.hasCustomerOptedOffer && loanAmountVariations.previouslySelectedOffer) {
            eligibleLoanAmount = loanAmountVariations.customizedLoanAmount;
            selectedLenderId = loanAmountVariations.previouslySelectedOffer.lender.lenderId;
            loanAmountVariations.previouslySelectedOffer.variation.forEach(function (obj) {
                if (obj.isVariationSelected) {
                    regeneratedOffer = true;
                    selectedTerm = obj.defaultTerm;
                }
            });
            console.log(' eligibleLoanAmount, loanAmountVariations =>', eligibleLoanAmount, loanAmountVariations);
        } else if (!loanAmountVariations.loanPurposeConfig.offer.slider) {
            // Step2: it is refi and pay-off amount available then set the eligible loan amount. If slider is false then it implies
            // payoff amount is the loan amount and that means it is a refi transaction
            eligibleLoanAmount = loanAmountVariations.payOffAmount;
            collateral = loanAmountVariations.collateral;
        } else {
            eligibleLoanAmount = loanAmountVariations.customizedLoanAmount;
        }
        console.log(' eligibleLoanAmount 2 =>', eligibleLoanAmount);
        eligibleLoanAmount = eligibleLoanAmount > defaultMin ? eligibleLoanAmount : defaultMin;


        items.forEach((item) => {
            // tslint:disable-next-line:max-line-length
            // TODO - Long Term: include tax into eligible loan amount only for comparison except maxLTVamount without updating original amount.
            /* let eligibleAmountVariation = Math.min(eligibleLoanAmount, item.maxLoanAmount, item.maxAvailableCredit);

              if (loanAmountVariations.isVehicleValuationCompleted && item.maxLTVLoanAmount > 0) {
                  eligibleAmountVariation = Math.min(item.maxLTVLoanAmount, eligibleAmountVariation);
              }*/
            /*
               const eligibleLoanAmountWithTax = eligibleLoanAmount + loanAmountVariations.totalTax;

               let eligibleAmountVariation = Math.min(eligibleLoanAmountWithTax, item.maxLoanAmount, item.maxAvailableCredit);

               if (loanAmountVariations.isVehicleValuationCompleted && item.maxLTVLoanAmount > 0) {
                   const eligibleAmountVariationWithLTV = Math.min(item.maxLTVLoanAmount, eligibleLoanAmount);

                   eligibleAmountVariation = Math.min(eligibleAmountVariationWithLTV, eligibleAmountVariation);

               } */
            // if (loanAmountVariations.selectedTerm != 0 && item.defaultTerm != loanAmountVariations.selectedTerm) {
            //     return;
            // }
            if (!item.maxLoanAmountCalculationDone) {
                if (item.maxDTI < 1) {
                    item.maxDtiEmi = (item.maxDTI - item.preDTI) * item.salary;
                    // Calc maxDTILoanAmount
                    item = calcDTILoanAmount(item);

                    // eligibleAmountVariation = Math.min(item.maxDTILoanAmount, eligibleAmountVariation);
                }

                item.maxAvailableAmount = this.findMaxLoanAmountForVariation(item, loanAmountVariations);
                // Find the min loan amount
                item.minAvailableAmount = this.findMinLoanAmount(item);
                item.maxLoanAmountCalculationDone = true;
            }
            offerOptionsVO.maxLoanAmountForAllVariations = Math.max(offerOptionsVO.maxLoanAmountForAllVariations, item.maxAvailableAmount);
            offerOptionsVO.minLoanAmountForAllVariations = Math.min(offerOptionsVO.minLoanAmountForAllVariations, item.minAvailableAmount);
            // const eligibleAmountVariation = Math.min(eligibleLoanAmount, maxLoanAmount);

            if (eligibleLoanAmount > item.maxAvailableAmount) {
                item.customizedLoanAmount = item.maxAvailableAmount;
            } else {
                item.customizedLoanAmount = eligibleLoanAmount;
            }

            // console.log('item.customizedLoanAmount, minAmount, maxAvailableAmount => ',
            //     item.customizedLoanAmount, minAmount, maxAvailableAmount);

            // include tax to calculate emi
            item.totalTax = loanAmountVariations.collateral && loanAmountVariations.collateral.totalTax || 0;

            // By default ACH discounts are included if lender offers.
            const obj = calcEMI(item, true);
            if (item.maxDTI < 1) {
                item.postDTI = item.preDTI + (obj.emi / item.salary);
            }

            console.log('minAmount: ', item.minAvailableAmount);
            console.log('item.maxAvailableAmount: ', item.maxAvailableAmount);
            console.log('maxAvailableAmountForAllVariations: ', offerOptionsVO.maxLoanAmountForAllVariations);
            console.log('eligibleLoanAmount  ', eligibleLoanAmount);
            // Do not add the variation to cards if the customized loan amount is less than min loan amount.
            if (eligibleLoanAmount < item.minAvailableAmount || eligibleLoanAmount > item.maxAvailableAmount
                || (item.postDTI && item.postDTI < item.minDTI)) {
                console.log('Lender does not offer less than min loan a mount, so skipping =>',
                    eligibleLoanAmount, item.minAvailableAmount, item.maxAvailableAmount);
                return;
            }

            if (loanAmountVariations.loanPurposeConfig.offer.saving && collateral) {
                item.interestSaving = item.emi < collateral.monthlyPayment ? collateral.monthlyPayment - item.emi : null;
                item.aprSaving = item.withAllAPR < collateral.currentLoanAPR ? collateral.currentLoanAPR - item.withAllAPR : null;
            }
            if (obj.rateType === 'variable') {
                // Find out the lowest payment options
                if (!variableRecommendations.lowerPayment) {
                    variableRecommendations.lowerPayment = obj;
                } else if (obj.emi < variableRecommendations.lowerPayment.emi) {
                    variableRecommendations.lowerPayment = obj;
                }
                // Find out the lowest interest option
                if (!variableRecommendations.lowerInterest) {
                    variableRecommendations.lowerInterest = obj;
                } else if (obj.totalInterest < variableRecommendations.lowerInterest.totalInterest) {
                    variableRecommendations.lowerInterest = obj;
                }
                // Find out the lowest APR option
                if (!variableRecommendations.lowestAPR) {
                    variableRecommendations.lowestAPR = obj;
                } else if (obj.apr < variableRecommendations.lowestAPR.apr) {
                    variableRecommendations.lowestAPR = obj;
                }
            } else {
                if (!fixedRecommendations.lowerPayment) {
                    fixedRecommendations.lowerPayment = obj;
                } else if (obj.emi < fixedRecommendations.lowerPayment.emi) {
                    fixedRecommendations.lowerPayment = obj;
                }
                // Find out the lowest interest option
                if (!fixedRecommendations.lowerInterest) {
                    fixedRecommendations.lowerInterest = obj;
                } else if (obj.totalInterest < fixedRecommendations.lowerInterest.totalInterest) {
                    fixedRecommendations.lowerInterest = obj;
                }
                // Find out the lowest APR option
                if (!fixedRecommendations.lowestAPR) {
                    fixedRecommendations.lowestAPR = obj;
                } else if (obj.apr < fixedRecommendations.lowestAPR.apr) {
                    fixedRecommendations.lowestAPR = obj;
                }

            }

            obj.isVariationSelected = (obj.isVariationSelected === null || obj.isVariationSelected === undefined)
                ? false : obj.isVariationSelected;
            if (regeneratedOffer && obj.isOfferSelected && obj.isVariationSelected) {
                console.log('finding the selected offer =>', obj.lender.lenderId, selectedLenderId,
                    obj.offerVariationId, obj.isOfferSelected, obj.isVariationSelected);
                isOfferVariationSelected = true;
            }
            /* if (obj.isVariationSelected) {
                 console.log('selected variation finding the selected offer =>', obj.lender.lenderId, selectedLenderId,
                     obj.isOfferSelected, obj.isVariationSelected, regeneratedOffer, obj.offerId, obj.offerVariationId,
                     obj.defaultTerm, selectedTerm);
                 //   obj.isVariationSelected = (obj.defaultTerm === selectedTerm) ? true : obj.isVariationSelected;
             }*/
            obj.isLenderOfferOnlineRates = true;
            //   offerModel.relevancyScore = variation.relevancyScore === undefined || variation.relevancyScore === null
            //   ? 0 : variation.relevancyScore;
            obj.payOffAmount = loanAmountVariations.payOffAmount;
            obj.hasDownPaymentRequired = false;

            // tslint:disable-next-line:max-line-length
            if (loanAmountVariations.loanPurposeConfig.offer.downPayment && obj.payOffAmount > obj.customizedLoanAmount && obj.payOffAmount > 0) {
                // tslint:disable-next-line:max-line-length
                console.log('obj.downPayment, obj.payOffAmount, obj.customizedLoanAmount ', obj.downPayment, obj.payOffAmount, obj.customizedLoanAmount);
                obj.downPayment = Math.floor((obj.payOffAmount - obj.customizedLoanAmount) / 100) * 100;
                obj.hasDownPaymentRequired = obj.downPayment > 0;
            } else {
                obj.downPayment = 0;
                obj.hasDownPaymentRequired = false;
            }
            // Check whether previously selected offer lender term available or not
            obj.selectedPriorLTV = false;
            if (loanAmountVariations.previouslySelectedOffer) {
                obj.selectedPriorLTV = (loanAmountVariations.previouslySelectedOffer.lender.lenderId === obj.lender.lenderId &&
                    obj.defaultTerm === selectedTerm);
            }
            offerOptionsVO.variations.push(obj);
        });

        console.log('offerOptionsVO variations', offerOptionsVO.variations);
        if (offerOptionsVO.variations.length <= 0) {
            offerOptionsVO.variations = items.filter((item) => {
                // tslint:disable-next-line:max-line-length
                if (offerOptionsVO.maxLoanAmountForAllVariations === item.maxAvailableAmount && item.maxAvailableAmount >= this.findMinLoanAmount(item)) {
                    item.customizedLoanAmount = offerOptionsVO.maxLoanAmountForAllVariations;
                    // By default ACH discounts are included if lender offers.
                    const obj = calcEMI(item, true);

                    if (!loanAmountVariations.loanPurposeConfig.offer.slider && collateral) {
                        item.interestSaving = item.emi < collateral.monthlyPayment ? collateral.monthlyPayment - item.emi : null;
                        item.aprSaving = item.withAllAPR < collateral.currentLoanAPR ? collateral.currentLoanAPR - item.withAllAPR : null;
                    }
                    // Find out the lowest payment options
                    // noinspection DuplicatedCode
                    if (obj.rateType === 'variable') {
                        // Find out the lowest payment options
                        if (!variableRecommendations.lowerPayment) {
                            variableRecommendations.lowerPayment = obj;
                        } else if (obj.emi < variableRecommendations.lowerPayment.emi) {
                            variableRecommendations.lowerPayment = obj;
                        }
                        // Find out the lowest interest option
                        if (!variableRecommendations.lowerInterest) {
                            variableRecommendations.lowerInterest = obj;
                        } else if (obj.totalInterest < variableRecommendations.lowerInterest.totalInterest) {
                            variableRecommendations.lowerInterest = obj;
                        }
                        // Find out the lowest APR option
                        if (!variableRecommendations.lowestAPR) {
                            variableRecommendations.lowestAPR = obj;
                        } else if (obj.apr < variableRecommendations.lowestAPR.apr) {
                            variableRecommendations.lowestAPR = obj;
                        }
                    } else {
                        if (!fixedRecommendations.lowerPayment) {
                            fixedRecommendations.lowerPayment = obj;
                        } else if (obj.emi < fixedRecommendations.lowerPayment.emi) {
                            fixedRecommendations.lowerPayment = obj;
                        }
                        // Find out the lowest interest option
                        if (!fixedRecommendations.lowerInterest) {
                            fixedRecommendations.lowerInterest = obj;
                        } else if (obj.totalInterest < fixedRecommendations.lowerInterest.totalInterest) {
                            fixedRecommendations.lowerInterest = obj;
                        }
                        // Find out the lowest APR option
                        if (!fixedRecommendations.lowestAPR) {
                            fixedRecommendations.lowestAPR = obj;
                        } else if (obj.apr < fixedRecommendations.lowestAPR.apr) {
                            fixedRecommendations.lowestAPR = obj;
                        }

                    }

                    obj.isVariationSelected = (obj.isVariationSelected === null || obj.isVariationSelected === undefined)
                        ? false : obj.isVariationSelected;
                    if (regeneratedOffer && obj.isOfferSelected && obj.isVariationSelected) {
                        console.log('finding the selected offer =>', obj.lender.lenderId, selectedLenderId,
                            obj.offerVariationId, obj.isOfferSelected, obj.isVariationSelected);
                        isOfferVariationSelected = true;
                    }
                    /* if (obj.isVariationSelected) {
                         console.log('selected variation finding the selected offer =>', obj.lender.lenderId, selectedLenderId,
                             obj.isOfferSelected, obj.isVariationSelected, regeneratedOffer, obj.offerId, obj.offerVariationId,
                             obj.defaultTerm, selectedTerm);
                         //   obj.isVariationSelected = (obj.defaultTerm === selectedTerm) ? true : obj.isVariationSelected;
                     }*/
                    obj.isLenderOfferOnlineRates = true;
                    //   offerModel.relevancyScore = variation.relevancyScore === undefined || variation.relevancyScore === null
                    //   ? 0 : variation.relevancyScore;
                    obj.payOffAmount = loanAmountVariations.payOffAmount;
                    obj.hasDownPaymentRequired = false;

                    // tslint:disable-next-line:max-line-length
                    if (loanAmountVariations.loanPurposeConfig.offer.downPayment && obj.payOffAmount > obj.customizedLoanAmount && obj.payOffAmount > 0) {
                        obj.downPayment = obj.payOffAmount - obj.customizedLoanAmount;
                        obj.hasDownPaymentRequired = obj.downPayment > 0;
                    } else {
                        obj.downPayment = 0;
                        obj.hasDownPaymentRequired = false;
                    }
                    // Check whether previously selected offer lender term available or not
                    obj.selectedPriorLTV = false;
                    if (loanAmountVariations.previouslySelectedOffer) {
                        obj.selectedPriorLTV = (loanAmountVariations.previouslySelectedOffer.lender.lenderId === obj.lender.lenderId &&
                            obj.defaultTerm === selectedTerm);
                    }
                    return true;
                }
                return false;
            });
        }

        console.log('offerOptionsVO variations after', offerOptionsVO.variations);

        offerOptionsVO.recommendations = {
            fixed: [],
            variable: []
        };

        if (fixedRecommendations.lowerPayment) {
            fixedRecommendations.lowerPayment.offerCategory = 'Lowest Payment';
            fixedRecommendations.lowerPayment.offerCategoryCode = 'P';
            offerOptionsVO.recommendations.fixed.push(Object.assign({}, fixedRecommendations.lowerPayment));
        }
        if (fixedRecommendations.lowestAPR) {
            fixedRecommendations.lowestAPR.offerCategory = 'Lowest APR';
            fixedRecommendations.lowestAPR.offerCategoryCode = 'A';
            offerOptionsVO.recommendations.fixed.push(Object.assign({}, fixedRecommendations.lowestAPR));
        }

        if (variableRecommendations.lowerPayment) {
            variableRecommendations.lowerPayment.offerCategory = 'Lowest Payment';
            variableRecommendations.lowerPayment.offerCategoryCode = 'P';
            offerOptionsVO.recommendations.variable.push(Object.assign({}, variableRecommendations.lowerPayment));
        }
        if (variableRecommendations.lowestAPR) {
            variableRecommendations.lowestAPR.offerCategory = 'Lowest APR';
            variableRecommendations.lowestAPR.offerCategoryCode = 'A';
            offerOptionsVO.recommendations.variable.push(Object.assign({}, variableRecommendations.lowestAPR));
        }
        if (loanAmountVariations.loanPurposeConfig.lowestInterestCard) {
            if (fixedRecommendations.lowerInterest) {
                fixedRecommendations.lowerInterest.offerCategory = 'Lowest Interest';
                fixedRecommendations.lowerInterest.offerCategoryCode = 'I';
                offerOptionsVO.recommendations.fixed.push(Object.assign({}, fixedRecommendations.lowerInterest));
            }
            if (variableRecommendations.lowerInterest) {
                variableRecommendations.lowerInterest.offerCategory = 'Lowest Interest';
                variableRecommendations.lowerInterest.offerCategoryCode = 'I';
                offerOptionsVO.recommendations.variable.push(Object.assign({}, variableRecommendations.lowerInterest));
            }
        }


        offerOptionsVO.terms = Array.from(new Set(offerOptionsVO.variations.map(
            obj => obj.defaultTerm))).sort((a, b) => a < b ? -1 : 1);
        console.log('offerOptionsVO 123', offerOptionsVO);
        const actualMax = offerOptionsVO.maxLoanAmountForAllVariations;
        const actualMin = offerOptionsVO.minLoanAmountForAllVariations;
        const max = Math.ceil(actualMax / 100) * 100;
        const min = Math.ceil(actualMin / 100) * 100;
        offerOptionsVO.loanAmtOptions = {actualMin, actualMax, min: min, max: max, step: 100};
        // offerOptionsVO.variations.push(offerOptionsVO.selectedVariation);
        if (eligibleLoanAmount > offerOptionsVO.maxLoanAmountForAllVariations) {
            loanAmountVariations.customizedLoanAmount = offerOptionsVO.maxLoanAmountForAllVariations;
        } else {
            loanAmountVariations.customizedLoanAmount = eligibleLoanAmount;
        }
        offerOptionsVO.loanAmountVariations = loanAmountVariations;

        return offerOptionsVO;
    }

    findMinLoanAmount(obj) {
        if (!obj) {
            return 0;
        }
        // min is always min of lender(offer) min and offer variation min
        // There is no min LTV, Min LTV is in rate lookup tables only to facilitate rate lookup
        return Math.max(obj.minAvailableCredit, obj.minLoanAmount);
    }

    findMaxLoanAmountForVariation(item: OfferVariationModel, loanAmountVariations) {
        let maxLoanAmount = Math.min(item.maxLoanAmount, item.maxAvailableCredit);

        if (loanAmountVariations.isVehicleValuationCompleted && item.maxLTVLoanAmount > 0) {
            maxLoanAmount = Math.min(item.maxLTVLoanAmount, maxLoanAmount);
        }

        if (item.maxDTI < 1 && item.maxDTILoanAmount) {
            maxLoanAmount = Math.min(item.maxDTILoanAmount, maxLoanAmount);
        }
        return maxLoanAmount;

    }

    calculateCollateralTax(collateral: CollateralModel, loanAmountVariations: LoanAmountVariationsModel) {
        let totalTax = 0;

        if (!collateral || !collateral.taxes || collateral.taxes.length <= 0) {
            return totalTax;
        }
        if (!collateral.retailValueWithAccessories || !collateral.tradeInWithAccessories) {
            collateral = this.calculateCollateralValueWithAccessories(collateral);
        }
        // tslint:disable-next-line:max-line-length
        const customizedLoanAmount = loanAmountVariations.loanPurposeConfig.offer.slider ? loanAmountVariations.customizedLoanAmount : loanAmountVariations.payOffAmount;
        collateral.taxes.map((tax: TaxModel) => {
            totalTax += tax.taxCalculated + (tax.loanAmountVariableTaxRate * customizedLoanAmount) +
                (tax.highestOfRetailAndLoanAmountVariableTaxRate * Math.max(collateral.retailValueWithAccessories, customizedLoanAmount)) +
                tax.highestOfTradeInAndLoanAmountVariableTaxRate * Math.max(collateral.tradeInWithAccessories, customizedLoanAmount);
        });
        return totalTax;
    }

    calculateCollateralValueWithAccessories(collateral: CollateralModel) {
        let tradeIn: number = 0;
        let retailValue: number = 0;
        if (collateral.properties) {
            collateral.properties.forEach(elem => {
                if (elem.added) {
                    retailValue += elem.retailValue;
                    tradeIn += elem.tradeIn;
                }
                //  console.log('1st accessories : ', elem.accDesc, elem.added);
                return elem;
            });
        }

        collateral.retailValueWithAccessories = collateral.retailPlusVinMileage + retailValue;
        collateral.tradeInWithAccessories = collateral.tradeInPlusVinMileage + tradeIn;
        return collateral;
    }

    getLoanAmountFromCollateral(identifier: KeyIdentifierModel, loanAmountVariations: LoanAmountVariationsModel) {
        let collateral = loanAmountVariations.collateral;
        const sliderDefaultAmountType = identifier.loanPurposeConfig.sliderDefaultAmountType;

        if (sliderDefaultAmountType === 'tradeIn') {
            collateral = this.calculateCollateralValueWithAccessories(collateral);
            return collateral.tradeInWithAccessories;
        } else if (sliderDefaultAmountType === 'retailValue') {
            collateral = this.calculateCollateralValueWithAccessories(collateral);
            return collateral.retailValueWithAccessories;
        } else if (sliderDefaultAmountType === 'loanAmount') {
            return collateral.loanAmount;
        } else {
            return loanAmountVariations.loanPurposeConfig.defaultLoanAmount;
        }

    }

    calcEmiWithTax(offerOptionsVO: OfferOptionsVO) {

        const loanAmountVariations: LoanAmountVariationsModel = offerOptionsVO.loanAmountVariations;

        offerOptionsVO.variations.map(variation => {
            // include tax to calculate emi
            variation.totalTax = loanAmountVariations.collateral && loanAmountVariations.collateral.totalTax || 0;
            calcEMI(variation, true, true);
        });

        offerOptionsVO.recommendations.fixed.map(variation => {
            // include tax to calculate emi
            variation.totalTax = loanAmountVariations.collateral && loanAmountVariations.collateral.totalTax || 0;
            calcEMI(variation, true, true);
        });

        if (offerOptionsVO.recommendations.variable.length > 0) {
            offerOptionsVO.recommendations.variable.map(variation => {
                // include tax to calculate emi
                variation.totalTax = loanAmountVariations.collateral && loanAmountVariations.collateral.totalTax || 0;
                calcEMI(variation, true, true);
            });
        }


    }
}

/**
 * @description Chart monthly loan balance, interest and equity in an HTML <canvas> element.
 *      If called with no arguments then just erase any previously drawn chart.
 * @param loan terms : loan amount, apr, term
 * @return monthly payment
 */
export function calcEMIWithoutLTV(item: OfferVariationModel = new OfferVariationModel(), achOpted: boolean): OfferVariationModel {
    // Convert interest from a percentage to a decimal, and convert from
    // an annual rate to a monthly rate. Convert payment period in years
    // to the number of monthly payments.
    // MonthlyPayment*(1-(1+((APR/12)/100)^-Term)/((APR/12)/100)) -- when we do not know the total loan amount
    // Default ACH applied, the ach option is auto selected on page load.
    const apr = 0;
    // const _loanTerms = Object.assign({}, item);
    if (item.isLenderOfferAch && achOpted) {
        item.withAllAPR = item.apr - item.achDiscountRate;
    } else {
        item.withAllAPR = item.apr;
    }
    /* if (item.customizedLoanAmount === undefined || item.customizedLoanAmount === null
         || item.customizedLoanAmount === 0) {
         item.customizedLoanAmount = item.maxAvailableCredit;
     }*/
    const interest = item.withAllAPR / 100 / 12;

    // compute the monthly payment figure
    const x = Math.pow(1 + interest, item.defaultTerm); // Math.pow computes powers
    const monthly = (item.customizedLoanAmount * x * interest) / (x - 1);

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
