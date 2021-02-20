import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { UltimangModule } from '../shared/lib/ultimang.module';

import { PageNotFoundComponent } from './not-found/not-found.component';
import { PageAccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ScrollPanelModule,
        UltimangModule
    ],
    declarations: [
        PageNotFoundComponent,
        PageAccessDeniedComponent
    ],
    exports: [
        PageNotFoundComponent,
        PageAccessDeniedComponent
    ],
    providers: []
})
export class PageModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: PageModule,
            providers: []
        };
    }
}
