import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader , TranslateModule} from '@ngx-translate/core';

import { MaskPipe } from './pipe/mask.pipe';
import { UltimangModule } from './lib/ultimang.module';
import { LoadingModule } from './components/loading/loading.module';

import { PAGE_SHARED_COMPONENTS } from '../page/shared/page-shared-components';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: function (http: HttpClient) {
                    return new TranslateHttpLoader(http);
                },
                deps: [HttpClient]
            }
        }),
        UltimangModule,
        LoadingModule,
    ],
    declarations: [
        MaskPipe,
        PAGE_SHARED_COMPONENTS
    ],
    exports: [
        MaskPipe,
        PAGE_SHARED_COMPONENTS
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
