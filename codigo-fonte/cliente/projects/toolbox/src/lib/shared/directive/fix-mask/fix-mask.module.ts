import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FixMaskDirective} from "./fix-mask.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FixMaskDirective
    ],
    exports: [
        FixMaskDirective
    ]
})
export class FixMaskModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FixMaskModule,
            providers: []
        };
    }
}
