import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { KeyIdentifierModel } from '@service/models/key-identifier.model';
import { MatDialog } from '@angular/material';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { SharedkeyDataService } from '@customer/shared/sharedkey-data.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { CustomerLanding } from '@service/models/customer-landing.model';
@Component({
    selector: 'm-customer-about',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit, OnDestroy {

    landingCustomer= new CustomerLanding;
    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();
    keyIdentifier: KeyIdentifierModel;
    @ViewChild('f') f: NgForm;
    @ViewChild('mScrollTop') elScrollTop: ElementRef;
    scrollTop: any;
    subscription: Subscription;
    barButtonOptions: MatProgressButtonOptions = {
        active: false,
        text: 'Continue',
        buttonColor: 'accent',
        barColor: '#C1D72E',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        disabled: false
    };
    loanPurposePopulated: boolean = false;
    public e: any;
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private sharedKeyDataService: SharedkeyDataService,) {
        this.subscription = sharedKeyDataService.keyIdentifier$.subscribe((data) => {
            this.keyIdentifier = data;
    
        });
    }
    ngOnInit() {
        this.landingCustomer = new CustomerLanding();
    }

    public onSubmit(): void {
        this.router.navigate(["/loan-purpose"]);
    }

    ngOnDestroy(): void {
        if (this.subscription)
        {
            this.subscription.unsubscribe();
        }
    }
   
}