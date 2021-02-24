import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class TreatNullValuesInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req.params.keys().forEach(key => {
            if (req.params.get(key) === null) {
                req = req.clone({
                    params: req.params.set(key, '')
                });
            }
        });

        return next
            .handle(req);
    }

}
