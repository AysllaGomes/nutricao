import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms/src/directives/control_value_accessor';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Editor} from "primeng/editor";
import {AlertService} from "../../service/alert.service";

@Component({
    selector: 'tbx-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EditorComponent),
            multi: true
        }
    ]
})
export class EditorComponent implements OnInit, ControlValueAccessor {

    @ViewChild('editorComponent') editorComponent: Editor;

    @Input() disabled = false;

    @Input() uploadCallback: any;

    @Input() urlImageCallback: any;

    @Input() height: string = '500px';

    @Input() title: string = '';

    @Input() showFontColor = false;

    @Input() showBackgroundColor = false;

    @Input() showInsertImage = false;

    errorMessage: string;

    _value: any;

    editor: any;

    onChange = (_: any) => {
    };

    onTouched = () => {
    };

    /**
     *
     * @param {AlertService} alertService
     */
    constructor(protected alertService: AlertService) {
    }

    ngOnInit() {
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this.writeValue(value);
    }

    writeValue(value: string): void {
        this.onChange(value);
        this._value = value;
    }

    registerOnChange(fn: (value: any) => any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    configEditor(editor: any) {

        this.editor = editor;

        editor.getModule('toolbar').addHandler('image', () => {
            this.selectLocalImage()
        });
    }

    selectLocalImage() {

        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.click();

        // Adiciona um evento no campo de upload
        input.onchange = () => {

            const file = input.files[0];

            // verifica se é imagem
            if (/^image\//.test(file.type)) {
                this.uploadCallback(file).subscribe(
                    val => this.insertToEditor(this.urlImageCallback(val)),
                    error => this.alertService.error('', error.message)
                );
            } else {
                this.alertService.error('', 'Insira apenas imagens');
            }

        };
    }

    insertToEditor(url: string) {
        // push image url to rich editor.
        const range = this.editor.getSelection();
        this.editor.insertEmbed(range.index, 'image', url);

        let editorElement = this.editorComponent.domHandler.findSingle(
            this.editorComponent.el.nativeElement,
            'div.ui-editor-content'
        );

        this.value = editorElement.children[0].innerHTML;

    }

}
