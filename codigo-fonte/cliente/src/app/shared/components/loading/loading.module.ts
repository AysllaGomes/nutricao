import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { BlockUIModule } from 'primeng/blockui';

import { LoadingComponent } from './loading.component';

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
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: LoadingModule,
            providers: []
        };
    }
}
