// USA
export const MESSAGES = {


    TRANSLATOR: {
        SELECT: 'Select your language',
    },
    MENU: {
        NEW: 'new',
        ACTIONS: 'Actions',
        CREATE_POST: 'Create New Post',
        REPORTS: 'Reports',
        APPS: 'Apps',
        DASHBOARD: 'Dashboard'
    },
    OFFER: {
        OPT: {
            FAIL: 'Unable to update the offer selection',
            SUCCESS: 'Offer selection is updated successfully'
        }
    },
    AUTH: {
        GENERAL: {
            OR: 'Or',
            SUBMIT_BUTTON: 'Submit',
            NO_ACCOUNT: 'Don\'t have an account?',
            SIGNUP_BUTTON: 'Signup',
            FORGOT_BUTTON: 'Forgot Password',
            BACK_BUTTON: 'Back',
            PRIVACY: 'Privacy',
            LEGAL: 'Legal',
            CONTACT: 'Contact',
        },
        LOGIN: {
            TITLE: 'Login Account',
            BUTTON: 'Sign In',
        },
        FORGOT: {
            TITLE: 'Forgotten Password?',
            DESC: 'Enter your email to reset your password',
        },
        REGISTER: {
            TITLE: 'Sign Up',
            DESC: 'Enter your details to create your account',
            SUCCESS: 'Your account has been successfuly registered. Please use your registered account to login.'
        },
        INPUT: {
            EMAIL: 'Email',
            FULLNAME: 'Fullname',
            PASSWORD: 'Password',
            CONFIRM_PASSWORD: 'Confirm Password',
        },
        VALIDATION: {
            INVALID: '{{name}} is not valid',
            REQUIRED: '{{name}} is required',
            MIN_LENGTH: '{{name}} minimum length is {{min}}',
            AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
            NOT_FOUND: 'The requested {{name}} is not found',
            INVALID_LOGIN: 'The login detail is incorrect'
        }
    },
    MESSAGES: {
        OFFERS: {
            LENDER_APPROVED_NO_RATES: {
                TITLE: 'Thank you for completing the application!',
                MESSAGE: 'Thank you for submitting your application. We need additional information before ' +
                    'you can see your offer. Please contact your dedicated Lend Grow, Inc. ' +
                    'Financial Advisor at 1-800-066-0000 so that we can get you the loan that meets your needs.'
            },
            NO_OFFER: {
                TITLE: 'We are sorry!',
                MESSAGE: 'Unfortunately we are unable to find an offer based on the information you provided. We ' +
                    'really appreciate your business and hope you will consider us again. We are continuously ' +
                    'adding new lender partners, so you can try again in 3 months if you are still interested.' +
                    ' You can also reach us at {{phone}} if you have any questions.'
            },
            NO_OFFER_NO_HIT: {
                TITLE: 'We are sorry!',
                MESSAGE: 'Unfortunately we are unable to find an offer based on the information you provided. We ' +
                    'really appreciate your business and hope you will consider us again. We are continuously ' +
                    'adding new lender partners, so you can try again in 3 months if you are still interested. You ' +
                    'can also reach us at {{phone}} if you have any questions.'
            },
            NO_OFFER_HARD_DECLINE: {
                TITLE: 'We are sorry!',
                MESSAGE: 'Unfortunately we are unable to find an offer based on the information you provided. We ' +
                    'really appreciate your business and hope you will consider us again. We are continuously ' +
                    'adding new lender partners, so you can try again in 3 months if you are still interested. You ' +
                    'can also reach us at {{phone}} if you have any questions.'
            },
            NO_OFFER_SOFT_DECLINE: {
                TITLE: 'We are sorry!',
                MESSAGE: 'Unfortunately we are unable to extend an offer based on the information you provided. ' +
                    'However, adding a co-signor may likely help you lower your rate for your loan. If you want to ' +
                    'explore this option, continue to add a co-signor to your application.'
            },
            NO_OFFER_WITH_LTV: {
                TITLE: 'Call us',
                MESSAGE: 'We are unable to find a good loan offer online for your vehicle selection but ' +
                    'our expert Financial Advisors may find an option that may work for you. ' +
                    'Please call 1-800-066-0000 to speak to your dedicated Lend Grow, Inc. advisor.'
            },
            NO_OPTIONS: {
                MESSAGE: 'No offers available for your selections. Please select a different term to see ' +
                    'offers for this loan amount'
            },
            PAYMENT_EXAMPLE: {
                MESSAGE: 'Payment Example: Monthly payments for a $10,000 loan at 3.19% APR with a term of 4 ' +
                    'years would result in 48 monthly payments of $222.18. Total interest paid over full term ' +
                    'of the loan will be $664.64.'
            },
            APR_LEGAL_NOTE: {
                MESSAGE: 'The Annual Percentage Rate (APR) is the yearly rate at which your loan accrues interest. ' +
                    'Rates will vary based on your credit, loan size and type of collateral is provided, with the ' +
                    'lower rates may be available to customers with good credit on vehicles with low loan to ' +
                    'values ratios. Minimum and maximum loan amounts and APR may vary according to state law ' +
                    'and are subject to change.'
            },
            PRE_QUALIFIED_OFFER: {
                MESSAGE: 'These Pre-Qualified offers are based on the information you provided and in your credit file. ' +
                    'They are initial, conditional offers and are subject to change based on completion of a final application, ' +
                    'verification of information you provided, and other conditions determined solely by the lender. ' +
                    'The offers above are not guaranteed and not a commitment to lend.'
            }
        },
        CASH_APPLICATION: {
            TITLE: 'Thank you for completing the application!',
            MESSAGE: 'We really appreciate your business and opportunity to serve you. One of our Representatives will be contacting' +
                ' you in the next 1-2  business days 24 hours with the next steps. ' +
                'You can reach us at {{phone}} if you have any questions in the meanwhile.'
        },
        FINAL_SUBMIT: {
            TITLE: 'Thank you for completing the application!',
            MESSAGE: 'We really appreciate your business and opportunity to serve you. One of our expert Finance Advisors will be ' +
                'contacting you in the next 1-2 business days with the next steps. ' +
                'You can reach us at {{phone}} if you have any questions in the meanwhile.'
        },
        FINAL_SUBMIT_FAILED: {
            TITLE: 'Thank you for completing the application!',
            MESSAGE: 'We really appreciate your business and opportunity to serve you. One of our expert Finance Advisors will be ' +
                'contacting you in the next 1-2 business days with the next steps. ' +
                'You can reach us at {{phone}} if you have any questions in the meanwhile.'
        },
        EXCEPTION: {
            TITLE: 'Oops, something unexpected happened!',
            MESSAGE: 'Our expert Financial Advisors will be able to take care of you. Please call ' +
                '1-800-066-0000 to speak to your dedicated  Lend Grow advisor.'
        },
        DISCLOSURE: {
            FINAL: {
                CONSENT_1: 'You are providing written consent under the Fair Credit Reporting Act to ' +
                    'authorize qualified lending partners of Lend Grow, Inc to obtain your ' +
                    'credit profile from credit reporting agencies, and it will be a hard ',
                CONSENT_2: 'credit inquiry. You acknowledge that this is an application for credit, and authorize Lend Grow, Inc ' +
                    '’s lending partners to obtain such information solely to evaluate your credit application. ' +
                    'By clicking this box, you consent, acknowledge, and agree that Lend Grow, Inc., on your behalf, ' +
                    'may forward your credit application, and the results of your application to ' +
                    'affiliated/non-affiliated third parties such as other automobile lenders, that may assist ' +
                    'you in obtaining vehicle financing. This lender may also obtain a credit report for this ' +
                    'transaction. Please consent to allow our partners to offer you savings and ' +
                    'benefits on other products.'
            },
            SOFT_INQUIRY: {
                CONSENT_1: ' You are providing express written consent under the Fair Credit Reporting Act to authorize ' +
                    'Lend Grow, Inc to obtain your credit profile from credit reporting agencies. ' +
                    'You authorize Lend Grow, Inc to obtain such information solely to evaluate ' +
                    'your eligibility for certain loan product pre-qualification offers and acknowledge ' +
                    'that this is not a final application for credit.',
                CONSENT_UPTO_LENDER: 'You are providing express written consent to share your information with ' +
                    'up to five (5) selected qualifying lending partners, or an authorized third party ' +
                    'on their behalf, to communicate with you about loans.',
                CONSENT_PRIVACY: 'You agree that you received the Lend Grow, Inc. <a ' +
                    'href="https://www.lend-grow.com/privacy-policy" target="_new">Privacy Policy</a>. ' +
                    'You also verified that you can read and print or keep these electronic documents and you ' +
                    'certify that your selections and information in this form are true, correct and complete.',
                CONSENT_MARKETING: 'I hereby consent to receive email, SMS or other marketing communications from Lend Grow, Inc. ' +
                    'and its trusted lending partners. I further expressly agree that Lend Grow, Inc. as well as any arranger of ' +
                    'credit or creditor, who receives my information, may contact me at the calling numbers providing including ' +
                    'my cellular number, vi alive, auto dialer, prerecorded telephone call, text chat or email message. ' +
                    'I further understand that my telephone company may impose charges on me for these contacts and I am not ' +
                    'required to provide this consent to be effective even if my calling numbers or email address are included on ' +
                    'ado-not-call list or registry. I understand that my consent to receive calls is not required in order to ' +
                    'purchase any goods or services. If you do not want to receive any marketing communications just un-check the box.'
            },
            MARKETING_INQUIRY: {
                CONSENT_MARKETING_1: 'I hereby consent to receive email, SMS or other marketing communications from Lend Grow, Inc.. ' +
                    'I further expressly agree that Lend Grow, Inc. ',
                CONSENT_MARKETING_2: ' may contact me at the calling numbers providing including my cellular number, via live, ' +
                    'auto dialer, prerecorded telephone call, text, chat or email message. I further understand that my telephone ' +
                    'company may impose charges on me for these contacts and I am not required to provide this consent to be effective even if ' +
                    'my calling numbers or email address are included on a do-not-call list or registry. I understand that my ' +
                    'consent to receive calls is not required in order to purchase any goods or services. ' +
                    'If you do not want to receive any marketing communications just un-check the box'
            }
        }
    }

};
