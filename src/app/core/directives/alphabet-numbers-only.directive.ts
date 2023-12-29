import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: 'input[alphabetNumberOnly]'
})
export class AlphabetNumberDirective {

    constructor(private elRef: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initalValue.replace(/[^a-zA-Z0-9]/g,'');
    if ( initalValue !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}