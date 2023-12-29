import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as moment from 'moment';
import { KeyIdentifierModel } from '@service/models';
import { SharedkeyDataService } from '@customer/shared/sharedkey-data.service';

@Directive({
    selector: '[min-max]'
})
export class CustomMinMaxValidatorDirective {
    @Output('min-max') valid = new EventEmitter<void>(); // tslint:disable-line:no-output-rename
    @Input() minValue: number;
    @Input() maxValue: number;

    keyIdentifier: KeyIdentifierModel;
    initialValue = 0;

    constructor(private elRef: NgControl, private sharedKeyDataService: SharedkeyDataService) {
        sharedKeyDataService.keyIdentifier$.subscribe((data) => {
            this.keyIdentifier = data;
        });
    }

    @HostListener('blur')
    handleClick() {
        this.markFieldsAsDirty();
        this.emitIfValid();
    }

    private markFieldsAsDirty() {

        const name = this.elRef.name;
        if (this.elRef.value === undefined || this.elRef.value === null) {
            this.elRef.control.setErrors({ 'min-max': true });
        } else if (name === 'last4SSN') {
            if (this.elRef.value.toString().length !== 4) {
                this.elRef.control.setErrors({ 'min-max': true });
            }
        } else if (name === 'zipCode' && this.elRef.value.toString().length !== 5) {
            this.elRef.control.setErrors({ 'min-max': true });
        } else if (name === 'dateOfBirth') {
            const dob = this.elRef.control.value;
            const minAge = this.minValue || 18;
            const today = moment().startOf('day');
            const delta = today.diff(dob, 'years', false);
            console.log(' DOBValidatorDirective => ', dob, today, delta);
            if (delta < minAge) {
                this.elRef.control.setErrors({ 'min': true });
            } else if (delta > 100) {
                this.elRef.control.setErrors({ 'max': true });
            }
        } else if (name === 'email') {
            // tslint:disable-next-line:max-line-length
            const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!EMAIL_REGEX.test(this.elRef.control.value)) {
                this.elRef.control.setErrors({ 'email': true });
            }
        } else if (name === 'payOffAmount' && this.elRef.value !== undefined) {
            if (this.elRef.value < 5000) {
                this.elRef.control.setErrors({ 'min-max': true });
            }
        } else if (name === 'income' && this.elRef.value !== undefined) {
            const minIncome = this.minValue || 100;
            if (Number(this.elRef.value.replace(/[^0-9]*/g, '')) < minIncome) {
                this.elRef.control.setErrors({ 'min-max': true });
            }
        } else if (name === 'residenceMonths' && this.elRef.value !== undefined) {
            if (this.elRef.value < 0) {
                this.elRef.control.setErrors({ 'min-max': true });
            }
        } else if (name === 'residenceYears' && this.elRef.value !== undefined) {
            if (this.elRef.value < 0) {
                this.elRef.control.setErrors({ 'min-max': true });
            }
        } else if (name === 'employmentAddYears' && this.elRef.value !== undefined) {
            if (this.elRef.value < 0) {
                this.elRef.control.setErrors({ 'min-max': true });
            }
        } else if (name === 'employmentAddMonths' && this.elRef.value !== undefined) {
            if (this.elRef.value < 0) {
                this.elRef.control.setErrors({ 'min-max': true });
            }
        } else if (name === 'loanAmount' && this.elRef.value !== undefined) {

            if (this.elRef.value) {
                console.log("first value of loan amt", this.elRef.value);
                this.initialValue = Number(this.elRef.value.replace(/[^0-9.-]+/g, ""));
                console.log("initial value of loan amt", this.initialValue);
            }

            if (Number(this.initialValue) < this.minValue) {
                this.elRef.control.setErrors({ 'min-max': true });
            }
            if (Number(this.initialValue) > this.maxValue) {
                this.elRef.control.setErrors({ 'min-max': true });
            }
        }
    }

    private emitIfValid() {
        if (this.elRef.valid) {
            this.valid.emit();
        }
    }
}
