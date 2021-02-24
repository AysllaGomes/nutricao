import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PRIMENG_IMPORTS } from './primeng-imports';

import { ScrollPanelModule } from 'primeng/scrollpanel';

import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PageDefaultComponent } from './page/default/default.component';
import { RightpanelComponent } from './rightpanel/rightpanel.component';
import { InlineProfileComponent } from './inline-profile/inline-profile.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PRIMENG_IMPORTS,
        ScrollPanelModule
    ],
    declarations: [
        BreadcrumbComponent,
        FooterComponent,
        MenuComponent,
        SubmenuComponent,
        InlineProfileComponent,
        RightpanelComponent,
        TopbarComponent,
        PageDefaultComponent
    ],
    exports: [
        BreadcrumbComponent,
        FooterComponent,
        MenuComponent,
        SubmenuComponent,
        InlineProfileComponent,
        RightpanelComponent,
        TopbarComponent,
        PageDefaultComponent
    ]
})
export class UltimangModule {
}
