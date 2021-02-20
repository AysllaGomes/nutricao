import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { ScrollPanel } from 'primeng/scrollpanel';

import { LayoutService } from '../shared/service/layout.service';

@Component({
    selector: 'ung-rightpanel',
    templateUrl: './rightpanel.component.html',
    styleUrls: ['./rightpanel.component.scss']
})
export class RightpanelComponent implements AfterViewInit {

    @ViewChild('scrollRightPanel')
    rightPanelMenuScrollerViewChild: ScrollPanel;

    constructor(
        public layoutService: LayoutService
    ) {}

    ngAfterViewInit() {
        setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 100);
    }

}
