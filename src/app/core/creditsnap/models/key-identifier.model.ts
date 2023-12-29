import {ApplicationStatusEnum, ApplicationTypeEnum, ProcessStateEnum} from '@service/enum/process-state.enum';
import {CollateralModel} from '@service/models/collateral.model';
import {ApplicationModel} from '@service/models/application.model';
import {UrlObject} from 'url';
import {ApplicantModel} from '@service/models/applicant.model';
import {AppConfigService} from '@service/config/app-config.service';

export class KeyIdentifierModel {
    applicationId: number;
    preApprovalApplicationId: number;
    clientApplicationNumber: string;
    isApplicationChanged: boolean = false; // Applicant add / edit, vehicle
    isProspect: boolean = false;
    isOfferGenerated: boolean = false;
    isOfferGeneratedWithLTV: boolean = false;
    isCreditBureauReportGenerated: boolean = false;
    isReadyForOfferGeneration: boolean = false;
    isValuationCompleted: boolean = false;
    isInvalidVINFromNADA: boolean = false;
    isServiceExecutionSuccess: boolean;
    isPrimaryApplicant: boolean = false;
    isPrimaryApplicantAdded: boolean = false;
    isPrimaryCreditReportAvailable: boolean = false;
    isTradelineSelected: boolean = false;
    isPayOffReceived: boolean = false;
    hasCustomerOptedOffer: boolean = false;
    isAllApplicantsAdded: boolean = false;
    isCoBorrowerApplication: boolean = false;
    isCoBorrowerNeeded: boolean = false;
    isCollateralAvailable: boolean = false;
    isVINAvailable: boolean = false;
    isVehicleYearAvailable: boolean = false;
    isFinanceSubmitFailed: boolean = false;
    isFinanceSubmitSuccess: boolean = false;
    hasCustomerQualifiedForOffer: boolean = false;
    offerGeneratedButtonText: string = 'Generate Offer';
    hasQualifiedRates: boolean = false;
    isCashApplication: boolean = false;
    isAutoLoanApplication: boolean = false;
    isPersonalLoanApplication: boolean = false;
    isHomeEquityLoanApplication: boolean = false;
    isCreditCardApplication: boolean = false;
    isCollateralTradesAvailable: boolean = false;
    isAPIChannel: boolean = true;
    applicationStatus: string;
    offerStatus: string;
    offerId: number;
    offerVariationId: number;
    tradeId: number;
    collateralId: number;
    productName: string;
    productType: string;
    loanPurpose: string;
    applicantType: string;
    applicationType: string;
    currentStatus: ProcessStateEnum;
    applicantFirstName: string;
    applicantLastName: string;
    coborrowerFirstName: string;
    coborrowerLastName: string;
    primaryApplicantId: number;
    primaryApplicantAdded: boolean;
    offerCategory: string;
    offerCategoryCode: string;
    optedAch: boolean;
    navigationAction: string;
    screenAction: string;
    onPageLoad: boolean;
    errorCode: string;
    errorMessage: string;
    tracker: string;
    application: ApplicationModel;
    primaryApplicant: ApplicantModel;
    appConfig: any;
    loanPurposeConfig: any;
    // Temporary data for display
    vehicleDescription: string;

    urlObject: UrlObject;
    referralCode: string;
    subId: string;

    constructor(loading: boolean) {
        this.primaryApplicantAdded = false;
        this.applicationType = 'I';
        this.optedAch = false;
        this.onPageLoad = loading;
        this.vehicleDescription = '';
        this.application = new ApplicationModel();
    }

    isApplicationPresent() {
        if (this.applicationId === undefined || this.applicationId === null || this.applicationId === 0) {
            return false;
        }
        console.log('Application exists =>', this.applicationId);
        return true;
    }

    setOfferStatus(status: string) {
        this.isOfferGenerated = (status === ApplicationStatusEnum.OFFER_GENERATED ||
            status === ApplicationStatusEnum.OFFER_GENERATED_WITH_LTV);
        this.isReadyForOfferGeneration = !this.isOfferGenerated;
    }

    setLoanPurpose(loanPurpose: string) {
        this.loanPurpose = loanPurpose;
        this.loanPurposeConfig = AppConfigService.config.loanPurpose[loanPurpose] || {};
        this.isCashApplication = (loanPurpose === 'LC' || loanPurpose === 'C');
        this.identifyProductType(loanPurpose);
        // this.productName = loanPurpose;
    }

