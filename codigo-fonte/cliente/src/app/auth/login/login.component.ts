import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormUtilsService } from '../../shared/service/form-utils.service';

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class AuthLoginComponent implements OnInit {

    public form: FormGroup;
    public showRecovery = false;
    private isEnabledSubmit = true;

    constructor(
        protected formBuilder: FormBuilder,
        protected formUtilsService: FormUtilsService
    ) {}

    ngOnInit() {
        this.form = this.createForm();
    }

    /**
     * Cria uma nova instancia do formulário
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {

        return this.formBuilder.group({
            _username: [null, [
                Validators.required,
                Validators.maxLength(100)
            ]],
            _password: [null, [
                Validators.required,
                Validators.maxLength(8),
            ]]
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
    authenticate() {

        if (this.formUtilsService.validate(this.form)) { }

    }

}
