import {AddressModel} from '@service/models/address.model';

export class BusinessModel {
    applicationId: number;
    purpose: string;   // Primary, Secondary, etc
    businessName: string ;
    establishedDate: Date;
    ownershipType: String; // WOM
    ein: string ;
    isBusinessYrs: string;
    isTaxId: string;
    ssn: string = '';
    businessType: string;
    addressVO: AddressModel;
    industryName: string;
    annualRevenue: string;
    constructor() {
        this.addressVO = new AddressModel();
        // this.isBusinessYrs = 'no';
        this.isTaxId = 'yes';
    }
}