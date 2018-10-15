import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Permiso }                           from '../permiso/permiso.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class PermisoService {

    private isPermisoFormValid: boolean = false;
    private env: any = environment;
    private permiso = new Permiso();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllPermiso(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/permiso", opts).pipe(map(res => res.json()));
    }

    savePermiso(permiso){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log('Permiso', permiso);

		if (!permiso.permisoId){
            return this.http.post(this.env.api + "/permiso", permiso, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/permiso/"+ permiso.permisoId, permiso, opts).pipe(map(res => res));
        }
    }

    deletePermiso(permiso){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/permiso/"+permiso.permisoId, opts).pipe(map(res => res));
    }

    getPermisoById(permisoId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idpermiso/"+permisoId, opts).pipe(map(res => res.json()));
    }

    resetPermiso(): Permiso {
        this.clear();
        return this.permiso;
    }

    getPermiso(): Permiso {
        var permiso: Permiso = {
		
		rolId: this.permiso.rolId,
		rolItem: this.permiso.rolItem,
		funcion: this.permiso.funcion,
		ruta: this.permiso.ruta,
		nivelpermiso: this.permiso.nivelpermiso,
		permisoId: this.permiso.permisoId,
		permisoItem: this.permiso.permisoItem	
		
        };
        return permiso;
    }

setPermiso(permiso: Permiso) {
       
        this.isPermisoFormValid = true;
this.permiso.rolId = permiso.rolId;
this.permiso.rolItem = permiso.rolItem;
this.permiso.funcion = permiso.funcion;
this.permiso.ruta = permiso.ruta;
this.permiso.nivelpermiso = permiso.nivelpermiso;
        
		this.permiso.permisoId = permiso.permisoId;
		this.permiso.permisoItem = permiso.permisoItem;
		
		this.validatePermiso();
    }

    isFormValid() {
        return this.isPermisoFormValid;
    }

    validatePermiso() {

    }

    clear() {
			
			this.permiso.rolId = null;
			this.permiso.rolItem = null;
			this.permiso.funcion = ''; 
			this.permiso.ruta = ''; 
			this.permiso.nivelpermiso = ''; 
    		
			this.permiso.permisoId = null;
			this.permiso.permisoItem = null;
			
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
