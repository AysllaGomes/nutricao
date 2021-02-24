import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    active;

    constructor() {
    }

    enable() {
        this.active = true;
    }

    disable() {
        this.active = false;
    }

    isLoading() {
        return this.active;
    }
}
