import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { TokenPayload } from '../interface/token-payload';
import { ApiCredential } from '../interface/api-credential';

import { Credential } from '../../../shared/model/app.model';
import { HttpUtilsService } from '../../../shared/service/http-utils.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        protected http: HttpClient,
        protected jwtHelper: JwtHelperService,
        protected httpUtilsService: HttpUtilsService
    ) {}

    get url(): string {
        return `${environment.api.url}/login`;
    }

    getHttpOptions(withToken = false): any {
        return this.httpUtilsService.httpOptions;
    }

    /**
     * Realiza a autenticação da credencial
     *
     * @param {ApiCredential} credential
     * @returns {Observable<any>}
     */
    authenticate(credential: ApiCredential): Observable<any> {
        return this.http.post(this.url, JSON.stringify(credential), this.getHttpOptions())
            .pipe(
                tap((token: any) => this.storesCredentials(token)),
                catchError(this.httpUtilsService.handleError)
            );
    }

    storesCredentials(response: any) {

        const token = response.token;
        const payload = this.jwtHelper.decodeToken(token);
        const jsonPayload = JSON.stringify(payload);

        localStorage.setItem('app.token', token);
        localStorage.setItem('app.token.payload', jsonPayload);
        localStorage.setItem('app.token.roles', '|' + payload['roles'].join('|') + '|');

    }

    /**
     * Desloga da aplicação
     */
    logout(): void {
        localStorage.clear();
        sessionStorage.clear();
    }

    /**
     * Retorna o token do usuário logado
     *
     * @returns {string | null}
     */
    getToken() {
        return localStorage.getItem('app.token');
    }

    getTokenRoleString() {
        return localStorage.getItem('app.token.roles');
    }

    getTokenPayload(): TokenPayload {
        const json = localStorage.getItem('app.token.payload');
        return json ? JSON.parse(json) : null;
    }

    getCredential(updated = false): Credential | null {
        if (updated === true) {
            const json = localStorage.getItem('app.credential');
            return json ? JSON.parse(json) : null
        } else {
            if (this.getToken()) {

                const tokenPayload = this.getTokenPayload();

                return {
                    id: tokenPayload.credential.id,
                    username: tokenPayload.credential.username,
                    individual: tokenPayload.credential.individual
                } as Credential;

            } else {
                return null;
            }
        }

    }

    /**
     * Retorna se o usuário está autenticado
     *
     * @returns {boolean}
     */
    isLogged(): boolean {

        const token = this.getToken();

        return token
            ? !this.jwtHelper.isTokenExpired(token)
            : false;
    }

}
