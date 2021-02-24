import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Credential as UngCredential } from '../../shared/model/credential.model';

import { AuthService } from '../../auth/shared/service/auth.service';
import { AuthorizerService } from '../../auth/shared/service/authorizer.service';
import { LayoutService } from '../../../../projects/ultimang/src/lib/shared/service/layout.service';
import { BreadcrumbService } from '../../../../projects/ultimang/src/lib/shared/service/breadcrumb.service';

@Component({
    selector: 'app-page-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.scss']
})
export class PageManagementComponent implements OnInit {

    constructor(
        public router: Router,
        public authService: AuthService,
        public translate: TranslateService,
        public layoutService: LayoutService,
        public authorizerService: AuthorizerService,
        public breadcrumbService: BreadcrumbService
    ) {

        /**
         * @todo sera necessario encontrar uma forma melhor de internacionalizar a aplicação.
         * @todo Importar no component principal do módulo nao é viavel
         */

        const browserLang = 'pt';

        const useBrowserLang = browserLang.match(/pt|en/)
            ? browserLang
            : 'pt';

        translate.addLangs(['pt', 'en']);

        translate.setDefaultLang('pt');

        translate.use(useBrowserLang);

    }

    ngOnInit() {
        this.initLayout();
        this.initSubmenuList();
    }

    initLayout() {
        this.layoutService.credential = <UngCredential>this.authService.getCredential();
        // @todo implementar um recurso para exibição de imagens da credencial ou primeira letra do nome
        this.layoutService.credential.image = null;
        this.layoutService.changeToStaticMenu();
        this.layoutService.showBreadcrumb = true;
        this.layoutService.showRightTopbar = true;

        this.breadcrumbService.disableRightItems();
    }

    initSubmenuList() {
        this.layoutService.submenuItemList = [
            {
                label: 'Usuários',
                icon: 'account_circle',
                routerLink: ['/usuario'],
                visible: this.authorizerService.canManageCredential()
            },
            {
                label: 'Histórico',
                icon: 'hourglass_empty',
                routerLink: ['/log'],
                visible: this.authorizerService.canManagerLog()
            }
        ];

        this.layoutService.profileSubmenuItemList = [
            {
                label: 'Meus dados',
                icon: 'person',
                routerLink: ['/meus-dados'],
                visible: true
            },
            {
                label: 'Alterar senha',
                icon: 'vpn_key',
                routerLink: ['/alterar-senha'],
                visible: true
            },
            {
                label: 'Logout',
                icon: 'power_settings_new',
                command: () => {
                    this.authService.logout();
                    this.router.navigate(['/']);
                },
                visible: true
            }
        ];

    }

}
