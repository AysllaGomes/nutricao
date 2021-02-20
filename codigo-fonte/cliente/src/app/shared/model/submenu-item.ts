import { MenuItem } from 'primeng/api';

export interface SubmenuItem extends MenuItem {

    routerLink?: (string | number)[];

}
