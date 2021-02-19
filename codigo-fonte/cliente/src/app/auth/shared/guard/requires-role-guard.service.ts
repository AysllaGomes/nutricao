import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { AuthorizerService } from '../service/authorizer.service';

@Injectable({
    providedIn: 'root'
})
export class RequiresRoleGuard implements CanActivate {

    constructor(
        protected router: Router,
        protected authService: AuthService,
        protected authorizerService: AuthorizerService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.authService.isLogged()) {

            let hasRole = this.authorizerService.hasSomeRole(route.data.roleList);

            if (hasRole) {
                return true;
            }
        }

        this.router.navigate(['/acesso-negado']);

        return false;
    }

}
