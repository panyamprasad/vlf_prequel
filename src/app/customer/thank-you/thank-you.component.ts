import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedkeyDataService} from '@customer/shared/sharedkey-data.service';
import { BehaviorSubject,Subscription} from 'rxjs';
import {ApplicationCreateResponseModel, KeyIdentifierModel} from '@service/models';
import {TranslateService} from '@ngx-translate/core';
import { ApplicationService } from '@service/services';
import { ThankYouService } from './thank-you.service';

@Component({
    selector: 'm-thank-you',
    templateUrl: './thank-you.component.html',
    styleUrls: ['./thank-you.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThankYouComponent implements OnInit, OnDestroy {

    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();
    private subscription: Subscription;
    private keyIdentifier: KeyIdentifierModel;
    private errorCode: string;
    private title: string;
    private message: string;
    errorScenario: boolean;
    appOfferStatus : any;
    success : boolean;
    code : number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private translate: TranslateService,
        private sharedkeyDataService: SharedkeyDataService,
        private applicationService: ApplicationService,
        private thankyouSerives: ThankYouService,) {
        this.subscription = sharedkeyDataService.keyIdentifier$.subscribe((data) => {
            this.keyIdentifier = data;
            console.log('Key announced ....', this.keyIdentifier);
        });
        this.errorScenario = false;
        const response: ApplicationCreateResponseModel = this.applicationService.getApplicationCreateResponse();
        this.code = this.applicationService.getErrorCode();
        this.appOfferStatus = response != null ? response.appOfferStatus : this.code;
        this.success = true
    }
    ngOnInit() {
       // this.keyIdentifier.errorCode = 'FINAL_SUBMIT_FAILED';
        if (this.keyIdentifier.errorCode === undefined || this.keyIdentifier.errorCode === null) {
            console.log('for some reasons error code is not defined, hence redirecting to exception');
            this.errorCode = 'EXCEPTION';
        } else if (this.keyIdentifier.errorCode.length > 0) {
            console.log('ErrorCode is received =>', this.keyIdentifier.errorCode);
            this.errorCode = this.keyIdentifier.errorCode;
        } else {
            this.activatedRoute.queryParams.subscribe(params => {
                console.log('query params =>', params);
                this.errorCode = params['status'];
            });
        }
        this.makeGetAPICall();
        this.loadMessage();
    }
    loadMessage() {
        const phone: string = this.keyIdentifier.loanPurposeConfig && this.keyIdentifier.loanPurposeConfig.phone || '1-800-066-0000';

        switch (this.errorCode) {
            case 'EXCEPTION':
                this.title = this.translate.instant('MESSAGES.' + this.errorCode + '.TITLE');
                this.message = this.translate.instant('MESSAGES.' + this.errorCode + '.MESSAGE', {phone: phone});
                this.errorScenario = true;
                break;
            case 'NO_OFFER':
            case 'NO_OFFER_NO_HIT':
            case 'NO_OFFER_HARD_DECLINE':
            case 'NO_OFFER_SOFT_DECLINE':
                this.title = this.translate.instant('MESSAGES.OFFERS.' + this.errorCode + '.TITLE');
                this.message = this.translate.instant('MESSAGES.OFFERS.' + this.errorCode + '.MESSAGE', {phone: phone});
                break;
            case 'CASH_APPLICATION':
            case 'FINAL_SUBMIT':
            case 'FINAL_SUBMIT_FAILED':
                this.title = this.translate.instant('MESSAGES.' + this.errorCode + '.TITLE');
                this.message = this.translate.instant('MESSAGES.' + this.errorCode + '.MESSAGE', {phone: phone});
                break;
            default:
                this.title = this.translate.instant('MESSAGES.OFFERS.' + this.errorCode + '.TITLE');
                this.message = this.translate.instant('MESSAGES.OFFERS.' + this.errorCode + '.MESSAGE', {phone: phone});
                break;
        }
        console.log('ErrorCode is received, title/message =>', this.title, this.message);
    }

    redirectToCoBorrower($event) {
        this.keyIdentifier.isCoBorrowerNeeded = true;
        this.keyIdentifier.isPrimaryApplicantAdded = true;
        this.sharedkeyDataService.announceIdentifierChanges(this.keyIdentifier);
        this.router.navigate(['/']);
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    homePage(){
        let url ="https://peoplefund.org/"
        window.location.href = url;
        //this.router.navigate(["/"]);
    }

    public returnPage(){
        let url ="https://peoplefund.org/get-a-loan/continue/"
        window.location.href = url;
    }

    public makeGetAPICall(): void{
        let newApplicationId = this.applicationService.getApplicationId() || "";
        let findMyAppApplicationId = this.applicationService.getApplication() || "";
        var applicationId = newApplicationId ? newApplicationId : findMyAppApplicationId;
        this.thankyouSerives.dataImport(applicationId).subscribe(
            (success=> console.log("Successfully Imported the data.")),
            (error=> console.log("Unable to import the data."))
        );
    }
}
