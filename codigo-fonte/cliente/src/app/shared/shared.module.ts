import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MaskPipe } from './pipe/mask.pipe';
import { LoadingModule } from './components/loading/loading.module';
import { ToolboxModule } from '../../../projects/toolbox/src/lib/toolbox.module';
import { UltimangModule } from '../../../projects/ultimang/src/lib/ultimang.module';

import { AUTH_SHARED_COMPONENTS } from '../auth/shared/auth-shared-components';
import { PAGE_SHARED_COMPONENTS } from '../page/shared/page-shared-components';
import { PRIMENG_IMPORTS } from '../../../projects/ultimang/src/lib/primeng-imports';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        UltimangModule,
        ToolboxModule,
        LoadingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: function (http: HttpClient) {
                    return new TranslateHttpLoader(http);
                },
                deps: [HttpClient]
            }
        }),
        PRIMENG_IMPORTS
    ],
    declarations: [
        PAGE_SHARED_COMPONENTS,
        AUTH_SHARED_COMPONENTS,
        MaskPipe
    ],
    exports: [
        UltimangModule,
        ToolboxModule,
        TranslateModule,
        PRIMENG_IMPORTS,
        PAGE_SHARED_COMPONENTS,
        AUTH_SHARED_COMPONENTS,
        MaskPipe
    ],
    providers: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
