import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormGroup, ValidationErrors} from '@angular/forms';

import * as moment from 'moment';
import * as _ from "lodash";

@Injectable({
    providedIn: 'root'
})
export class FormUtilsService {

    constructor() {
    }

    get(form: AbstractControl, index: string): AbstractControl {

        const controlNameList = index.split('.');

        let control = form;

        let controlName: string;

        while (controlName = controlNameList.shift()) {
            control = control.get(controlName);
        }

        return control;

    }

    convertStringToDate(string: any) {
        return string ? moment(string).toDate() : null;
    }

    validate(formGroup: FormGroup | FormArray): boolean {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control.markAsDirty();
            if (control instanceof FormGroup || control instanceof FormArray) {
                this.validate(control);
            }
        });
        return formGroup.valid;
    }

    getFormValidationErrors(formGroup: FormGroup | FormArray) {
        Object.keys(formGroup.controls).forEach(key => {

            const controlErrors: ValidationErrors = formGroup.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                });
            }
        });
    }

    prepareError(error: string | string[], summary = 'Atenção: ') {

        const message = Array.isArray(error)
            ? error.join('|')
            : error;

        return [{
            severity: 'error',
            summary: summary,
            detail: message
        }];
    }

    getFormatedPercentage(number: number | string, locale = 'pt-BR') {

        let formated = '';

        if (![undefined, '', null].includes(_.toString(number))) {
            formated = _.toNumber(number)
                .toLocaleString(locale, {
                    maximumSignificantDigits: 21,
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                }) + '%';
        }

        return formated;

    }

}
