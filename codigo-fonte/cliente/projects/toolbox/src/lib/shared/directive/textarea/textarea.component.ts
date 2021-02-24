import {Directive, ElementRef, forwardRef, HostListener, Input, Optional, Renderer2} from '@angular/core';
import {InputTextarea} from 'primeng/primeng';
import {NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {ControlValueAccessor} from '@angular/forms/src/directives/control_value_accessor';

@Directive({
    selector: '[ToolboxTextArea]',
    host: {
        '[class.ui-inputtext]': 'true',
        '[class.ui-corner-all]': 'true',
        '[class.ui-state-default]': 'true',
        '[class.ui-widget]': 'true',
        '[class.ui-state-filled]': 'filled'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextAreaDirective),
            multi: true
        }
    ]
})
export class TextAreaDirective extends InputTextarea implements ControlValueAccessor {

    @Input() disabled = false;

    onChange = (_: any) => {
    };
    onTouched = () => {
    };

    constructor(public el: ElementRef, @Optional() public ngModel: NgModel, public renderer: Renderer2) {
        super(el, ngModel);
    }

    get value() {
        return this.el.nativeElement.value;
    }

    set value(value) {
        this.writeValue(value);
    }

    writeValue(value: any): void {
        this.el.nativeElement.value = value;
        this.onChange(value);
    }

    registerOnChange(fn: (value: any) => any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    trim(value: String) {
        value = value.trim();
        return value.replace(/  +/g, ' ');
    }

    @HostListener('blur')
    onBlurInput() {
        this.value = this.trim(this.el.nativeElement.value);
    }

    @HostListener('input')
    onKeyDown() {
        this.value = this.el.nativeElement.value;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.renderer.setAttribute(this.el.nativeElement, 'disabled', String(this.disabled));
    }

}
