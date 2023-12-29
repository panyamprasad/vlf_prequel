import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApplicationStatusEnum} from '@service/enum/process-state.enum';
import {ApplicationModel, KeyIdentifierModel} from '@service/models';
import {ApplicationStatusUtilService} from '@service/services/application-status.util.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SharedkeyDataService {
    keyIdentifier = new BehaviorSubject<KeyIdentifierModel>(new KeyIdentifierModel(true));
    keyIdentifier$ = this.keyIdentifier.asObservable();
    constructor(
        private appStatusUtilService: ApplicationStatusUtilService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
        this.announceIdentifierChanges(new KeyIdentifierModel(true));
    }

    announceIdentifierChanges(identifier: KeyIdentifierModel) {
        this.keyIdentifier.next(identifier);
    }

    initializeIdentifier(identifier: KeyIdentifierModel): KeyIdentifierModel {
        if (identifier === undefined || identifier === null) {
            identifier = new KeyIdentifierModel(true);
        } else {
            identifier.onPageLoad = false;
        }
        return identifier;
    }

    isIdentifierAnnounced(identifier: KeyIdentifierModel): boolean {
        return !(identifier === undefined || identifier === null);
    }

    performApplicationNextAction(identifier: KeyIdentifierModel): any {
        let navigationAction: string = '';
        let screenAction: string = '';
        let errorCode: string = '';
        console.log('performApplicationNextAction key identifier =>', identifier);
        switch (identifier.applicationStatus) {
            case ApplicationStatusEnum.BUSINESS_ADDED:
                navigationAction = '/applicant';
                screenAction = 'applicant';
                break;
            case ApplicationStatusEnum.PROSPECT_APPLICATION:
            case ApplicationStatusEnum.GENERATE_OFFER_NOT_INITIATED:
                navigationAction = '/';
                screenAction = '';
                break;
            case ApplicationStatusEnum.PRIMARY_APPLICANT_ADDED:
                navigationAction = '/app';
                screenAction = 'co-borrower';
                break;
            case ApplicationStatusEnum.APPLICANT_SUBMITTED:
                navigationAction = '/offer';
                screenAction = 'offer';
                break;
            case ApplicationStatusEnum.APPLICATION_SUBMITTED:
                if (identifier.isCashApplication) {
                    navigationAction = '/thankyou';
                    screenAction = 'thankyou';
                    errorCode = 'CASH_APPLICATION';
                } else {
                    navigationAction = '/offer';
                    screenAction = 'GENERATE_OFFER_NOT_INITIATED';
                }
                break;
            case ApplicationStatusEnum.NO_OFFER_FOUND:
                navigationAction = '/thankyou';
                screenAction = 'thankyou';
                errorCode = identifier.offerStatus || 'NO_OFFER';
                break;
            case ApplicationStatusEnum.NO_BUREAU_REPORT:
                navigationAction = '/thankyou';
                screenAction = 'thankyou';
                errorCode = 'NO_OFFER';
                break;
            case ApplicationStatusEnum.TRADELINE_SELECTED:
                if (!identifier.loanPurposeConfig.collateral.required) {
                    screenAction = 'offer';
                    navigationAction = '/offer';
                } else {
                    screenAction = 'trade';
                    navigationAction = '/trade';
                }
                break;
            case ApplicationStatusEnum.BUREAU_REPORT_RECEIVED:
                if (identifier.loanPurposeConfig.tradeLine.required) {
                    screenAction = 'trade';
                    navigationAction = '/trade';
                }
                break;
            case ApplicationStatusEnum.COLLATERAL_ADDED:
            case ApplicationStatusEnum.ADDITIONAL_INFO_ADDED:
                if (identifier.isOfferGenerated) {
                    navigationAction = '/valuation';
                    screenAction = 'valuation';
                } else {
                    navigationAction = '/offer';
                    screenAction = 'offer';
                }
                // Initiate the collateral valuation
                break;
            case ApplicationStatusEnum.COLLATERAL_VALUE_RECEIVED:
                if (identifier.isOfferGenerated) {
                    navigationAction = '/manage-offer';
                    screenAction = 'manage-offer';
                }  else {
                    navigationAction = '/offer';
                    screenAction = 'offer';
                }
                break;
            case ApplicationStatusEnum.OFFER_GENERATED:
                if ((identifier.loanPurposeConfig.tradeLine.required && !identifier.isTradelineSelected) || (identifier.loanPurposeConfig.collateral.required && !identifier.isValuationCompleted)) {
                    screenAction = 'trade';
                    navigationAction = '/trade';
                } else {
                    screenAction = 'manage-offer';
                    navigationAction = '/manage-offer';
                }
                // this.router.navigate(['/offer'], {relativeTo: this.activatedRoute});
                break;
            case ApplicationStatusEnum.OFFER_SELECTED:
                navigationAction = '/review';
                screenAction = 'review';
                break;
            // Send customer to offer screen
            case ApplicationStatusEnum.OFFER_ACCEPTED:
                // Send customer to additional info screen
                navigationAction = '/review';
                screenAction = 'review';
                break;
            case ApplicationStatusEnum.ADDITIONAL_DATA_ADDED:
                // Send customer to additional info screen
                navigationAction = '/reviewdata';
                screenAction = 'reviewdata';
                break;

            case ApplicationStatusEnum.OFFER_GENERATED_WITH_LTV:
                // Send customer to finance screen screen
                navigationAction = '/manage-offer';
                screenAction = 'manage-offer';
                break;
            case ApplicationStatusEnum.FINANCIAL_SUBMITTED_FAILED:
                navigationAction = '/thankyou';
                screenAction = 'summary';
                errorCode = 'FINAL_SUBMIT_FAILED';
                break;
            case ApplicationStatusEnum.FINANCIAL_SUBMITTED:
                // Send the application to loan summary / vendor screen
                navigationAction = '/thankyou';
                screenAction = 'vendor';
                errorCode = 'FINAL_SUBMIT';
                break;
            case ApplicationStatusEnum.COLLATERAL_REQUEST_FAILED:  // Initiate the collateral valuation
            // May be a situation where offer generate request initiated but engine failed
            // how to handle at UI, shall we present the contact us screen
                screenAction = 'trade';
                navigationAction = '/trade';
                break;
            case undefined:
            case null:
            default:
                navigationAction = '/thankyou';
                screenAction = 'thankyou';
                errorCode = 'EXCEPTION';
                break;
        }
        console.log('Key method to identify somehow we land at => ', {
            navigationAction: navigationAction,
            screenAction: screenAction,
            errorCode: errorCode
        });
        console.log('navigation => navigationAction', navigationAction, screenAction);
        return {navigationAction: navigationAction, screenAction: screenAction, errorCode: errorCode};
    }

    copyKeyIdentifier(app: ApplicationModel, identifier: KeyIdentifierModel): KeyIdentifierModel {
        console.log('copy key identifier started =>', new Date().getTime());
        identifier.applicationId = app.applicationId;
        identifier.applicationType = app.applicationType;
        identifier.applicationStatus = app.status;
        identifier.loanPurpose = app.loanPurpose;
        identifier.productType = identifier.productName = identifier.identifyProductType(app.loanPurpose);

        if (!(app.applicants === undefined || app.applicants === null)) {
            if (app.applicants.length > 0) {
                identifier.applicantFirstName = app.applicants[0].firstName;
            }
        }
        identifier.optedAch = app.ach;
        identifier.tracker = 'copyKeyIdentifier';
        console.log('copyKeyIdentifier completed and triggered the subscribe => ', new Date().getTime());
        return identifier;
    }

    mapErrorCodes(_error: any, identifier: KeyIdentifierModel = new KeyIdentifierModel(false)) {
        console.log('something happened, error is thrown => ', _error);
        let error = _error;
        if (_error instanceof HttpErrorResponse) {
            error = _error.error;
        }
        identifier.errorCode = error.code;
        identifier.errorMessage = error.message;
        identifier.tracker = 'errorCodes';
        // this.keyIdentifier.next(this.keyIdentifierData);
        switch (error.code) {
            case 9001:
            case 9002:
            // Exception Occurred while getting Bureau Report from TransUnion.
            // 700 API call failed.
            case 9003:
            // Exception Occurred while getting Bureau Report from 700.
            case 9004:
            // Drools PostBureau PreEligibility API call failed.
            case 9006:
            // Exception Occurred while executing PostBureau PreEligibility in Drools.
            case 9007:
            // Drools Rates API call failed.
            case 9008:
            // Exception Occurred while executing Rate rules in Drools.
            case 8888:
                // Unexpected Error Occurred while processing request.
                identifier.errorCode = 'EXCEPTION';
                this.router.navigate(['/thankyou']);
                break;
            case 6003:
                // Date format Exception occurred
                break;
            case 7001:
            case 7002:
                identifier.errorCode = 'NO_VIN';
                this.router.navigate(['/trade']);
                console.log('Navigating to vehicle screen...');
                break;
            case 5001:
            case 5002:
                // input or Mandatory Field is Null
                break;
            case 5003:
                // input or Mandatory Field is Null
                break;
            case 5004:
                this.router.navigate(['/thankyou']);
                identifier.errorCode = 'NO_OFFER';
                console.log('Navigating to vehicle screen...');
                break;
        }
        this.keyIdentifier.next(identifier);
    }

    GetObjectPropertyValue<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }
}
