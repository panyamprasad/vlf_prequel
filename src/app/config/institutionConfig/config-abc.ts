export const config = {
    defaultLoanAmount: 22500,
    isCoBorrowerRequired: true,
    isCitizenshipRequired: true,
    isPermanentResidentRequired: false,
    defaultRateType: 'fixed',
    consent1: `By continuing with the pre-qualification process, you understand and agree that you are authorizing PeopleFund to obtain a consumer report from TransUnion. PeopleFund will use your consumer report from TransUnion to authenticate your identity and to match you with a suitable loan offer. You understand that this is a soft pull of your consumer report and will not affect your credit score.`,
    cashConsent1: `By providing information about yourself in this pre-qualification request and clicking the "{{submitButtonText}}" button 
        below, you consent, acknowledge, and agree to the following:
        <ul>
        <li>Consent for use of <a href="https://www.abc.creditsnap.com/disclosures" target="_blank">Electronic Disclosures and
         Communications</a></li>
        <li>Consent for <a href="https://www.abc.creditsnap.com/disclosures" target="_blank">Security Policy</a> and
         <a href="https://www.abc.creditsnap.com/disclosures" target="_blank">Terms of Use</a></li>
        <li>You agree that you received the ABC’s <a href="https://www.abc.creditsnap.com/privacy-policy/" target="_blank">Privacy Policy</a>.
        You also verified that you can read and print or keep these electronicdocuments and you certify that your selections and information
         in this form are true, correct and complete.</li>
        </ul>`,
    consent2: 'PeopleFund collects personal contact information from customers who visit this site and register with our Contact Information service. By your interaction and submission of your personal information on our website, you acknowledge that PeopleFund has the right to use this information for internal purposes only. Any personal information acquired by PeopleFund is controlled primarily by PeopleFund and not sold to a third party. Your information will not be shared or sold to third parties for any purpose. PeopleFund adds your information to its communication database for our Outreach and education purposes. Your contact information will be used only to reach you regarding the request you make on our website.'
        ,
    consent3: 'By continuing with this offer and application, I (we) authorize PeopleFund and/or its agents to make any investigations of credit either directly or through any agency which has credit information. I understand that there are normal costs associated with loan underwriting. All approved loans are subject to an origination fee of up to 3.5% of the loan amount. I agree to inform PeopleFund immediately of any pending or significant changes in my financial condition. I allow PeopleFund staff to share my business information with PeopleFund board and investment committee. If approved, all PeopleFund clients are required to enroll in auto-debit payments. To the best of my knowledge, I certify that the information in this application is true and accurate. Any intentional information will render the applicant ineligible for a PeopleFund loan and may be subject to legal action.',
    consent4: 'By submitting this application, I (we) authorize PeopleFund and/or its agents to make any investigations of credit either directly or through any agency which has credit information. I understand that there are normal costs associated with loan underwriting. All approved loans are subject to an origination fee of up to 3.5% of the loan amount. I agree to inform PeopleFund immediately of any pending or significant changes in my financial condition. I allow PeopleFund staff to share my business information with PeopleFund board and investment committee. If approved, all PeopleFund clients are required to enroll in auto-debit payments. To the best of my knowledge, I certify that the information in this application is true and accurate. Any intentional information will render the applicant ineligible for a PeopleFund loan and may be subject to legal action.',
    hardInquiryConsentText: 'You are providing written consent under the Fair Credit Reporting Act to authorize qualified lending ' +
        'partners of ABC Lender to <strong>obtain your credit report with a hard credit inquiry</strong> from credit reporting ' +
        'agencies. You acknowledge that this is an application for credit and authorize ABC Lender’ lending ' +
        'partners to obtain such information solely to evaluate your credit application. By clicking this box, you consent, acknowledge, ' +
        'and agree that ABC, on your behalf, may forward your credit application and the results of your application to ' +
        'affiliated/non-affiliated third parties such as other automobile lenders that may assist you in obtaining vehicle financing. ' +
        'You are also consenting to allow our partners to offer you savings and benefits on other products.',
    loanPurpose: {
        R: {
            id: 'R',
            title: 'Buy an Existing Business',
            productName: 'FF',
            isMLARequired: true,
            tradeLine: {
                required: false,
                multiselect: false,
                type: 'Auto',
                code: 'AUTO'
            },
            collateral: {
                required: true,
                type: 'FF'
            },
            offer: {
                slider: false,
                downPayment: true,
                saving: true,
            },
            phone: '111-111-1111',
            minAge: 18,
            minAnnualIncome: 35000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: false,
            sliderDefaultAmountType: 'loanAmount',
            defaultLoanAmount: 22500,
        },
        AU: {
            id: 'AU',
            title: 'Equipment',
            productName: 'FF',
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
            phone: '111-111-1111',
            minAge: 18,
            minAnnualIncome: 30000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: false,
            sliderDefaultAmountType: 'retail',
            defaultLoanAmount: 22500,
        },
        AN: {
            id: 'AU',
            title: 'Furniture & Fixtures',
            productName: 'FF',
            isMLARequired: false,
            tradeLine: {
                required: false,
                multiselect: false,
                type: 'auto',
                code: ''
            },
            collateral: {
                required: false,
                type: 'Auto'
            },
            offer: {
                slider: true,
                downPayment: false,
                saving: false,
            },
            phone: '111-111-1111',
            minAge: 18,
            minAnnualIncome: 30000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: false,
            sliderDefaultAmountType: 'retail',
            defaultLoanAmount: 22500,
        },
        HR: {
            id: 'HR',
            title: 'Inventory',
            productName: 'FF',
            isMLARequired: true,
            isLineOfCredit: false,
            tradeLine: {
                required: false,
                multiselect: false,
                type: 'MORTGAGE',
                code: 'MORTGAGE'
            },
            collateral: {
                required: true,
                type: 'FF'
            },
            offer: {
                slider: false,
                downPayment: true,
                saving: true,
            },
            phone: '111-111-1111',
            minAge: 18,
            minAnnualIncome: 30000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: true,
            sliderDefaultAmountType: '',
            defaultLoanAmount: 350000,
        },
        HP: {
            id: 'HP',
            title: 'Leasehold Improvements',
            productName: 'FF',
            isMLARequired: false,
            isLineOfCredit: false,
            tradeLine: {
                required: false,
                multiselect: false,
                type: 'MORTGAGE',
                code: 'MORTGAGE'
            },
            collateral: {
                required: true,
                type: 'MORTGAGE'
            },
            offer: {
                slider: true,
                downPayment: false,
                saving: false,
            },
            phone: '111-111-1111',
            minAge: 18,
            minAnnualIncome: 30000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: false,
            sliderDefaultAmountType: '',
            defaultLoanAmount: 350000,
        },
        HE: {
            id: 'HE',
            title: 'Refinance Current Loan',
            productName: 'FF',
            isMLARequired: false,
            isLineOfCredit: true,
            tradeLine: {
                required: true,
                multiselect: false,
                type: 'MORTGAGE',
                code: 'MORTGAGE'
            },
            collateral: {
                required: true,
                type: 'MORTGAGE'
            },
            offer: {
                slider: true,
                downPayment: false,
                saving: false,
            },
            phone: '111-111-1111',
            minAge: 18,
            minAnnualIncome: 30000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: false,
            sliderDefaultAmountType: '',
            defaultLoanAmount: 100000,
        },
        PP: {
            id: 'PP',
            title: 'Vehicles',
            productName: 'FF',
            isMLARequired: false,
            tradeLine: {
                required: false,
                multiselect: false,
                type: 'OTHER',
                code: 'OTHER'
            },
            collateral: {
                required: false,
                type: 'OTHER'
            },
            offer: {
                slider: true,
                downPayment: false,
                saving: false,
            },
            phone: '111-111-1111',
            minAge: 18,
            minAnnualIncome: 30000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: true,
            sliderDefaultAmountType: '',
            defaultLoanAmount: 10000,
        },
        WC: {
            id: 'PP',
            title: 'Working Capital',
            productName: 'FF',
            isMLARequired: false,
            tradeLine: {
                required: false,
                multiselect: false,
                type: 'OTHER',
                code: 'OTHER'
            },
            collateral: {
                required: false,
                type: 'OTHER'
            },
            offer: {
                slider: true,
                downPayment: false,
                saving: false,
            },
            phone: '111-111-1111',
            minAge: 18,
            minAnnualIncome: 30000,
            hardInquiryConsentRequired: true,
            reviewPageHeadLine: 'Your application is ready for submission.',
            lowestInterestCard: true,
            sliderDefaultAmountType: '',
            defaultLoanAmount: 10000,
        }
    }
};
