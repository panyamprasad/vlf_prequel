// tslint:disable-next-line:no-shadowed-variable
import {ConfigModel} from '@core/interfaces/config';

// tslint:disable-next-line:no-shadowed-variable
export class ProductConfig implements ConfigModel {
    public config: any = {};
    public settings: any = {
        IFS: {
            partnerList: true,
            loanPurpose: [
                {
                    title: 'Auto Refinance Loan',
                    loanPurpose: 'R',
                    productName: 'auto'
                },
                {
                    title: 'Lease Purchase Loan',
                    loanPurpose: 'L',
                    productName: 'auto'
                },
                {
                    title: 'Company Car Purchase Loan',
                    loanPurpose: 'P',
                    productName: 'auto'
                },

                {
                    title: 'Company Car Purchase (Cash)',
                    loanPurpose: 'C',
                    productName: 'auto'
                },
                {
                    title: 'Lease Purchase (Cash)',
                    loanPurpose: 'LC',
                    productName: 'auto'
                }
            ]
        },
        ABC: {
            partnerList: false,
            loanPurpose: [
                {
                    title: 'Auto Refinance',
                    loanPurpose: 'R',
                    productName: 'auto'
                },
                {
                    title: 'Auto New Purchase',
                    loanPurpose: 'AN',
                    productName: 'auto'
                },
                {
                    title: 'Auto Used Purchase',
                    loanPurpose: 'AU',
                    productName: 'auto'
                },
                {
                    title: 'Credit Card',
                    loanPurpose: 'PC',
                    productName: 'personal'
                },
                {
                    title: 'Personal Loan',
                    loanPurpose: 'PP',
                    productName: 'personal'
                },
                {
                    title: 'Home Equity',
                    loanPurpose: 'HE',
                    productName: 'personal'
                }
            ]
        }
    };

    constructor(environment?: any) {
        if (environment) {
           // this.config = this.settings[environment];
        }
    }
}
