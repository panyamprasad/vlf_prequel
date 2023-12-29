export const config = {
    defaultLoanAmount: 22500,
    isCoBorrowerRequired: true,
    isCitizenshipRequired: true,
    isPermanentResidentRequired: false,
    defaultRateType: 'fixed',
    consent1: `By providing information about yourself in this pre-qualification request and clicking the "{{submitButtonText}}" button below,
            you consent, acknowledge, and agree to the following:
        <ul>
        <li>Consent for use of <a href="https://www.ifsautoloans.com/disclosures" target="_blank">Electronic Disclosures and
         Communications</a></li>
        <li>Consent for <a href="https://www.ifsautoloans.com/disclosures" target="_blank">Security Policy</a> and
         <a href="https://www.ifsautoloans.com/disclosures" target="_blank">Terms of Use</a></li>
        <li>You are providing express written consent under the Fair Credit Reporting Act to authorize Innovative Funding Services to
         obtain your credit profile from credit reporting agencies. You authorize Innovative Funding Services (IFS) to obtain such
         information solely to evaluate your eligibility for certain loan product pre-qualification offers and acknowledge that this is
          not a final application for credit.</li>
        <li>You are providing express written consent to share your information with up to five (5) selected qualifying lending partners,
         or an authorized third party on their behalf, to communicate with you about loans.</li>
        <li>You agree that you received the IFS’s <a href="https://www.ifsautoloans.com/privacy-policy/" target="_blank">Privacy Policy</a>.
        You also verified that you can read and print or keep these electronicdocuments and you certify that your selections and information
         in this form are true, correct and complete.</li>
        </ul>`,
    cashConsent1: `By providing information about yourself in this pre-qualification request and clicking the "{{submitButtonText}}" button 
        below, you consent, acknowledge, and agree to the following:
        <ul>
        <li>Consent for use of <a href="https://www.ifsautoloans.com/disclosures" target="_blank">Electronic Disclosures and
         Communications</a></li>
        <li>Consent for <a href="https://www.ifsautoloans.com/disclosures" target="_blank">Security Policy</a> and
         <a href="https://www.ifsautoloans.com/disclosures" target="_blank">Terms of Use</a></li>
        <li>You agree that you received the IFS’s <a href="https://www.ifsautoloans.com/privacy-policy/" target="_blank">Privacy Policy</a>.
        You also verified that you can read and print or keep these electronicdocuments and you certify that your selections and information
         in this form are true, correct and complete.</li>
        </ul>`,
    consent2: 'By clicking the "{{submitButtonText}}" I hereby consent to receive email, SMS or other marketing communications from IFS.' +
        ' I further expressly agree that IFS may contact me at the calling numbers providing including my cellular number, via live, ' +
        'auto dialer, prerecorded telephone call, text, chat or email message. I further understand that my telephone company may impose' +
        ' charges on me for these contacts and I am not required to provide this consent to be effective even if my calling numbers or ' +
        'email address are included on a do-not-call list or registry. I understand that my consent to receive calls is not required in ' +
        'order to purchase any goods or services. If you do not want to receive any marketing communications just un-check the box',
    hardInquiryConsentText: 'You are providing written consent under the Fair Credit Reporting Act to authorize qualified lending ' +
        'partners of Innovative Funding Services to <strong>obtain your credit report with a hard credit inquiry</strong> from credit reporting ' +
        'agencies. You acknowledge that this is an application for credit and authorize Innovative Funding Services’ lending ' +
        'partners to obtain such information solely to evaluate your credit application. By clicking this box, you consent, acknowledge, ' +
        'and agree that IFS, on your behalf, may forward your credit application and the results of your application to ' +
        'affiliated/non-affiliated third parties such as other automobile lenders that may assist you in obtaining vehicle financing. ' +
        'You are also consenting to allow our partners to offer you savings and benefits on other products.',
    loanPurpose: {
        R: {
            id: 'R',
            title: 'Auto Refinance',
            productName: 'Auto',
            isMLARequired: true,
            tradeLine: {
                required: true,
                multiselect: false,
                type: 'Auto',
                code: 'AUTO'
            },
            collateral: {
                required: true,
                type: 'Auto'
            },
            offer: {
                slider: false,
                downPayment: true,
                saving: true,
            },
            phone: '512-312-7283',
            minAge: 18,
            minAnnualIncome: 35000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: false,
            sliderDefaultAmountType: '',
            defaultLoanAmount: 22500,
        },
        L: {
            id: 'L',
            title: 'Lease Purchase Loan',
            productName: 'Auto',
            isMLARequired: false,
            tradeLine: {
                required: true,
                multiselect: false,
                type: 'Auto',
                code: 'AUTO_LEASE'
            },
            collateral: {
                required: true,
                type: 'Auto'
            },
            offer: {
                slider: true,
                downPayment: false,
                saving: false, // Also can be used as isRefi indicator
            },
            phone: '844-404-7130',
            minAge: 18,
            minAnnualIncome: 35000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: false,
            sliderDefaultAmountType: 'tradeIn',
            defaultLoanAmount: 22500,
        },
        P: {
            id: 'P',
            title: 'Company Car Purchase Loan',
            productName: 'Auto',
            isMLARequired: false,
            tradeLine: {
                required: false,
                multiselect: false,
                type: 'auto',
                code: ''
            },
            collateral: {
                required: true,
                type: 'Auto'
            },
            offer: {
                slider: true,
                downPayment: false,
                saving: false,
            },
            phone: '844-404-7130',
            minAge: 18,
            minAnnualIncome: 35000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: false,
            sliderDefaultAmountType: 'tradeIn',
            defaultLoanAmount: 22500,
        },
        C: {
            id: 'C',
            title: 'Company Car Purchase (Cash)',
            productName: 'Auto',
            isMLARequired: false,
            tradeLine: {
                required: false,
                multiselect: false,
                type: 'Auto',
                code: ''
            },
            collateral: {
                required: false,
                type: 'Auto'
            },
            offer: {
                slider: false,
                downPayment: false,
                saving: false,
            },
            phone: '1-844-697-9665',
            minAge: 18,
            minAnnualIncome: 100,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission1.',
            lowestInterestCard: false,
            sliderDefaultAmountType: '',
            defaultLoanAmount: 22500,
        },
        LC: {
            id: 'LC',
            title: 'Lease Purchase (Cash)',
            productName: 'Auto',
            isMLARequired: false,
            tradeLine: {
                required: false,
                multiselect: false,
                type: 'Auto',
                code: ''
            },
            collateral: {
                required: false,
                type: 'Auto'
            },
            offer: {
                slider: false,
                downPayment: false,
                saving: false,
            },
            phone: '1-844-697-9665',
            minAge: 18,
            minAnnualIncome: 100,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: false,
            sliderDefaultAmountType: '',
            defaultLoanAmount: 22500,
        },
        AU: {
            id: 'AU',
            title: 'Auto Used Purchase',
            productName: 'Auto',
            isMLARequired: false,
            tradeLine: {
                required: false,
                multiselect: false,
                type: 'Auto',
                code: ''
            },
            collateral: {
                required: true,
                type: 'Auto'
            },
            offer: {
                slider: true,
                downPayment: false,
                saving: false,
            },
            phone: '844-404-7130',
            minAge: 18,
            minAnnualIncome: 35000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: false,
            sliderDefaultAmountType: 'tradeIn',
            defaultLoanAmount: 22500
        },
    }
};
