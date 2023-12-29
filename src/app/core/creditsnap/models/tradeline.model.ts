export class TradelineModel {
    tradeLineId: number;
    applicationId: number;
    applicantId: number;
    bureau: string;  // TU, Equifax, Experiean
    tradeStatus: string;
    tradeType: string;
    /*
    Installment, Mortgage, OpenOrOther, Revolving
        Auto, Home Equity, Mortgage, Credit, Personal
   */
    productType: string;
    bankName: string;
    routingNumber: string;
    loanAccountNumber: string;  // Loan account number
    openedOn: Date;   // the account was opened
    balanceOn: Date;
    monthlyPayment: number;
    apr: number;
    /* the number of months in the life of this financial obligation. For minimum payments on revolving accounts,
    the value in this field is MIN. Payment Schedule Month Count */
    term: number;
    balance: number; // whole dollars the balance remaining in this account.
    totalAmount: number;
    closedDate: Date; // Account was closed
    paidOutDate: Date; // the account was paid out
    highCreditAmount: number; // whole dollars either the highest amount ever owed in the account or the original balance owed.
    // whole dollars the subject’s credit limit for this account.
    creditLimitAmount: number;
    /** Specifies the frequency of payments required for this financial obligation. Possible values are
     D - Deferred P - Payroll or deduction ; W - Weekly (due every week); B - Biweekly (due every two weeks)
     E - Semimonthly (due twice a month); M - Monthly (due every month);  L - Bimonthly (due every two months)
     Q - Quarterly (due every three months) T - Triennially (due every four months)
     S - Semiannually (due twice a year); Y - Annually (due every year); X - Unspecified V - Variable payment */
    frequencyOfPayment: string;
    // the amount, expressed as a monthly payment, the subject must pay on this installment or mortgage loan.
    // The amount is specified in whole dollars. If there is no payment amount, this field is blank- filled.
    monthlyPaymentAmount: number;
    // the date of the most-recent monthly payment.
    lastPaymentDate: Date;
    // Trade indicators
    designator: string;
    /**
     U -Undesignated account; I - Individual; C - Joint contractual liability on account; A - Authorized account
     P - Participant on account; S - Co-signer on account; M - Primary borrower on account;
     T - Account relationship terminated; X - Consumer deceased */
    accountType: string;
    /**
     AF    Appliance/Furniture; AG    Collection Agency/Attorney; AL    Auto Lease; AU    Automobile
     AX    Agricultural Loan; BC    Business Credit Card; BL    Revolving Business Lines */

    portfolioType: string;
    /** R - Revolving account; O - Open account; C - Line of credit I - Installment account
     M - Mortgage account */
    closedDateIndicator: string;
    // C - Account was closed normally F - Account was closed because of charge-off or repossession
    // (that is, if the account rating is 08, 8A, 8P, 09,9B, or 9P)

    opted: boolean;
    totalInterestSaving: number;
    mInterestSaving: number;
    remainingTerm: number;   // No . of payments remaining on the books => No. of months
    description: string;
    selectedIndicator: boolean;

    constructor() {
        this.totalInterestSaving = 0;
        this.mInterestSaving = 0;
        this.remainingTerm = 0;
    }
}
