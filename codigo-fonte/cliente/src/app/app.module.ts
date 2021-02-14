import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { TimingInterceptor } from './shared/interceptor/timing.interceptor';
import { ProgressInterceptor } from './shared/interceptor/progress.interceptor';
import { TokenInjectorInterceptor } from './shared/interceptor/token-injector.interceptor';
import { TreatNullValuesInterceptor } from './shared/interceptor/treat-null-values.interceptor';
import {SharedModule} from "./shared/shared.module";

export function tokenGetter () {
    return localStorage.getItem('app.token');
}

@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: [
                    '/\/.*'
                ],
                disallowedRoutes: [
                    '/\/login/',
                ]
            }
        })
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInjectorInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ProgressInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TimingInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TreatNullValuesInterceptor, multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
