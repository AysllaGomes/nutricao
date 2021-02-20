import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-access-denied',
    templateUrl: './access-denied.component.html',
    styleUrls: ['./access-denied.component.css']
})
export class PageAccessDeniedComponent implements OnInit {

    message = 'A operação não é permitida';

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.message = params.message ? params.message : this.message;
        });
    }

}
