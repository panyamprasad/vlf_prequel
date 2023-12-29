import {BaseModel} from '@service/models/_base.model';

export class IdentityModel extends BaseModel {
    id: number;
    idNumber: string;
    identityType: string;  // Driving, Passport, State Id
    issueDate: Date;
    idExpireDate: Date;
    issuedBy: string;
    status: string;

    clear() {
        this.identityType = '';
        this.idNumber = '';
        this.issueDate = new Date();
        this.idExpireDate = new Date();
        this.issuedBy = '';
        this.status = '';
    }
}
