import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockUIModule} from "primeng/primeng";
import {LoadingComponent} from "./loading.component";

@NgModule({
    imports: [
        CommonModule,
        BlockUIModule
    ],
    declarations: [
        LoadingComponent
    ],
    exports: [
        LoadingComponent
    ],
    providers: []
})
export class LoadingModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LoadingModule,
            providers: []
        };
    }
}
