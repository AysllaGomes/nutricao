import { AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-form-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class FormMessagesComponent implements OnInit {

    @Input()
    control: AbstractControl;

    @Input()
    messageParams: any;

    @Input()
    overrideErrorName: any;

    constructor(
        protected translateService: TranslateService
    ) {}

    ngOnInit() {}

    needShowError() {
        return this.control.invalid && this.control.dirty;
    }

    /**
     *
     * @returns {string[]}
     */
    getErrors(): string[] {
        return this.control.errors
            ? Object.keys(this.control.errors)
            : [];
    }

    getErrorName(error) {
        return 'validations.' + error;
    }

    getParams(error) {
        return Object.assign(_.get(this.control.errors, error, {}), this.messageParams);
    }

    getMessageError(errorName) {
        return this.translateService.instant(
            this.getErrorName(_.get(this.overrideErrorName, errorName, errorName)),
            this.getParams(errorName)
        );
    }

}
