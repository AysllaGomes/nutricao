import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotRequiresLoginGuard implements CanActivate {

    constructor(
        protected router: Router,
        protected authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this.authService.isLogged()) {
            return true;
        }

        this.router.navigate(['/processo']);

        return false;
    }

}