    setCollateralAddedStatus(status: string) {
        // if (this.loanPurposeConfig.tradeLine.required) {
        //     this.isTradelineSelected = (status === ApplicationStatusEnum.TRADELINE_SELECTED
        //         || status === ApplicationStatusEnum.COLLATERAL_TRADELINE_ADDED);
        //     // TODO: clean up later
        //     if (!this.isTradelineSelected) {
        //         this.isTradelineSelected = (status === ApplicationStatusEnum.COLLATERAL_VALUE_RECEIVED ||
        //             status === ApplicationStatusEnum.COLLATERAL_ADDED);
        //     } else {
        //         this.isCollateralTradesAvailable = this.isTradelineSelected;
        //     }
        // }
        this.isCollateralAvailable = (status === ApplicationStatusEnum.COLLATERAL_VALUE_RECEIVED ||
            status === ApplicationStatusEnum.COLLATERAL_ADDED ||
            status === ApplicationStatusEnum.COLLATERAL_PROPERTY_UPDATE);
        this.isValuationCompleted = (status === ApplicationStatusEnum.COLLATERAL_VALUE_RECEIVED ||
            status === ApplicationStatusEnum.COLLATERAL_PROPERTY_UPDATE);
        this.offerGeneratedButtonText = this.isOfferGenerated ? 'Re-Generate Offer' : 'Generate Offer';
    }

    setOfferQualifiedStatus(status: string = this.applicationStatus) {
        // Offer is generated and application status is no offer then not qualified otherwise, qualified.
        this.hasCustomerQualifiedForOffer = this.isOfferGenerated && !(status === ApplicationStatusEnum.NO_OFFER_FOUND
            || this.applicationStatus === ApplicationStatusEnum.NO_BUREAU_REPORT);
    }

    updateOfferStatus(appOfferStatus: string) {
        if (appOfferStatus === undefined || appOfferStatus === null) {
            return;
        }

        this.isOfferGenerated = (appOfferStatus === ApplicationStatusEnum.NO_OFFER_FOUND ||
            appOfferStatus === ApplicationStatusEnum.NO_BUREAU_REPORT ||
            appOfferStatus === ApplicationStatusEnum.GENERATE_OFFER_NOT_INITIATED ||
            appOfferStatus === ApplicationStatusEnum.OFFER_GENERATED ||
            appOfferStatus === ApplicationStatusEnum.OFFER_SELECTED ||
            appOfferStatus === ApplicationStatusEnum.OFFER_ACCEPTED ||
            appOfferStatus === ApplicationStatusEnum.OFFER_GENERATED_WITH_LTV);
        if (this.isOfferGenerated) {
            this.isCreditBureauReportGenerated = true;
        } else {
            this.isCreditBureauReportGenerated = (appOfferStatus === ApplicationStatusEnum.BUREAU_REPORT_RECEIVED);
        }
        this.isReadyForOfferGeneration = !this.isOfferGenerated;
    }

    updateApplicationStatus(status: string) {
        this.applicationStatus = status;
        this.isFinanceSubmitFailed = status === ApplicationStatusEnum.FINANCIAL_SUBMITTED_FAILED;
        this.isFinanceSubmitSuccess = status === ApplicationStatusEnum.FINANCIAL_SUBMITTED;
        this.isAllApplicantsAdded = (status === ApplicationStatusEnum.ALL_APPLICANTS_ADDED);
        this.isPrimaryApplicantAdded = (status === ApplicationStatusEnum.PRIMARY_APPLICANT_ADDED) || this.isAllApplicantsAdded;
        if (this.applicationStatus === ApplicationStatusEnum.NO_BUREAU_REPORT ||
            this.applicationStatus === ApplicationStatusEnum.NO_OFFER_FOUND) {
            this.isOfferGenerated = true;
            this.isCreditBureauReportGenerated = true;
            this.hasCustomerQualifiedForOffer = false;
            this.isReadyForOfferGeneration = false;
        } else if (status === ApplicationStatusEnum.COLLATERAL_VALUE_RECEIVED || status === ApplicationStatusEnum.COLLATERAL_ADDED) {
            this.isOfferGenerated = false;
        }
    }

