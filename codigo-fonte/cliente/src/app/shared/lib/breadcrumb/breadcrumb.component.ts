import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/internal/Subscription';

import { SubmenuItem } from '../../model/submenu-item';

import { BreadcrumbService } from '../shared/service/breadcrumb.service';

@Component({
    selector: 'ung-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnDestroy {

    subscription: Subscription;

    items: SubmenuItem[];

    constructor(public breadcrumbService: BreadcrumbService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
