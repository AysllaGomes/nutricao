import {Component, Input, OnInit} from '@angular/core';
import {SubmenuItem} from "../submenu/model/submenu-item";

@Component({
    selector: 'ung-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    @Input() reset: boolean;

    @Input() model: SubmenuItem[];

    constructor() {
    }

    ngOnInit() {

    }

}
