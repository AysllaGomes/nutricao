import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagePortalComponent } from './page/portal/portal.component';
import { PageNotFoundComponent } from './page/not-found/not-found.component';
import { PageManagementComponent } from './page/management/management.component';
import { PageAccessDeniedComponent } from './page/access-denied/access-denied.component';

import { RequiresLoginGuard } from './auth/shared/guard/requires-login-guard.service';
import { NotRequiresLoginGuard } from './auth/shared/guard/not-requires-login-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: '',
        component: PagePortalComponent,
        // canActivate: [NotRequiresLoginGuard],
        children: [ ]
    },
    {
        path: '',
        component: PageManagementComponent,
        // canActivate: [RequiresLoginGuard],
        children: [ ]
    },
    {
        path: 'pagina-nao-encontrada',
        component: PageNotFoundComponent
    },
    {
        path: 'acesso-negado',
        component: PageAccessDeniedComponent
    },
    {
        path: '**',
        redirectTo: '/pagina-nao-encontrada'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
