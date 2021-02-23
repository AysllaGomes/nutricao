import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../../shared/lib/shared/service/layout.service';

@Component({
    selector: 'app-page-portal',
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.scss']
})
export class PagePortalComponent implements OnInit {

    constructor(
        public translate: TranslateService,
        public layoutService: LayoutService
    ) {

        // @todo sera necessario encontrar uma forma melhor de internacionalizar a aplicação. Importar no component principal do módulo nao é viavel
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
        this.layoutService.changeToHorizontalMenu();
        this.layoutService.showBreadcrumb = false;
    }

    initSubmenuList() {
        this.layoutService.submenuItemList = [];
    }

}
