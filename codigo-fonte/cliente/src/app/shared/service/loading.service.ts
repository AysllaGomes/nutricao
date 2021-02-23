import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    active;

    constructor() {}

    enable() { return this.active = true; }

    disable() { return this.active = false; }

    isLoading() { return this.active; }

}
