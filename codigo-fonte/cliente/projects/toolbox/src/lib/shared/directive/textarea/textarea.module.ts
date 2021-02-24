import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextAreaDirective} from "./textarea.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TextAreaDirective
    ],
    exports: [
        TextAreaDirective
    ]
})
export class TextAreaModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TextAreaModule,
            providers: []
        };
    }
}
