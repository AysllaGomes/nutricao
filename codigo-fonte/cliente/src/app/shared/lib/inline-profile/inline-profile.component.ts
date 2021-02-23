import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { SubmenuItem } from '../submenu/model/submenu-item';
import { Credential } from '../shared/model/credential.model';

import { LayoutService } from '../shared/service/layout.service';
import { AuthService } from '../../../auth/shared/service/auth.service';

@Component({
    selector: 'ung-inline-profile',
    templateUrl: './inline-profile.component.html',
    styleUrls: ['./inline-profile.component.scss'],
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class InlineProfileComponent implements OnInit {

    @Input()
    submenuItemList: SubmenuItem[];

    active: boolean;

    sessionData: any;

    get credential(): Credential {
        return this.layoutService.credential;
    }

    constructor(
        public layoutService: LayoutService,
        protected authService: AuthService
    ) {}

    ngOnInit() {
        this.getDateSession();
    }

    onClick(event) {
        this.active = !this.active;
        setTimeout(() => {
            this.layoutService.layoutMenuScrollerViewChild.moveBar();
        }, 450);
        event.preventDefault();
    }

    getDateSession() {
        this.sessionData = this.authService.getCredential(true)
            ? this.authService.getCredential(true)
            : this.authService.getCredential();
    }

}
