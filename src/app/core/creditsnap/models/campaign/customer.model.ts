export class CustomerModel {
    customerId: number;
    firstName: string;
    lastName: string;
    middleName: string;
    surname: string;
    ssn: string;
    email: string;
    citizenship: string;
    citizenshipStatus: string;
    citizenInd: boolean;  // Yes - US, No - Non US
    driverLicense: string;
    driverLicenseExpirationDate: Date;
    specialOfficer: string;   // insider
    primaryPhone: string;
    dateOfBirth: Date;
    housingCost: number;
    residenceStatus: string;
    annualIncome: number;
    schedule: string;   // Annnually, Monthly
    empStatus: string;  // Current or Previous
    empType: string;  // employed, contracted,
    militaryActiveDutyIndicator: boolean; // 0 = Non - Military | 1 = Active | 2 = Retired
    maritalStatus: string;
    spouseName: string;
    streetAddress: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    addressUsage: string; // 0 = Home | 1 = Mailing |  2 = Temporary
    type: string; // 0 = Business | 1 = Residential
    current: boolean;
    county: string;
    isBankCustomer: boolean;
    excludeProducts: string[];
    averageCheckingAccountBalance: number;
    averageSavingAccountBalance: number;
}
