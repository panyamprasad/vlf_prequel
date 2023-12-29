export class CSGetResponseModel {
    uriEndPoint: string;
    mappingScreen: string;
    accessToken: string;
    applicationId: number;
    applicationStatus: string;
    // this is a service primary entity id, ex: addApplicant, this is a applicantId
    id: number;
    code: number;
    message: string;
    details: string;
    data: any;
}
