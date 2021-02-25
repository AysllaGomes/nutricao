import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';

import { PageModule } from './page/page.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { TimingInterceptor } from './shared/interceptor/timing.interceptor';
import { ProgressInterceptor } from './shared/interceptor/progress.interceptor';
import { TokenInjectorInterceptor } from './shared/interceptor/token-injector.interceptor';
import { TreatNullValuesInterceptor } from './shared/interceptor/treat-null-values.interceptor';

export function tokenGetter () {
    return localStorage.getItem('app.token');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PageModule,
        SharedModule,
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
