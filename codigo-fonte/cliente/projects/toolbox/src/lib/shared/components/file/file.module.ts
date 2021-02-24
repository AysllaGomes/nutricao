import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {FileComponent} from "./file.component";
import {LogicalFileComponent} from "./logical/logical.component";
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {MessagesModule} from "primeng/primeng";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        DataViewModule,
        MessagesModule
    ],
    declarations: [
        FileComponent,
        LogicalFileComponent
    ],
    exports: [
        FileComponent,
        LogicalFileComponent
    ],
    providers: []
})
export class FileModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FileModule,
            providers: []
        };
    }
}
