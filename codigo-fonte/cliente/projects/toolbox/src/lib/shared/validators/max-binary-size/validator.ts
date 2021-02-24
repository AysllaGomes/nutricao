import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';

import {isPresent} from '../util/lang';

/**
 *
 * @param value
 * @param maxSize
 * @param metric
 */
function isValid(value: string | Blob, maxSize: number, metric: string): boolean {

    if (!(value instanceof Blob)) {
        value = new Blob([value], {type: 'text/html'});
    }

    return value.size <= maxSize;
}

/**
 *
 * @param {number} maxSize
 * @param {string} metric
 * @returns {ValidatorFn}
 */
export function maxBinarySize(maxSize: number, metric: string = 'MB'): ValidatorFn {

    let maxSizeByte = 0;

    switch (metric) {
        case 'B':
            break;
        case 'KB':
            maxSizeByte = maxSize * 1000;
            break;
        case 'MB':
            maxSizeByte = maxSize * 1000000;
            break;
        default:
            console.error('Os valores passados para a validação "maxBinarySize", não são válidos:', maxSize, metric);
    }

    return (control: AbstractControl) => {

        if (isPresent(Validators.required(control))) {
            return null;
        }

        const v: string | Blob = control.value;

        return isValid(v, maxSizeByte, metric)
            ? null
            : {
                'maxBinarySize': {
                    'max': maxSize,
                    'metric': metric
                }
            };

    };

}
