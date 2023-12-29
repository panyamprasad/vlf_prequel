import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {NgControl} from '@angular/forms';

export const transliterationKey = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7,
    H: 8, J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9, S: 2, T: 3, U: 4,
    V: 5, W: 6, X: 7, Y: 8, Z: 9
};
export const weightFactor = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

@Directive({
    selector: '[vin-check]'
})
export class VinCheckValidatorDirective {
    @Output('vin-check') valid = new EventEmitter<void>(); // tslint:disable-line:no-output-rename

    constructor(private elRef: NgControl) {
    }

    @HostListener('blur')
    handleBlur() {
        this.markFieldsAsDirty();
        this.emitIfValid();
    }

    calculateWeight(vin, checkDigit) {
        const result = [];
        for (let y = 0; y < vin.length; y++) {
            if (y !== 8) {
                result.push(parseInt(vin[y]) * weightFactor[y]);
            }
        }
        return this.sumResult(result, checkDigit);
    }

    convertLetters(vin, checkDigit) {
        for (let x = 0; x < vin.length; x++) {
            if (vin[x].charCodeAt(0) >= 65 && vin[x].charCodeAt(0) <= 90) {
                vin[x] = transliterationKey[vin[x]];
            }
        }
        return this.calculateWeight(vin, checkDigit);
    }

    sumResult(result, checkDigit) {
        let sumOfResult = 0;
        let checkDigitActual: any = 0;
        for (let z = 0; z < result.length; z++) {
            sumOfResult = result[z] + sumOfResult;
        }
        checkDigitActual = sumOfResult % 11;
        if (checkDigitActual === 10) {
            checkDigitActual = 'X';
        }
        console.log(' check digit and acutal =>', checkDigit, checkDigitActual);
        // if true Valid VIN, otherwise invalid VIN
        if (checkDigit === checkDigitActual.toString()) {
            return true;
        } else {
            return false;
        }
    }

    private markFieldsAsDirty() {
        let elDirty = false;
        const name = this.elRef.name;
        if (this.elRef.value === undefined || this.elRef.value === null || this.elRef.value === '') {
            elDirty = false;
            return true;
        } else if (this.elRef.value.toString().length < 17) {
            console.log('VIN is not 17 chars');
            this.elRef.control.setErrors({'length-error': true});
        } else {
            const vin = this.elRef.value.toString().toUpperCase().split('');
            const checkDigit: any = vin[8];
            const status = this.convertLetters(vin, checkDigit);
            console.log('VIN validation => ', status);
            // call function to convert the letters to numbers
            if (!status) {
                this.elRef.control.setErrors({'not-valid-vin': true});
            }
        }
    }

    private emitIfValid() {
        if (this.elRef.valid) {
            this.valid.emit();
        }
    }
}
