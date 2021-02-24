import {Directive, OnInit} from "@angular/core";
import {InputMask} from "primeng/primeng";

@Directive({
    selector: 'p-inputMask[ToolboxFixMask]'
})
export class FixMaskDirective implements OnInit {

    constructor(protected inputMask: InputMask) {
    }

    ngOnInit() {

        // Correção do método onInputBlur
        this.inputMask.onInputBlur = function (e) {

            this.focus = false;
            this.onModelTouched();
            this.checkVal();
            this.updateFilledState();
            this.onBlur.emit(e);

            // Verifica se o campo está vazio. Se sim, então retorna que o campo foi alterado
            if (
                this.inputViewChild.nativeElement.value != this.focusText ||
                this.inputViewChild.nativeElement.value === ''
            ) {
                this.updateModel(e);
                let event = document.createEvent('HTMLEvents');
                event.initEvent('change', true, false);
                this.inputViewChild.nativeElement.dispatchEvent(event);
            }
        };

    }

}
