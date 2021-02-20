import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { LayoutService } from '../shared/service/layout.service';
import { SubmenuItem } from './model/submenu-item';

@Component({
    selector: '[ung-submenu]',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.scss'],
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class SubmenuComponent {

    @Input()
    item: SubmenuItem;

    @Input()
    root: boolean;

    @Input()
    visible: boolean;

    _reset: boolean;

    activeIndex: number;

    constructor(
        public layoutService: LayoutService
    ) {}

    itemClick(event: Event, item: SubmenuItem, index: number) {
        if (this.root) {
            this.layoutService.menuHoverActive = !this.layoutService.menuHoverActive;
        }

        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({originalEvent: event, item: item});
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.layoutService.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.layoutService.isHorizontal() || this.layoutService.isSlim()) {
                this.layoutService.resetMenu = true; } else {
                this.layoutService.resetMenu = false; }

            this.layoutService.overlayMenuActive = false;
            this.layoutService.staticMenuMobileActive = false;
            this.layoutService.menuHoverActive = !this.layoutService.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (this.root && this.layoutService.menuHoverActive && (this.layoutService.isHorizontal() || this.layoutService.isSlim())
            && !this.layoutService.isMobile() && !this.layoutService.isTablet()) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && (this.layoutService.isHorizontal() || this.layoutService.isSlim())) {
            this.activeIndex = null;
        }
    }

}
