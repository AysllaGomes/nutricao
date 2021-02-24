import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AuthLoginComponent } from './login/login.component';
import { AuthLoginFormComponent } from './login/form/form.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        ReactiveFormsModule,
        InputTextModule
    ],
    declarations: [
        AuthLoginComponent,
        AuthLoginFormComponent
    ],
    exports: [
        AuthLoginComponent,
        AuthLoginFormComponent
    ],
    providers: []
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: AuthModule,
            providers: []
        };
    }
}
