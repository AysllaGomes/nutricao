import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader , TranslateModule} from '@ngx-translate/core';

import { FormMessagesComponent } from './messages.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RadioButtonModule,
        MessageModule,
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
        FormMessagesComponent
    ],
    exports: [
        FormMessagesComponent
    ],
    providers: []
})
export class SharedFormMessagesModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedFormMessagesModule,
            providers: []
        };
    }
}
