import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { SharedModule } from '../shared/shared.module';

import { AuthLoginComponent } from './login/login.component';
import { AuthLoginFormComponent } from './login/form/form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        RouterModule,
        SharedModule,
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
