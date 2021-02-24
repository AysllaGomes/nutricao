import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
        protected authService: AuthService,
        protected alertService: AlertService,
        protected formUtilsService: FormUtilsService
    ) {}

    ngOnInit() {}

    canDisableSubmit(): boolean {
        return this.accessing;
    }

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
        this.router.navigate(['/processo']);
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
