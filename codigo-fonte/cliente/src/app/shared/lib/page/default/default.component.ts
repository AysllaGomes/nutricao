import {Component, ElementRef, ViewChild} from '@angular/core';
import {LayoutService} from "../../shared/service/layout.service";
import {Page} from "../page";
import {ProfileMode} from "../../shared/enum/profile-mode.enum";
import {SubmenuItem} from "../../submenu/model/submenu-item";
import {ScrollPanel} from "primeng/scrollpanel";

@Component({
    selector: 'ung-page-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss']
})
export class PageDefaultComponent implements Page {

    constructor(public layoutService: LayoutService) {
    }

    get profileSubmenuItemList(): SubmenuItem[] {
        return this.layoutService.profileSubmenuItemList;
    }

    get submenuItemList(): SubmenuItem[] {
        return this.layoutService.submenuItemList;
    }

    get showBreadcrumb(): boolean {
        return this.layoutService.showBreadcrumb;
    }

    get layourContainerViewChild(): ElementRef {
        return this.layoutService.layourContainerViewChild;
    }

    @ViewChild('layoutContainer') set layourContainerViewChild(el: ElementRef) {
        this.layoutService.layourContainerViewChild = el;
    };

    get layoutMenuScrollerViewChild(): ScrollPanel {
        return this.layoutService.layoutMenuScrollerViewChild;
    }

    @ViewChild('scrollPanel') set layoutMenuScrollerViewChild(el: ScrollPanel) {
        this.layoutService.layoutMenuScrollerViewChild = el;
    };

    get layoutCompact(): boolean {
        return this.layoutService.layoutCompact;
    }

    get overlayMenuActive(): boolean {
        return this.layoutService.overlayMenuActive;
    }

    get staticMenuDesktopInactive(): boolean {
        return this.layoutService.staticMenuDesktopInactive;
    }

    get staticMenuMobileActive(): boolean {
        return this.layoutService.staticMenuMobileActive;
    }

    get darkMenu(): boolean {
        return this.layoutService.darkMenu;
    }

    get profileMode(): ProfileMode {
        return this.layoutService.profileMode;
    }

    get resetMenu(): boolean {
        return this.layoutService.resetMenu;
    }

    ngOnInit(): void {
        this.layoutService.initRippleEvents();
    }

    ngAfterViewInit(): void {
        this.layoutService.ngAfterViewInit();
    }

    ngOnDestroy(): void {
        this.layoutService.unbindRipple();
    }

    onLayoutClick(): void {
        this.layoutService.onLayoutClick();
    }

    onMenuClick(event): void {
        this.layoutService.onMenuClick(event);
    }

    isOverlay(): boolean {
        return this.layoutService.isOverlay();
    }

    isHorizontal(): boolean {
        return this.layoutService.isHorizontal();
    }

    isSlim(): boolean {
        return this.layoutService.isSlim();
    }

}
