import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from "./editor.component";
import {MessageModule} from "primeng/message";
import {EditorModule as PrimeNgEditorModule}from "primeng/editor";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrimeNgEditorModule,
        MessageModule
    ],
    declarations: [
        EditorComponent
    ],
    exports: [
        EditorComponent
    ],
    providers: []
})
export class EditorModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EditorModule,
            providers: []
        };
    }
}
