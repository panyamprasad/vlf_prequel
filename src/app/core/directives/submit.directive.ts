import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Directive({
    selector: '[tsSubmitIfValid]'
})
export class SubmitIfValidDirective {
    @Output('tsSubmitIfValid') valid = new EventEmitter<void>(); // tslint:disable-line:no-output-rename

    constructor(
        private formRef: NgForm,
        private el: ElementRef) {}

    @HostListener('click')
    handleClick() {
        this.markFieldsAsDirty();
        this.emitIfValid();
    }
    private markFieldsAsDirty() {
        Object.keys(this.formRef.controls)
            .forEach(fieldName => {
                this.formRef.controls[fieldName].markAsDirty();
                this.formRef.controls[fieldName].markAsTouched();
            });
    }
    private emitIfValid() {
        if (this.formRef.valid) {
            this.valid.emit();
        }
    }
}
