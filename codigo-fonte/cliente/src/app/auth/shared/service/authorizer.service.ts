import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

import { RoleEnum } from '../../../shared/enum/role.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthorizerService {

    constructor(
        protected authService: AuthService
    ) {}

    /**
     * Verifica se o usuário tem pelo menos uma das roles.
     * Checks if the user has at least one of the roles.
     *
     * @param {Role[]} roleList
     * @returns {boolean}
     */
    hasSomeRole(roleList: RoleEnum[]): boolean {

        const allRole = this.authService.getTokenRoleString();

        return allRole
            ? roleList.some((role) => allRole.indexOf(`|${role}|`) != -1)
            : false;

    }

    /**
     * Verifica se o usuário tem todas as roles fornecidas por parâmetro.
     * Checks if the user has at all of the roles, passing by parameters.
     *
     * @param {Role[]} roleList
     * @returns {boolean}
     */
    hasRole(roleList: RoleEnum[]): boolean {

        const allRole = this.authService.getTokenRoleString();

        return allRole
            ? roleList.every((role) => allRole.indexOf(`|${role}|`) !== -1)
            : false;

    }

    /**
     * Verifica se o usuário tem permissão para pesquisar (consultar) a credencial do usuário.
     * Checks whether the user is allowed to search (query) the user credential.
     *
     * @returns {boolean}
     */
    canManageCredential(): boolean {
        return this.hasSomeRole([
            RoleEnum.CREDENTIAL_INTERNAL_SEARCH,
            RoleEnum.CREDENTIAL_SEARCH
        ]);
    }

    /**
     * Verifica se o usuário tem permissão para alterar seus próprios dados.
     * Checks whether the user is allowed to change their own data.
     *
     * @returns {boolean}
     */
    canMangeSelfData(): boolean {
        return this.hasSomeRole([
            RoleEnum.CREDENTIAL_SELF_DATA
        ]);
    }

    /**
     * Verifica se o usuário tem permissão para pesquisar (consultar) o processo.
     * Checks whether the user has permission to search the process.
     *
     * @returns {boolean}
     */
    canManagerLog(): boolean {
        return this.hasSomeRole([
            RoleEnum.AUDIT_ALL
        ]);
    }

}
