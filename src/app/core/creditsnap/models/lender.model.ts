import {AddressModel} from './address.model';
import {ProductModel} from './product.model';


export class LenderModel {
    lenderId: number;
    name: string;
    contact: string;
    contactPerson: string;
    email: string;
    type: string;  // 0 - Bank, 1 - Credit Union, 2 - Community Bank, 3 - Market Place
    relevancyScore: number;
    iconPath: string;  // Lender image location
    effectiveDate: Date;
    expirationDate: Date;
    // The following fields will be empty unless we ask through additional service
    address: AddressModel;
    products: ProductModel[];
    finalSubmitChannel: string;
    finalSubmitWebForwardLink: string;
}
