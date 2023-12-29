import {
    EventEmitter, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import {
    ApplicantModel,
    CollateralModel,
    ConsentModel
} from '@service/models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { SharedkeyDataService } from '@customer/shared/sharedkey-data.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { OnDestroy } from '@angular/core';
import { Output } from '@angular/core';
import { WelcomePage } from './welcome.types';
@Component({
    selector: 'welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, UpperCasePipe]
})
export class StartScreenComponent implements OnInit, OnDestroy {
    @Output() submitEventEmitter: EventEmitter<{
        options: any, applicant: ApplicantModel, consent: ConsentModel,
        collateral: CollateralModel
    }>;

    welcomePage = new WelcomePage;
    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();
    @ViewChild('f') f: NgForm;
    submitButtonText: string;
    subscription: Subscription;
    barButtonNew: MatProgressButtonOptions = {
        active: false,
        text: 'Start New Application',
        buttonColor: 'accent',
        barColor: '#C1D72E',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        disabled: false
    };
    barButtonExisting: MatProgressButtonOptions = {
        active: false,
        text: 'Finish my Application',
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
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    ngOnInit() {
        this.welcomePage = new WelcomePage();
        this.loadingSubject.next(false);
    }

    public onSubmitNew(): void {
        this.router.navigate(["/landing"]);
    }
    public onSubmitExisting(): void {
        this.router.navigate(["/resumeProfile"]);
    }

}