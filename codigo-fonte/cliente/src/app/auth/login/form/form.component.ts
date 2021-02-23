import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-auth-login-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class AuthLoginFormComponent implements OnInit {

    @Output()
    onCreateForm: EventEmitter<FormGroup> = new EventEmitter();

    form: FormGroup;

    constructor(
        protected formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.form = this.createForm();

        this.onCreateForm.emit(this.form);
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
                Validators.maxLength(254)
            ]],
            _password: [null, [
                Validators.required,
                Validators.maxLength(254),
            ]]
        });

    }

}
