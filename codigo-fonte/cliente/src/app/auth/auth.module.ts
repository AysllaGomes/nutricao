import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: AuthModule,
            providers: []
        };
    }
}
