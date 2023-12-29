import {BaseModel} from '@service/models/_base.model';

export class EmploymentModel extends BaseModel {
    applicantId: number;
    employmentId: number;
    empName: string;
    empStatus: string;  // Current or Previous
    empType: string;  // employed, contracted,
    position: string;
    salary: number;
    salaryString: string;
    schedule: string;   // Annnually, Monthly
    adjustmentFactor: number;  // %
    adjustedIncome: number;
    length: number;  // Length of Employement
    years: number;
    months: number;
    workPhone: string;
    excludeIncome: Boolean;
    reason: string;

    constructor() {
        super();
        this.empStatus = 'C';
        this.schedule = 'MONTHLY';
        this.salary = 0;
    }
}
