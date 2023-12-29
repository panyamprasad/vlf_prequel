import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'replaceString'})

export class ReplaceStringPipe implements PipeTransform {
    transform(value: string, args?: any): string {

        // For each argument
        for (const key of Object.keys(args)) {
            if (args.hasOwnProperty(key)) {
                value = value.replace('{{' + key + '}}', args[key]);
            }
        }

        return value;
    }
}
