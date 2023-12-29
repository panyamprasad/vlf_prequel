import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ssn'
})
export class SsnPipe implements PipeTransform {

  transform(event: string = ''): string {
    let newVal = event.toString().replace(/\D/g, '');
    if (newVal.length <= 6) {
        newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
        newVal = '';
    } else if (newVal.length <= 3) {
        newVal = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (newVal.length <= 6) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,2})/, '$1-$2');
    } else if (newVal.length <= 9) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,2})(\d{0,4})/, '$1-$2-$3');
    } else {
        newVal = newVal.substring(0, 9);
        newVal = newVal.replace(/^(\d{0,3})(\d{0,2})(\d{0,4})/, '$1-$2-$3');
    }
    return newVal;
  }
}