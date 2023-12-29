import {Pipe, PipeTransform} from '@angular/core';
import {ApplicationStatusEnum} from '@service/enum/process-state.enum';

@Pipe({
    name: 'mAppCodesDesc'
})
export class ApplicationCodesDescription implements PipeTransform {
    // a - Application Status
    // b - Borrower Applicant Type
    // c - channel web or phone
    // l - Loan Purpose
    // p - Priority
    // t - Application Type
    // at - Short Application Type
    // pt - Product Type
    transform(value: string, args1: string, args2: any): any {
        if (value === undefined || value === null) {
            return value;
        }
        // const options = args.split(':');
        // console.log(' options => ', value, args1, args2);
        let optionStatus: boolean = true;
        if (args1 === undefined || args1 === null) {
            optionStatus = false;
        }
        switch (args1) {
            case 'a':
                return this.applicationStatus(value, optionStatus);
            case 'b':
                return this.applicantType(value);
            case 'c':
                return this.applicationChannel(value);
            case 'l':
                return this.loanPurpose(value);
            case 'p':
                if (args2 === null || args2 === undefined) {
                    // console.log('****************reminder value in hours: ', value, args2, args1);
                    return '';
                }
                return this.applicationPriority(value, args2);
            case 't':
                return this.applicationType(value);
            case 'at':
                return this.applicationTypeIcon(value);
            case 'pt':
                return this.productType(value);
            default:
                return value;
        }
    }

    productType(value) {
        switch (value) {
            case 'R':
            case 'L':
            case 'P':
            case 'C':
            case 'LC':
            case 'AN':
            case 'AU':
                return 'auto';
            case 'PC':
                return 'card';
            case 'PP':
                return 'personal';
            case 'HR':
            case 'HE':
                return 'equity';
            case 'HR':
            case 'HP':
                return 'mortgage';
            case undefined:
            case null:
            default:
                return 'other';
        }
    }
    applicationChannel(value) {
        switch (value) {
            case 'Phone':
            case 'phone':
                return 'call';
            case 'web':
            case 'Web':
                return 'language';
            case 'API':
            case 'api':
                return 'code';
            default:
                return 'l';
        }
    }

    applicationPriority(value, reminderDate) {
        switch (value) {
            case 'H':
            case 'h':
                return 'priority_high';
            case 'r':
            case 'R':
                const remdate = new Date(reminderDate);
                const hours = Math.abs((remdate.getTime() - (new Date()).getTime()) / 3600000);
                //  console.log('999999999 reminder value in hours: ', value, hours, reminderDate);
                // Convert back to days and return
                if (hours <= 48 || hours < -49) {
                    return 'alarm';
                }
                return '';
            default:
                return 'l';
        }
    }

    applicationTypeIcon(value) {
        switch (value) {
            case 'I':
                return 'account_circle';
            case 'J':
                return 'supervisor_account';
            default:
                return value;
        }
    }

    applicationType(value) {
        switch (value) {
            case 'I':
                return 'Individual';
            case 'J':
                return 'Joint with Co-borrower';
            default:
                return value;
        }
    }

    applicantType(value) {
        switch (value) {
            case 'P':
                return 'Primary';
            case 'S':
                return 'Co-Borrower';
            default:
                return value;
        }
    }

    loanPurpose(value) {
        switch (value) {
            case 'LC':
                return 'Lease Purchase Cash';
            case 'L':
                return 'Lease Purchase';
            case 'R':
                return 'Auto Refinance';
            case 'C':
                return 'Company Car Purchase Cash';
            case 'P':
                return 'Company Car Purchase';
            case 'AN':
                return 'Auto New Purchase';
            case 'AU':
                return 'Auto Used Purchase';
            case 'PC':
                return 'Credit Card';
            case 'PP':
                return 'Personal Loan';
            case 'HR':
                return 'Home Refinance';
            case 'HE':
                return 'Home Equity';
            case 'HP':
                return 'Home Purchase - Mortgage';
            case undefined:
            case null:
            default:
                return 'other';
        }
    }

    applicationStatus(value, option: boolean = false) {
        switch (value) {
            case ApplicationStatusEnum.PRIMARY_APPLICANT_ADDED:
            case ApplicationStatusEnum.APPLICATION_SUBMITTED:
            case ApplicationStatusEnum.OFFER_GENERATION_INITIATED:
            case ApplicationStatusEnum.GENERATE_OFFER_NOT_INITIATED:
                if (option) {
                    return 'incomplete';
                }
                return 'Incomplete';
            case ApplicationStatusEnum.NO_OFFER_FOUND:
                if (option) {
                    return 'no-offer';
                }
                return 'No Offer';
            case ApplicationStatusEnum.NO_BUREAU_REPORT:
                if (option) {
                    return 'no-offer';
                }
                return 'No Bureau Report';
            case ApplicationStatusEnum.TRADELINE_SELECTED:
            case ApplicationStatusEnum.OFFER_GENERATED:
                if (option) {
                    return 'generated';
                }
                return 'Offer Generated';
            case ApplicationStatusEnum.OFFER_SELECTED:
            case ApplicationStatusEnum.OFFER_ACCEPTED:
            case ApplicationStatusEnum.COLLATERAL_ADDED:
            case ApplicationStatusEnum.ADDITIONAL_INFO_ADDED:
            case ApplicationStatusEnum.COLLATERAL_VALUE_RECEIVED:
            case ApplicationStatusEnum.OFFER_GENERATED_WITH_LTV:
            case ApplicationStatusEnum.COLLATERAL_REQUEST_FAILED:
                if (option) {
                    return 'accepted';
                }
                return 'Offer Accepted';
            case ApplicationStatusEnum.FINANCIAL_SUBMITTED_FAILED:
                if (option) {
                    return 'final-submit-failed';
                }
                return 'Final Submit Failed';
            case ApplicationStatusEnum.FINANCIAL_SUBMITTED:
                if (option) {
                    return 'final-submit';
                }
                return 'Final Submit';
            case ApplicationStatusEnum.PROSPECT_APPLICATION:
                return 'Prospect';
            case undefined:
            case null:
            default:
                return 'Unknown';
        }
    }
}
