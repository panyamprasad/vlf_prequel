import {Injectable} from '@angular/core';
import {AutoLoanPurpose} from '@service/enum/process-state.enum';

@Injectable({
    providedIn: 'root'
})
export class ApplicationStatusUtilService {

    GetNextScreen(status: string, applicationType: string): string {
        switch (status) {
            case '':
                switch (applicationType) {
                    case 'JOINT':
                        return 'joint';
                    case 'INDIVIDUAL':
                        return 'offer';
                }
                break;
        }
        return 'offer';
    }

    /*GetNextAction(status: string, loanPurpose: string): string {
        console.log(' GetNextAction status =>', status, loanPurpose);
        switch (status) {
            case ApplicationStatusEnum.PRIMARY_APPLICANT_ADDED:
                return 'co-borrower';
            case ApplicationStatusEnum.APPLICATION_SUBMITTED:
            case ApplicationStatusEnum.GENERATE_OFFER_NOT_INITIATED:
                return 'offer-init';
            case ApplicationStatusEnum.OFFER_GENERATION_INITIATED:
                if (loanPurpose === AutoLoanPurpose.R) {
                    return 'trade';
                } else {
                    return 'offer';
                }
            case ApplicationStatusEnum.NO_BUREAU_REPORT:
            case ApplicationStatusEnum.NO_OFFER_FOUND:
                return 'contact';
            case ApplicationStatusEnum.OFFER_GENERATED:
                return 'offer';
            case ApplicationStatusEnum.OFFER_ACCEPTED:
            case ApplicationStatusEnum.OFFER_SELECTED:
                console.log('OFFER_SELECTED returning  additional-info=>');
                return 'additional-info';
            case ApplicationStatusEnum.COLLATERAL_ADDED:
            case ApplicationStatusEnum.ADDITIONAL_INFO_ADDED:
                // This status requires initiating the valuation service
                return 'valuation';
            case ApplicationStatusEnum.COLLATERAL_VALUE_RECEIVED:
                return 'finance';
            case ApplicationStatusEnum.COLLATERAL_REQUEST_FAILED:
                return 'contact';
            case ApplicationStatusEnum.FINANCIAL_SUBMITTED:
            case ApplicationStatusEnum.APPLICATION_WITHDRAWN:
            case ApplicationStatusEnum.CASH_APPLICATION_SUBMITTED:
                // This needs to be revisited; requires directing customer to IFS system link
                return 'ifs';
        }
        return '';
    }*/

    GetProductName(loanPurpose: string): string {
        console.log(' loan purpose=> ', loanPurpose, ' enum loan purpose => ', AutoLoanPurpose.R);
        switch (loanPurpose) {
            case AutoLoanPurpose.R:
                return 'R';
            case AutoLoanPurpose.L:
                return 'L';
            case AutoLoanPurpose.P:
                return 'P';
        }
        return '';
    }

    GetLoanPurpose(loanPurpose: string): string {
        console.log(' loan purpose=> ', loanPurpose, ' enum loan purpose => ', AutoLoanPurpose.R);
        switch (loanPurpose) {
            case 'R':
                return AutoLoanPurpose.R;
            case 'L':
                return AutoLoanPurpose.L;
            case 'P':
                return AutoLoanPurpose.P;
            case 'C':
                return AutoLoanPurpose.C;
            case 'CL':
                return AutoLoanPurpose.LC;
        }
        return '';
    }
}

