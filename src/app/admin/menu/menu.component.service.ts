import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Menu }                           from '../menu/menu.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class MenuService {

    private isMenuFormValid: boolean = false;
    private env: any = environment;
    private menu = new Menu();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllMenu(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/menu", opts).pipe(map(res => res.json()));
    }

    saveMenu(menu){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!menu.menuId){
            return this.http.post(this.env.api + "/menu", menu, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/menu/"+ menu.menuId, menu, opts).pipe(map(res => res));
        }
    }

    deleteMenu(menu){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/menu/"+menu.menuId, opts).pipe(map(res => res));
    }

    getMenuById(menuId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idmenu/"+menuId, opts).pipe(map(res => res.json()));
    }

    resetMenu(): Menu {
        this.clear();
        return this.menu;
    }

    getMenu(): Menu {
        var menu: Menu = {
					path: this.menu.path, 
					code: this.menu.code, 
					
					moduleId: this.menu.moduleId,
					moduleItem: this.menu.moduleItem,
					display_resultmenuId: this.menu.menuId,
					exposed_filtermenuId: this.menu.menuId,
					menuId: this.menu.menuId	

        };
        return menu;
    }


setMenu(menu: Menu) {
       
	this.isMenuFormValid = true;
			this.menu.path = menu.path;    
			this.menu.code = menu.code;    
			this.menu.moduleId = menu.moduleId;
			this.menu.moduleItem = menu.moduleItem;
			this.menu.display_resultmenuId = menu.display_resultmenuId;
			this.menu.exposed_filtermenuId = menu.exposed_filtermenuId;
			this.menu.menuId        = menu.menuId;
        	this.validateMenu();
    }

    isFormValid() {
        return this.isMenuFormValid;
    }

    validateMenu() {

    }

    clear() {

			this.menu.path = '';    
			this.menu.code = '';    
			this.menu.moduleId = null;
			this.menu.moduleItem = null;
			this.menu.display_resultmenuId = null;
			this.menu.exposed_filtermenuId = null;
			this.menu.menuId = null;
    }

    setEdit(flag){
        this.flag = flag;
    }

    getEdit(){
        return this.flag;
    }

    setDelete(flagDelete){
      this.flagDelete = flagDelete;
    }

    getDelete(){
      return this.flagDelete;
    }

}
