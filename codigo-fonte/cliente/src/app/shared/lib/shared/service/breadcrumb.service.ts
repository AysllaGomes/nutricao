import {Injectable} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {SubmenuItem} from "../../submenu/model/submenu-item";

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {

    public showRightItems = false;

    private itemsSource = new Subject<SubmenuItem[]>();

    itemsHandler: Observable<SubmenuItem[]> = this.itemsSource.asObservable();

    setItems(items: SubmenuItem[]) {
        this.itemsSource.next(items);
    }

    enableRightItems() {
        this.showRightItems = true;
    }

    disableRightItems() {
        this.showRightItems = false;
    }
}
