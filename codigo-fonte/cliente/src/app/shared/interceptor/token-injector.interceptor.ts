import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

export const PUBLIC_ROUTES = {
    "GET": [

    ],
    "POST": [
        'login'
    ],
    "PUT": [

    ],
    "DELETE": [

    ]
};

export class TokenInjectorInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let isPublicRoute = false;

        PUBLIC_ROUTES[req.method].forEach(route => {
            if (req.url.match(`.*\\/${route}$`)) {
                isPublicRoute = true;
            }
        });

        let token = localStorage.getItem('app.token');

        if(!isPublicRoute && token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next
            .handle(req);
    }
}
