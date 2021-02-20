import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {FooterComponent} from './footer/footer.component';
import {MenuComponent} from './menu/menu.component';
import {SubmenuComponent} from './submenu/submenu.component';
import {InlineProfileComponent} from './inline-profile/inline-profile.component';
import {RightpanelComponent} from './rightpanel/rightpanel.component';
import {TopbarComponent} from './topbar/topbar.component';
import {PageDefaultComponent} from './page/default/default.component';
import {ScrollPanelModule} from "primeng/scrollpanel";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
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
export class UltimangModule {}
