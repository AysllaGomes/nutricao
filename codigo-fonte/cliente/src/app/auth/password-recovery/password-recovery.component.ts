import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { AlertService } from '../../../../projects/toolbox/src/lib/shared/service/alert.service';
import { ToolboxValidators } from '../../../../projects/toolbox/src/lib/shared/validators/validators';
import { FormUtilsService } from '../../../../projects/toolbox/src/lib/shared/service/form-utils.service';

@Component({
    selector: 'app-auth-login',
    templateUrl: './password-recovery.component.html',
    styleUrls: ['./password-recovery.component.scss']
})

export class AuthPasswordRecoveryComponent implements OnInit {

    @Output()
    hideRecovery: EventEmitter<boolean> = new EventEmitter();

    formGroup: FormGroup;

    private isEnabledSubmit = true;

    constructor(
        protected router: Router,
        protected location: Location,
        protected formBuilder: FormBuilder,
        protected alertService: AlertService,
        protected translateService: TranslateService,
        protected formUtilsService: FormUtilsService
    ) {}

    ngOnInit() {
        this.formGroup = this.createForm();
    }

    /**
     * Cria uma nova instância do formulário
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {

        return this.formBuilder.group({
            username: ['', [
                Validators.required,
                Validators.maxLength(254),
                ToolboxValidators.email
            ]],
        });

    }

    /**
     * Verifica se a submissão do formulário está desativada
     *
     * @returns {boolean}
     */
    isDisabledSubmit() {
        return !this.isEnabledSubmit;
    }

    /**
     * Tenta autenticar o usuário
     */
    resetPassword() {

        if (this.formUtilsService.validate(this.formGroup)) { }

    }

    /**
     * Ação executada caso sucesso
     */
    saveSuccessAction(): void {

        const email = this.formGroup.get('username').value;

        this.alertService.success(
            this.translateService.instant('auth.passwordRecovery.saveSuccess'),
            this.translateService.instant('auth.passwordRecovery.saveSuccessComplement', {'email': email}),
            () => this.toggleRecovery()
        );

    }

    /**
     * Ação executada caso não seja realizada com sucesso
     *
     */
    saveErrorAction(error: string | string[]): void {
        this.isEnabledSubmit = true;
        this.alertService.error(null, error);
    }

    toggleRecovery() {
        this.hideRecovery.emit(true);
    }

}
