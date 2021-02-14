import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

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
    providers: [],
    declarations: [],
    exports: [   ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
