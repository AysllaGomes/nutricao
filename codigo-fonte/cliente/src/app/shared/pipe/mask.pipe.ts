import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mask'
})
@Injectable({
    providedIn: 'root'
})
export class MaskPipe implements PipeTransform {

    transform(value: any, regex: any, regexPrint: any, args?: any): any {

        return value.replace(regex, regexPrint);

    }

}
