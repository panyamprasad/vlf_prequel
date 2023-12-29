import {
    EventEmitter,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DatePipe, UpperCasePipe, formatDate } from '@angular/common';
import {
    AddressModel,
    ApplicantModel,
    CollateralModel,
    ConsentModel,
    BusinessModel,
    AboutCustomerModel,
    SearchModel
} from '@service/models';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { KeyIdentifierModel } from '@service/models/key-identifier.model';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { SharedkeyDataService } from '@customer/shared/sharedkey-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ApplicationModel } from '../../core/creditsnap/models/application.model';
import { FormGroup } from '@angular/forms';
import { FindApplicationModel } from '@service/models/find-application';
import { FindApplicationService } from '@service/services/findapplication.service';
import { OnDestroy } from '@angular/core';
import { Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApplicationResponseModel } from '@service/models/application';
import { ApplicationService, OfferService } from '@service/services';
import { ScreeningPage } from '@service/models/screening-page.model';
@Component({
    selector: 'loan-purpose-application',
    templateUrl: './loan-purpose.component.html',
    styleUrls: ['./loan-purpose.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, UpperCasePipe]
})
export class LoanPurposeComponent implements OnInit, OnDestroy {
    @Output() submitEventEmitter: EventEmitter<{
        options: any, applicant: ApplicantModel, consent: ConsentModel,
        collateral: CollateralModel
    }>;

    screeningModel = new ScreeningPage;
    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();
    values: boolean = false;
    clickedbutton: boolean = false;
    registrationForm: FormGroup;
    keyIdentifier: KeyIdentifierModel;
    applicationValue: any = {};
    applicatonValueObj: ApplicationResponseModel;
    @ViewChild('f') f: NgForm;
    consent: ConsentModel;
    @ViewChild('mScrollTop') elScrollTop: ElementRef;
    scrollTop: any;
    submitButtonText: string;
    subscription: Subscription;
    appConfig: any;
    loanPurposeConfig: any;
    isSubmitting = false;
    applicationId: number;
    applicantId: number;
    activityStatus: string;
    barButtonOptions: MatProgressButtonOptions = {
        active: false,
        text: 'Next',
        buttonColor: 'accent',
        barColor: '#C1D72E',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        disabled: false
    };
    constructor(
        private router: Router,
        private sharedKeyDataService: SharedkeyDataService,) {
        this.subscription = sharedKeyDataService.keyIdentifier$.subscribe((data) => {
            this.keyIdentifier = data;
            this.loanPurposeConfig = data.loanPurposeConfig;
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    ngOnInit() {
        this.initCustomer();
        this.loadingSubject.next(false);
    }


    initCustomer() {
        this.screeningModel = new ScreeningPage();

    }

    onSubmit() {
        this.router.navigate(["/applicant"]);
    }

    selected(): void {

    }


}