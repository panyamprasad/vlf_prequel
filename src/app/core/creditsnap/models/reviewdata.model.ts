import {AddressModel} from '@service/models/address.model';
import { ApplicantModel } from './applicant.model';
import { BusinessModel } from './business.model';
import { OfferNewModel } from './offerNew.model';

export class ReviewDataModel {
    address?: AddressModel;
    business?: BusinessModel;
    applicant?: ApplicantModel;
    offer?: OfferNewModel;
    constructor() {
        this.address = new AddressModel();
        this.business = new BusinessModel();
        this.applicant = new ApplicantModel();
        this.offer = new OfferNewModel();
    }
}