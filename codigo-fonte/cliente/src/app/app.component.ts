import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';

import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        protected translateService: TranslateService
    ) {
        translateService.setDefaultLang(environment.lang);

        translateService.use(environment.lang);

        moment.locale(environment.lang);
    }

}
