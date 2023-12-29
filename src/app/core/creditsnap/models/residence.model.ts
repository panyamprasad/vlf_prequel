export class ResidenceModel {
    residenceId: number;
    status: string;  // Own, Renting
    position: string;
    cost: number;  // Rent, Mortgage
    costString: string;
    schedule: string;   // Annually, Monthly
    length: number;  // Length of Residence
    years: number;
    months: number;
    currentResidence: Boolean;

    constructor() {
        this.schedule = 'MONTHLY';
        this.costString = '';
    }
}
