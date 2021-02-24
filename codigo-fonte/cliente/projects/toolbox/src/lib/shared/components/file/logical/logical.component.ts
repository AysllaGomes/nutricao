import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';

import * as _ from 'lodash';

@Component({
    selector: 'tbx-file-logical',
    templateUrl: './logical.component.html',
    styleUrls: ['./logical.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LogicalFileComponent),
            multi: true
        }
    ]
})
export class LogicalFileComponent implements ControlValueAccessor {

    @Input()
    fileList = [];

    @Input()
    invalidFileTypeMessageDetail = 'allowed file types: {0}.';

    @Input()
    invalidFileSizeMessageSummary = '{0}: Invalid file size, ';

    @Input()
    invalidFileTypeMessageSummary = '{0}: Invalid file type, ';

    @Input()
    invalidFileSizeMessageDetail = 'maximum upload size is {0}.';

    @Output()
    onClickDocument: EventEmitter<any> = new EventEmitter();

    @Input()
    accept: string;

    @Input()
    disabled = false;

    @Input()
    showSearch = true;

    @Input()
    showRemove = true;

    @Input()
    showDownload = true;

    @Input()
    maxFileSize: number;

    @Input()
    exclusionConfirmation = false;

    multiple = true;

    createdFileList = [];

    removedFileList = [];

    _value: any;

    onChange = (_a: any) => {};

    onTouched = () => {};

    get value() {
        return this._value;
    }

    set value(value) {
        this.writeValue(value);
    }

    constructor() {
    }

    writeValue(value: any): void {

        this._value = value;

        this.onChange(value);

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

    updateValue() {
        this.value = !_.isEmpty(this.createdFileList) || !_.isEmpty(this.removedFileList)
            ? {'created': this.createdFileList, 'removed': this.removedFileList}
            : null;
    }

    onAdd(item: File[]) {
        this.createdFileList = this.createdFileList.concat(item);
        this.updateValue();
    }

    onRemove(item: File | any) {
        if (!(item instanceof File)) {
            this.removedFileList.push(item);
        }
        _.remove(this.createdFileList, item);
        this.updateValue();
    }

    addMany(fileList: (File | any)[]) {
        // adiciona na lista se ainda nao existir
        _.each(fileList, item => {
            if (!_.find(this.fileList, item)) {
                // não foi utilizado o push, pois a intenção foi alterar a referência do array viabilizando a atualização
                // da lista de arquivos anexados
                this.fileList = this.fileList.concat(item);
                this.onAdd(item);
            }
        });
    }

    clickDocument(file) {
        this.onClickDocument.emit(file);
    }

}
