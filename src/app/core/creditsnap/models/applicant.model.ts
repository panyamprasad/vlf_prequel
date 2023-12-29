import {AddressModel} from '@service/models/address.model';
import { ApplicationModel } from './application.model';
export class ApplicantModel {
  
    firstName: string ;
    lastName: string;
    dob: Date;
    email: string ;
    primaryPhone: string ;
    status: string; // 0 = Non - Military | 1 = Active | 2 = Retired
    consent: string;
    ownershipPercentage: any;
    gender: string;
    isReferal: string;
    referalCode?: string;
    application: ApplicationModel;
    ein: string ;
    ssn: string = '';
    addressVO: AddressModel;
    jobTitle: string;
    race: string;
    isSpouseVeteran : string;
    ethnicity : string;
    constructor() {
        this.addressVO = new AddressModel();
    }
}
