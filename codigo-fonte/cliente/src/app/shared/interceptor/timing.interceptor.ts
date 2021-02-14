import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

export class TimingInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();

        return next
            .handle(req).pipe(
                tap(event => {
                    if (event instanceof HttpResponse && environment.debugRequest) {
                        const elapsed = Date.now() - started;
                        console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                    }
                }));
    }

}
