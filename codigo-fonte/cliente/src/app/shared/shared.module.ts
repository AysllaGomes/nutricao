import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader , TranslateModule} from '@ngx-translate/core';

import { MaskPipe } from './pipe/mask.pipe';

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
    ],
    declarations: [
        MaskPipe
    ],
    exports: [
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