    updateKeyIdentifier(res: ApplicationModel) {
        this.productName = res.loanPurpose;
        this.isAPIChannel = res.channel === 'API';
        console.log('channel =>', this.isAPIChannel, res.channel);
        this.applicationId = res.applicationId;
        this.preApprovalApplicationId = res.preApprovalApplicationId || null;
        this.clientApplicationNumber = res.clientApplicationNumber;
        this.updateOfferStatus(res.offerStatus);
        this.updateApplicationStatus(res.applicationStatus || res.status);
        this.setApplicationType(res.applicationType);
        this.setLoanPurpose(res.loanPurpose);
        this.setCollateralAddedStatus(res.collateralStatus);
        this.setOfferQualifiedStatus();
        if (!this.isCashApplication) {
            this.hasCustomerQualifiedForOffer = this.isFinanceSubmitSuccess ?
                this.isFinanceSubmitSuccess : this.hasCustomerQualifiedForOffer;
            this.isOfferGenerated = this.isFinanceSubmitSuccess ? this.isFinanceSubmitSuccess : this.isOfferGenerated;
        }
        console.log('updateKeyIdentifier application data =>', this);
    }

    setApplicationType(applicationType: string = this.applicationType) {
        this.isCoBorrowerApplication = applicationType === ApplicationTypeEnum.J;
        this.applicationType = applicationType;
    }

    updateCollateralStatus(collateral: CollateralModel) {
        if (collateral === undefined || collateral === null) {
            this.isCollateralAvailable = this.isValuationCompleted = this.isVINAvailable = false;
            return;
        }
        this.collateralId = collateral.collateralId;
        this.isTradelineSelected = (collateral.tradeLineId > 0 || collateral.loanAmount > 0);
        this.isValuationCompleted = (collateral.valuationType === 'AUTOMATED') &&
            (collateral.status === ApplicationStatusEnum.COLLATERAL_VALUE_RECEIVED || collateral.status === ApplicationStatusEnum.COLLATERAL_PROPERTY_UPDATE);
        this.isVINAvailable = !(collateral.vin === undefined || collateral.vin === null || collateral.vin === '');
        this.isVehicleYearAvailable = !(collateral.year === undefined || collateral.year === null || collateral.year === '');
        this.isCollateralAvailable = (collateral.status === ApplicationStatusEnum.COLLATERAL_VALUE_RECEIVED ||
            collateral.status === ApplicationStatusEnum.COLLATERAL_REQUEST_FAILED) || this.isVINAvailable
            || this.isVehicleYearAvailable;
        this.vehicleDescription = this.isValuationCompleted || this.isVehicleYearAvailable ? collateral.year + ' '
            + collateral.make + ' ' + collateral.model + ' ' + collateral.body : '';
        this.offerGeneratedButtonText = this.isOfferGenerated ? 'Re-Generate Offer' : 'Generate Offer';
    }

    updateURLIdentifiers(obj: UrlObject) {
        this.urlObject = obj;
        const urlParams = this.urlObject.pathname.split(/[/;?]+/);
        this.referralCode = '';
        if (typeof urlParams === 'object' && urlParams.length >= 2) {
            this.referralCode = urlParams[2];
            if (urlParams.length > 3) {
                const loanPurpose = urlParams[3].toUpperCase();
                if (AppConfigService.config.loanPurpose.hasOwnProperty(loanPurpose)) {
                    this.loanPurpose = loanPurpose;
                    this.loanPurposeConfig = AppConfigService.config.loanPurpose[loanPurpose] || {};
                }
            }
        }
        this.subId = '';
        if (typeof this.urlObject === 'object' && typeof this.urlObject.query === 'object') {
            this.subId = this.urlObject.query.subID;
            if (this.subId === undefined || this.subId === null) {
                this.subId = this.urlObject.query.subId;
            }
            if (this.subId === undefined || this.subId === null) {
                this.subId = this.urlObject.query.subid;
            }
        }

        console.log(' lead and referral code =>', this.referralCode, this.subId);
    }

    updateApplicant(applicants: ApplicantModel[]) {
        if (applicants === undefined || applicants === null || applicants.length === 0) {
            return;
        }
        this.primaryApplicant = applicants[0];
        this.applicantFirstName = this.primaryApplicant.firstName;
        this.applicantLastName = this.primaryApplicant.lastName;
    }

    identifyProductType(loanPurpose: string): string {
        this.loanPurposeConfig = AppConfigService.config.loanPurpose[loanPurpose] || {};
        const productName = (this.loanPurposeConfig.productName || '').toLowerCase();
        this.isAutoLoanApplication = productName === 'auto';
        this.isCreditCardApplication = productName === 'credit_card';
        this.isPersonalLoanApplication = productName === 'personal';
        this.isHomeEquityLoanApplication = productName === 'home';
        this.productType = this.loanPurposeConfig.productName;
        return this.productType;
    }
}
