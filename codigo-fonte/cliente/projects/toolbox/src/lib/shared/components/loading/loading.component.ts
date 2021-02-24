import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../service/loading.service";

@Component({
    selector: 'tbx-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

    constructor(protected loadingService: LoadingService) {
    }

    ngOnInit() {
    }

    isLoading() {
        return this.loadingService.isLoading();
    }

}
