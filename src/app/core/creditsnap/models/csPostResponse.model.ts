import {ApplicationModel} from '@service/models/application.model';
import {ApprovalApplicationModel} from '@service/models/approvalApplication.model';

export class CSPostResponseModel {
    uriEndPoint: string;
    mappingScreen: string;
    applicationStatus: string;
    accessToken: string;
    applicationId: number;
    appOfferStatus: string;
    // this is a service primary entity id, ex: addApplicant, this is a applicantId
    id: number;
    code: number;
    message: string;
    details: string;
    applications: ApplicationModel[];
    approvalApplicationVOS: ApprovalApplicationModel[];
}
