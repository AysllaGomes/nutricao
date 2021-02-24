import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import * as _ from 'lodash';
import * as moment from 'moment';

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs/internal/observable/throwError';

import {Option} from '../../../../../../src/app/shared/model/option.model';

@Injectable({
    providedIn: 'root'
})
export class HttpUtilsService {

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor() {}

    handleError(response: HttpErrorResponse) {

        let errorMessage: string;

        if (response.error instanceof ErrorEvent) {
            errorMessage = response.error.message;
            // A client-side or network error occurred. Handle it accordingly.
            console.error('A client-side or network error occurred. ErrorEvent:', response);
            console.error('Client-side error message:', errorMessage);
        } else {
            errorMessage = response.error.hasOwnProperty('message')
                ? response.error.message
                : response.error;

            if (response.error instanceof ProgressEvent) {
                errorMessage = response.statusText;
            }

            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error('A server-side error occurred. Error:', response);
            console.error(
                `Backend returned code ${response.status}, ` +
                `body was:`, errorMessage);
        }
        // return an observable with a user-facing error message
        return throwError(errorMessage);
    }

    /**
     *
     * @param itemList: any[]
     * @returns {Option[]}
     */
    convertItemListToOptionList(itemList: any[]): Option[] {
        return itemList.map((item: any) => new Option(item.id, item.description));
    }

    /**
     * Converte um resultado para uma lista de options
     *
     * @param {Observable<any>} observable
     * @returns {Observable<any>}
     */
    convertToOptionList(observable: Observable<any>): Observable<any> {
        return observable.pipe(map((response: any) => this.convertItemListToOptionList(response.data)));
    }

    /**
     * @param {HttpClient} http
     * @param {string} url
     * @param filter
     * @returns {any}
     */
    public list(http: HttpClient, url: string, filter: any = null): any {

        const requestOptions = Object.assign({}, this.httpOptions);

        requestOptions['params'] = filter;

        const observable = http.get(url, requestOptions);

        return this.convertToOptionList(observable);

    }

    /**
     * @todo chamar esse recurso em um listern
     * Desconsidera os valores nulos e indefinidos. Tais valores causam comportamentos inesperados na API
     * (como o uso de null como parte de uma string mediante conversão de JSON)
     *
     * @param obj
     * @returns {any}
     */
    removeNullFromObject(obj) {

        Object.entries(obj)
            .forEach(([key, val]) => {

                if (val && typeof val === 'object' && !(val instanceof File)) {
                    this.removeNullFromObject(val);
                } else if (val === null || val === undefined) {
                    delete obj[key];
                }

            });

        return obj;

    }

    convertToFormData(data: any, form = null, namespace = ''): FormData {

        const fd = form || new FormData();
        let formKey;

        if (data) {
            Object.keys(data).forEach((key) => {

                if (data.hasOwnProperty(key)) {

                    if (namespace) {
                        formKey = namespace + '[' + key + ']';
                    } else {
                        formKey = key;
                    }

                    if (typeof data[key] === 'object' && !(data[key] instanceof File) && !(data[key] instanceof Date)) {

                        const space = namespace ? `${namespace}[${key}]` : key;

                        this.convertToFormData(data[key], fd, space);

                    } else {

                        const dataKey = data[key];

                        fd.append(formKey, dataKey);
                    }

                }

            });
        }

        return fd;
    }

    getEmptyList(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next({data: {list: []}});
            }, 1000);
        });
    }

    getHttpOptions(omit = []) {
        const options = _.cloneDeep(this.httpOptions);

        return _.omit(options, omit);
    }

    prepareDateRange(filter: any, startField: string, endField: string): any {

        if (filter[startField]) {
            filter[startField] = moment(filter[startField]).format('YYYY-MM-DD');
        }

        if (filter[endField]) {
            filter[endField] = moment(filter[endField]).format('YYYY-MM-DD');
        }
        return filter;
    }

}
