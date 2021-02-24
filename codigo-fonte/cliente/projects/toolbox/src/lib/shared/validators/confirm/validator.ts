import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';

import {isPresent} from '../util/lang';

/**
 *
 * @param {AbstractControl} otherControl
 * @param {boolean} isReverse
 * @returns {ValidatorFn}
 */
export function confirm(otherControl: AbstractControl, isReverse = false): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {

        if (isPresent(Validators.required(control) && isPresent(Validators.required(otherControl)))) {
            return null;
        }

        // self value
        const controlValue = control.value;

        // value not equal
        if (otherControl && controlValue !== otherControl.value && !isReverse) {
            return {
                'confirm': false
            };
        }

        // value equal and reverse
        if (otherControl && controlValue === otherControl.value && isReverse) {

            if (otherControl.errors) {
                delete otherControl.errors['confirm'];
            }

            // se não tem erros ou o array de erros está vazio
            if (!otherControl.errors || !Object.keys(otherControl.errors).length) {
                otherControl.setErrors(null);
            }

        }

        // value not equal and reverse
        if (otherControl && controlValue !== otherControl.value && isReverse) {
            otherControl.setErrors({'confirm': false});
        }

        return null;

    };

}
