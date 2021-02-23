import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../shared/service/auth.service';
import { AlertService } from '../../shared/service/alert.service';
import { FormUtilsService } from '../../shared/service/form-utils.service';

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class AuthLoginComponent implements OnInit {

    form: FormGroup;

    accessing = false;

    constructor(
        protected router: Router,
        protected location: Location,
        protected authService: AuthService,
        protected alertService: AlertService,
        protected translate: TranslateService,
        protected formUtilsService: FormUtilsService
    ) {}

    ngOnInit() {}

    /**
     *
     * @returns {boolean}
     */
    canDisableSubmit(): boolean {
        return this.accessing;
    }

    /**
     *
     * @param {FormGroup} form
     */
    onCreateForm(form: FormGroup) {
        this.form = form;
    }

    authenticate(): void {

        if (this.formUtilsService.validate(this.form)) {
            this.accessing = true;

            this.authService.authenticate(this.form.value)
                .subscribe(
                    () => this.saveSuccessAction(),
                    (error) => this.saveErrorAction(error)
                );
        }

    }

    /**
     * Ação executada caso sucesso
     */
    saveSuccessAction(): void {
        const tokenPayload = this.authService.getTokenPayload();

        // updated =>  informa se os dados da credencial foram atualizados durante a autenticação. Ou seja, as informações do LDAP
        // foram pesquisadas e utilizadas para atualizar os dados da pessoa no banco

        if (tokenPayload.extras && !tokenPayload.extras.updated) {
            this.alertService.warning(
                this.translate.instant('message.warning'),
                this.translate.instant('auth.login.error.updateInternalCredential',
                    {email: tokenPayload.extras.repeatedMail}),
                () => {

                    this.router.navigate(['/processo']);
                }
            );
        } else {
            this.router.navigate(['/processo']);
        }
    }

    /**
     * Ação executada caso não seja realizada com sucesso
     *
     * @param {string | string[]} error
     */
    saveErrorAction(error: string | string[]): void {
        this.accessing = false;

        this.alertService.error(null, error);
    }

}
