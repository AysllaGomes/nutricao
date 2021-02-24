import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {AfterContentInit, Component, ElementRef, EventEmitter, forwardRef, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';

import * as _ from 'lodash';

import {Message} from 'primeng/api';

import {AlertService} from '../../service/alert.service';

@Component({
    selector: 'tbx-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileComponent),
            multi: true
        }
    ]
})
export class FileComponent implements OnInit, AfterContentInit, ControlValueAccessor {

    static MIME_TYPE = {
        'PDF': 'application/pdf',
        'ODT': 'application/vnd.oasis.opendocument.text',
        'DOC': 'application/msword',
        'DOCX': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'XLS': 'application/vnd.ms-excel',
        'XLSX': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'PNG': 'image/png',
        'JPG': 'image/jpeg',
        'JPEG': 'image/jpeg',
        'PPT': 'application/vnd.ms-powerpoint',
        'PPTX': 'application/vnd.openxmlformat-officedocument.presentationml.presentation',
        'ZIP': 'application/zip'
    };

    @Output()
    onClickDocument: EventEmitter<any> = new EventEmitter();

    @Output()
    onClear: EventEmitter<any> = new EventEmitter();

    @Output()
    onRemove: EventEmitter<any> = new EventEmitter();

    @Output()
    onSelect: EventEmitter<any> = new EventEmitter();

    @Output()
    onValidityChecked: EventEmitter<any> = new EventEmitter();

    @Input()
    multiple: boolean;

    @Input()
    maxLength: number;

    @Input()
    maxFileSize: number;

    @Input()
    chooseLabel = 'Procurar...';

    @Input()
    invalidFileTypeMessageDetail = 'allowed file types: {0}.';

    @Input()
    invalidFileSizeMessageSummary = '{0}: Invalid file size, ';

    @Input()
    invalidFileTypeMessageSummary = '{0}: Invalid file type, ';

    @Input()
    invalidFileSizeMessageDetail = 'maximum upload size is {0}.';

    @Input()
    style: string;

    @Input()
    accept: string;

    @Input()
    styleClass: string;

    @ViewChild('basicfileinput')
    basicFileInput: ElementRef;

    @Input()
    files: File[];

    @Input()
    disabled = false;

    @Input()
    showSearch = true;

    @Input()
    showRemove = true;

    @Input()
    showDownload = true;

    @Input()
    canRemoveCallback: (document: any) => boolean;

    @Input()
    exclusionConfirmation = false;

    @Input()
    exclusionConfirmationMessage = 'Tem certeza de que deseja excluir o arquivo %s?';

    msgs: Message[];

    focus: boolean;

    _value: any;

    onChange = (_: any) => {};

    onTouched = () => {};

    get value() {
        return this._value;
    }

    set value(value) {
        this.writeValue(value);
    }

    constructor(
        public zone: NgZone,
        private el: ElementRef,
        public sanitizer: DomSanitizer,
        protected alertService: AlertService
    ) {}


    ngOnInit() {
        this.files = [];
    }

    writeValue(value: any): void {

        this._value = value;

        this.files = _.toArray(value);

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

    ngAfterContentInit() {

    }

    onFileSelect(event) {

        this.msgs = [];

        if (!this.multiple) {
            this.files = [];
        }

        const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        const newFiles = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (!this.isFileSelected(file)) {
                if (this.validate(file)) {
                    // if (this.isImage(file)) {
                    file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                    // }
                    this.files.push(files[i]);

                    newFiles.push(files[i]);
                }
            }
        }

        this.onSelect.emit({originalEvent: event, files: newFiles});

        this.value = this.multiple
            ? this.files
            : this.files[0];

        this.clearInputElement();
    }

    isFileSelected(file: File): boolean {
        for (const sFile of this.files) {
            if ((sFile.name + sFile.type + sFile.size) === (file.name + file.type + file.size)) {
                return true;
            }
        }

        return false;
    }

    validate(file: File): boolean {
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
            });
            this.onValidityChecked.emit(false);
            return false;
        }

        if (this.maxFileSize && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
            });
            this.onValidityChecked.emit(false);
            return false;
        }

        this.onValidityChecked.emit(true);
        return true;
    }

    isFileTypeValid(file: File): boolean {
        const acceptableTypes = this.accept.split(',');
        for (const type of acceptableTypes) {
            const acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type)
                : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();

            if (acceptable) {
                return true;
            }
        }

        return false;
    }

    getTypeClass(fileType: string): string {
        return fileType.substring(0, fileType.indexOf('/'));
    }

    isWildcard(fileType: string): boolean {
        return fileType.indexOf('*') !== -1;
    }

    getFileExtension(file: File): string {
        return '.' + file.name.split('.').pop();
    }

    clear() {
        this.files = [];
        this.onClear.emit();
        this.clearInputElement();
    }

    remove(index: number) {
        if (this.exclusionConfirmation) {
            const message = _.replace(this.exclusionConfirmationMessage, '%s', this.files[index].name);
            this.alertService.confirm(null, message, () => {
                this.removeFile(index);
            });
        } else {
            this.removeFile(index);
        }
    }

    removeFile(index: number) {
        this.clearInputElement();
        this.onRemove.emit({file: this.files[index]});
        this.files.splice(index, 1);

        this.value = this.multiple
            ? this.files
            : this.files[0];

    }

    clearInputElement() {

        if (this.basicFileInput && this.basicFileInput.nativeElement) {
            this.basicFileInput.nativeElement.value = '';
        }
    }

    hasFiles(): boolean {
        return this.files && this.files.length > 0;
    }

    onFocus() {
        this.focus = true;
    }

    onBlur() {
        this.focus = false;
    }

    clickDocument(file) {
        this.onClickDocument.emit(file);
    }

    formatSize(bytes) {
        if (bytes == 0) {
            return '0 B';
        }
        const k = 1000,
            dm = 3,
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    isDisabled(): boolean {
        return this.maxLength
            ? this.files.length >= this.maxLength
            : false;
    }

    isRemoved(file: any): boolean {
        return file.deleted === true;
    }

    canRemove(document) {
        return this.showRemove || (this.canRemoveCallback && this.canRemoveCallback(document));
    }

}
